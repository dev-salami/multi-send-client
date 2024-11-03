import { HeroSection } from "../components/Hero";

export const metadata = {
  title: "Multi-Send",
  description: "Streamline your crypto transactions with multi-send",
  openGraph: {
    type: "website",
    url: "https://multi-sendd.vercel.app/",
    title: "Multi-Send",
    description: "Streamline your crypto transactions with multi-send",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "Shadcn - Landing template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://multi-sendd.vercel.app/",
    title: "Multi-Send",
    description: "Streamline your crypto transactions with multi-send",
    images: [
      "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <SponsorsSection />
       <FeaturesSection /> */}
    </>
  );
}
