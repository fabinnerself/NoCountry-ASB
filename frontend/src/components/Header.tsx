import { useState } from "react";

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      // Navigate to landing page section
      window.location.href = `/#${section}`;
    }
  };

  return (
    <header className="bg-[#041f59] w-full fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-[91px] py-4 lg:py-0 min-h-[100px] lg:h-[150px]">
        <div className="h-[60px] lg:h-[89px] w-auto">
          <img
            alt="AutoStory Builder Logo"
            className="h-full w-auto object-contain"
            src="/logo.png"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('inicio')}
            className="font-['Julius_Sans_One',sans-serif] text-[18px] lg:text-[24px] text-white hover:text-emerald-500 transition-colors"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('como-funciona')}
            className="font-['Julius_Sans_One',sans-serif] text-[18px] lg:text-[24px] text-white hover:text-emerald-500 transition-colors"
          >
            Cómo Funciona
          </button>
          <button
            onClick={() => handleNavClick('casos-uso')}
            className="font-['Julius_Sans_One',sans-serif] text-[18px] lg:text-[24px] text-white hover:text-emerald-500 transition-colors"
          >
            Casos de uso
          </button>
          <a
            href="/form#formHeader"
            className="bg-emerald-500 h-[40px] lg:h-[50px] rounded-[15px] px-4 lg:px-6 flex items-center justify-center hover:bg-emerald-600 transition-colors"
          >
            <span className="font-['Julius_Sans_One',sans-serif] text-[18px] lg:text-[24px] text-white whitespace-nowrap">
              Comenzar gratis
            </span>
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden flex flex-col items-center gap-6 pb-8 bg-[#041f59] border-t border-white/10 pt-6">
          <button
            onClick={() => {
              handleNavClick('inicio');
              setMobileMenuOpen(false);
            }}
            className="font-['Julius_Sans_One',sans-serif] text-[20px] text-white hover:text-emerald-500 transition-colors"
          >
            Inicio
          </button>
          <button
            onClick={() => {
              handleNavClick('como-funciona');
              setMobileMenuOpen(false);
            }}
            className="font-['Julius_Sans_One',sans-serif] text-[20px] text-white hover:text-emerald-500 transition-colors"
          >
            Cómo Funciona
          </button>
          <button
            onClick={() => {
              handleNavClick('casos-uso');
              setMobileMenuOpen(false);
            }}
            className="font-['Julius_Sans_One',sans-serif] text-[20px] text-white hover:text-emerald-500 transition-colors"
          >
            Casos de uso
          </button>
          <a
            href="/form#formHeader"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-emerald-500 h-[45px] rounded-[15px] px-8 flex items-center justify-center hover:bg-emerald-600 transition-colors"
          >
            <span className="font-['Julius_Sans_One',sans-serif] text-[20px] text-white whitespace-nowrap">
              Comenzar gratis
            </span>
          </a>
        </nav>
      )}
    </header>
  );
}