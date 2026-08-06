import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { site, services } from "@/lib/content";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Grain from "@/components/ui/Grain";
import Cursor from "@/components/ui/Cursor";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const description = `${site.name} helps local businesses in ${site.city}, ${site.state} get found and get called — SEO, paid search, social, reputation, websites, and email. ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "digital marketing Vermont",
    `marketing agency ${site.city}`,
    "Vermont SEO",
    "local SEO Vermont",
    "PPC Vermont",
    "website design Vermont",
    ...services.map((s) => s.title),
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${site.domain}`,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

/** LocalBusiness structured data — this is what wins the map pack. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description,
  slogan: site.tagline,
  url: `https://${site.domain}`,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.stateAbbr,
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: site.state },
  sameAs: site.socials.filter((s) => s.href !== "#").map((s) => s.href),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Marketing services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.blurb },
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${interTight.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        {/* Scroll reveals render at opacity:0 and are switched on by an
            IntersectionObserver. With JS disabled that observer never runs
            and the copy would stay invisible, so force the final state. */}
        <noscript>
          <style>{`
            [data-reveal] { opacity: 1 !important; transform: none !important; }
          `}</style>
        </noscript>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Grain />
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
