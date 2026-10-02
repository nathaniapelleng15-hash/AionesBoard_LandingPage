import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenDemo: () => void;
}

export default function Header({ onOpenDemo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('manfaat');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo: aionesboard logo image */}
        <a
          href="#"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1446] rounded py-1"
          aria-label="aionesboard, beranda"
        >
          <img
            src="/aionesboard_logo.png"
            alt="aionesboard"
            className="h-9 sm:h-10 md:h-11 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-semibold text-slate-700"
          aria-label="Navigasi Utama"
        >
          <button
            onClick={() => handleNavClick('manfaat')}
            className={`transition-colors py-1 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1446] rounded ${
              activeNav === 'manfaat' ? 'text-[#1b1446] font-bold' : 'text-slate-600 hover:text-[#1b1446]'
            }`}
          >
            Manfaat
            {activeNav === 'manfaat' && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1b1446]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => handleNavClick('fitur')}
            className={`transition-colors py-1 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1446] rounded ${
              activeNav === 'fitur' ? 'text-[#1b1446] font-bold' : 'text-slate-600 hover:text-[#1b1446]'
            }`}
          >
            Fitur
            {activeNav === 'fitur' && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1b1446]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => handleNavClick('cara-kerja')}
            className={`transition-colors py-1 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1446] rounded ${
              activeNav === 'cara-kerja' ? 'text-[#1b1446] font-bold' : 'text-slate-600 hover:text-[#1b1446]'
            }`}
          >
            Cara Kerja
            {activeNav === 'cara-kerja' && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1b1446]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => handleNavClick('contoh')}
            className={`transition-colors py-1 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1446] rounded ${
              activeNav === 'contoh' ? 'text-[#1b1446] font-bold' : 'text-slate-600 hover:text-[#1b1446]'
            }`}
          >
            Contoh Penggunaan
            {activeNav === 'contoh' && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1b1446]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenDemo}
            className="h-10 px-5 text-sm font-bold text-white bg-[#1b1446] hover:bg-[#281f62] active:bg-[#150f38] rounded-lg transition-colors whitespace-nowrap shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1446] focus-visible:ring-offset-2 cursor-pointer"
          >
            Jadwalkan Demo
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-[#1b1446] rounded-lg hover:bg-slate-100"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 overflow-hidden"
          >
            <button
              onClick={() => handleNavClick('manfaat')}
              className={`block w-full text-left px-3 py-2 text-sm font-semibold rounded-lg ${
                activeNav === 'manfaat' ? 'bg-purple-50 text-[#1b1446]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Manfaat
            </button>
            <button
              onClick={() => handleNavClick('fitur')}
              className={`block w-full text-left px-3 py-2 text-sm font-semibold rounded-lg ${
                activeNav === 'fitur' ? 'bg-purple-50 text-[#1b1446]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Fitur
            </button>
            <button
              onClick={() => handleNavClick('cara-kerja')}
              className={`block w-full text-left px-3 py-2 text-sm font-semibold rounded-lg ${
                activeNav === 'cara-kerja' ? 'bg-purple-50 text-[#1b1446]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Cara Kerja
            </button>
            <button
              onClick={() => handleNavClick('contoh')}
              className={`block w-full text-left px-3 py-2 text-sm font-semibold rounded-lg ${
                activeNav === 'contoh' ? 'bg-purple-50 text-[#1b1446]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contoh Penggunaan
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full h-11 text-center text-sm font-bold text-white bg-[#1b1446] rounded-lg hover:bg-[#281f62]"
              >
                Jadwalkan Demo
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
