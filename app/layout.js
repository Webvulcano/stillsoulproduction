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
  title: "Stillsoul Production",
  description:
    "Stillsoul Production – kreatív fotó és videó: esküvő, rendezvény, reklámfilm, social media. | Creative photo & video production.",
  openGraph: {
    title: "Stillsoul Production",
    description:
      "Kreatív fotó és videó – esküvő, rendezvény, reklámfilm, social media. | Creative photo & video production.",
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
    title: "Stillsoul Production",
    description:
      "Kreatív fotó és videó – esküvő, rendezvény, reklámfilm, social media. | Creative photo & video production.",
    images: ["/logo-og.png"],
  },
};

export default async function RootLayout({ children }) {
  const dicts = await getCmsDicts();
  return (
    <html
      lang="hu"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider dicts={dicts}>{children}</LanguageProvider>
        <CmsBridge />
        <Analytics />
      </body>
    </html>
  );
}
