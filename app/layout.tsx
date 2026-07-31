import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Tiro_Bangla,
  Tiro_Devanagari_Hindi,
  Young_Serif,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  weight: "400",
  subsets: ["latin"],
});

const tiroHindi = Tiro_Devanagari_Hindi({
  variable: "--font-tiro-hindi",
  weight: "400",
  subsets: ["devanagari", "latin"],
});

const tiroBangla = Tiro_Bangla({
  variable: "--font-tiro-bangla",
  weight: "400",
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  title: "Dukaan Studio — one bad photo in, a full brand shoot out",
  description:
    "Upload one badly-lit product photo. An agent plans the shoot, then returns a studio shot and ad copy in English, Hindi and Bengali — in under 20 seconds, for about ₹2. Built on Gemini + Nano Banana, deployed on Google Cloud Run.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${youngSerif.variable} ${tiroHindi.variable} ${tiroBangla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
