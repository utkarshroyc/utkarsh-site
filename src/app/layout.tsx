import type { Metadata } from "next";
import { Familjen_Grotesk, DM_Mono } from "next/font/google";
import localFont from "next/font/local";
import ThemeClock, { THEME_SCRIPT } from "@/components/ThemeClock";
import "./globals.css";

// Le Murmure by Jérémy Landes / Velvetyne, SIL Open Font License 1.1 (see /fonts/LeMurmure-OFL.txt).
const display = localFont({
  variable: "--font-display",
  src: "../fonts/LeMurmure-Regular.woff2",
  weight: "400",
  display: "swap",
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
  metadataBase: new URL("https://utkarshroy.xyz"),
  title: "Utkarsh Roy Choudhury",
  description,
  authors: [{ name: "Utkarsh Roy Choudhury" }],
  openGraph: { title: "Utkarsh Roy Choudhury", description, type: "website" },
  twitter: { card: "summary_large_image", title: "Utkarsh Roy Choudhury", description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="night" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <ThemeClock />
        {children}
      </body>
    </html>
  );
}
