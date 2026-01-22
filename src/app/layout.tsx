import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Utkarsh Roy Choudhury | Geographer & Political Ecologist",
  description: "PhD Candidate at the University of Alabama studying river governance, environmental politics, and human-wildlife relations.",
  keywords: ["geography", "political ecology", "environmental governance", "researcher", "PhD"],
  authors: [{ name: "Utkarsh Roy Choudhury" }],
  openGraph: {
    title: "Utkarsh Roy Choudhury",
    description: "Geographer · Political Ecologist · Researcher",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-bg-primary text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
