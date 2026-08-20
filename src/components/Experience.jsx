import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Award,
  Edit3
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience = ({ onOpenSettings }) => {
  const { experiences, isAdmin } = usePortfolio();

  return (
    <section id="experience" className="py-20 bg-white border-y border-[#E5EDF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDF1] text-[#3A637B] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Work & Development History</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#17212B]">
              Professional Experience
            </h2>
            <p className="text-sm sm:text-base text-[#52616B] mt-1">
              Demonstrated track record across structured internships and platform architecture.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft transition-all shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Experience in Settings</span>
            </button>
          )}
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-[#E5EDF1] before:pointer-events-none">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={exp.id || idx}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              >
                {/* Timeline Center Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-6 w-8 h-8 rounded-full bg-white border-4 border-[#96C2DB] flex items-center justify-center z-10 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#3A637B]" />
                </div>

                {/* Left side on desktop for even items, right for odd */}
                <div className={`pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12'}`}>
                  <div className="bg-[#F8FAFC] rounded-2xl border border-[#D3E2EB] p-6 sm:p-8 shadow-card hover:shadow-hover transition-all text-left">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-[#96C2DB]/20 text-[#223E4F] text-xs font-bold border border-[#96C2DB]/40">
                        {exp.roleType || "Internship"}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-[#52616B] font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#3A637B]" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#17212B]">
                      {exp.title}
                    </h3>
                    <div className="text-sm font-semibold text-[#3A637B] mb-3">
                      {exp.organization}
                    </div>

                    {exp.credentialId && (
                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#52616B] bg-white border border-[#E5EDF1] px-3 py-1 rounded-lg mb-4">
                        <Award className="w-3.5 h-3.5 text-[#3A637B]" />
                        <span>{exp.credentialId}</span>
                      </div>
                    )}

                    {/* Bullet Highlights */}
                    <ul className="space-y-2.5 my-4 text-xs sm:text-sm text-[#52616B]">
                      {exp.bullets?.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#3A637B] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    {exp.technologies && (
                      <div className="pt-4 border-t border-[#E5EDF1] flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-white text-[11px] font-semibold text-[#17212B] border border-[#D3E2EB]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </div>

                {/* Empty side for layout symmetry on desktop */}
                <div className={`hidden md:block ${isEven ? 'order-2' : 'order-1'}`} />

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
