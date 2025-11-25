"use client";

import * as React from "react";
import { Database, Search, Filter, ChevronRight, Clock, AlertTriangle, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn, getDifficultyColor } from "@/lib/utils";

// Categories with icons
const categories = [
  { id: "all", name: "Vše", icon: "📦", count: 103 },
  { id: "voda", name: "Voda", icon: "🚰", count: 25 },
  { id: "elektrina", name: "Elektřina", icon: "⚡", count: 18 },
  { id: "topeni", name: "Topení", icon: "🌡️", count: 12 },
  { id: "dvere_okna", name: "Dveře & Okna", icon: "🚪", count: 15 },
  { id: "nabytek", name: "Nábytek", icon: "🪑", count: 14 },
  { id: "spotrebice", name: "Spotřebiče", icon: "🔌", count: 19 },
];

// Mock repairs data
const mockRepairs = [
  {
    id: "kohoutek-leak",
    name: "Kapající kohoutek",
    category: "voda",
    difficulty: "EASY",
    timeEstimate: 15,
    riskScore: 2,
    issues: 3,
  },
  {
    id: "kohoutek-pressure",
    name: "Slabý tlak vody",
    category: "voda",
    difficulty: "VERY_EASY",
    timeEstimate: 10,
    riskScore: 1,
    issues: 2,
  },
  {
    id: "wc-running",
    name: "Protékající WC",
    category: "voda",
    difficulty: "MEDIUM",
    timeEstimate: 25,
    riskScore: 3,
    issues: 4,
  },
  {
    id: "outlet-broken",
    name: "Nefunkční zásuvka",
    category: "elektrina",
    difficulty: "HARD",
    timeEstimate: 30,
    riskScore: 8,
    issues: 2,
  },
  {
    id: "door-squeaky",
    name: "Vrzající dveře",
    category: "dvere_okna",
    difficulty: "VERY_EASY",
    timeEstimate: 5,
    riskScore: 1,
    issues: 1,
  },
  {
    id: "radiator-cold",
    name: "Studený radiátor",
    category: "topeni",
    difficulty: "EASY",
    timeEstimate: 10,
    riskScore: 2,
    issues: 3,
  },
  {
    id: "chair-wobbly",
    name: "Viklající se židle",
    category: "nabytek",
    difficulty: "EASY",
    timeEstimate: 15,
    riskScore: 1,
    issues: 2,
  },
  {
    id: "washer-drain",
    name: "Pračka neodčerpává",
    category: "spotrebice",
    difficulty: "MEDIUM",
    timeEstimate: 30,
    riskScore: 4,
    issues: 3,
  },
];

const difficultyLabels: Record<string, string> = {
  VERY_EASY: "Velmi snadná",
  EASY: "Snadná",
  MEDIUM: "Střední",
  HARD: "Těžká",
  EXPERT: "Expert",
};

export default function RepairsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const filteredRepairs = mockRepairs.filter((repair) => {
    if (selectedCategory !== "all" && repair.category !== selectedCategory) return false;
    if (search && !repair.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Database className="h-8 w-8 text-fixo-primary" />
          Databáze oprav
        </h1>
        <p className="text-muted-foreground mt-1">
          Prohlédněte si více než 100 návodů na opravy
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Hledat v databázi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="h-4 w-4" />}
          className="max-w-md"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "fixo" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat.id)}
            className="gap-2"
          >
            <span>{cat.icon}</span>
            {cat.name}
            <Badge variant="secondary" className="ml-1">
              {cat.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Zobrazeno {filteredRepairs.length} z {mockRepairs.length} položek
      </p>

      {/* Repairs grid */}
      {filteredRepairs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Žádné výsledky</h3>
            <p className="text-muted-foreground">
              Zkuste změnit kategorii nebo vyhledávací výraz
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRepairs.map((repair) => (
            <Card key={repair.id} hover className="cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{repair.name}</CardTitle>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getDifficultyColor(repair.difficulty)}>
                    {difficultyLabels[repair.difficulty]}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="mr-1 h-3 w-3" />
                    {repair.timeEstimate} min
                  </Badge>
                  {repair.riskScore > 5 && (
                    <Badge variant="danger">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Vysoké riziko
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    <Wrench className="inline mr-1 h-3 w-3" />
                    {repair.issues} problémů
                  </span>
                  <span>Riziko: {repair.riskScore}/10</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Info card */}
      <Card className="mt-8 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">O databázi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Naše databáze obsahuje více než 100 nejčastějších domácích závad rozdělených do 7
            kategorií. Každá oprava obsahuje detailní návod krok za krokem, seznam potřebných
            nástrojů, odhad nákladů a bezpečnostní upozornění. Databáze je pravidelně
            aktualizována a rozšiřována.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
