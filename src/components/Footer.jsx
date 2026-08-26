import React from 'react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  ArrowUp, 
  ShieldCheck
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer = ({ onOpenSettings }) => {
  const { profile, isAdmin } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#17212B] text-white pt-16 pb-12 border-t border-[#223E4F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Ashok K logo"
                className="w-10 h-10 rounded-xl object-contain bg-white shadow-sm"
              />
              <div>
                <span className="font-display font-bold text-lg tracking-tight block">
                  {profile.name || "Ashok K"}
                </span>
                <span className="text-[11px] font-medium text-[#96C2DB] tracking-wider uppercase">
                  {profile.title || "Software Developer | Full Stack & App Development"}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Crafting scalable enterprise microservices with Java & Spring Boot, reactive user interfaces with React, and expressive traditional fine art.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.linkedin || "https://www.linkedin.com/in/ashok-k-ashok/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#0A66C2] flex items-center justify-center text-white transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={profile.github || "https://github.com/Ashok26-bit"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white hover:text-[#17212B] flex items-center justify-center text-white transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={profile.instagram || "https://www.instagram.com/ashok_._artist/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E4405F] flex items-center justify-center text-white transition-colors"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${profile.email || "ashokk.profile.in@gmail.com"}`}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#3A637B] flex items-center justify-center text-white transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#96C2DB]">
              Portfolio Sections
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#94A3B8]">
              <a href="#hero" className="hover:text-white transition-colors">Home / Hero</a>
              <a href="#about" className="hover:text-white transition-colors">About Me</a>
              <a href="#skills" className="hover:text-white transition-colors">Technical Skills</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#education" className="hover:text-white transition-colors">Education</a>
              <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
              <a href="#art-gallery" className="hover:text-white transition-colors">Art Gallery</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Col 3: Portal Controls */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#96C2DB]">
              Admin & Controls
            </h4>
            <p className="text-xs text-[#94A3B8]">
              Portfolio management suite with cloud persistence via MongoDB Atlas and Cloudinary media storage.
            </p>

            <button
              onClick={onOpenSettings}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/10 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#96C2DB]" />
              <span>{isAdmin ? 'Admin Dashboard (Active)' : 'Admin Login & Settings'}</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div>
            © {new Date().getFullYear()} Ashok K. All rights reserved.
          </div>

          <div className="flex items-center gap-1">
            <span>Built with precision for Ashok K • Java & React Full Stack</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white text-xs font-semibold transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
