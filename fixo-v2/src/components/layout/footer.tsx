import Link from "next/link";
import { Wrench, Mail, Github } from "lucide-react";

const footerLinks = {
  features: [
    { name: "AI analýza fotografií", href: "/features/ai-analysis" },
    { name: "500+ návodů na opravy", href: "/dashboard/repairs" },
    { name: "Bezpečnostní upozornění", href: "/features/safety" },
    { name: "Historie oprav", href: "/dashboard/history" },
  ],
  resources: [
    { name: "Dokumentace", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Podpora", href: "/support" },
  ],
  legal: [
    { name: "Podmínky použití", href: "/terms" },
    { name: "Ochrana soukromí", href: "/privacy" },
    { name: "Cookies", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fixo-primary text-white font-bold text-xl">
                F
              </div>
              <span className="font-bold text-xl text-white">FIXO</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              První světový standard pro vizuální diagnostiku domácích závad.
            </p>
            <p className="text-xs text-gray-500 italic">
              "Fix Anything. Anywhere. Instantly."
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Funkce
            </h3>
            <ul className="space-y-2">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Zdroje
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@fixo.app"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  support@fixo.app
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/radecek222-boop/FIXO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>

            {/* Legal links */}
            <div className="mt-6">
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} FIXO. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}
