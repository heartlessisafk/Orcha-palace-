import type { Metadata } from "next";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The Story of Orchha Resort | Heritage Sanctuary on the River Betwa",
  description:
    "Discover the story of The Orchha Resort. Situated on the serene banks of the sacred Betwa River at Kanchanghat, facing the 14 historic royal cenotaphs. Designed by Architect Yogesh Chandra, featuring 44 keys, lotus pool, Kerala Ayurveda, and zero-pollution sanctuary.",
  keywords: [
    "The Orchha Resort",
    "Orchha Resort Story",
    "History of Orchha Resort",
    "Kanchanghat Orchha",
    "River Betwa Resort",
    "Architect Yogesh Chandra",
    "Lotus Swimming Pool Orchha",
    "14 Royal Chhatris View",
    "Swiss Tents Orchha",
    "Bundelkhand Heritage Resort",
    "Orchha Luxury Stays",
    "Ram Raja Temple Orchha",
  ],
  alternates: {
    canonical: "https://www.orchharesort.com/about",
  },
  openGraph: {
    title: "The Story of Orchha Resort | Heritage Sanctuary on the River Betwa",
    description:
      "A peaceful riverfront sanctuary designed by Yogesh Chandra, nestled on the sacred Betwa River opposite Orchha's 16th-century royal cenotaphs.",
    url: "https://www.orchharesort.com/about",
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
    title: "The Story of Orchha Resort",
    description:
      "A peaceful riverfront sanctuary designed by Yogesh Chandra, nestled on the sacred Betwa River opposite Orchha's 16th-century royal cenotaphs.",
    images: ["/images/resort/genuine/slide1.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "The Story of Orchha Resort",
    description:
      "Historical narrative and architecture of The Orchha Resort by Architect Yogesh Chandra on Kanchanghat.",
    url: "https://www.orchharesort.com/about",
    mainEntity: {
      "@id": "https://www.orchharesort.com/#hotel",
    },
  };

  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Our Story", path: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
