import type { Metadata } from "next";
import { getSpaSchema, getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Ayurvedic Wellness & Rejuvenation Spa",
  description:
    "Discover 11 authentic Ayurvedic therapies, warm medicated herbal oil massages, Shirodhara, and herbal body wraps at The Orchha Resort, Kanchanghat, Orchha. Call 9516006201 or 8103953727.",
  keywords: [
    "The Orchha Resort Spa",
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
  alternates: {
    canonical: "https://www.orchharesort.com/spa",
  },
  openGraph: {
    title: "Ayurvedic Wellness & Rejuvenation Spa | The Orchha Resort",
    description:
      "Official catalogue of 11 authentic royal Ayurvedic therapies with warm herbal oils and restorative riverfront peace at The Orchha Resort.",
    url: "https://www.orchharesort.com/spa",
    images: [
      {
        url: "/images/spa/catalog/shirodhara.jpg",
        width: 1200,
        height: 800,
        alt: "The Orchha Resort Ayurvedic Spa & Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayurvedic Wellness & Rejuvenation Spa | The Orchha Resort",
    description:
      "Official catalogue of 11 authentic royal Ayurvedic therapies with warm herbal oils and restorative riverfront peace at The Orchha Resort.",
    images: ["/images/spa/catalog/shirodhara.jpg"],
  },
};

export default function SpaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const spaJsonLd = getSpaSchema();
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Ayurveda Spa", path: "/spa" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(spaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
