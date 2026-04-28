import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductsSection } from '@/components/ProductsSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CinematicHero } from '@/components/ui/cinematic-hero';
import { CTASection } from '@/components/CTASection';
import { TerminalHero } from '@/components/TerminalHero';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <FeaturesSection />
        <TerminalHero />
        <CinematicHero />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
