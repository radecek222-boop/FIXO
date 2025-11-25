"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Trash2,
  LogOut,
  Moon,
  Sun,
  Globe,
  Smartphone,
} from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    tips: true,
  });

  const user = session?.user;
  const plan = (user as any)?.plan || "FREE";

  const planLabels: Record<string, { label: string; color: string }> = {
    FREE: { label: "Free", color: "secondary" },
    PLUS: { label: "Plus", color: "fixo" },
    PRO: { label: "Pro", color: "success" },
    LIFETIME: { label: "Lifetime", color: "warning" },
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nastavení</h1>
        <p className="text-muted-foreground mt-2">
          Spravujte své účet a předvolby
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profil
            </CardTitle>
            <CardDescription>
              Základní informace o vašem účtu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-fixo-primary-light flex items-center justify-center">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name || ""}
                    className="h-16 w-16 rounded-full"
                  />
                ) : (
                  <span className="text-2xl font-bold text-fixo-primary">
                    {user?.name?.[0] || user?.email?.[0] || "U"}
                  </span>
                )}
              </div>
              <div>
                <div className="font-semibold text-lg">{user?.name || "Uživatel"}</div>
                <div className="text-sm text-muted-foreground">{user?.email}</div>
                <Badge variant={planLabels[plan].color as any} className="mt-1">
                  {planLabels[plan].label}
                </Badge>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Jméno</label>
                <Input value={user?.name || ""} disabled className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input value={user?.email || ""} disabled className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Předplatné
            </CardTitle>
            <CardDescription>
              Spravujte své předplatné a platební údaje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div>
                <div className="font-semibold">
                  {plan === "FREE" ? "Bezplatný plán" : `${planLabels[plan].label} plán`}
                </div>
                <div className="text-sm text-muted-foreground">
                  {plan === "FREE"
                    ? "3 AI analýzy měsíčně, základní funkce"
                    : "Neomezené analýzy a prémiové funkce"}
                </div>
              </div>
              <Button variant={plan === "FREE" ? "fixo" : "outline"} asChild>
                <a href="/pricing">
                  {plan === "FREE" ? "Upgradovat" : "Spravovat"}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifikace
            </CardTitle>
            <CardDescription>
              Nastavte, jak chcete být informováni
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: "email",
                label: "Emailové notifikace",
                description: "Důležité aktualizace a novinky",
              },
              {
                id: "push",
                label: "Push notifikace",
                description: "Okamžitá upozornění v prohlížeči",
              },
              {
                id: "tips",
                label: "Tipy a triky",
                description: "Užitečné rady pro domácí opravy",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.description}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id as keyof typeof prev],
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications[item.id as keyof typeof notifications]
                      ? "bg-fixo-primary"
                      : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications[item.id as keyof typeof notifications]
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Předvolby
            </CardTitle>
            <CardDescription>
              Přizpůsobte si aplikaci podle svých potřeb
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Jazyk</div>
                <div className="text-sm text-muted-foreground">
                  Čeština
                </div>
              </div>
              <Button variant="outline" size="sm" disabled>
                Změnit
              </Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Tmavý režim</div>
                <div className="text-sm text-muted-foreground">
                  Automaticky podle systému
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Sun className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Moon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Bezpečnost
            </CardTitle>
            <CardDescription>
              Zabezpečte svůj účet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Propojené účty</div>
                <div className="text-sm text-muted-foreground">
                  Google, GitHub
                </div>
              </div>
              <Button variant="outline" size="sm" disabled>
                Spravovat
              </Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Aktivní relace</div>
                <div className="text-sm text-muted-foreground">
                  1 aktivní zařízení
                </div>
              </div>
              <Button variant="outline" size="sm" disabled>
                Zobrazit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Nebezpečná zóna
            </CardTitle>
            <CardDescription>
              Nevratné akce
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Odhlásit se</div>
                <div className="text-sm text-muted-foreground">
                  Odhlásí vás z tohoto zařízení
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Odhlásit
              </Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-destructive">Smazat účet</div>
                <div className="text-sm text-muted-foreground">
                  Trvale smaže váš účet a všechna data
                </div>
              </div>
              <Button variant="destructive" size="sm" disabled>
                Smazat účet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
