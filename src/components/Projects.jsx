import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  Sparkles, 
  Edit3
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Projects = ({ onOpenSettings }) => {
  const { projects, isAdmin } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Full Stack', 'Web & Enterprise'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDF1] text-[#3A637B] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Featured Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#17212B]">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-[#52616B] mt-1">
              Production-oriented applications engineered with clean architectural patterns.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={onOpenSettings}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft transition-all"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Projects</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#3A637B] text-white shadow-soft'
                    : 'bg-white text-[#52616B] hover:text-[#17212B] hover:bg-[#E5EDF1] border border-[#D3E2EB]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-[#D3E2EB] p-6 sm:p-8 shadow-card hover:shadow-hover hover:border-[#96C2DB] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Top Pill & Actions */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5EDF1]">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#E5EDF1] text-[#3A637B] text-xs font-bold">
                      {project.category || "Full Stack"}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl || "https://github.com/Ashok26-bit"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-[#52616B] hover:text-[#17212B] hover:bg-[#E5EDF1] transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#3A637B] text-white hover:bg-[#223E4F] transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#17212B] group-hover:text-[#3A637B] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#3A637B] mt-1 mb-4">
                  {project.subtitle}
                </p>

                {/* Main Description */}
                <p className="text-xs sm:text-sm text-[#52616B] leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Problem Solved & Key Contributions */}
                <div className="space-y-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF1] mb-6">
                  {project.problemSolved && (
                    <div className="text-xs">
                      <strong className="text-[#17212B] block mb-1">🎯 Problem Solved:</strong>
                      <span className="text-[#52616B]">{project.problemSolved}</span>
                    </div>
                  )}
                  {project.keyContribution && (
                    <div className="text-xs">
                      <strong className="text-[#17212B] block mb-1">⚡ Key Engineering Contribution:</strong>
                      <span className="text-[#52616B]">{project.keyContribution}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="pt-4 border-t border-[#E5EDF1]">
                <div className="text-[11px] font-semibold text-[#52616B] mb-2">Technologies Used</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-[#E5EDF1]/70 text-[11px] font-semibold text-[#17212B] border border-[#D3E2EB]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Repository CTA Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#17212B] to-[#223E4F] text-white shadow-hover flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-display">
              Looking for more repositories and source code?
            </h3>
            <p className="text-xs sm:text-sm text-[#96C2DB]">
              Explore Ashok K's active repositories, commits, and problem solving on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/Ashok26-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#96C2DB] hover:bg-[#B3D4E6] text-[#17212B] text-xs sm:text-sm font-bold shadow-soft transition-all duration-200 shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>Visit Ashok26-bit on GitHub</span>
          </a>
        </div>

      </div>
    </section>
  );
};
