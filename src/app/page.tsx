import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ServiceArea from "@/components/ServiceArea";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  url: site.url,
  image: `${site.url}/hero/hero.jpg`,
  telephone: "+1-951-313-0942",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    postalCode: site.postalCode,
    addressCountry: "US",
  },
  areaServed: site.areas.map((name) => ({ "@type": "City", name })),
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <WhyChooseUs />
      <Testimonials />
      <ServiceArea />
      <QuoteForm />
      <Footer />
      <MobileCallBar />
    </main>
  );
}
