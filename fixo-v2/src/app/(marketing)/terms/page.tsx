import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Podmínky použití",
  description: "Podmínky použití služby FIXO",
};

export default function TermsPage() {
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

      <main className="flex-1 container py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Podmínky použití</h1>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Úvodní ustanovení</h2>
            <p className="text-muted-foreground">
              Tyto podmínky použití upravují pravidla pro používání webové aplikace FIXO
              (dále jen "Služba"). Používáním Služby souhlasíte s těmito podmínkami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Popis služby</h2>
            <p className="text-muted-foreground">
              FIXO je webová aplikace pro diagnostiku domácích závad pomocí umělé inteligence.
              Služba poskytuje návody na opravu, bezpečnostní varování a doporučení.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Uživatelský účet</h2>
            <p className="text-muted-foreground">
              Pro plné využití Služby je nutná registrace. Uživatel je povinen poskytnout
              pravdivé údaje a chránit své přihlašovací údaje.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Omezení odpovědnosti</h2>
            <p className="text-muted-foreground">
              Služba poskytuje pouze informativní návody. Za provedení oprav a jejich
              následky odpovídá výhradně uživatel. V případě pochybností doporučujeme
              kontaktovat profesionálního řemeslníka.
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Důležité:</strong> Práce s elektřinou, plynem a vodou mohou být
              nebezpečné. Vždy dodržujte bezpečnostní pokyny a v případě nejistoty
              přivolejte odborníka.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Platební podmínky</h2>
            <p className="text-muted-foreground">
              Prémiové funkce jsou dostupné v rámci placených plánů. Platby jsou
              zpracovávány přes zabezpečenou platební bránu Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Ochrana osobních údajů</h2>
            <p className="text-muted-foreground">
              Zpracování osobních údajů se řídí naší{" "}
              <Link href="/privacy" className="text-fixo-primary hover:underline">
                Zásadami ochrany osobních údajů
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Závěrečná ustanovení</h2>
            <p className="text-muted-foreground">
              Tyto podmínky se řídí právním řádem České republiky. Provozovatel si
              vyhrazuje právo tyto podmínky kdykoliv změnit.
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Poslední aktualizace: Listopad 2025
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
