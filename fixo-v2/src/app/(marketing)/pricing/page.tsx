import Link from "next/link";
import { Check, X, Zap, Crown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/footer";

const plans = [
  {
    name: "FREE",
    price: "0",
    period: "",
    description: "Pro občasné kutily",
    icon: Zap,
    popular: false,
    features: [
      { text: "3 AI analýzy měsíčně", included: true },
      { text: "Základní databáze (50 oprav)", included: true },
      { text: "Textové návody", included: true },
      { text: "Bezpečnostní varování", included: true },
      { text: "Video tutoriály", included: false },
      { text: "Offline přístup", included: false },
      { text: "Prioritní podpora", included: false },
      { text: "API přístup", included: false },
    ],
    cta: "Začít zdarma",
    ctaVariant: "outline" as const,
  },
  {
    name: "PLUS",
    price: "49",
    period: "/měsíc",
    description: "Pro aktivní kutily",
    icon: Crown,
    popular: true,
    features: [
      { text: "Neomezené AI analýzy", included: true },
      { text: "Kompletní databáze (500+ oprav)", included: true },
      { text: "Textové návody", included: true },
      { text: "Bezpečnostní varování", included: true },
      { text: "Video tutoriály", included: true },
      { text: "Offline přístup", included: true },
      { text: "Prioritní podpora", included: true },
      { text: "API přístup", included: false },
    ],
    cta: "Vyzkoušet PLUS",
    ctaVariant: "fixo" as const,
  },
  {
    name: "PRO",
    price: "99",
    period: "/měsíc",
    description: "Pro profesionály",
    icon: Building2,
    popular: false,
    features: [
      { text: "Vše z PLUS", included: true },
      { text: "Pro řemeslníky a správce", included: true },
      { text: "Více zařízení", included: true },
      { text: "Reporty a statistiky", included: true },
      { text: "API přístup", included: true },
      { text: "Whitelabel možnost", included: true },
      { text: "Dedikovaná podpora", included: true },
      { text: "SLA garance", included: true },
    ],
    cta: "Kontaktovat obchod",
    ctaVariant: "outline" as const,
  },
];

const discounts = [
  { name: "Studenti", discount: "50%", description: "S platným ISIC" },
  { name: "Senioři 65+", discount: "50%", description: "S ověřením věku" },
  { name: "Roční platba", discount: "2 měsíce", description: "Zdarma" },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fixo-primary text-white font-bold text-xl">
              F
            </div>
            <span className="font-bold text-xl">FIXO</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Zpět na úvod</Link>
            </Button>
            <Button variant="fixo" asChild>
              <Link href="/dashboard">Spustit aplikaci</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="fixo" className="mb-4">Ceník</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Vyberte si plán, který vám vyhovuje
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Začněte zdarma a upgradujte kdykoliv. Bez skrytých poplatků.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-16">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <Card
                    key={plan.name}
                    className={`relative ${plan.popular ? "border-fixo-primary shadow-lg scale-105" : ""}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge variant="fixo">Nejoblíbenější</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-2">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-fixo-primary-light">
                        <Icon className="h-6 w-6 text-fixo-primary" />
                      </div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.price} Kč</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature.text} className="flex items-center gap-2 text-sm">
                            {feature.included ? (
                              <Check className="h-4 w-4 text-success" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={!feature.included ? "text-muted-foreground" : ""}>
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant={plan.ctaVariant}
                        className="w-full"
                        asChild
                      >
                        <Link href={plan.name === "PRO" ? "/contact" : "/dashboard"}>
                          {plan.cta}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Discounts */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-2xl font-bold">Sociální slevy</h2>
              <p className="mt-2 text-muted-foreground">
                FIXO je dostupné pro všechny
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
              {discounts.map((discount) => (
                <Card key={discount.name}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-fixo-primary mb-2">
                      {discount.discount}
                    </div>
                    <div className="font-semibold">{discount.name}</div>
                    <div className="text-sm text-muted-foreground">{discount.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-center mb-12">Často kladené otázky</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Mohu kdykoliv zrušit předplatné?",
                    a: "Ano, předplatné můžete zrušit kdykoliv. Přístup k placeným funkcím zůstane do konce fakturačního období.",
                  },
                  {
                    q: "Jak funguje 3 AI analýzy měsíčně?",
                    a: "V bezplatném plánu můžete každý měsíc nahrát a analyzovat až 3 fotografie závad. Počet se resetuje každý měsíc.",
                  },
                  {
                    q: "Je možné platit ročně?",
                    a: "Ano, při roční platbě získáte 2 měsíce zdarma. To odpovídá slevě přibližně 17%.",
                  },
                  {
                    q: "Podporujete platbu kartou?",
                    a: "Ano, přijímáme všechny hlavní platební karty (Visa, Mastercard, Maestro) přes zabezpečenou platební bránu.",
                  },
                ].map((faq) => (
                  <div key={faq.q} className="border-b pb-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-fixo-primary py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Připraveni začít opravovat?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Vyzkoušejte FIXO zdarma a objevte, kolik můžete ušetřit.
            </p>
            <Button size="xl" className="bg-white text-fixo-primary hover:bg-blue-50" asChild>
              <Link href="/dashboard">Začít zdarma</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
