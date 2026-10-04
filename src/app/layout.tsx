import type { Metadata } from "next";
import { Young_Serif, Familjen_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";

const display = Young_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const sans = Familjen_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const mono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "Geographer working on climate and home electrification. Previously PhD research on river restoration in India, and policy work with UNDP.";

export const metadata: Metadata = {
  title: "Utkarsh Roy Choudhury",
  description,
  authors: [{ name: "Utkarsh Roy Choudhury" }],
  openGraph: { title: "Utkarsh Roy Choudhury", description, type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
