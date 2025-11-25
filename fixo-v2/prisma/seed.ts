import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Category mapping
const categoryMap: Record<string, { name: string; icon: string; description: string }> = {
  voda: {
    name: "Voda a instalatérství",
    icon: "🚰",
    description: "Kohoutky, WC, odpady, trubky a vodovodní instalace",
  },
  elektrina: {
    name: "Elektřina",
    icon: "⚡",
    description: "Zásuvky, vypínače, osvětlení a elektrické obvody",
  },
  topeni: {
    name: "Topení a klimatizace",
    icon: "🌡️",
    description: "Radiátory, kotle, termostaty a klimatizační jednotky",
  },
  dvere_okna: {
    name: "Dveře a okna",
    icon: "🚪",
    description: "Panty, zámky, těsnění a sklo",
  },
  nabytek: {
    name: "Nábytek",
    icon: "🪑",
    description: "Skříně, stoly, židle a montáž nábytku",
  },
  spotrebice: {
    name: "Spotřebiče",
    icon: "📺",
    description: "Pračky, myčky, lednice a drobné spotřebiče",
  },
};

// Difficulty mapping
const difficultyMap: Record<string, string> = {
  "Velmi nízká": "VERY_EASY",
  "Nízká": "EASY",
  "Střední": "MEDIUM",
  "Vysoká": "HARD",
  "Velmi vysoká": "VERY_HARD",
};

async function main() {
  console.log("🌱 Seeding database...");

  // Read repairs data
  const repairsPath = path.join(__dirname, "../../data/repairs_expanded.json");

  let repairsData: any;

  try {
    const repairsJson = fs.readFileSync(repairsPath, "utf-8");
    repairsData = JSON.parse(repairsJson);
  } catch (error) {
    console.log("⚠️ Could not read repairs_expanded.json, using built-in data...");
    repairsData = { repairs: getBuiltInRepairs() };
  }

  // Create categories
  console.log("📁 Creating categories...");
  for (const [slug, category] of Object.entries(categoryMap)) {
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: category.name,
        icon: category.icon,
        description: category.description,
      },
    });
  }

  // Create repairs
  console.log("🔧 Creating repairs...");
  const repairs = repairsData.repairs || repairsData;
  let repairCount = 0;
  let issueCount = 0;

  for (const [repairId, repair] of Object.entries(repairs) as [string, any][]) {
    const category = await prisma.category.findUnique({
      where: { slug: repair.category },
    });

    if (!category) {
      console.log(`⚠️ Category ${repair.category} not found for repair ${repairId}`);
      continue;
    }

    const createdRepair = await prisma.repair.upsert({
      where: { slug: repairId },
      update: {
        name: repair.name,
        icon: repair.icon,
      },
      create: {
        slug: repairId,
        name: repair.name,
        icon: repair.icon,
        categoryId: category.id,
      },
    });

    repairCount++;

    // Create issues for this repair
    for (const issue of repair.issues || []) {
      const difficulty = difficultyMap[issue.difficulty] || "MEDIUM";
      const timeEstimate = parseInt(issue.timeEstimate) || 15;

      const createdIssue = await prisma.issue.upsert({
        where: {
          repairId_slug: {
            repairId: createdRepair.id,
            slug: issue.id,
          },
        },
        update: {
          name: issue.name,
          description: issue.description,
          riskScore: issue.riskScore || 1,
          difficulty,
          timeEstimate,
          safetyWarnings: issue.safetyWarnings || [],
        },
        create: {
          slug: issue.id,
          name: issue.name,
          description: issue.description,
          riskScore: issue.riskScore || 1,
          difficulty,
          timeEstimate,
          safetyWarnings: issue.safetyWarnings || [],
          repairId: createdRepair.id,
        },
      });

      issueCount++;

      // Create steps for this issue
      await prisma.step.deleteMany({
        where: { issueId: createdIssue.id },
      });

      for (const step of issue.steps || []) {
        await prisma.step.create({
          data: {
            stepNumber: step.step,
            action: step.action,
            time: step.time || "1 min",
            icon: step.icon || "🔧",
            hint: step.hint,
            issueId: createdIssue.id,
          },
        });
      }

      // Create tools for this issue
      await prisma.issueTool.deleteMany({
        where: { issueId: createdIssue.id },
      });

      for (const tool of issue.tools || []) {
        await prisma.issueTool.create({
          data: {
            name: tool,
            issueId: createdIssue.id,
          },
        });
      }
    }
  }

  console.log(`✅ Created ${repairCount} repairs with ${issueCount} issues`);

  // Create demo user
  console.log("👤 Creating demo user...");
  await prisma.user.upsert({
    where: { email: "demo@fixo.cz" },
    update: {},
    create: {
      email: "demo@fixo.cz",
      name: "Demo Uživatel",
      plan: "FREE",
      monthlyAnalysesLimit: 3,
      monthlyAnalysesUsed: 0,
    },
  });

  console.log("🎉 Seeding complete!");
}

