import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'A Involts', href: '#sobre' },
  { label: 'Produtos', href: 'https://involtsbrasil.com.br/produtos', external: true },
  { label: 'Assistência', href: '#assistencia' },
  { label: 'Contato', href: '#contato' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="font-display font-bold text-primary-foreground text-xl">I</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-primary opacity-30 blur-lg rounded-lg" />
              </div>
              <span className="font-display font-bold text-2xl text-foreground">
                Involts
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-foreground/70 hover:text-primary transition-colors font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <motion.a
                href="#revendedor"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Seja um Revendedor
              </motion.a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 p-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => !item.external && setIsMobileMenuOpen(false)}
                  className="text-foreground text-xl font-medium"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#revendedor"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-full font-semibold mt-4"
              >
                Seja um Revendedor
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
