import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { withRateLimit, RATE_LIMITS, getClientIdentifier } from "@/lib/rate-limit";
import { AnalyzeRequestSchema, getFirstError } from "@/lib/validation/schemas";
import { canUserAnalyze, incrementAnalysisCount } from "@/lib/usage-limits";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - restrict AI analysis to prevent abuse
    const clientId = `analyze:${getClientIdentifier(request)}`;
    const rateLimitResult = withRateLimit(request, RATE_LIMITS.analyze, clientId);

    if (!rateLimitResult.success && rateLimitResult.response) {
      return rateLimitResult.response;
    }

    // Get user session for usage limits
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Check usage limits for authenticated users
    if (userId) {
      const usageCheck = await canUserAnalyze(userId);
      if (!usageCheck.allowed) {
        return NextResponse.json(
          {
            success: false,
            error: usageCheck.reason,
            usage: {
              used: usageCheck.status.used,
              limit: usageCheck.status.limit,
              remaining: usageCheck.status.remaining,
            },
          },
          { status: 429 }
        );
      }
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Neplatný JSON formát" },
        { status: 400 }
      );
    }

    // Zod validation
    const validation = AnalyzeRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: getFirstError(validation.error) },
        { status: 400 }
      );
    }

    const { image, description } = validation.data;

    if (!image && !description) {
      return NextResponse.json(
        { success: false, error: "Obrázek nebo popis je povinný" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Increment usage for authenticated users even in demo mode
      if (userId) {
        await incrementAnalysisCount(userId);
      }

      // Return mock response for development/demo
      return NextResponse.json({
        success: true,
        data: getMockAnalysisResult(),
      });
    }

    // Build messages for OpenAI
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `Jsi expert na diagnostiku domácích závad. Analyzuj obrázek nebo popis a identifikuj:
1. Jaký objekt/zařízení je na obrázku
2. Jaká je závada nebo problém
3. Jak závažný je problém (1-10)
4. Jaké kroky doporučuješ k opravě
5. Jaké nástroje jsou potřeba
6. Bezpečnostní varování

Odpověz POUZE ve formátu JSON:
{
  "object": {"name": "...", "category": "voda|elektrina|topeni|dvere_okna|nabytek|spotrebice"},
  "issue": {"name": "...", "description": "...", "riskScore": 1-10, "difficulty": "VERY_EASY|EASY|MEDIUM|HARD"},
  "timeEstimate": "X min",
  "tools": ["nástroj1", "nástroj2"],
  "steps": [{"step": 1, "action": "...", "time": "X min", "icon": "emoji"}],
  "safetyWarnings": ["varování1", "varování2"],
  "confidence": 0.0-1.0,
  "estimatedCost": {"min": X, "max": Y, "currency": "CZK"}
}`,
      },
    ];

    // Add user message with image or description
    if (image) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: description
              ? `Popis problému: "${description}". Analyzuj tento obrázek a poskytni diagnostiku v JSON formátu:`
              : "Analyzuj tento obrázek domácí závady a poskytni diagnostiku v JSON formátu:",
          },
          {
            type: "image_url",
            image_url: { url: image },
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: `Popis problému: "${description}". Analyzuj tento problém a poskytni diagnostiku v JSON formátu:`,
      });
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 1500,
    });

    // Parse response
    let result;
    try {
      const content = response.choices[0].message.content || "";
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      result = JSON.parse(jsonStr);
    } catch {
      // Return fallback response if parsing fails
      result = getMockAnalysisResult();
    }

    // Increment usage count after successful analysis
    if (userId) {
      await incrementAnalysisCount(userId);
    }

    return NextResponse.json({
      success: true,
      data: {
        analysisId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        detection: {
          object: result.object,
          issue: result.issue,
        },
        recommendations: {
          timeEstimate: result.timeEstimate,
          tools: result.tools,
          steps: result.steps,
          safetyWarnings: result.safetyWarnings,
          estimatedCost: result.estimatedCost,
        },
        confidence: result.confidence,
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { success: false, error: "Analysis failed" },
      { status: 500 }
    );
  }
}

// Mock response for development/demo
function getMockAnalysisResult() {
  return {
    analysisId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    detection: {
      object: {
        name: "Kohoutek",
        category: "voda",
        confidence: 0.92,
      },
      issue: {
        name: "Kapající kohoutek",
        description: "Netěsnící těsnění nebo O-kroužek způsobuje únik vody.",
        riskScore: 2,
        difficulty: "EASY",
      },
    },
    recommendations: {
      timeEstimate: "15 min",
      tools: ["Klíč", "Šroubovák", "Nové těsnění", "Hadřík"],
      steps: [
        { step: 1, action: "Zavřete hlavní přívod vody", time: "1 min", icon: "🚰" },
        { step: 2, action: "Otevřete kohoutek pro uvolnění tlaku", time: "30 s", icon: "💧" },
        { step: 3, action: "Odšroubujte hlavici kohoutku", time: "2 min", icon: "🔧" },
        { step: 4, action: "Vyjměte staré těsnění", time: "2 min", icon: "⚙️" },
        { step: 5, action: "Nasaďte nové těsnění", time: "2 min", icon: "🔩" },
        { step: 6, action: "Sestavte kohoutek zpět", time: "3 min", icon: "🔧" },
        { step: 7, action: "Pusťte vodu a zkontrolujte", time: "2 min", icon: "✅" },
      ],
      safetyWarnings: [
        "Vždy nejdříve zavřete hlavní přívod vody",
        "Mějte připravený kbelík na zachycení zbylé vody",
        "Nepoužívejte nadměrnou sílu při utahování",
      ],
      estimatedCost: { min: 30, max: 150, currency: "CZK" },
    },
    confidence: 0.92,
  };
}
