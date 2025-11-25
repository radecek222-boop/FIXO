"use client";

import * as React from "react";
import { History, Filter, Download, CheckCircle, Clock, XCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatRelativeTime } from "@/lib/utils";

type FilterStatus = "all" | "completed" | "in_progress" | "abandoned";

// Mock data - in production this would come from API
const mockHistory = [
  {
    id: "1",
    title: "Kapající kohoutek",
    category: "voda",
    status: "completed" as const,
    date: new Date(Date.now() - 86400000 * 2),
    duration: 18,
    savedAmount: 950,
  },
  {
    id: "2",
    title: "Vrzající dveře",
    category: "dvere_okna",
    status: "completed" as const,
    date: new Date(Date.now() - 86400000 * 5),
    duration: 5,
    savedAmount: 400,
  },
  {
    id: "3",
    title: "Studený radiátor",
    category: "topeni",
    status: "in_progress" as const,
    date: new Date(Date.now() - 86400000 * 1),
    duration: null,
    savedAmount: null,
  },
  {
    id: "4",
    title: "Nefunkční zásuvka",
    category: "elektrina",
    status: "abandoned" as const,
    date: new Date(Date.now() - 86400000 * 10),
    duration: null,
    savedAmount: null,
  },
];

const statusConfig = {
  completed: { label: "Dokončeno", icon: CheckCircle, variant: "success" as const },
  in_progress: { label: "Probíhá", icon: Clock, variant: "warning" as const },
  abandoned: { label: "Zrušeno", icon: XCircle, variant: "secondary" as const },
};

export default function HistoryPage() {
  const [filter, setFilter] = React.useState<FilterStatus>("all");
  const [search, setSearch] = React.useState("");

  const filteredHistory = mockHistory.filter((item) => {
    if (filter !== "all" && item.status !== filter) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: mockHistory.length,
    completed: mockHistory.filter((h) => h.status === "completed").length,
    totalSaved: mockHistory.reduce((sum, h) => sum + (h.savedAmount || 0), 0),
    avgDuration: Math.round(
      mockHistory.filter((h) => h.duration).reduce((sum, h) => sum + (h.duration || 0), 0) /
        mockHistory.filter((h) => h.duration).length
    ),
  };

  const exportToCSV = () => {
    const headers = ["Název", "Kategorie", "Stav", "Datum", "Trvání (min)", "Ušetřeno (Kč)"];
    const rows = mockHistory.map((h) => [
      h.title,
      h.category,
      statusConfig[h.status].label,
      h.date.toLocaleDateString("cs-CZ"),
      h.duration || "",
      h.savedAmount || "",
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `fixo-historie-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <History className="h-8 w-8 text-fixo-primary" />
            Historie oprav
          </h1>
          <p className="text-muted-foreground mt-1">
            Přehled vašich dokončených a probíhajících oprav
          </p>
        </div>
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-fixo-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Celkem oprav</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-success">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Dokončených</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-fixo-secondary">
              {stats.totalSaved.toLocaleString()} Kč
            </div>
            <div className="text-sm text-muted-foreground">Ušetřeno celkem</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{stats.avgDuration} min</div>
            <div className="text-sm text-muted-foreground">Průměrný čas</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Hledat v historii..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="flex gap-2">
          {(["all", "completed", "in_progress", "abandoned"] as FilterStatus[]).map((status) => (
            <Button
              key={status}
              variant={filter === status ? "fixo" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status === "all"
                ? "Vše"
                : status === "completed"
                ? "Dokončené"
                : status === "in_progress"
                ? "Probíhající"
                : "Zrušené"}
            </Button>
          ))}
        </div>
      </div>

      {/* History list */}
      {filteredHistory.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <History className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Žádné opravy</h3>
            <p className="text-muted-foreground">
              {search
                ? "Žádné opravy neodpovídají vašemu hledání"
                : "Zatím nemáte žádné opravy v historii"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => {
            const StatusIcon = statusConfig[item.status].icon;
            return (
              <Card key={item.id} hover className="cursor-pointer">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <StatusIcon
                          className={`h-5 w-5 ${
                            item.status === "completed"
                              ? "text-success"
                              : item.status === "in_progress"
                              ? "text-warning"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatRelativeTime(item.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {item.savedAmount && (
                        <div className="text-right">
                          <div className="text-sm font-medium text-success">
                            +{item.savedAmount} Kč
                          </div>
                          <div className="text-xs text-muted-foreground">ušetřeno</div>
                        </div>
                      )}
                      <Badge variant={statusConfig[item.status].variant}>
                        {statusConfig[item.status].label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
