import React, { useState } from 'react';
import { 
  Code, 
  Layers, 
  Globe, 
  Database, 
  Wrench, 
  BookOpen, 
  Edit3, 
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Skills = ({ onOpenSettings }) => {
  const { skillCategories, isAdmin } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryIcons = {
    "Programming Languages": Code,
    "Frameworks & Development": Layers,
    "Web Technologies": Globe,
    "Database & Cloud": Database,
    "Tools & Platforms": Wrench,
    "Core Concepts": BookOpen,
  };

  const allCategories = ['All', ...skillCategories.map(c => c.title)];

  const filteredCategories = selectedCategory === 'All'
    ? skillCategories
    : skillCategories.filter(c => c.title === selectedCategory);

  return (
    <section id="skills" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDF1] text-[#3A637B] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Technical Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#17212B]">
              Skills & Tech Stack
            </h2>
            <p className="text-sm sm:text-base text-[#52616B] mt-1">
              Proficiencies across enterprise backend, reactive UI, database modeling, and mobile engineering.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft transition-all shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Skills in Settings</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
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

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = categoryIcons[category.title] || Code;
            return (
              <div
                key={category.title}
                className="bg-white rounded-2xl border border-[#D3E2EB] p-6 shadow-card hover:shadow-hover hover:border-[#96C2DB] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Title with Icon */}
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#E5EDF1]">
                    <div className="w-10 h-10 rounded-xl bg-[#E5EDF1] text-[#3A637B] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#17212B]">
                        {category.title}
                      </h3>
                      <span className="text-[11px] text-[#52616B]">
                        {category.skills?.length || 0} core competencies
                      </span>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-2.5">
                    {category.skills?.map((skill) => (
                      <div
                        key={skill.id || skill.name}
                        className="group flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5EDF1] hover:bg-[#E5EDF1]/50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#3A637B] shrink-0" />
                          <div>
                            <div className="text-xs font-bold text-[#17212B]">
                              {skill.name}
                            </div>
                            <div className="text-[10px] text-[#52616B]">
                              {skill.level}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5EDF1]/60 flex items-center justify-between text-[11px] text-[#52616B]">
                  <span>Practical application in projects</span>
                  <span className="font-semibold text-[#3A637B]">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
