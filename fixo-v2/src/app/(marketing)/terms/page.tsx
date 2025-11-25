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

      <main className="flex-1 container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Podmínky použití služby FIXO</h1>
        <p className="text-muted-foreground mb-8">Verze 1.0 | Platné od: 25. listopadu 2025</p>

        <div className="prose prose-gray max-w-none space-y-6">
          {/* 1. ÚVODNÍ USTANOVENÍ */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Úvodní ustanovení</h2>
            <p className="text-muted-foreground">
              1.1 Tyto Podmínky použití (dále jen &quot;Podmínky&quot;) upravují práva a povinnosti
              mezi provozovatelem služby FIXO (dále jen &quot;Provozovatel&quot;) a uživatelem
              služby (dále jen &quot;Uživatel&quot;).
            </p>
            <p className="text-muted-foreground mt-2">
              1.2 <strong>Provozovatelem služby je White Glove servis, IČO: 09769684</strong>,
              zapsaný v živnostenském rejstříku (dále jen &quot;Provozovatel&quot;).
            </p>
            <p className="text-muted-foreground mt-2">
              1.3 Používáním služby FIXO Uživatel potvrzuje, že se s těmito Podmínkami
              seznámil a souhlasí s nimi v plném rozsahu.
            </p>
          </section>

          {/* 2. DEFINICE POJMŮ */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Definice pojmů</h2>
            <p className="text-muted-foreground">
              2.1 &quot;Služba&quot; znamená webovou aplikaci FIXO dostupnou na adrese fixo.app
              a související mobilní aplikace.
            </p>
            <p className="text-muted-foreground mt-2">
              2.2 &quot;AI analýza&quot; znamená automatizované zpracování fotografií a popisů
              závad pomocí umělé inteligence za účelem diagnostiky a návrhu řešení.
            </p>
            <p className="text-muted-foreground mt-2">
              2.3 &quot;Obsah&quot; znamená veškeré texty, obrázky, videa, návody a další
              materiály poskytované v rámci Služby.
            </p>
          </section>

          {/* 3. POPIS A ÚČEL SLUŽBY */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Popis a účel služby</h2>
            <p className="text-muted-foreground">
              3.1 FIXO je <strong>informativní nástroj</strong> pro diagnostiku domácích závad
              využívající umělou inteligenci.
            </p>
            <div className="text-muted-foreground mt-2">
              <p>3.2 Služba poskytuje:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>AI analýzu fotografií závad</li>
                <li>Návody na opravu krok za krokem</li>
                <li>Bezpečnostní upozornění</li>
                <li>Doporučení potřebných nástrojů</li>
                <li>Databázi běžných závad a jejich řešení</li>
              </ul>
            </div>
            <div className="bg-warning-light border border-warning rounded-lg p-4 mt-4">
              <p className="text-warning font-semibold">3.3 Služba NENÍ:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Náhradou odborného poradenství kvalifikovaných řemeslníků</li>
                <li>Certifikovaným vzdělávacím programem</li>
                <li>Garancí úspěšného provedení opravy</li>
                <li>Zdrojem právně závazných informací</li>
              </ul>
            </div>
          </section>

          {/* 4. VYLOUČENÍ ODPOVĚDNOSTI - KLÍČOVÁ SEKCE */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-danger">
              4. Vyloučení odpovědnosti ⚠️
            </h2>
            <div className="bg-danger-light border border-danger rounded-lg p-4">
              <p className="font-semibold text-danger mb-3">
                PROVOZOVATEL VÝSLOVNĚ VYLUČUJE JAKOUKOLI ODPOVĚDNOST ZA:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Škody na majetku</strong> vzniklé v důsledku provedení oprav
                  podle návodů poskytnutých Službou
                </li>
                <li>
                  <strong>Újmy na zdraví nebo životě</strong> vzniklé v souvislosti
                  s prováděním oprav
                </li>
                <li>
                  <strong>Nepřesnosti, chyby nebo neúplnosti</strong> v poskytovaných
                  informacích
                </li>
                <li>
                  <strong>Následné škody</strong>, ušlý zisk nebo ztrátu dat
                </li>
                <li>
                  Škody způsobené <strong>výpadkem nebo nedostupností</strong> Služby
                </li>
                <li>
                  Škody způsobené <strong>neoprávněným přístupem</strong> třetích osob
                  k účtu Uživatele
                </li>
              </ul>
            </div>
            <p className="text-muted-foreground mt-4">
              4.2 Uživatel bere na vědomí, že AI analýza je založena na pravděpodobnostním
              modelu a její výsledky mohou být nepřesné nebo chybné. Přesnost analýzy závisí
              na kvalitě vstupních dat (fotografií) a komplexnosti závady.
            </p>
            <p className="text-muted-foreground mt-2 font-semibold">
              4.3 Uživatel přijímá plnou a výhradní odpovědnost za rozhodnutí provést
              jakoukoliv opravu a za způsob jejího provedení.
            </p>
          </section>

          {/* 5. NEBEZPEČNÉ PRÁCE */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Nebezpečné práce - zvláštní upozornění</h2>
            <div className="bg-danger-light border-2 border-danger rounded-lg p-4">
              <p className="font-bold text-danger mb-3">⚡ VAROVÁNÍ - NEBEZPEČNÉ PRÁCE</p>
              <p className="text-gray-700 mb-3">
                5.1 Některé opravy popisované ve Službě zahrnují práci s:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Elektrickým proudem (230V a více)</li>
                <li>Plynovými zařízeními</li>
                <li>Vodou pod tlakem</li>
                <li>Chemickými látkami</li>
                <li>Výškovými pracemi</li>
              </ul>
              <p className="text-gray-700 mt-3 font-semibold">
                5.2 Pro tyto práce DŮRAZNĚ DOPORUČUJEME přivolat kvalifikovaného odborníka.
              </p>
              <p className="text-gray-700 mt-2">
                5.3 V České republice jsou některé práce ze zákona vyhrazeny pouze osobám
                s příslušnou kvalifikací (vyhl. č. 50/1978 Sb. pro elektro, zákon č. 174/1968 Sb.
                pro plynová zařízení).
              </p>
              <p className="text-danger mt-2 font-bold">
                5.4 Provozovatel nenese žádnou odpovědnost za škody způsobené prováděním
                vyhrazených prací nekvalifikovanými osobami.
              </p>
            </div>
          </section>

          {/* 6. POVINNOSTI UŽIVATELE */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Povinnosti uživatele</h2>
            <p className="text-muted-foreground">6.1 Uživatel je povinen:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Poskytnout pravdivé registrační údaje</li>
              <li>Chránit své přihlašovací údaje</li>
              <li>Používat Službu v souladu s těmito Podmínkami</li>
              <li>Před provedením opravy zvážit své schopnosti a zkušenosti</li>
              <li>Dodržovat bezpečnostní pokyny</li>
              <li>V případě pochybností kontaktovat kvalifikovaného odborníka</li>
            </ul>
            <p className="text-muted-foreground mt-4">6.2 Uživatel nesmí:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Používat Službu k nezákonným účelům</li>
              <li>Pokoušet se o neoprávněný přístup k systému</li>
              <li>Sdílet svůj účet s třetími osobami</li>
              <li>Kopírovat nebo šířit Obsah bez souhlasu Provozovatele</li>
              <li>Zneužívat AI analýzu pro komerční účely bez licence</li>
            </ul>
          </section>

          {/* 7. UŽIVATELSKÉ ÚČTY A PŘEDPLATNÉ */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Uživatelské účty a předplatné</h2>
            <p className="text-muted-foreground">
              7.1 Registrace je nutná pro plné využití Služby.
            </p>
            <p className="text-muted-foreground mt-2">
              7.2 Dostupné plány:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li><strong>FREE:</strong> Základní funkce, omezený počet analýz (3/měsíc)</li>
              <li><strong>PLUS:</strong> Rozšířené funkce, neomezené analýzy</li>
              <li><strong>PRO:</strong> Prémiové funkce, prioritní podpora</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              7.3 Platby jsou zpracovávány přes zabezpečenou platební bránu.
              Provozovatel nemá přístup k platebním údajům Uživatele.
            </p>
            <p className="text-muted-foreground mt-2">
              7.4 Předplatné se automaticky obnovuje. Uživatel může předplatné zrušit
              kdykoli před koncem fakturačního období.
            </p>
          </section>

          {/* 8. ZPRACOVÁNÍ FOTOGRAFIÍ A AI */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Zpracování fotografií a AI</h2>
            <p className="text-muted-foreground">
              8.1 Fotografie nahrané do Služby jsou zpracovány prostřednictvím API třetí
              strany (OpenAI) za účelem AI analýzy.
            </p>
            <p className="text-muted-foreground mt-2">
              8.2 Nahráním fotografie Uživatel:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Souhlasí s odesláním fotografie na servery OpenAI</li>
              <li>Potvrzuje, že má právo fotografii sdílet</li>
              <li>Bere na vědomí, že AI analýza není 100% spolehlivá</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              8.3 Fotografie jsou zpracovány jednorázově a nejsou trvale uchovávány
              na serverech třetích stran.
            </p>
          </section>

          {/* 9. OCHRANA OSOBNÍCH ÚDAJŮ */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Ochrana osobních údajů</h2>
            <p className="text-muted-foreground">
              9.1 Zpracování osobních údajů se řídí{" "}
              <Link href="/privacy" className="text-fixo-primary hover:underline">
                Zásadami ochrany osobních údajů
              </Link>
              , které jsou nedílnou součástí těchto Podmínek.
            </p>
          </section>

          {/* 10. DUŠEVNÍ VLASTNICTVÍ */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Duševní vlastnictví</h2>
            <p className="text-muted-foreground">
              10.1 Veškerý Obsah Služby je chráněn autorským právem a dalšími právy
              duševního vlastnictví náležejícími Provozovateli.
            </p>
            <p className="text-muted-foreground mt-2">
              10.2 Uživatel získává nevýhradní, nepřenosnou licenci k osobnímu použití
              Obsahu po dobu trvání předplatného.
            </p>
          </section>

          {/* 11. ZMĚNY PODMÍNEK */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">11. Změny podmínek</h2>
            <p className="text-muted-foreground">
              11.1 Provozovatel si vyhrazuje právo tyto Podmínky kdykoli změnit.
            </p>
            <p className="text-muted-foreground mt-2">
              11.2 O změnách bude Uživatel informován prostřednictvím emailu nebo
              oznámení v aplikaci nejméně 14 dní předem.
            </p>
            <p className="text-muted-foreground mt-2">
              11.3 Pokračováním v používání Služby po účinnosti změn Uživatel s novými
              Podmínkami souhlasí.
            </p>
          </section>

          {/* 12. ROZHODNÉ PRÁVO */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">12. Rozhodné právo a řešení sporů</h2>
            <p className="text-muted-foreground">
              12.1 Tyto Podmínky se řídí právním řádem České republiky.
            </p>
            <p className="text-muted-foreground mt-2">
              12.2 Případné spory budou řešeny příslušnými soudy České republiky.
            </p>
            <p className="text-muted-foreground mt-2">
              12.3 Spotřebitelé mají právo na mimosoudní řešení spotřebitelských sporů
              u České obchodní inspekce (
              <a href="https://www.coi.cz" target="_blank" rel="noopener noreferrer"
                 className="text-fixo-primary hover:underline">
                www.coi.cz
              </a>).
            </p>
          </section>

          {/* 13. KONTAKTNÍ ÚDAJE */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">13. Kontaktní údaje</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">White Glove servis</p>
              <p className="text-muted-foreground">IČO: 09769684</p>
              <p className="text-muted-foreground mt-2">
                Email:{" "}
                <a href="mailto:legal@fixo.app" className="text-fixo-primary hover:underline">
                  legal@fixo.app
                </a>
              </p>
              <p className="text-muted-foreground">
                Podpora:{" "}
                <a href="mailto:support@fixo.app" className="text-fixo-primary hover:underline">
                  support@fixo.app
                </a>
              </p>
            </div>
          </section>

          {/* 14. ZÁVĚREČNÁ USTANOVENÍ */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">14. Závěrečná ustanovení</h2>
            <p className="text-muted-foreground">
              14.1 Je-li některé ustanovení těchto Podmínek neplatné nebo nevymahatelné,
              ostatní ustanovení zůstávají v platnosti.
            </p>
            <p className="text-muted-foreground mt-2">
              14.2 Tyto Podmínky nabývají účinnosti dnem 25. listopadu 2025.
            </p>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-muted-foreground">
              Poslední aktualizace: 25. listopadu 2025
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 White Glove servis. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
