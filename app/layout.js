import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="hu"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
