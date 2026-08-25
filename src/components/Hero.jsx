import React from 'react';
import { 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  Sparkles, 
  MapPin, 
  GraduationCap
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero = ({ onOpenSettings }) => {
  const { profile, currentAvatar } = usePortfolio();

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#96C2DB]/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-[#E5EDF1] rounded-full blur-2xl transform -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio, and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#96C2DB] shadow-xs text-xs font-semibold text-[#17212B]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{profile.status || "Available for Full-Stack Roles & Internships"}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest text-[#3A637B]">
                Hello & Welcome • I am
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#17212B] leading-tight">
                {profile.name || "Ashok K"}
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-[#3A637B]">
                {profile.title || "Software Developer | Full Stack & App Development"}
              </h2>
            </div>

            {/* Descriptive Summary */}
            <p className="text-sm sm:text-base text-[#52616B] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {profile.bio || "Computer Science Engineering student crafting scalable enterprise backends with Java & Spring Boot, modern web frontends with React, and intuitive mobile solutions with Android & Flutter. Passionate about clean architecture, relational & NoSQL databases, and fine traditional artistry."}
            </p>

            {/* Quick Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-[#52616B]">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E5EDF1]">
                <GraduationCap className="w-4 h-4 text-[#3A637B]" />
                <span>{profile.education || "B.E. CSE (2023–2027)"} • {profile.cgpa || "7.53 CGPA"}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E5EDF1]">
                <MapPin className="w-4 h-4 text-[#3A637B]" />
                <span>{profile.location || "Tamil Nadu, India"}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-sm font-bold shadow-soft hover:shadow-hover transition-all duration-200 group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#E5EDF1]/60 text-[#17212B] border border-[#D3E2EB] text-sm font-semibold shadow-xs transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-[#3A637B]" />
                <span>Contact Me</span>
              </a>

              <a
                href={profile.linkedin || "https://www.linkedin.com/in/ashok-k-ashok/"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#E5EDF1]/60 text-[#52616B] hover:text-[#17212B] border border-[#D3E2EB] text-sm font-medium transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>

              <a
                href={profile.github || "https://github.com/Ashok26-bit"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#E5EDF1]/60 text-[#52616B] hover:text-[#17212B] border border-[#D3E2EB] text-sm font-medium transition-all"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4 text-[#17212B]" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#96C2DB] to-[#3A637B] rounded-3xl blur-xl opacity-30 transform -rotate-3"></div>

              {/* Main Card Container */}
              <div className="relative bg-white rounded-3xl border-2 border-[#D3E2EB] shadow-hover p-6 sm:p-8 space-y-6">
                
                {/* Portrait Frame with double border */}
                <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#96C2DB] via-[#B3D4E6] to-[#3A637B] p-1.5 shadow-soft">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#E5EDF1] border-4 border-white">
                      <img
                        src={currentAvatar}
                        alt="Ashok K Portrait"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/ashok_portrait.jpg';
                        }}
                      />
                    </div>
                  </div>

                  {/* Creative Badge Overlay */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#17212B] text-white px-3.5 py-1 rounded-full text-[11px] font-bold shadow-md whitespace-nowrap flex items-center gap-1.5 border border-white/20">
                    <Sparkles className="w-3.5 h-3.5 text-[#96C2DB]" />
                    <span>{profile.name || "Ashok K"}</span>
                  </div>
                </div>

                {/* Profile Key Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5EDF1] text-center">
                  <div className="p-2 rounded-xl bg-[#F8FAFC]">
                    <div className="text-base font-extrabold text-[#17212B]">B.E. CSE</div>
                    <div className="text-[10px] font-medium text-[#52616B] uppercase">Degree</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F8FAFC]">
                    <div className="text-base font-extrabold text-[#3A637B]">7.53</div>
                    <div className="text-[10px] font-medium text-[#52616B] uppercase">CGPA</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F8FAFC]">
                    <div className="text-base font-extrabold text-[#17212B]">5+</div>
                    <div className="text-[10px] font-medium text-[#52616B] uppercase">Certs</div>
                  </div>
                </div>

                {/* Technical Highlights Chips */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#52616B]">Core Specializations</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Java', 'Spring Boot', 'React', 'MongoDB', 'REST APIs', 'Traditional Art'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-[#E5EDF1]/70 text-[#17212B] text-[11px] font-semibold border border-[#D3E2EB]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Settings shortcut button */}
                <button
                  onClick={onOpenSettings}
                  className="w-full text-center text-xs text-[#52616B] hover:text-[#17212B] underline decoration-[#96C2DB] underline-offset-4 py-1"
                >
                  Manage Portfolio & Profile Photo (Admin)
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
