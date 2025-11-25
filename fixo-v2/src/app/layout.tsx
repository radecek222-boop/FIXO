import type { Metadata, Viewport } from "next";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/cookie-consent";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "FIXO - Okamžité opravy domácích závad",
    template: "%s | FIXO",
  },
  description:
    "AI analýza fotografií domácích závad s návody na opravu krok za krokem. Ušetřete tisíce korun na řemeslnících.",
  keywords: [
    "opravy",
    "domácí závady",
    "DIY",
    "AI diagnostika",
    "návody",
    "kutilství",
    "údržba domu",
  ],
  authors: [{ name: "FIXO Team" }],
  creator: "FIXO",
  publisher: "FIXO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fixo.app"),
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://fixo.app",
    title: "FIXO - Okamžité opravy domácích závad",
    description:
      "AI analýza fotografií domácích závad s návody na opravu krok za krokem.",
    siteName: "FIXO",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "FIXO - AI diagnostika domácích závad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIXO - Okamžité opravy domácích závad",
    description:
      "AI analýza fotografií domácích závad s návody na opravu krok za krokem.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/icon-192x192.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <SessionProvider>
          {children}
          <Toaster />
          <CookieConsent />
        </SessionProvider>
      </body>
    </html>
  );
}
