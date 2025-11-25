import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Ochrana osobních údajů",
  description: "Zásady ochrany osobních údajů služby FIXO - GDPR compliance",
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

      <main className="flex-1 container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Zásady ochrany osobních údajů</h1>
        <p className="text-muted-foreground mb-8">
          Verze 1.0 | Platné od: 25. listopadu 2025 | GDPR Compliance
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          {/* 1. SPRÁVCE ÚDAJŮ */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Správce osobních údajů</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">White Glove servis</p>
              <p className="text-muted-foreground">IČO: 09769684</p>
              <p className="text-muted-foreground mt-2">
                Kontakt pro ochranu osobních údajů:{" "}
                <a href="mailto:privacy@fixo.app" className="text-fixo-primary hover:underline">
                  privacy@fixo.app
                </a>
              </p>
            </div>
            <p className="text-muted-foreground mt-4">
              Správce zpracovává osobní údaje v souladu s Nařízením Evropského parlamentu
              a Rady (EU) 2016/679 (GDPR) a zákonem č. 110/2019 Sb., o zpracování osobních údajů.
            </p>
          </section>

          {/* 2. JAKÉ ÚDAJE SBÍRÁME */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Jaké osobní údaje zpracováváme</h2>

            <h3 className="text-lg font-medium mt-4 mb-2">2.1 Údaje poskytnuté uživatelem</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Registrační údaje:</strong> Email, jméno (volitelně), profilová fotka
                (při přihlášení přes Google/GitHub)
              </li>
              <li>
                <strong>Fotografie závad:</strong> Obrázky nahrané pro AI analýzu
              </li>
              <li>
                <strong>Popisy závad:</strong> Textové popisy problémů zadané uživatelem
              </li>
              <li>
                <strong>Historie oprav:</strong> Záznamy o provedených analýzách a opravách
              </li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">2.2 Automaticky sbírané údaje</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Technické údaje:</strong> IP adresa, typ prohlížeče, operační systém,
                rozlišení obrazovky
              </li>
              <li>
                <strong>Údaje o používání:</strong> Navštívené stránky, čas strávený v aplikaci,
                kliknutí
              </li>
              <li>
                <strong>Cookies:</strong> Nezbytné a analytické cookies (viz sekce 7)
              </li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">2.3 Údaje od třetích stran</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>OAuth poskytovatelé:</strong> Při přihlášení přes Google nebo GitHub
                získáváme veřejný profil (jméno, email, profilová fotka)
              </li>
              <li>
                <strong>Platební údaje:</strong> Zpracovávány výhradně platební bránou,
                nemáme přístup k číslu karty
              </li>
            </ul>
          </section>

          {/* 3. ÚČELY ZPRACOVÁNÍ */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Účely zpracování</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-border">
                <thead>
                  <tr className="border-b bg-muted">
                    <th className="text-left p-3 border-r">Účel</th>
                    <th className="text-left p-3 border-r">Právní základ</th>
                    <th className="text-left p-3">Doba uchování</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-3 border-r">Poskytování služby a AI analýzy</td>
                    <td className="p-3 border-r">Plnění smlouvy</td>
                    <td className="p-3">Po dobu účtu</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 border-r">Správa uživatelského účtu</td>
                    <td className="p-3 border-r">Plnění smlouvy</td>
                    <td className="p-3">Po dobu účtu</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 border-r">Zpracování plateb</td>
                    <td className="p-3 border-r">Plnění smlouvy</td>
                    <td className="p-3">10 let (daňové)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 border-r">Komunikace s uživateli</td>
                    <td className="p-3 border-r">Oprávněný zájem</td>
                    <td className="p-3">3 roky</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 border-r">Zlepšování služby</td>
                    <td className="p-3 border-r">Oprávněný zájem</td>
                    <td className="p-3">2 roky (anonym.)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 border-r">Marketing (pouze se souhlasem)</td>
                    <td className="p-3 border-r">Souhlas</td>
                    <td className="p-3">Do odvolání</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-r">Plnění právních povinností</td>
                    <td className="p-3 border-r">Právní povinnost</td>
                    <td className="p-3">Dle zákona</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. SDÍLENÍ ÚDAJŮ */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Sdílení údajů s třetími stranami</h2>
            <p className="text-muted-foreground mb-4">
              Vaše osobní údaje sdílíme pouze s důvěryhodnými partnery, kteří je potřebují
              pro poskytování služby:
            </p>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">OpenAI (USA)</h4>
                <p className="text-sm text-muted-foreground">
                  Účel: AI analýza fotografií závad
                </p>
                <p className="text-sm text-muted-foreground">
                  Přenášené údaje: Fotografie, popis závady
                </p>
                <p className="text-sm text-muted-foreground">
                  Ochrana: Standard Contractual Clauses (SCC)
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">Vercel (USA)</h4>
                <p className="text-sm text-muted-foreground">
                  Účel: Hosting aplikace
                </p>
                <p className="text-sm text-muted-foreground">
                  Přenášené údaje: Technické údaje, logy
                </p>
                <p className="text-sm text-muted-foreground">
                  Ochrana: GDPR DPA, SOC 2 Type II
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">Platební brána</h4>
                <p className="text-sm text-muted-foreground">
                  Účel: Zpracování plateb
                </p>
                <p className="text-sm text-muted-foreground">
                  Přenášené údaje: Fakturační údaje
                </p>
                <p className="text-sm text-muted-foreground">
                  Ochrana: PCI DSS Level 1
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">Google Analytics (volitelné)</h4>
                <p className="text-sm text-muted-foreground">
                  Účel: Anonymizovaná analytika návštěvnosti
                </p>
                <p className="text-sm text-muted-foreground">
                  Přenášené údaje: Anonymizovaná IP, chování na webu
                </p>
                <p className="text-sm text-muted-foreground">
                  Ochrana: Lze odmítnout v nastavení cookies
                </p>
              </div>
            </div>
          </section>

          {/* 5. DOBA UCHOVÁVÁNÍ */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Doba uchovávání údajů</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Uživatelský účet:</strong> Po celou dobu aktivního účtu a 30 dní
                po jeho zrušení
              </li>
              <li>
                <strong>Historie oprav:</strong> Po dobu účtu, poté anonymizována
              </li>
              <li>
                <strong>Fotografie:</strong> Zpracovány jednorázově, nejsou trvale uchovávány
              </li>
              <li>
                <strong>Fakturační údaje:</strong> 10 let dle daňových předpisů
              </li>
              <li>
                <strong>Logy a analytika:</strong> 2 roky, poté anonymizovány
              </li>
              <li>
                <strong>Marketingový souhlas:</strong> Do odvolání souhlasu
              </li>
            </ul>
          </section>

          {/* 6. VAŠE PRÁVA */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Vaše práva (GDPR)</h2>
            <p className="text-muted-foreground mb-4">
              Jako subjekt údajů máte následující práva:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold flex items-center gap-2">
                  📋 Právo na přístup
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Můžete požádat o kopii všech osobních údajů, které o vás zpracováváme.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold flex items-center gap-2">
                  ✏️ Právo na opravu
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Můžete požádat o opravu nepřesných nebo neúplných údajů.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold flex items-center gap-2">
                  🗑️ Právo na výmaz
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Můžete požádat o smazání svých údajů (&quot;právo být zapomenut&quot;).
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold flex items-center gap-2">
                  📦 Právo na přenositelnost
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Můžete požádat o export svých údajů ve strojově čitelném formátu.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold flex items-center gap-2">
                  ⏸️ Právo na omezení
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Můžete požádat o dočasné omezení zpracování vašich údajů.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold flex items-center gap-2">
                  🚫 Právo vznést námitku
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Můžete vznést námitku proti zpracování založenému na oprávněném zájmu.
                </p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="font-semibold">Jak uplatnit svá práva:</p>
              <p className="text-muted-foreground mt-2">
                Napište nám na{" "}
                <a href="mailto:privacy@fixo.app" className="text-fixo-primary hover:underline">
                  privacy@fixo.app
                </a>{" "}
                nebo použijte formulář v nastavení účtu. Na žádost odpovíme do 30 dnů.
              </p>
            </div>

            <p className="text-muted-foreground mt-4">
              <strong>Právo podat stížnost:</strong> Pokud se domníváte, že zpracování vašich
              osobních údajů porušuje GDPR, máte právo podat stížnost u Úřadu pro ochranu
              osobních údajů (
              <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer"
                 className="text-fixo-primary hover:underline">
                www.uoou.cz
              </a>
              ).
            </p>
          </section>

          {/* 7. COOKIES */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Cookies a sledovací technologie</h2>

            <h3 className="text-lg font-medium mt-4 mb-2">7.1 Nezbytné cookies</h3>
            <p className="text-muted-foreground">
              Tyto cookies jsou nutné pro fungování webu a nelze je vypnout:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li><code className="bg-muted px-1 rounded">next-auth.session-token</code> - Přihlášení uživatele</li>
              <li><code className="bg-muted px-1 rounded">next-auth.csrf-token</code> - CSRF ochrana</li>
              <li><code className="bg-muted px-1 rounded">cookie-consent</code> - Vaše preference cookies</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">7.2 Analytické cookies (volitelné)</h3>
            <p className="text-muted-foreground">
              Pomáhají nám pochopit, jak web používáte:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li><code className="bg-muted px-1 rounded">_ga</code>, <code className="bg-muted px-1 rounded">_gid</code> - Google Analytics</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              Tyto cookies můžete odmítnout v cookie banneru nebo v nastavení prohlížeče.
            </p>
          </section>

          {/* 8. BEZPEČNOST */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Zabezpečení údajů</h2>
            <p className="text-muted-foreground">
              Přijímáme technická a organizační opatření k ochraně vašich údajů:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Šifrování přenosu dat (HTTPS/TLS 1.3)</li>
              <li>Šifrování citlivých údajů v databázi</li>
              <li>Pravidelné bezpečnostní audity</li>
              <li>Omezený přístup zaměstnanců k údajům</li>
              <li>Automatické odhlášení po neaktivitě</li>
            </ul>
          </section>

          {/* 9. MEZINÁRODNÍ PŘENOSY */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Mezinárodní přenosy údajů</h2>
            <p className="text-muted-foreground">
              Některé naše služby jsou hostovány v USA (Vercel, OpenAI). Pro tyto přenosy
              používáme:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Standardní smluvní doložky (SCC) schválené Evropskou komisí</li>
              <li>Dodatečná technická a organizační opatření</li>
              <li>Partneři s certifikací SOC 2 Type II</li>
            </ul>
          </section>

          {/* 10. DĚTI */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Ochrana dětí</h2>
            <p className="text-muted-foreground">
              Služba FIXO je určena osobám starším 18 let. Vědomě neshromažďujeme osobní
              údaje osob mladších 18 let. Pokud zjistíme, že jsme získali údaje od
              nezletilé osoby, údaje neprodleně smažeme.
            </p>
          </section>

          {/* 11. ZMĚNY */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">11. Změny těchto zásad</h2>
            <p className="text-muted-foreground">
              Tyto zásady můžeme příležitostně aktualizovat. O významných změnách vás budeme
              informovat emailem nebo oznámením v aplikaci nejméně 14 dní předem.
            </p>
          </section>

          {/* 12. KONTAKT */}
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">12. Kontakt</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">White Glove servis</p>
              <p className="text-muted-foreground">IČO: 09769684</p>
              <p className="text-muted-foreground mt-2">
                <strong>Ochrana osobních údajů:</strong>{" "}
                <a href="mailto:privacy@fixo.app" className="text-fixo-primary hover:underline">
                  privacy@fixo.app
                </a>
              </p>
              <p className="text-muted-foreground">
                <strong>Obecné dotazy:</strong>{" "}
                <a href="mailto:support@fixo.app" className="text-fixo-primary hover:underline">
                  support@fixo.app
                </a>
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Dozorový úřad:</strong>{" "}
                <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer"
                   className="text-fixo-primary hover:underline">
                  Úřad pro ochranu osobních údajů (ÚOOÚ)
                </a>
              </p>
            </div>
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
