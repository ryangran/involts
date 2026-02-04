import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Users, Globe, Package, Cpu, Shield, Zap, Award, HeartHandshake } from 'lucide-react';

const diferenciais = [
  {
    icon: Users,
    title: '25 anos de know-how',
    description: 'no segmento',
  },
  {
    icon: Globe,
    title: 'Presença em todo',
    description: 'Brasil',
  },
  {
    icon: Package,
    title: 'Ampla linha de',
    description: 'produtos',
  },
  {
    icon: Cpu,
    title: 'Placas montadas',
    description: 'em SMD',
  },
];

const valores = [
  {
    icon: Shield,
    title: 'Qualidade',
    description: 'Produtos desenvolvidos com os mais altos padrões de qualidade e segurança.',
  },
  {
    icon: Zap,
    title: 'Inovação',
    description: 'Soluções tecnológicas modernas para proteção de energia.',
  },
  {
    icon: Award,
    title: 'Confiança',
    description: 'Mais de duas décadas de experiência no mercado brasileiro.',
  },
  {
    icon: HeartHandshake,
    title: 'Compromisso',
    description: 'Atendimento dedicado e suporte técnico em todo o país.',
  },
];

const SobreNos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            <span className="text-primary">A Involts</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
              >
                A <span className="text-gradient">Involts</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-foreground/80 leading-relaxed"
              >
                surge como uma empresa jovem e moderna, que aliada ao{' '}
                <span className="text-primary font-semibold">know-how de 25 anos</span> do seu 
                proprietário, busca oferecer soluções inovadoras e tecnológicas ao setor de 
                proteção de energia, com uma linha que vai desde filtros de linha, protetores 
                e autotransformadores, até estabilizadores e nobreaks de pequeno e médio porte.
              </motion.p>
            </div>

            {/* Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-card to-muted rounded-3xl p-8 border border-border">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
                
                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/50 rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
                    <Package className="w-10 h-10 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground">Filtros de Linha</h3>
                  </div>
                  <div className="bg-background/50 rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
                    <Zap className="w-10 h-10 text-secondary mb-3" />
                    <h3 className="font-semibold text-foreground">Estabilizadores</h3>
                  </div>
                  <div className="bg-background/50 rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
                    <Shield className="w-10 h-10 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground">Autotransformadores</h3>
                  </div>
                  <div className="bg-background/50 rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
                    <Cpu className="w-10 h-10 text-secondary mb-3" />
                    <h3 className="font-semibold text-foreground">Nobreaks</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos <span className="text-gradient">Diferenciais</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O que nos torna a escolha certa para proteção de energia
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {diferenciais.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-card border border-border rounded-2xl p-8 text-center group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:glow-orange transition-all duration-300">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-primary font-bold text-xl">
                    {item.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos <span className="text-gradient">Valores</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam nossa jornada há mais de duas décadas
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-2xl p-6 h-full group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 mb-5 bg-muted rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <valor.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-xl mb-3">
                    {valor.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {valor.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Conheça nossa linha de <span className="text-gradient">produtos</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Soluções completas para proteção de energia residencial e comercial
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/produtos"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                Ver Produtos
              </motion.a>
              <motion.a
                href="/contato"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-foreground/30 text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-foreground/10 transition-all duration-300"
              >
                Fale Conosco
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SobreNos;
