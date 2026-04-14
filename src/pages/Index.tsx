import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductsSection } from '@/components/ProductsSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <FeaturesSection />
        <ReviewsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
