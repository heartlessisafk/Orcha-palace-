import type { Metadata } from "next";
import { getWeddingVenueSchema, getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Royal Destination Weddings | The Orchha Resort on River Betwa",
  description:
    "Plan your royal destination wedding at The Orchha Resort. Sprawling riverfront banquet lawns, 1,500 sq ft ballroom, lotus poolside, canopied mandap pavilions, and 50 guest rooms on Kanchanghat across from Orchha's royal cenotaphs.",
  keywords: [
    "Orchha Resort Weddings",
    "Destination Wedding Orchha",
    "Royal Wedding in Madhya Pradesh",
    "Riverfront Wedding Lawns Orchha",
    "Bundelkhand Destination Wedding",
    "The Orchha Resort Weddings",
    "Wedding Venues near Jhansi",
    "Lotus Pool Wedding Mandap",
    "Resort Buyout Wedding India",
  ],
  alternates: {
    canonical: "https://www.orchharesort.com/weddings",
  },
  openGraph: {
    title: "Royal Destination Weddings | The Orchha Resort on River Betwa",
    description:
      "Celebrate love where royal heritage meets sacred waters. Sprawling banquet lawns, opulent stages, and personalized Bundelkhand hospitality at The Orchha Resort.",
    url: "https://www.orchharesort.com/weddings",
    images: [
      {
        url: "/images/weddings/wedding-sangeet-celebration.jpg",
        width: 1024,
        height: 576,
        alt: "Royal Wedding Celebration at The Orchha Resort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Destination Weddings | The Orchha Resort",
    description:
      "Celebrate love where royal heritage meets sacred waters. Sprawling banquet lawns, opulent stages, and personalized Bundelkhand hospitality.",
    images: ["/images/weddings/wedding-sangeet-celebration.jpg"],
  },
};

export default function WeddingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const venueJsonLd = getWeddingVenueSchema();
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Royal Weddings", path: "/weddings" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venueJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
