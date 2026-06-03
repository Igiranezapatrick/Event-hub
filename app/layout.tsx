import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Talent Reveal Rwanda (EventHub)",
  description:
    "A modern SaaS platform for creators, trainers, institutions, and businesses to publish, monetize, and manage events, bootcamps, workshops, and courses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
