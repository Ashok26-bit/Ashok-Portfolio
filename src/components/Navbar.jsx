import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Settings, 
  ShieldCheck, 
  Mail
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar = ({ onOpenSettings }) => {
  const { isAdmin, unreadMessageCount } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Art Gallery', href: '#art-gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certifications', 'art-gallery', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-soft py-3 border-b border-[#E5EDF1] bg-white/90 backdrop-blur-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            href="#hero" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <img
              src="/logo.jpg"
              alt="Ashok K logo"
              className="w-10 h-10 rounded-xl object-contain bg-white shadow-sm group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-[#17212B] block leading-tight">
                Ashok K
              </span>
              <span className="text-[11px] font-medium text-[#52616B] tracking-wider uppercase">
                Java Full Stack Dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E5EDF1] shadow-xs">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#3A637B] text-white shadow-xs'
                      : 'text-[#52616B] hover:text-[#17212B] hover:bg-[#E5EDF1]/70'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions: Admin Portal & Get In Touch */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Settings & Admin Button */}
            <button
              onClick={onOpenSettings}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                isAdmin 
                  ? 'bg-[#96C2DB]/20 border-[#96C2DB] text-[#223E4F] hover:bg-[#96C2DB]/30' 
                  : 'bg-white border-[#D3E2EB] text-[#52616B] hover:text-[#17212B] hover:border-[#96C2DB]'
              }`}
              title="Settings & Admin Portal"
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#3A637B]" />
                  <span>Admin Mode</span>
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 text-[#52616B]" />
                  <span>Settings</span>
                </>
              )}
              
              {unreadMessageCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {unreadMessageCount}
                </span>
              )}
            </button>

            {/* Quick Contact CTA */}
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-semibold shadow-soft hover:shadow-hover transition-all duration-200 active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-white border border-[#D3E2EB] text-[#52616B] relative"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
              {unreadMessageCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadMessageCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white border border-[#D3E2EB] text-[#17212B] focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-[#E5EDF1] shadow-dropdown px-4 pt-3 pb-6 space-y-2 animate-slide-up">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-xs font-semibold text-[#52616B] hover:text-[#17212B] hover:bg-[#E5EDF1]/60 text-center transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E5EDF1] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettings();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#96C2DB] text-xs font-semibold text-[#17212B] bg-[#96C2DB]/10"
            >
              <Settings className="w-4 h-4" />
              <span>Settings & Admin Portal ({isAdmin ? 'Admin' : 'Viewer'})</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#3A637B] text-white text-xs font-semibold shadow-soft"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Ashok K</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
