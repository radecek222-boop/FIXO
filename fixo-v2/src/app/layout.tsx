import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
