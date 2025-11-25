import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  Brain,
  Shield,
  Users,
  Target,
  Lightbulb,
  Heart,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "O aplikaci FIXO",
  description: "Poznejte příběh za FIXO - AI asistent pro domácí opravy",
};

const values = [
  {
    icon: Lightbulb,
    title: "Inovace",
    description: "Využíváme nejnovější AI technologie pro analýzu závad",
  },
  {
    icon: Users,
    title: "Dostupnost",
    description: "FIXO je pro všechny - od začátečníků po zkušené kutily",
  },
  {
    icon: Shield,
    title: "Bezpečnost",
    description: "Bezpečnostní varování jsou naší prioritou",
  },
  {
    icon: Heart,
    title: "Komunita",
    description: "Budujeme komunitu lidí, kteří chtějí být soběstační",
  },
];

const stats = [
  { value: "103+", label: "Typů oprav" },
  { value: "50+", label: "Jazyků" },
  { value: "24/7", label: "Dostupnost" },
  { value: "0 Kč", label: "Start zdarma" },
];

const team = [
  {
    name: "Vývojový tým",
    role: "Technologie & AI",
    description: "Tým vývojářů pracuje na neustálém zlepšování AI analýzy",
  },
  {
    name: "Odborníci na opravy",
    role: "Obsah & Návody",
    description: "Zkušení řemeslníci tvoří a ověřují všechny návody",
  },
  {
    name: "Zákaznická podpora",
    role: "Pomoc & Feedback",
    description: "Jsme tu pro vás, když potřebujete pomoct",
  },
];

export default function AboutPage() {
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
        <section className="py-16 md:py-24 bg-gradient-to-b from-fixo-primary-light/30 to-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="fixo" className="mb-4">O nás</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Shazam pro domácí opravy
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                FIXO vzniklo s jednoduchou myšlenkou: co kdyby každý mohl opravit
                běžné domácí závady sám, bezpečně a s jistotou? Díky umělé inteligenci
                to teď jde.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="fixo" size="lg" asChild>
                  <Link href="/dashboard">Vyzkoušet FIXO</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">Zobrazit ceník</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-fixo-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Naše mise</Badge>
                <h2 className="text-3xl font-bold mb-6">
                  Pomáháme lidem být soběstační
                </h2>
                <p className="text-muted-foreground mb-4">
                  Věříme, že každý by měl mít možnost opravit kapající kohoutek,
                  zavrzající dveře nebo studený radiátor bez nutnosti volat
                  drahého řemeslníka.
                </p>
                <p className="text-muted-foreground mb-4">
                  FIXO kombinuje sílu umělé inteligence s odbornými znalostmi
                  profesionálních řemeslníků. Výsledkem jsou přesné diagnózy
                  a srozumitelné návody, které vás provedou opravou krok za krokem.
                </p>
                <p className="text-muted-foreground">
                  Naším cílem je ušetřit českým domácnostem miliardy korun ročně
                  a zároveň posílit jejich sebedůvěru při řešení běžných problémů.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-fixo-primary to-fixo-primary-hover flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <Wrench className="h-24 w-24 mx-auto mb-6" />
                    <div className="text-2xl font-bold mb-2">
                      AI-Powered
                    </div>
                    <div className="text-blue-100">
                      Diagnostika závad
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Badge variant="outline" className="mb-4">Jak to funguje</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Tři jednoduché kroky
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              {[
                {
                  step: "1",
                  icon: Zap,
                  title: "Vyfoťte závadu",
                  description: "Stačí jedna fotka mobilem",
                },
                {
                  step: "2",
                  icon: Brain,
                  title: "AI analyzuje",
                  description: "Umělá inteligence identifikuje problém",
                },
                {
                  step: "3",
                  icon: Target,
                  title: "Postupujte podle návodu",
                  description: "Krok za krokem až k úspěšné opravě",
                },
              ].map((item) => (
                <Card key={item.step}>
                  <CardContent className="pt-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fixo-primary text-white font-bold text-lg">
                      {item.step}
                    </div>
                    <item.icon className="h-8 w-8 text-fixo-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Badge variant="outline" className="mb-4">Naše hodnoty</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Na čem stavíme
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-4 max-w-5xl mx-auto">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardContent className="pt-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-fixo-primary-light">
                      <value.icon className="h-6 w-6 text-fixo-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Badge variant="outline" className="mb-4">Náš tým</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Lidé za FIXO
              </h2>
              <p className="text-muted-foreground">
                Jsme tým nadšenců, kteří věří v sílu technologií a komunity.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              {team.map((member) => (
                <Card key={member.name}>
                  <CardContent className="pt-6">
                    <div className="h-16 w-16 rounded-full bg-fixo-primary-light flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-fixo-primary" />
                    </div>
                    <h3 className="font-semibold text-center mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-fixo-primary text-center mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-fixo-primary py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Připraveni začít?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Vyzkoušejte FIXO zdarma a objevte, jak snadné mohou být domácí opravy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="xl" className="bg-white text-fixo-primary hover:bg-blue-50" asChild>
                <Link href="/dashboard">Začít zdarma</Link>
              </Button>
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">Kontaktovat nás</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
