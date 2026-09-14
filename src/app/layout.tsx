import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import BackToTop from "@/components/BackToTop";
import { site } from "@/lib/site";

// Variable Archivo with the width axis: expanded black italic for display,
// normal width for body copy — one family, two voices.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "Professional pressure washing and soft washing in Riverside and the Inland Empire. Driveways, homes, roofs, decks and storefronts. Free quotes within 24 hours.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Riverside & Inland Empire`,
  description,
  keywords: [
    "Riverside pressure washing",
    "power washing Riverside",
    "driveway cleaning",
    "roof soft washing",
    "house washing Inland Empire",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <ScrollProgressBar />
          <BackToTop />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
