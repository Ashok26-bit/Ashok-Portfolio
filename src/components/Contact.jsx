import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  CheckCircle2, 
  MessageSquare
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact = () => {
  const { profile, submitContactMessage } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await submitContactMessage(
        formData.name,
        formData.email,
        formData.subject || 'Portfolio Inquiry',
        formData.message
      );
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrorMsg('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDF1] text-[#3A637B] text-xs font-bold uppercase tracking-wider">
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#17212B]">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-[#52616B]">
            Whether you have a full-stack opportunity, collaboration proposal, or project discussion, feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#D3E2EB] p-6 sm:p-8 space-y-6 shadow-card">
              <h3 className="text-xl font-bold font-display text-[#17212B]">
                Contact Information
              </h3>
              <p className="text-xs sm:text-sm text-[#52616B] leading-relaxed">
                I am actively seeking software engineering roles, Java full-stack internships, and technical collaborations. Let's build something remarkable.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email Channel */}
                <a
                  href={`mailto:${profile.email || "ashokk.profile.in@gmail.com"}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF1] hover:border-[#96C2DB] hover:bg-[#E5EDF1]/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E5EDF1] text-[#3A637B] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-semibold text-[#52616B]">Email</div>
                    <div className="text-xs sm:text-sm font-bold text-[#17212B] truncate">
                      {profile.email || "ashokk.profile.in@gmail.com"}
                    </div>
                  </div>
                </a>

                {/* Phone Channel */}
                <a
                  href={`tel:${profile.phone || "+919342112189"}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF1] hover:border-[#96C2DB] hover:bg-[#E5EDF1]/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E5EDF1] text-[#3A637B] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[#52616B]">Phone / WhatsApp</div>
                    <div className="text-xs sm:text-sm font-bold text-[#17212B]">
                      {profile.phone || "+91 93421 12189"}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF1]">
                  <div className="w-10 h-10 rounded-xl bg-[#E5EDF1] text-[#3A637B] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[#52616B]">Location</div>
                    <div className="text-xs sm:text-sm font-bold text-[#17212B]">
                      {profile.location || "Tamil Nadu, India"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#E5EDF1] space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#52616B]">
                  Professional Profiles
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={profile.linkedin || "https://www.linkedin.com/in/ashok-k-ashok/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] border border-[#0A66C2]/20 text-xs font-bold transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profile.github || "https://github.com/Ashok26-bit"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#17212B]/10 hover:bg-[#17212B]/20 text-[#17212B] border border-[#17212B]/20 text-xs font-bold transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#D3E2EB] p-6 sm:p-10 shadow-card">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-soft">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[#17212B]">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-sm text-[#52616B] max-w-md mx-auto">
                    Your message has been sent successfully to Ashok K. I will review it and reply as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-5 h-5 text-[#3A637B]" />
                    <h3 className="text-xl font-bold font-display text-[#17212B]">
                      Send a Direct Message
                    </h3>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ashok"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs sm:text-sm text-[#17212B] focus:outline-none focus:border-[#3A637B] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ashok@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs sm:text-sm text-[#17212B] focus:outline-none focus:border-[#3A637B] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Full Stack Developer Opportunity"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs sm:text-sm text-[#17212B] focus:outline-none focus:border-[#3A637B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message, project specifications, or collaboration thoughts here..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs sm:text-sm text-[#17212B] focus:outline-none focus:border-[#3A637B] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-sm font-bold shadow-soft hover:shadow-hover transition-all duration-200 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
