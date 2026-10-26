import type { Metadata, Viewport } from "next";
import { Crimson_Text, DM_Sans } from "next/font/google";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.orchharesort.com"),
  title: {
    default: `${SITE_CONFIG.name} — Luxury Sanctuary on the River Betwa`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.metaDescription,
  keywords: [
    "Orchha Resort",
    "Luxury Resort in Orchha",
    "Betwa River Resort",
    "Swiss Tents Orchha",
    "Ayurveda Spa Orchha",
    "Destination Wedding Orchha",
    "Hotels near Orchha Chhatris",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  icons: {
    icon: "/images/brand/orchha-emblem.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C1731",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${crimsonText.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-brand-canvas text-brand-charcoal font-sans antialiased selection:bg-brand-gold/30 selection:text-brand-navy">
        {children}
      </body>
    </html>
  );
}
