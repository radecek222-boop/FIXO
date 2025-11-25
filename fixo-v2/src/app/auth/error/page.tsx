"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const errors: Record<string, string> = {
  Configuration: "Chyba konfigurace serveru.",
  AccessDenied: "Přístup byl zamítnut.",
  Verification: "Ověřovací odkaz vypršel nebo byl již použit.",
  Default: "Nastala neočekávaná chyba.",
  OAuthSignin: "Chyba při přihlašování přes OAuth.",
  OAuthCallback: "Chyba při zpracování odpovědi od poskytovatele.",
  OAuthCreateAccount: "Nepodařilo se vytvořit účet.",
  EmailCreateAccount: "Nepodařilo se vytvořit účet s tímto emailem.",
  Callback: "Chyba při zpracování přihlášení.",
  OAuthAccountNotLinked: "Tento email je již registrován s jiným poskytovatelem.",
  EmailSignin: "Nepodařilo se odeslat přihlašovací email.",
  CredentialsSignin: "Neplatné přihlašovací údaje.",
  SessionRequired: "Pro přístup k této stránce se musíte přihlásit.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorMessage = error ? errors[error] || errors.Default : errors.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Chyba přihlášení</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="fixo" className="w-full" asChild>
            <Link href="/auth/login">Zkusit znovu</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Zpět na úvod</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
