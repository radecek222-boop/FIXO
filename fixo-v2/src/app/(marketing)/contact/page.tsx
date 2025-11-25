"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/layout/footer";
import { Mail, MessageSquare, Building2, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("sent");

    // Reset after a delay
    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <nav className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fixo-primary text-white font-bold text-xl">
              F
            </div>
            <span className="font-bold text-xl">FIXO</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">Zpět na úvod</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Kontaktujte nás</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Máte otázky, nápady nebo potřebujete pomoct? Rádi vám odpovíme.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fixo-primary-light">
                  <Mail className="h-6 w-6 text-fixo-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Pro obecné dotazy
                </p>
                <a
                  href="mailto:info@fixo.app"
                  className="text-fixo-primary hover:underline text-sm"
                >
                  info@fixo.app
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fixo-primary-light">
                  <MessageSquare className="h-6 w-6 text-fixo-primary" />
                </div>
                <h3 className="font-semibold mb-2">Podpora</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Technická pomoc
                </p>
                <a
                  href="mailto:support@fixo.app"
                  className="text-fixo-primary hover:underline text-sm"
                >
                  support@fixo.app
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fixo-primary-light">
                  <Building2 className="h-6 w-6 text-fixo-primary" />
                </div>
                <h3 className="font-semibold mb-2">Obchodní spolupráce</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  B2B a partnerství
                </p>
                <a
                  href="mailto:business@fixo.app"
                  className="text-fixo-primary hover:underline text-sm"
                >
                  business@fixo.app
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Napište nám</CardTitle>
              <CardDescription>
                Vyplňte formulář a ozveme se vám co nejdříve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium">
                      Jméno
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Vaše jméno"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="vas@email.cz"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium">
                    Předmět
                  </label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="O čem je vaše zpráva?"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Zpráva
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Popište váš dotaz nebo připomínku..."
                    required
                    rows={5}
                    className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <Button
                  type="submit"
                  variant="fixo"
                  className="w-full"
                  disabled={formState !== "idle"}
                >
                  {formState === "idle" && (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Odeslat zprávu
                    </>
                  )}
                  {formState === "sending" && "Odesílám..."}
                  {formState === "sent" && (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Odesláno!
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
