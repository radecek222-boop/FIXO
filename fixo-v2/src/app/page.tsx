import Link from "next/link";
import { ArrowRight, Camera, Clock, Shield, Wrench, Zap, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";

const features = [
  {
    icon: Camera,
    title: "AI Analýza fotografií",
    description: "Vyfotografujte závadu a AI ji okamžitě identifikuje s 95% přesností.",
  },
  {
    icon: Wrench,
    title: "500+ návodů",
    description: "Rozsáhlá databáze oprav s detailními postupy krok za krokem.",
  },
  {
    icon: Shield,
    title: "Bezpečnostní varování",
    description: "Každý návod obsahuje důležitá bezpečnostní upozornění.",
  },
  {
    icon: Clock,
    title: "Úspora času i peněz",
    description: "Průměrně ušetříte 1000 Kč na každé opravě ve srovnání s řemeslníkem.",
  },
];

const stats = [
  { value: "500+", label: "Návodů na opravy" },
  { value: "30s", label: "Průměrný čas analýzy" },
  { value: "95%", label: "Přesnost AI" },
  { value: "10k+", label: "Spokojených uživatelů" },
];

const testimonials = [
  {
    quote: "FIXO mi ušetřilo 2000 Kč za instalatéra. Opravil jsem kapající kohoutek sám za 15 minut!",
    author: "Jan K.",
    role: "Praha",
    rating: 5,
  },
  {
    quote: "Konečně aplikace, která mi pomůže s drobnými opravami. Návody jsou srozumitelné i pro začátečníky.",
    author: "Marie S.",
    role: "Brno",
    rating: 5,
  },
  {
    quote: "Jako správce bytového domu používám FIXO denně. Skvělá databáze oprav.",
    author: "Petr V.",
    role: "Ostrava",
    rating: 5,
  },
];

export default function HomePage() {
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
          <div className="hidden md:flex items-center gap-6">
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Ceník
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              O nás
            </Link>
            <Button variant="fixo" asChild>
              <Link href="/dashboard">
                Spustit aplikaci
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Button variant="fixo" size="sm" className="md:hidden" asChild>
            <Link href="/dashboard">Spustit</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-fixo-primary to-blue-800 text-white">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="container relative py-20 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Opravte cokoliv.
                <br />
                <span className="text-fixo-secondary-light">Kdekoliv. Okamžitě.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-blue-100">
                Vyfotografujte závadu a AI vám okamžitě poradí, jak ji opravit.
                Ušetřete tisíce korun na řemeslnících.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="xl" className="bg-white text-fixo-primary hover:bg-blue-50" asChild>
                  <Link href="/dashboard">
                    <Camera className="mr-2 h-5 w-5" />
                    Vyfotit závadu
                  </Link>
                </Button>
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/dashboard/repairs">
                    Prohlédnout databázi
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b bg-muted/50 py-8">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-fixo-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Proč si vybrat FIXO?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Vše, co potřebujete pro úspěšné domácí opravy, na jednom místě.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} hover className="text-center">
                    <CardContent className="pt-6">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-fixo-primary-light">
                        <Icon className="h-6 w-6 text-fixo-primary" />
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted/50 py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Jak to funguje?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Tři jednoduché kroky k úspěšné opravě.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { step: 1, title: "Vyfoťte závadu", description: "Nahrajte fotografii poškozeného předmětu nebo místa." },
                { step: 2, title: "AI analyzuje", description: "Umělá inteligence identifikuje problém během sekund." },
                { step: 3, title: "Opravte sami", description: "Postupujte podle detailního návodu krok za krokem." },
              ].map((item) => (
                <div key={item.step} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-fixo-primary text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Co říkají uživatelé
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.author}>
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    <div className="mt-4">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-fixo-primary py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Připraveni začít opravovat?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Přidejte se k tisícům spokojených uživatelů, kteří již ušetřili na řemeslnících.
            </p>
            <Button size="xl" className="bg-white text-fixo-primary hover:bg-blue-50" asChild>
              <Link href="/dashboard">
                Spustit FIXO zdarma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
