import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { 
  Printer, Monitor, Gamepad2, Speaker, Wifi, Smartphone, Microwave,
  ArrowLeft, Download, Phone, Check, Shield, Zap, ArrowRight, ChevronRight
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, ProductIdeal } from '@/data/products';

const iconMap: Record<string, React.ElementType> = {
  printer: Printer,
  monitor: Monitor,
  gamepad: Gamepad2,
  speaker: Speaker,
  wifi: Wifi,
  smartphone: Smartphone,
  microwave: Microwave,
};

const IdealForIcon = ({ ideal }: { ideal: ProductIdeal }) => {
  const Icon = iconMap[ideal.icon] || Monitor;
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -5 }}
      className="flex flex-col items-center gap-3 p-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <span className="text-sm text-foreground/70 text-center">{ideal.label}</span>
    </motion.div>
  );
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const product = slug ? getProductBySlug(slug) : undefined;
  const relatedProducts = slug ? getRelatedProducts(slug, 3) : [];

  // Scroll to top when navigating to product detail
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  if (!product) {
    return <Navigate to="/produtos" replace />;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="pt-24">
        {/* Breadcrumb */}
        <section className="container mx-auto px-6 mb-8">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-foreground/60 hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-foreground/40" />
              <Link to="/produtos" className="text-foreground/60 hover:text-primary transition-colors">
                Produtos
              </Link>
              <ChevronRight className="w-4 h-4 text-foreground/40" />
              <span className="text-primary font-medium">{product.name}</span>
            </nav>
          </AnimatedSection>
        </section>

        {/* Product Hero */}
        <section className="relative py-12 overflow-hidden">
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-gradient-radial pointer-events-none"
          />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Image Gallery */}
              <AnimatedSection>
                <div className="relative">
                  {/* Category Badge */}
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4"
                  >
                    {product.category}
                  </motion.span>

                  {/* Main Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-square bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/20 rounded-3xl overflow-hidden mb-4"
                  >
                    {/* Animated background */}
                    <motion.div
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 opacity-50"
                      style={{
                        backgroundImage: 'radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
                        backgroundSize: '100% 100%',
                      }}
                    />
                    
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={product.gallery[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-contain p-12 relative z-10"
                    />

                    {/* Glow effect */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-3xl" />
                  </motion.div>

                  {/* Thumbnail Gallery */}
                  {product.gallery.length > 1 && (
                    <div className="flex gap-3">
                      {product.gallery.map((img, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedImage(index)}
                          className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                            selectedImage === index 
                              ? 'border-primary shadow-lg shadow-primary/30' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-contain p-2 bg-muted"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* Product Info */}
              <div className="lg:sticky lg:top-32">
                <AnimatedSection delay={0.2}>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
                  >
                    {product.name}
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-foreground/60 mb-6"
                  >
                    {product.subtitle}
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-foreground/70 leading-relaxed mb-8"
                  >
                    {product.fullDescription || product.description}
                  </motion.p>

                  {/* Features Tags */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-3 mb-8"
                  >
                    {product.features.map((feature, index) => (
                      <span
                        key={feature}
                        className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        {feature}
                      </span>
                    ))}
                  </motion.div>

                  {/* Warranty Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl border border-border mb-8"
                  >
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Shield className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">1 ano</p>
                      <p className="text-foreground/60">de garantia</p>
                    </div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <motion.a
                      href="#contato"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-primary text-primary-foreground py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      Solicitar Orçamento
                    </motion.a>
                    
                    {product.specSheet && (
                      <motion.a
                        href={product.specSheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-muted text-foreground py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-muted/80 transition-all border border-border"
                      >
                        <Download className="w-5 h-5" />
                        Especificações Técnicas
                      </motion.a>
                    )}
                  </motion.div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
                Aplicações
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Ideal para
              </h2>
            </AnimatedSection>

            <StaggerContainer className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              {product.idealFor.map((ideal, index) => (
                <StaggerItem key={ideal.label}>
                  <IdealForIcon ideal={ideal} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Characteristics Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
                  Especificações
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
                  Características
                </h2>
                
                <ul className="space-y-4">
                  {product.characteristics.map((char, index) => (
                    <motion.li
                      key={char}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground/80">{char}</span>
                    </motion.li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 aspect-square flex items-center justify-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-secondary/10 rounded-full blur-2xl" />
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-12">
                <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
                  Continue Explorando
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Veja mais produtos
                </h2>
              </AnimatedSection>

              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <StaggerItem key={relatedProduct.id}>
                    <Link to={`/produto/${relatedProduct.slug}`}>
                      <motion.div
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="group bg-card border border-border rounded-3xl overflow-hidden"
                      >
                        <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/10 p-8 flex items-center justify-center">
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                            {relatedProduct.category}
                          </span>
                          <h3 className="text-xl font-display font-bold text-foreground mt-2 mb-2">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                            {relatedProduct.description}
                          </p>
                          <span className="inline-flex items-center gap-2 text-primary font-semibold">
                            Ver Detalhes
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <AnimatedSection delay={0.4} className="text-center mt-12">
                <Link to="/produtos">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-muted text-foreground px-8 py-4 rounded-full font-semibold hover:bg-muted/80 transition-all border border-border"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar para Produtos
                  </motion.button>
                </Link>
              </AnimatedSection>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
