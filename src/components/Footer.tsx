import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Zap } from 'lucide-react';
import logo2 from '@/assets/logo-2.svg';

const footerLinks = {
  produtos: [
    { label: 'Protetores', href: '/produtos?categoria=protetores' },
    { label: 'Filtros de Linha', href: '/produtos?categoria=filtro-de-linha' },
    { label: 'Autotransformadores', href: '/produtos?categoria=autotransformadores' },
    { label: 'Aterramento', href: '/produtos?categoria=aterramento' },
  ],
  empresa: [
    { label: 'Sobre a Involts', href: '/sobre' },
    { label: 'Rede de Assistência', href: '/assistencia' },
    { label: 'Seja Revendedor', href: '/revendedor' },
    { label: 'Contato', href: '/contato' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/involtsbrasil/', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const contactItems = [
  {
    icon: Phone,
    primary: '(11) 96846-9454',
    secondary: '08h às 12h e 13h às 17h',
    href: 'tel:+5511968469454',
  },
  {
    icon: Mail,
    primary: 'contato@involtsbrasil.com.br',
    secondary: 'Resposta em até 24h',
    href: 'mailto:contato@involtsbrasil.com.br',
  },
  {
    icon: MapPin,
    primary: 'São Paulo, SP',
    secondary: 'Brasil',
    href: null,
  },
];

export const Footer = () => {
  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 circuit-grid opacity-[0.012] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">

        {/* Top divider accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Main grid */}
        <div className="py-14 grid md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 lg:gap-12">

          {/* Brand column */}
          <AnimatedSection animation="fadeUp" delay={0}>
            <Link to="/" className="inline-block mb-6">
              <img src={logo2} alt="Involts Brasil" className="h-10 w-auto" />
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-[30ch]">
              25 anos de know-how no segmento elétrico com presença em todo o Brasil.
              Energia de qualidade em todos os momentos.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, borderColor: 'hsl(22, 76%, 42%)' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </AnimatedSection>

          {/* Products */}
          <AnimatedSection animation="fadeUp" delay={0.08}>
            <h4 className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-5">
              Produtos
            </h4>
            <ul className="space-y-3">
              {footerLinks.produtos.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-border group-hover:bg-primary group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Company */}
          <AnimatedSection animation="fadeUp" delay={0.16}>
            <h4 className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-5">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-border group-hover:bg-primary group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection animation="fadeUp" delay={0.24}>
            <h4 className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-5">
              Contato
            </h4>
            <ul className="space-y-4">
              {contactItems.map((item) => {
                const content = (
                  <div className="flex items-start gap-3 group">
                    <div className="w-7 h-7 border border-border flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary/40 transition-colors duration-200">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-medium group-hover:text-primary transition-colors duration-200">
                        {item.primary}
                      </p>
                      <p className="text-muted-foreground text-xs font-mono mt-0.5">
                        {item.secondary}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <li key={item.primary}>
                    {item.href ? (
                      <a href={item.href}>{content}</a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </AnimatedSection>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs font-mono">
            © {new Date().getFullYear()} Involts Brasil. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>Energia de qualidade em todos os momentos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
