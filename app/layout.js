import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";
import CmsBridge from "@/components/cms/CmsBridge";
import { getCmsDicts } from "@/lib/cms-dict";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://stillsoulproduction.hu"),
  title: "Videókészítés és fotózás Budapesten · StillSoul Production",
  description:
    "Videókészítés és fotózás Budapesten, Győrben és Esztergomban: esküvő, rendezvény, reklámfilm, videoklip, portré. StillSoul Production – Fördős Bence és Dudás Hédi.",
  openGraph: {
    title: "Videókészítés és fotózás Budapesten · StillSoul Production",
    description:
      "Videókészítés és fotózás Budapesten, Győrben és Esztergomban: esküvő, rendezvény, reklámfilm, videoklip, portré.",
    url: "https://stillsoulproduction.hu",
    siteName: "Stillsoul Production",
    locale: "hu_HU",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo-og.png",
        width: 1200,
        height: 630,
        alt: "Stillsoul Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Videókészítés és fotózás Budapesten · StillSoul Production",
    description:
      "Videókészítés és fotózás Budapesten, Győrben és Esztergomban: esküvő, rendezvény, reklámfilm, videoklip, portré.",
    images: ["/logo-og.png"],
  },
};

const BASE_URL = "https://stillsoulproduction.hu";

// Strukturált adat (schema.org).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#business`,
  name: "StillSoul Production",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/logo-og.png`,
  description:
    "Kreatív fotó- és videógyártás: esküvő, rendezvény, reklámfilm, videoklip, portré, social media tartalom.",
  telephone: "+36303053304",
  email: "stillsoulproduction@gmail.com",
  areaServed: [
    { "@type": "City", name: "Budapest" },
    { "@type": "City", name: "Győr" },
    { "@type": "City", name: "Esztergom" },
  ],
  knowsLanguage: ["hu", "en"],
  sameAs: [
    "https://www.instagram.com/stillsoulproduction/",
    // Google Cégprofil (Knowledge Graph ID)
    "https://www.google.com/search?kgmid=/g/11zz2h2m0v&q=StillSoul+Production",
  ],
  founder: [
    { "@type": "Person", name: "Fördős Bence", jobTitle: "Rendező, operatőr, fotós" },
    { "@type": "Person", name: "Dudás Hédi", jobTitle: "Vágó, forgatókönyvíró" },
  ],
};

export default async function RootLayout({ children }) {
  const dicts = await getCmsDicts();
  return (
    <html
      lang="hu"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LanguageProvider dicts={dicts}>{children}</LanguageProvider>
        <CmsBridge />
        <Analytics />
      </body>
    </html>
  );
}
