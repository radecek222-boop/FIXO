"use client";

import { useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wrench, Mail, Github, Chrome } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDemoLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Zadejte email");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("demo", {
        email,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError("Přihlášení se nezdařilo");
      }
    } catch {
      setError("Nastala chyba při přihlášení");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fixo-primary text-white">
              <Wrench className="h-6 w-6" />
            </div>
          </Link>
          <CardTitle className="text-2xl">Přihlášení do FIXO</CardTitle>
          <CardDescription>
            Diagnostikujte a opravujte závady jako profesionál
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
              {error}
            </div>
          )}

          {/* OAuth providers */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthLogin("google")}
              disabled={isLoading}
            >
              <Chrome className="h-5 w-5 mr-2" />
              Pokračovat s Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthLogin("github")}
              disabled={isLoading}
            >
              <Github className="h-5 w-5 mr-2" />
              Pokračovat s GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                nebo
              </span>
            </div>
          </div>

          {/* Demo login */}
          <form onSubmit={handleDemoLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="vas@email.cz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="fixo"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Přihlašuji..." : "Přihlásit se"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Přihlášením souhlasíte s{" "}
            <Link href="/terms" className="underline hover:text-primary">
              podmínkami použití
            </Link>{" "}
            a{" "}
            <Link href="/privacy" className="underline hover:text-primary">
              ochranou osobních údajů
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
