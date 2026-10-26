import type { Metadata } from "next";

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
  openGraph: {
    title: "The Story of Orchha Resort | Heritage Sanctuary on the River Betwa",
    description:
      "A peaceful riverfront sanctuary designed by Yogesh Chandra, nestled on the sacred Betwa River opposite Orchha's 16th-century royal cenotaphs.",
    images: [
      {
        url: "/images/resort/genuine/slide1.jpg",
        width: 1349,
        height: 600,
        alt: "The Orchha Resort illuminated at dusk on the banks of River Betwa",
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
