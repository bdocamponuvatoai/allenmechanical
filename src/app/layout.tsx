import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBar } from "@/components/layout/MobileBar";
import { BusinessJsonLd } from "@/components/seo/BusinessJsonLd";
import { Brand } from "@/components/ui/Brand";
import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import "@/styles/globals.css";

const manrope = localFont({
  src: "../assets/fonts/manrope.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-manrope",
  // Glyphs Manrope lacks (arrows, ☰) must fall back to plain Arial, as in the
  // original design, not to a size-adjusted fallback face.
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={manrope.variable} data-scroll-behavior="smooth">
      <body id="top">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header brand={<Brand />} />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <BusinessJsonLd />
      </body>
    </html>
  );
}
