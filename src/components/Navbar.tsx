import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (id: string) => void;
  onStartPresentation?: () => void;
}

export default function Navbar({ onNavigate, onStartPresentation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Le métier', href: '#concept' },
    { label: 'Fonctionnement', href: '#fonctionnement' },
    { label: 'Le médecin', href: '#medecin' },
    { label: 'Le robot', href: '#robot' },
    { label: 'Bloc opératoire', href: '#bloc-operatoire' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href.replace('#', ''));
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartPresentation = () => {
    setMobileMenuOpen(false);
    if (onStartPresentation) {
      onStartPresentation();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050811]/92 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-black/50'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 h-20">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="text-lg font-bold tracking-tight text-white flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_10px_#06b6d4] group-hover:scale-125 transition-transform"></span>
            <span className="tracking-wider uppercase text-sm sm:text-base font-bold">
              Chirurgien <span className="text-cyan-400 font-extrabold glow-text-cyan">du futur</span>
            </span>
          </a>

          {/* Navigation Links with simple French student labels */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 relative py-1 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action buttons: MODE PRÉSENTATION + Découvrir */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* ▶ MODE PRÉSENTATION (Always visible in navbar across the entire site) */}
            <button
              type="button"
              onClick={handleStartPresentation}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-cyan-600 via-cyan-500 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.45)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] active:scale-95 cursor-pointer border border-cyan-400/40"
              title="Lancer le mode présentation plein écran pour la soutenance orale"
            >
              <span className="text-cyan-200 text-sm animate-pulse">▶</span>
              <span className="font-mono">MODE PRÉSENTATION</span>
            </button>

            <a
              href="#concept"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#concept');
              }}
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold tracking-wide uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-lg hover:from-cyan-300 hover:to-cyan-200 transition-all whitespace-nowrap shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.25)] active:scale-95 cursor-pointer"
            >
              <span>Découvrir</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-cyan-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070c18] border-b border-cyan-500/20 px-6 py-5 shadow-2xl space-y-3 backdrop-blur-xl">
          <div className="flex flex-col space-y-3">
            {/* Direct Mobile trigger for Presentation Mode */}
            <button
              type="button"
              onClick={handleStartPresentation}
              className="inline-flex justify-center items-center gap-2 w-full py-3 text-xs font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-400/40 active:scale-95"
            >
              <span className="text-cyan-200">▶</span>
              <span>Lancer le Mode Présentation</span>
            </button>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-base font-medium text-slate-200 hover:text-cyan-400 py-2 border-b border-slate-800/80 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-cyan-400/60">→</span>
              </a>
            ))}
            <a
              href="#concept"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#concept');
              }}
              className="inline-flex justify-center items-center gap-2 w-full mt-2 px-4 py-2.5 text-xs font-bold tracking-wide uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-lg hover:bg-cyan-200 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <span>Découvrir le métier</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
