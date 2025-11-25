import { NextRequest, NextResponse } from "next/server";

// Mock repair data - in production this would come from Prisma
const mockRepairs = {
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
      {
        id: "low-pressure",
        name: "Slabý tlak vody",
        description: "Zanesený perlátor nebo usazeniny",
        riskScore: 1,
        difficulty: "VERY_EASY",
        timeEstimate: 10,
        materialCost: { min: 0, max: 50, currency: "CZK" },
        professionalCost: { min: 400, max: 800, currency: "CZK" },
        tools: ["Kleště", "Ocet", "Kartáček"],
        steps: [
          { step: 1, action: "Odšroubujte perlátor", time: "1 min", icon: "🔧" },
          { step: 2, action: "Namočte do octa na 30 minut", time: "30 min", icon: "🧪" },
          { step: 3, action: "Vyčistěte kartáčkem", time: "5 min", icon: "🧹" },
          { step: 4, action: "Nasaďte zpět", time: "1 min", icon: "✅" },
        ],
        safetyWarnings: ["Větrejte při práci s octem"],
      },
    ],
  },
  wc: {
    id: "wc",
    name: "Toaleta",
    category: "voda",
    icon: "🚽",
    issues: [
      {
        id: "running",
        name: "Protékající WC",
        description: "Vadný plovák nebo těsnění",
        riskScore: 3,
        difficulty: "MEDIUM",
        timeEstimate: 25,
        materialCost: { min: 100, max: 300, currency: "CZK" },
        professionalCost: { min: 600, max: 1500, currency: "CZK" },
        tools: ["Klíč", "Nový plovák", "Těsnění"],
        steps: [
          { step: 1, action: "Zavřete přívod vody k WC", time: "1 min", icon: "🚰" },
          { step: 2, action: "Vyprázdněte nádržku", time: "1 min", icon: "💧" },
          { step: 3, action: "Zkontrolujte plovák", time: "5 min", icon: "🔍" },
          { step: 4, action: "Vyměňte vadné díly", time: "15 min", icon: "🔧" },
          { step: 5, action: "Otestujte", time: "3 min", icon: "✅" },
        ],
        safetyWarnings: ["Použijte gumové rukavice", "Dbejte na hygienu"],
      },
    ],
  },
  dvere: {
    id: "dvere",
    name: "Dveře",
    category: "dvere_okna",
    icon: "🚪",
    issues: [
      {
        id: "squeaky",
        name: "Vrzající dveře",
        description: "Suché panty potřebují namazání",
        riskScore: 1,
        difficulty: "VERY_EASY",
        timeEstimate: 5,
        materialCost: { min: 50, max: 120, currency: "CZK" },
        professionalCost: { min: 300, max: 600, currency: "CZK" },
        tools: ["WD-40 nebo olej", "Hadřík"],
        steps: [
          { step: 1, action: "Otevřete dveře do poloviny", time: "10 s", icon: "🚪" },
          { step: 2, action: "Nastříkejte mazivo na panty", time: "1 min", icon: "🛢️" },
          { step: 3, action: "Pohybujte dveřmi tam a zpět", time: "1 min", icon: "↔️" },
          { step: 4, action: "Setřete přebytečné mazivo", time: "1 min", icon: "🧹" },
        ],
        safetyWarnings: ["Větrejte při použití sprejů"],
      },
    ],
  },
  radiator: {
    id: "radiator",
    name: "Radiátor",
    category: "topeni",
    icon: "🌡️",
    issues: [
      {
        id: "cold",
        name: "Studený radiátor",
        description: "Vzduch v topném systému",
        riskScore: 2,
        difficulty: "EASY",
        timeEstimate: 10,
        materialCost: { min: 0, max: 50, currency: "CZK" },
        professionalCost: { min: 500, max: 1000, currency: "CZK" },
        tools: ["Odvzdušňovací klíč", "Kbelík", "Hadřík"],
        steps: [
          { step: 1, action: "Vypněte topení a nechte vychladnout", time: "15 min", icon: "❄️" },
          { step: 2, action: "Najděte odvzdušňovací ventil", time: "1 min", icon: "🔍" },
          { step: 3, action: "Umístěte nádobu pod ventil", time: "30 s", icon: "🪣" },
          { step: 4, action: "Pomalu otevřete ventil", time: "2 min", icon: "🔧" },
          { step: 5, action: "Až poteče voda, zavřete", time: "30 s", icon: "✅" },
        ],
        safetyWarnings: ["Pozor na horkou vodu", "Mějte připravený hadřík"],
      },
    ],
  },
};

// GET /api/repairs - Get all repairs or filter by category
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("q");

  let repairs = Object.values(mockRepairs);

  // Filter by category
  if (category && category !== "all") {
    repairs = repairs.filter((repair) => repair.category === category);
  }

  // Search by name
  if (search) {
    const query = search.toLowerCase();
    repairs = repairs.filter(
      (repair) =>
        repair.name.toLowerCase().includes(query) ||
        repair.issues.some(
          (issue) =>
            issue.name.toLowerCase().includes(query) ||
            issue.description.toLowerCase().includes(query)
        )
    );
  }

  return NextResponse.json({
    success: true,
    count: repairs.length,
    data: repairs,
  });
}
