import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { 
  Printer, Monitor, Gamepad2, Speaker, Wifi, Smartphone, Microwave,
  Download, Phone, Check, Shield, Zap, ArrowRight, ChevronRight,
  Sparkles, Battery, Award, Star, Box
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, ProductIdeal, ProductModel } from '@/data/products';
import protetorVideo from '@/assets/protetor-eletronico-involts.mp4';

const iconMap: Record<string, React.ElementType> = {
  printer: Printer,
  monitor: Monitor,
  gamepad: Gamepad2,
  speaker: Speaker,
  wifi: Wifi,
  smartphone: Smartphone,
  microwave: Microwave,
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
          }}
          animate={{
            y: [null, '-100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// 3D tilt effect hook
const use3DTilt = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
};

const IdealForIcon = ({ ideal, index }: { ideal: ProductIdeal; index: number }) => {
  const Icon = iconMap[ideal.icon] || Monitor;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -30 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
      whileHover={{ 
        scale: 1.15, 
        y: -15,
        rotateY: 10,
        transition: { type: 'spring', stiffness: 400 }
      }}
      className="flex flex-col items-center gap-4 p-6 cursor-pointer group perspective-1000"
    >
      <motion.div 
        className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden"
        whileHover={{ boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.4)' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <Icon className="w-10 h-10 text-primary relative z-10 group-hover:scale-110 transition-transform" />
      </motion.div>
      <span className="text-sm text-foreground/70 text-center font-medium group-hover:text-primary transition-colors">
        {ideal.label}
      </span>
    </motion.div>
  );
};

// Animated characteristic item
const CharacteristicItem = ({ char, index }: { char: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, type: 'spring' }}
      className="flex items-start gap-4 group"
    >
      <motion.div 
        className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5"
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Check className="w-4 h-4 text-primary" />
      </motion.div>
      <span className="text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
        {char}
      </span>
    </motion.li>
  );
};

