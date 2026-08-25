import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Education = () => {
  const { education, profile } = usePortfolio();

  return (
    <section id="education" className="py-20 bg-white border-y border-[#E5EDF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDF1] text-[#3A637B] text-xs font-bold uppercase tracking-wider">
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#17212B]">
            Education & Academics
          </h2>
          <p className="text-sm sm:text-base text-[#52616B]">
            Rigorous undergraduate studies in Computer Science & Engineering with strong academic standing.
          </p>
        </div>

        {/* Education Hero Card */}
        <div className="max-w-4xl mx-auto bg-[#F8FAFC] rounded-3xl border border-[#D3E2EB] p-8 sm:p-10 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Icon & Core Details */}
            <div className="md:col-span-7 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#D3E2EB] flex items-center justify-center text-[#3A637B] shadow-soft">
                <GraduationCap className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-[#96C2DB]/20 text-[#223E4F] text-xs font-bold border border-[#96C2DB]/40 inline-block mb-2">
                  Undergraduate Degree
                </span>
                <h3 className="text-2xl font-bold font-display text-[#17212B]">
                  {education.degree || "B.E. Computer Science and Engineering"}
                </h3>
                <p className="text-base font-semibold text-[#3A637B] mt-1">
                  {education.institution || "M.A.M College of Engineering and Technology"}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-medium text-[#52616B] pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#3A637B]" />
                  <span>{education.period || "2023 – 2027"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#3A637B]" />
                  <span>{education.location || "Tamil Nadu, India"}</span>
                </div>
              </div>
            </div>

            {/* Right: CGPA Score Box */}
            <div className="md:col-span-5 bg-white rounded-2xl border border-[#D3E2EB] p-6 text-center shadow-xs">
              <div className="text-xs font-bold text-[#52616B] uppercase tracking-wider mb-1">
                Cumulative Grade Point Average
              </div>
              <div className="text-4xl font-extrabold text-[#3A637B] font-display">
                {profile.cgpa || "7.53"}
              </div>
              <div className="text-xs text-[#52616B] font-medium mt-1">
                Scale of 10.0 • Verified Academic Standing
              </div>
            </div>

          </div>

          {/* Academic Highlights */}
          <div className="mt-8 pt-6 border-t border-[#E5EDF1] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17212B]">
              Key Academic Focus & Coursework
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(education.highlights || [
                "Object Oriented Programming & Design Patterns",
                "Data Structures and Algorithms in Java",
                "Database Management Systems (Relational & NoSQL)",
                "Full-Stack Web Engineering and RESTful Microservices",
                "Operating Systems & Linux Shell Environments",
                "Computer Networks and Cybersecurity Fundamentals"
              ]).map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#52616B]">
                  <CheckCircle2 className="w-4 h-4 text-[#3A637B] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
