import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kerala Ayurveda Spa & Herbal Steam Sanctuary",
  description:
    "Restore physical, mental, and spiritual equilibrium at The Orchha Resort. Authentic Kerala Ayurveda therapies, herbal steam bath, and personalized consultations on the serene banks of the Betwa River.",
  keywords: [
    "Orchha Resort Spa",
    "Kerala Ayurveda Orchha",
    "Ayurvedic Spa Betwa River",
    "Shirodhara Orchha",
    "Herbal Steam Bath Madhya Pradesh",
    "Abhyanga Massage Orchha",
    "Ayurvedic Retreat India",
  ],
  openGraph: {
    title: "Ayurveda Spa & Wellness Sanctuary | The Orchha Resort",
    description:
      "Authentic Kerala Ayurveda massages, herbal steam baths, and holistic equilibrium in a zero-pollution riverfront sanctuary.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "Ayurveda Spa Sanctuary at The Orchha Resort",
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
