import React, { useState } from 'react';
import { 
  Palette, 
  ZoomIn, 
  Trash2, 
  Edit3
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ArtGallery = ({ onOpenLightbox, onOpenSettings }) => {
  const { artworks, isAdmin, deleteArtwork } = usePortfolio();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Sketches', 'Heritage', 'Creative'];

  const filteredArtworks = selectedFilter === 'All'
    ? artworks
    : artworks.filter(a => a.category?.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <section id="art-gallery" className="py-20 bg-white border-y border-[#E5EDF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDF1] text-[#3A637B] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Traditional Craftsmanship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#17212B]">
              Traditional Art & Creative Gallery
            </h2>
            <p className="text-sm sm:text-base text-[#52616B] mt-1 max-w-2xl">
              Original sketches, pencil drawings, and heritage studies by Ashok K reflecting patience, proportional precision, and aesthetic attention to detail.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={onOpenSettings}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft transition-all"
              >
                <Edit3 className="w-4 h-4" />
                <span>Manage Artworks</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#3A637B] text-white shadow-soft'
                    : 'bg-[#F8FAFC] text-[#52616B] hover:text-[#17212B] hover:bg-[#E5EDF1] border border-[#D3E2EB]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              className="group bg-[#F8FAFC] rounded-3xl border border-[#D3E2EB] overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 flex flex-col justify-between"
            >
              {/* Artwork Image Container */}
              <div 
                className="relative aspect-4/3 w-full bg-[#E5EDF1] overflow-hidden cursor-pointer"
                onClick={() => onOpenLightbox(art)}
              >
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-[#17212B]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/90 text-[#17212B] shadow-dropdown transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#17212B] shadow-xs">
                  {art.category || "Sketch"}
                </div>
              </div>

              {/* Caption & Description */}
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#17212B]">
                    {art.title}
                  </h3>
                  {art.dateAdded && (
                    <span className="text-[11px] text-[#52616B]">
                      {art.dateAdded}
                    </span>
                  )}
                </div>

                {art.description && (
                  <p className="text-xs text-[#52616B] leading-relaxed">
                    {art.description}
                  </p>
                )}

                {isAdmin && (
                  <div className="pt-3 border-t border-[#E5EDF1] flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete "${art.title}" from gallery?`)) {
                          deleteArtwork(art.id);
                        }
                      }}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Art Note Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#F8FAFC] border border-[#D3E2EB] flex items-center gap-4 text-xs sm:text-sm text-[#52616B]">
          <div className="w-10 h-10 rounded-xl bg-[#E5EDF1] text-[#3A637B] flex items-center justify-center shrink-0">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-[#17212B] font-bold">Why Traditional Art?</strong>
            <p className="mt-0.5">
              Developing intricate drawings trains deep visual balance, structural awareness, patience, and deliberate execution — traits that directly translate to writing clean, maintainable, and elegant software.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