// Built-in repairs for when JSON file is not available
function getBuiltInRepairs() {
  return {
    kohoutek: {
      name: "Kohoutek",
      category: "voda",
      icon: "🚰",
      issues: [
        {
          id: "leak",
          name: "Kapající kohoutek",
          description: "Netěsnící těsnění nebo O-kroužek",
          riskScore: 2,
          difficulty: "Nízká",
          timeEstimate: "15 min",
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
          safetyWarnings: ["Vždy nejdříve zavřete hlavní přívod vody", "Mějte připravený kbelík"],
        },
      ],
    },
    wc: {
      name: "Toaleta",
      category: "voda",
      icon: "🚽",
      issues: [
        {
          id: "running",
          name: "Protékající WC",
          description: "Vadný plovák nebo těsnění",
          riskScore: 2,
          difficulty: "Střední",
          timeEstimate: "20 min",
          tools: ["Klíč", "Nový plovák"],
          steps: [
            { step: 1, action: "Zavřete přívod vody k WC", time: "1 min", icon: "🚰" },
            { step: 2, action: "Vyprázdněte nádržku", time: "1 min", icon: "🚽" },
            { step: 3, action: "Zkontrolujte plovák", time: "5 min", icon: "🔍" },
            { step: 4, action: "Vyměňte vadné díly", time: "10 min", icon: "🔧" },
            { step: 5, action: "Otestujte", time: "3 min", icon: "✅" },
          ],
          safetyWarnings: ["Použijte gumové rukavice"],
        },
      ],
    },
    dvere: {
      name: "Dveře",
      category: "dvere_okna",
      icon: "🚪",
      issues: [
        {
          id: "squeaky",
          name: "Vrzající dveře",
          description: "Suché panty potřebují namazání",
          riskScore: 1,
          difficulty: "Velmi nízká",
          timeEstimate: "5 min",
          tools: ["WD-40 nebo olej", "Hadřík"],
          steps: [
            { step: 1, action: "Otevřete dveře", time: "10 s", icon: "🚪" },
            { step: 2, action: "Nastříkejte mazivo na panty", time: "1 min", icon: "🛢️" },
            { step: 3, action: "Pohybujte dveřmi", time: "1 min", icon: "↔️" },
            { step: 4, action: "Setřete přebytečné mazivo", time: "1 min", icon: "🧹" },
          ],
          safetyWarnings: ["Větrejte při použití sprejů"],
        },
      ],
    },
    radiator: {
      name: "Radiátor",
      category: "topeni",
      icon: "🌡️",
      issues: [
        {
          id: "cold",
          name: "Studený radiátor",
          description: "Vzduch v topném systému",
          riskScore: 2,
          difficulty: "Nízká",
          timeEstimate: "10 min",
          tools: ["Odvzdušňovací klíč", "Kbelík"],
          steps: [
            { step: 1, action: "Vypněte topení", time: "1 min", icon: "❄️" },
            { step: 2, action: "Najděte odvzdušňovací ventil", time: "1 min", icon: "🔍" },
            { step: 3, action: "Umístěte nádobu pod ventil", time: "30 s", icon: "🪣" },
            { step: 4, action: "Pomalu otevřete ventil", time: "2 min", icon: "🔧" },
            { step: 5, action: "Až poteče voda, zavřete", time: "30 s", icon: "✅" },
          ],
          safetyWarnings: ["Pozor na horkou vodu"],
        },
      ],
    },
    zasuvka: {
      name: "Elektrická zásuvka",
      category: "elektrina",
      icon: "🔌",
      issues: [
        {
          id: "not-working",
          name: "Nefunkční zásuvka",
          description: "Přerušený obvod nebo poškozený kontakt",
          riskScore: 8,
          difficulty: "Vysoká",
          timeEstimate: "30 min",
          tools: ["Tester napětí", "Šroubovák"],
          steps: [
            { step: 1, action: "⚠️ VYPNĚTE JISTIČ!", time: "1 min", icon: "⚡" },
            { step: 2, action: "Ověřte testerem beznapěťový stav", time: "2 min", icon: "🔌" },
            { step: 3, action: "Demontujte kryt zásuvky", time: "2 min", icon: "🔧" },
            { step: 4, action: "Zkontrolujte zapojení", time: "5 min", icon: "🔍" },
            { step: 5, action: "Opravte nebo vyměňte", time: "15 min", icon: "⚙️" },
            { step: 6, action: "Zapněte jistič a otestujte", time: "2 min", icon: "✅" },
          ],
          safetyWarnings: ["⚠️ POZOR! Práce s elektřinou může být životu nebezpečná!", "Vždy vypněte jistič"],
        },
      ],
    },
  };
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
