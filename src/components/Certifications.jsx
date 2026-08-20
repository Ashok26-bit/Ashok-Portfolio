import React from 'react';
import { 
  Award, 
  ExternalLink, 
  Calendar,
  Edit3
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Certifications = ({ onOpenSettings }) => {
  const { certifications, isAdmin } = usePortfolio();

  return (
    <section id="certifications" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDF1] text-[#3A637B] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#17212B]">
              Certifications & Credentials
            </h2>
            <p className="text-sm sm:text-base text-[#52616B] mt-1">
              Industry credentials and coursework across Java, Web Engineering, Big Data, and Cybersecurity.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft transition-all shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Certifications</span>
            </button>
          )}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-[#D3E2EB] p-6 shadow-card hover:shadow-hover hover:border-[#96C2DB] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5EDF1]">
                  <div className="w-10 h-10 rounded-xl bg-[#E5EDF1] text-[#3A637B] flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#52616B]">
                    <Calendar className="w-3.5 h-3.5 text-[#3A637B]" />
                    <span>{cert.issueDate}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#17212B] mb-1">
                  {cert.title}
                </h3>
                <div className="text-xs font-semibold text-[#3A637B] mb-3">
                  {cert.issuer}
                </div>

                {cert.credentialId && (
                  <div className="text-[11px] font-mono text-[#52616B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E5EDF1] mb-4 break-all">
                    ID: {cert.credentialId}
                  </div>
                )}

                {/* Skills Covered */}
                {cert.skillsCovered && (
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#52616B]">
                      Competencies
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cert.skillsCovered.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-[#E5EDF1]/60 text-[10px] font-medium text-[#17212B]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {cert.verificationUrl && (
                <div className="pt-3 border-t border-[#E5EDF1]">
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3A637B] hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
