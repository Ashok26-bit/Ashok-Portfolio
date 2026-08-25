import React from 'react';
import { 
  Terminal, 
  Palette, 
  Cpu, 
  Target, 
  CheckCircle 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const About = () => {
  const { profile, about } = usePortfolio();

  const defaultHighlights = [
    {
      icon: Terminal,
      title: "Full Stack Architecture",
      description: "End-to-end development expertise spanning relational schemas, Spring Boot REST microservices, reactive React state, and mobile clients."
    },
    {
      icon: Palette,
      title: "Traditional Art & Attention to Detail",
      description: "Skilled in traditional Indian sketching and intricate drawings — fostering patience, precision, aesthetic discipline, and creative problem solving."
    },
    {
      icon: Cpu,
      title: "Robust Engineering Foundation",
      description: "Sound grasp of Object-Oriented Design, Data Structures & Algorithms, Clean Code principles, and REST API design patterns."
    },
    {
      icon: Target,
      title: "Agile & Product-Minded",
      description: "Hands-on experience from real-world internships (Corizo) and solo full-stack platform building (ArtIn) tackling genuine user pain points."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white border-y border-[#E5EDF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDF1] text-[#3A637B] text-xs font-bold uppercase tracking-wider">
            <span>Engineering & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#17212B]">
            About {profile.name || "Ashok K"}
          </h2>
          <p className="text-sm sm:text-base text-[#52616B]">
            Bridging robust backend engineering, responsive frontend experiences, and creative precision.
          </p>
        </div>

        {/* Two-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: Bio Narrative */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#52616B] leading-relaxed">
            <p>
              I am a dedicated <strong className="text-[#17212B]">Computer Science and Engineering undergraduate</strong> at {profile.college || "M.A.M College of Engineering and Technology"} (Class of 2027) with a strong passion for solving real-world challenges through clean, scalable software.
            </p>
            <p>
              My development experience spans enterprise backend development with <strong className="text-[#17212B]">Java & Spring Boot</strong>, reactive frontends in <strong className="text-[#17212B]">React</strong>, and native/cross-platform app engineering in <strong className="text-[#17212B]">Android Studio & Flutter</strong>. During my web development internship at <strong className="text-[#17212B]">Corizo</strong>, I built e-commerce modules with full-fledged CRUD operations and secure role-based access.
            </p>
            <p>
              Beyond the terminal, I am an avid practitioner of <strong className="text-[#17212B]">traditional Indian art and pencil sketching</strong>. This fine-art background enriches my engineering perspective, granting me an eye for pixel-perfection, UI rhythm, and user empathy that translates into superior digital experiences.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17212B] bg-[#F8FAFC] border border-[#D3E2EB] px-3.5 py-2 rounded-xl">
                <CheckCircle className="w-4 h-4 text-[#3A637B]" />
                Clean Code & Scalable Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17212B] bg-[#F8FAFC] border border-[#D3E2EB] px-3.5 py-2 rounded-xl">
                <CheckCircle className="w-4 h-4 text-[#3A637B]" />
                Bilingual Problem Solver (Code + Art)
              </span>
            </div>
          </div>

          {/* Right: Key Facts Matrix */}
          <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl border border-[#D3E2EB] p-6 sm:p-8 space-y-4 shadow-card">
            <h3 className="text-base font-bold text-[#17212B] pb-2 border-b border-[#E5EDF1]">
              Quick Facts & Profile Details
            </h3>

            <dl className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-[#E5EDF1]/60">
                <dt className="text-[#52616B] font-medium">Name</dt>
                <dd className="font-bold text-[#17212B]">{profile.name || "Ashok K"}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5EDF1]/60">
                <dt className="text-[#52616B] font-medium">Primary Focus</dt>
                <dd className="font-bold text-[#17212B]">{profile.title || "Software Developer "}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5EDF1]/60">
                <dt className="text-[#52616B] font-medium">College</dt>
                <dd className="font-bold text-[#17212B] text-right">{profile.college || "M.A.M College of Eng. & Tech"}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5EDF1]/60">
                <dt className="text-[#52616B] font-medium">Graduation Year</dt>
                <dd className="font-bold text-[#17212B]">2027 ({profile.cgpa || "7.53 CGPA"})</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5EDF1]/60">
                <dt className="text-[#52616B] font-medium">Location</dt>
                <dd className="font-bold text-[#17212B]">{profile.location || "Tamil Nadu, India"}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-[#52616B] font-medium">Languages</dt>
                <dd className="font-bold text-[#17212B]">Tamil, English, Español</dd>
              </div>
            </dl>
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#F8FAFC] hover:bg-white rounded-2xl p-6 border border-[#D3E2EB] hover:border-[#96C2DB] shadow-xs hover:shadow-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#D3E2EB] group-hover:bg-[#96C2DB]/20 group-hover:border-[#96C2DB] flex items-center justify-center text-[#3A637B] mb-4 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#17212B] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[#52616B] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
