import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orchha Palace Hotel Spa — Ayurvedic Wellness & Rejuvenation",
  description:
    "Discover 11 authentic Ayurvedic therapies, warm medicated herbal oil massages, Shirodhara, and herbal body wraps at Orchha Palace Hotel Spa, Kanchanghat, Orchha. Call 9516006201 or 8103953727.",
  keywords: [
    "Orchha Palace Hotel Spa",
    "Ayurvedic Wellness Orchha",
    "Abhyangam Orchha",
    "Shirodhara Orchha",
    "Synchronized Massage",
    "Marma Massage",
    "Nasyam Orchha",
    "Ayur Herbal Wrap",
    "Reflexology Orchha",
    "Deep Tissue Massage Orchha",
    "Head and Scalp Massage",
    "Body Exfoliation Massage",
    "Ayurvedic Spa Betwa River",
  ],
  openGraph: {
    title: "Orchha Palace Hotel Spa — Ayurvedic Wellness & Rejuvenation",
    description:
      "Official catalogue of 11 authentic royal Ayurvedic therapies with warm herbal oils and restorative riverfront peace at Orchha Palace Hotel Spa.",
    images: [
      {
        url: "/images/spa/catalog/shirodhara.jpg",
        width: 1200,
        height: 800,
        alt: "Orchha Palace Hotel Spa Ayurvedic Wellness",
      },
    ],
  },
};

export default function SpaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
