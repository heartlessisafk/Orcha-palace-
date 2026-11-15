import type { Metadata, Viewport } from "next";
import { Crimson_Text, DM_Sans } from "next/font/google";
import { SITE_CONFIG } from "@/lib/site-config";
import { getHotelSchema, getOrganizationSchema, getWebSiteSchema } from "@/lib/schema";
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
    "Best resort in Orchha",
    "Betwa River Resort Orchha",
    "Hotels in Orchha Madhya Pradesh",
    "Swiss Tents Orchha",
    "Ayurveda Spa Orchha",
    "Destination Wedding Orchha",
    "Hotels near Orchha Chhatris",
    "Kanchanghat Orchha stays",
    "Heritage hotel Orchha",
  ],
  authors: [{ name: SITE_CONFIG.name, url: "https://www.orchharesort.com" }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  alternates: {
    canonical: "https://www.orchharesort.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.orchharesort.com",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Luxury Sanctuary on the River Betwa`,
    description: SITE_CONFIG.metaDescription,
    images: [
      {
        url: "/images/resort/genuine/slide1.jpg",
        width: 1349,
        height: 600,
        alt: "The Orchha Resort illuminated at dusk on the banks of River Betwa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — Luxury Sanctuary on the River Betwa`,
    description: SITE_CONFIG.metaDescription,
    images: ["/images/resort/genuine/slide1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/brand/orchha-emblem.svg",
    apple: "/images/brand/orchha-emblem.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C1731",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hotelJsonLd = getHotelSchema();
  const orgJsonLd = getOrganizationSchema();
  const websiteJsonLd = getWebSiteSchema();

  return (
    <html lang="en" className={`${crimsonText.variable} ${dmSans.variable} scroll-smooth`}>
      <head>
        <link rel="preload" href="/images/brand/orchha-logo.png" as="image" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-brand-canvas text-brand-charcoal font-sans antialiased selection:bg-brand-gold/30 selection:text-brand-navy">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2.5 focus:bg-brand-gold focus:text-brand-navy focus:font-semibold focus:text-sm focus:rounded-lg focus:shadow-floating focus:outline-none focus:ring-2 focus:ring-brand-navy"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
