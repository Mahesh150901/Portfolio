import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface TopNavBarProps {
  isHidden?: boolean;
  onOpenResume?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ isHidden = false, onOpenResume }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode state
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Background blur opacity adjustments
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = ['home', 'work', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.offsetTop - 100;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  if (isHidden) return null;

  return (
    <header className={`absolute top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-8 py-4`}>
      <nav 
        className={`ml-auto w-fit rounded-full border transition-all duration-500 px-6 md:px-8 py-3 flex items-center justify-center gap-4
          ${scrolled 
            ? 'glass-panel-dark mt-2' 
            : 'bg-white/50 border-slate-200 backdrop-blur-sm mt-4 dark:bg-white/5 dark:border-white/10'
          }`}
      >
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-on-surface-variant flex items-center justify-center mr-2 md:mr-4"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center justify-end text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          {[
            { id: 'work', label: 'Work' },
            { id: 'skills', label: 'Skills' },
            { id: 'resume', label: 'Resume' }
          ].map((item) => (
            <a
              key={item.id}
              href={item.id === 'resume' ? '#' : `#${item.id}`}
              onClick={(e) => {
                if (item.id === 'resume') {
                  e.preventDefault();
                  onOpenResume?.();
                } else {
                  handleLinkClick(e, item.id);
                }
              }}
              className={`relative py-1 transition-all duration-300 hover:text-on-surface hover:scale-105
                ${activeSection === item.id && item.id !== 'resume'
                  ? 'text-on-surface font-bold border-b border-on-surface' 
                  : 'text-on-surface-variant/80'
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/40 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-on-surface" /> : <Menu className="w-5 h-5 text-on-surface" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 p-6 rounded-3xl glass-panel-dark flex flex-col gap-6 md:hidden z-40 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-widest text-center">
            {[
              { id: 'work', label: 'Work' },
              { id: 'skills', label: 'Skills' },
              { id: 'resume', label: 'Resume' }
            ].map((item) => (
              <a
                key={item.id}
                href={item.id === 'resume' ? '#' : `#${item.id}`}
                onClick={(e) => {
                  if (item.id === 'resume') {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onOpenResume?.();
                  } else {
                    handleLinkClick(e, item.id);
                  }
                }}
                className={`py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors
                  ${activeSection === item.id && item.id !== 'resume'
                    ? 'text-on-surface font-extrabold bg-slate-200/50 dark:bg-white/10' 
                    : 'text-on-surface-variant'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>


        </div>
      )}
    </header>
  );
};
