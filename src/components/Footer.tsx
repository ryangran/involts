import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { Zap, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
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
  ]
};
const socialLinks = [{
  icon: Instagram,
  href: 'https://www.instagram.com/involtsbrasil/',
  label: 'Instagram'
}, {
  icon: Facebook,
  href: '#',
  label: 'Facebook'
}, {
  icon: Linkedin,
  href: '#',
  label: 'LinkedIn'
}];
export const Footer = () => {
  return <footer id="contato" className="relative bg-muted/50 border-t border-border overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <AnimatedSection delay={0} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo2} alt="Involts" className="h-12 w-auto" />
              <span className="font-display font-bold text-2xl text-foreground">
                ​

              </span>
            </div>
            <p className="text-foreground/60 mb-6">
              25 anos de know-how no segmento com presença em todo Brasil. 
              Energia de qualidade em todos os momentos.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(social => <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{
              scale: 1.1,
              y: -2
            }} whileTap={{
              scale: 0.95
            }} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors" aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </motion.a>)}
            </div>
          </AnimatedSection>

          {/* Products */}
          <AnimatedSection delay={0.1}>
            <h4 className="font-display font-semibold text-foreground mb-6">Produtos</h4>
            <ul className="space-y-3">
              {footerLinks.produtos.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Company */}
          <AnimatedSection delay={0.2}>
            <h4 className="font-display font-semibold text-foreground mb-6">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection delay={0.3}>
            <h4 className="font-display font-semibold text-foreground mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground/60">(11) 96846-9454</p>
                  <p className="text-foreground/40 text-sm">08h às 12h e 13h às 17h</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:contato@involtsbrasil.com.br" className="text-foreground/60 hover:text-primary transition-colors">
                  contato@involtsbrasil.com.br
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-foreground/60">
                  São Paulo, SP<br />
                  Brasil
                </p>
              </li>
            </ul>
          </AnimatedSection>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/40 text-sm">
            © {new Date().getFullYear()} Involts Brasil. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-foreground/40 text-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span>Energia de qualidade em todos os momentos</span>
          </div>
        </div>
      </div>
    </footer>;
};