// Animated stats counter
const AnimatedStat = ({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex flex-col items-center gap-2 p-4"
    >
      <motion.div
        animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Icon className="w-8 h-8 text-primary" />
      </motion.div>
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <span className="text-sm text-foreground/60">{label}</span>
    </motion.div>
  );
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt();
  
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  if (!product) {
    return <Navigate to="/produtos" replace />;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="pt-24">
        {/* Animated Background */}
        <motion.div 
          style={{ y: backgroundY, opacity: backgroundOpacity }}
          className="fixed inset-0 pointer-events-none z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
          <FloatingParticles />
        </motion.div>

        {/* Breadcrumb */}
        <section className="container mx-auto px-6 mb-8 relative z-10">
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm"
          >
            <Link to="/" className="text-foreground/60 hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-foreground/40" />
            <Link to="/produtos" className="text-foreground/60 hover:text-primary transition-colors">
              Produtos
            </Link>
            <ChevronRight className="w-4 h-4 text-foreground/40" />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-primary font-medium"
            >
              {product.name}
            </motion.span>
          </motion.nav>
        </section>

        {/* Product Hero */}
        <motion.section 
          ref={heroRef}
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative py-12 overflow-hidden"
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Image Gallery with 3D Effect */}
              <div className="relative">
                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                    {product.category}
                  </span>
                </motion.div>

                {/* Main Image with 3D Tilt */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ 
                    rotateX, 
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative aspect-square bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/20 rounded-3xl overflow-hidden mb-6 cursor-pointer perspective-1000"
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 20%, rgba(249,115,22,0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 80%, rgba(251,185,48,0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 20%, rgba(249,115,22,0.15) 0%, transparent 50%)',
                      ],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  />
                  
                  {/* Grid pattern */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    src={product.gallery[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain p-12 relative z-10"
                    style={{ transform: 'translateZ(50px)' }}
                  />

                  {/* Glow effects */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-3xl" 
                  />
                  
                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
                </motion.div>

                {/* Thumbnail Gallery */}
                {product.gallery.length > 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-3"
                  >
                    {product.gallery.map((img, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === index 
                            ? 'border-primary shadow-lg shadow-primary/30' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {selectedImage === index && (
                          <motion.div
                            layoutId="activeThumb"
                            className="absolute inset-0 bg-primary/10"
                          />
                        )}
                        <img 
                          src={img} 
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-contain p-2 bg-muted relative z-10"
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Product Info */}
              <div className="lg:sticky lg:top-32">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4"
                >
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {product.name}
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl text-primary font-medium mb-6"
                >
                  {product.subtitle}
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-foreground/70 leading-relaxed text-lg mb-8"
                >
                  {product.fullDescription || product.description}
                </motion.p>

                {/* Features Tags with stagger */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  {product.features.map((feature, index) => (
                    <motion.span
                      key={feature}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 border border-primary/20"
                    >
                      <Check className="w-4 h-4" />
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Models Section */}
                {product.models && product.models.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Box className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-semibold">Modelos Disponíveis</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {product.models.map((model, index) => (
                        <motion.div
                          key={model.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -3 }}
                          className={`relative p-4 rounded-xl border text-center cursor-pointer overflow-hidden ${
                            model.type === 'bivolt' 
                              ? 'border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/5' 
                              : 'border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5'
                          }`}
                        >
                          <motion.div
                            className={`absolute inset-0 ${
                              model.type === 'bivolt' 
                                ? 'bg-gradient-to-r from-secondary/0 via-secondary/10 to-secondary/0' 
                                : 'bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0'
                            }`}
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.2 }}
                          />
                          <span className={`font-bold relative z-10 ${
                            model.type === 'bivolt' ? 'text-secondary' : 'text-primary'
                          }`}>
                            {model.name}
                          </span>
                          <span className={`block text-xs mt-1 relative z-10 ${
                            model.type === 'bivolt' ? 'text-secondary/70' : 'text-primary/70'
                          }`}>
                            {model.type === 'bivolt' ? 'Bivolt' : 'Mono'}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-4 mb-8 p-4 bg-muted/30 rounded-2xl border border-border"
                >
                  <AnimatedStat value="1 ano" label="Garantia" icon={Shield} />
                  <AnimatedStat value="100%" label="Nacional" icon={Award} />
                  <AnimatedStat value="5★" label="Avaliação" icon={Star} />
                </motion.div>

                {/* Warranty Badge - Enhanced */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: -30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                  whileHover={{ scale: 1.02 }}
                  className="relative flex items-center gap-4 p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl border border-border mb-8 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div 
                    className="relative w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Shield className="w-10 h-10 text-primary-foreground" />
                  </motion.div>
                  <div className="relative">
                    <p className="text-3xl font-bold text-foreground">1 ano</p>
                    <p className="text-foreground/60">de garantia Involts</p>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -right-4 -top-4 w-24 h-24 border border-primary/20 rounded-full"
                  />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.a
                    href="/contato"
                    whileHover={{ scale: 1.03, boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 relative bg-gradient-primary text-primary-foreground py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-3 overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <Phone className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Solicitar Orçamento</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  
                  {product.specSheet && (
                    <motion.a
                      href={product.specSheet}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 bg-muted text-foreground py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-muted/80 transition-all border border-border"
                    >
                      <Download className="w-5 h-5" />
                      Especificações
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Ideal For Section - Enhanced */}
        <section className="py-24 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30"
          />
          
          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-6 py-3 mb-6"
              >
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                  Aplicações
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Ideal para
              </h2>
            </AnimatedSection>

            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {product.idealFor.map((ideal, index) => (
                <IdealForIcon key={ideal.label} ideal={ideal} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Characteristics Section - Enhanced */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-6 py-3 mb-6"
                >
                  <Battery className="w-5 h-5 text-primary" />
                  <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                    Especificações
                  </span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-10">
                  Características
                </h2>
                
                <ul className="space-y-5">
                  {product.characteristics.map((char, index) => (
                    <CharacteristicItem key={char} char={char} index={index} />
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 rounded-3xl p-8 aspect-square flex items-center justify-center overflow-hidden"
                >
                  {/* Animated rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute border border-primary/10 rounded-full"
                      style={{
                        width: `${60 + i * 20}%`,
                        height: `${60 + i * 20}%`,
                      }}
                      animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                      transition={{
                        duration: 20 + i * 10,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  ))}
                  
                  <video
                    src={protetorVideo}
                    controls
                    playsInline
                    className="max-w-full max-h-full object-contain relative z-10 rounded-2xl"
                  />
                  
                  {/* Decorative elements */}
                  <motion.div 
                    className="absolute top-8 right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute bottom-8 left-8 w-20 h-20 bg-secondary/10 rounded-full blur-2xl"
                    animate={{ scale: [1.3, 1, 1.3], opacity: [0.6, 0.3, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Related Products - Enhanced */}
        {relatedProducts.length > 0 && (
          <section className="py-24 relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30"
            />
            
            <div className="container mx-auto px-6 relative z-10">
              <AnimatedSection className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-6 py-3 mb-6"
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                    Continue Explorando
                  </span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                  Veja mais produtos
                </h2>
              </AnimatedSection>

              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct, index) => (
                  <StaggerItem key={relatedProduct.id}>
                    <Link to={`/produto/${relatedProduct.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -15, scale: 1.02 }}
                        className="group bg-card border border-border rounded-3xl overflow-hidden relative"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/10 p-8 flex items-center justify-center relative overflow-hidden">
                          <motion.div
                            className="absolute inset-0"
                            animate={{
                              background: [
                                'radial-gradient(circle at 30% 30%, rgba(249,115,22,0.1) 0%, transparent 50%)',
                                'radial-gradient(circle at 70% 70%, rgba(251,185,48,0.1) 0%, transparent 50%)',
                                'radial-gradient(circle at 30% 30%, rgba(249,115,22,0.1) 0%, transparent 50%)',
                              ],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                          />
                        <motion.img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="max-h-full object-contain relative z-10"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          />
                        </div>
                        <div className="p-6 relative">
                          <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                            {relatedProduct.category}
                          </span>
                          <h3 className="text-xl font-display font-bold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                            {relatedProduct.description}
                          </p>
                          <motion.span 
                            className="inline-flex items-center gap-2 text-primary font-semibold"
                            whileHover={{ x: 5 }}
                          >
                            Ver Detalhes
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                          </motion.span>
                        </div>
                      </motion.div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <AnimatedSection delay={0.4} className="text-center mt-16">
                <Link to="/produtos">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-gradient-primary text-primary-foreground px-10 py-4 rounded-full font-semibold"
                  >
                    Ver Todos os Produtos
                    <ArrowRight className="w-5 h-5" />
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