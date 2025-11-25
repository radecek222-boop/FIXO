import { NextRequest, NextResponse } from "next/server";

// Mock repair data - same as in /api/repairs/route.ts
// In production, this would be fetched from Prisma
const mockRepairs: Record<string, any> = {
  kohoutek: {
    id: "kohoutek",
    name: "Kohoutek",
    category: "voda",
    icon: "🚰",
    issues: [
      {
        id: "leak",
        name: "Kapající kohoutek",
        description: "Netěsnící těsnění nebo O-kroužek",
        riskScore: 2,
        difficulty: "EASY",
        timeEstimate: 15,
        materialCost: { min: 30, max: 100, currency: "CZK" },
        professionalCost: { min: 500, max: 1200, currency: "CZK" },
        tools: ["Klíč", "Šroubovák", "Nové těsnění"],
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
          "Mějte připravený kbelík",
          "Nepoužívejte nadměrnou sílu při utahování",
        ],
      },
    ],
  },
  // ... more repairs
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const repair = mockRepairs[params.id];

  if (!repair) {
    return NextResponse.json(
      { success: false, error: "Repair not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: repair,
  });
}
