import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Royal Destination Weddings | The Orchha Resort on River Betwa",
  description:
    "Plan your royal destination wedding at The Orchha Resort. Sprawling riverfront banquet lawns, 1,500 sq ft ballroom, lotus poolside, canopied mandap pavilions, and 44 guest rooms & Swiss tents on Kanchanghat across from Orchha's royal cenotaphs.",
  keywords: [
    "Orchha Resort Weddings",
    "Destination Wedding Orchha",
    "Royal Wedding in Madhya Pradesh",
    "Riverfront Wedding Lawns Orchha",
    "Bundelkhand Destination Wedding",
    "Orchha Palace Hotel Weddings",
    "Wedding Venues near Jhansi",
    "Lotus Pool Wedding Mandap",
    "Resort Buyout Wedding India",
  ],
  openGraph: {
    title: "Royal Destination Weddings | The Orchha Resort on River Betwa",
    description:
      "Celebrate love where royal heritage meets sacred waters. Sprawling banquet lawns, opulent stages, and personalized Bundelkhand hospitality at The Orchha Resort.",
    images: [
      {
        url: "/images/weddings/wedding-sangeet-celebration.jpg",
        width: 1024,
        height: 576,
        alt: "Royal Wedding Celebration at The Orchha Resort",
      },
    ],
  },
};

export default function WeddingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
