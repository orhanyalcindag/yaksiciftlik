import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FarmPillars from "@/components/FarmPillars";
import ProductCatalog from "@/components/ProductCatalog";
import FarmStory from "@/components/FarmStory";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FarmPillars />
        <ProductCatalog />
        <FarmStory />
      </main>
      <Footer />
    </div>
  );
}
