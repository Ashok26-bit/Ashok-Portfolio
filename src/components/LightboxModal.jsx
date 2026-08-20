import React, { useEffect } from 'react';
import { X, Calendar, Layers, Sparkles, MessageCircle } from 'lucide-react';

export const LightboxModal = ({ artwork, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
        aria-label="Close Preview"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-4xl w-full max-h-[90vh] bg-[#17212B] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row">
        
        {/* Full Image */}
        <div className="md:w-3/5 bg-black flex items-center justify-center p-4 overflow-hidden">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-h-[60vh] md:max-h-[80vh] w-auto object-contain rounded-xl"
          />
        </div>

        {/* Details Side Panel */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-white bg-[#17212B]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#96C2DB] text-[#17212B] text-xs font-bold uppercase tracking-wider">
                {artwork.category}
              </span>
              <span className="text-xs text-[#E5EDF1]/60 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {artwork.dateAdded || "Original Art"}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
              {artwork.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#E5EDF1]/80 leading-relaxed">
              {artwork.description}
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-[#E5EDF1]/70">
              <div className="font-semibold text-white">Artist: Ashok K</div>
              <div>Medium: Traditional Charcoal, Pencil & Indian Motif Study</div>
              <div>Authenticity: Original hand-drawn artwork</div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <a
              href="#contact"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#96C2DB] hover:bg-[#B3D4E6] text-[#17212B] text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire About Commission</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
