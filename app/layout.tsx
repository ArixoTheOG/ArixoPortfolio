import type { Metadata, Viewport } from "next";
import { portfolioConfig, siteUrl } from "@/lib/config";
import Background from "@/components/Background";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const { seo } = portfolioConfig;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: "%s — Arixo",
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: "Arixo Portfolio",
  authors: [{ name: "Arixo", url: siteUrl }],
  creator: "Arixo",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Arixo — Minecraft Developer & SysAdmin",
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#06080b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Structured data — factual only (no invented profiles or offers). */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: portfolioConfig.name,
      alternateName: portfolioConfig.minecraftUsername,
      jobTitle: "Minecraft Developer & SysAdmin",
      description: seo.description,
      url: siteUrl,
      knowsAbout: [
        "Minecraft server development",
        "Pterodactyl panel and Wings deployment",
        "Linux and VPS administration",
        "Discord bot development",
        "Web development",
        "Hosting infrastructure",
      ],
    },
    {
      "@type": "WebSite",
      name: seo.title,
      url: siteUrl,
      description: seo.description,
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-ink font-body text-fog antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Background />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-grass-400 px-4 py-2 font-semibold text-ink-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
