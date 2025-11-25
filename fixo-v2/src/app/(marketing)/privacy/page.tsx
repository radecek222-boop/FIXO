import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Ochrana osobních údajů",
  description: "Zásady ochrany osobních údajů služby FIXO",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-8">Ochrana osobních údajů</h1>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Správce údajů</h2>
            <p className="text-muted-foreground">
              Správcem osobních údajů je provozovatel služby FIXO. Pro dotazy ohledně
              zpracování osobních údajů nás kontaktujte na{" "}
              <a href="mailto:privacy@fixo.app" className="text-fixo-primary hover:underline">
                privacy@fixo.app
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Jaké údaje sbíráme</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Email a jméno při registraci</li>
              <li>Fotografie závad (pro AI analýzu)</li>
              <li>Historie oprav a analýz</li>
              <li>Technické údaje (IP adresa, typ prohlížeče)</li>
              <li>Platební údaje (zpracovává Stripe)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Účel zpracování</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Poskytování služby a AI analýzy</li>
              <li>Správa uživatelského účtu</li>
              <li>Zpracování plateb</li>
              <li>Komunikace s uživateli</li>
              <li>Zlepšování služby a personalizace</li>
              <li>Plnění právních povinností</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Sdílení údajů</h2>
            <p className="text-muted-foreground">
              Vaše údaje sdílíme pouze s:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>OpenAI (pro AI analýzu fotografií)</li>
              <li>Stripe (pro zpracování plateb)</li>
              <li>Poskytovateli hostingu (Vercel)</li>
              <li>Google Analytics (anonymizovaná analytika)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Doba uchovávání</h2>
            <p className="text-muted-foreground">
              Osobní údaje uchováváme po dobu trvání účtu a poté ještě 3 roky pro
              případné právní nároky. Fotografie jsou zpracovány jednorázově a nejsou
              trvale uchovávány.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Vaše práva</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Právo na přístup k údajům</li>
              <li>Právo na opravu</li>
              <li>Právo na výmaz ("právo být zapomenut")</li>
              <li>Právo na přenositelnost údajů</li>
              <li>Právo podat stížnost u ÚOOÚ</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Cookies</h2>
            <p className="text-muted-foreground">
              Používáme nezbytné cookies pro fungování služby a analytické cookies
              pro měření návštěvnosti. Více informací najdete v nastavení cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Kontakt</h2>
            <p className="text-muted-foreground">
              Pro uplatnění vašich práv nebo dotazy nás kontaktujte na{" "}
              <a href="mailto:privacy@fixo.app" className="text-fixo-primary hover:underline">
                privacy@fixo.app
              </a>
              .
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
