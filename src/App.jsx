import React, { useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { ArtGallery } from './components/ArtGallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SettingsModal } from './components/SettingsModal';
import { LightboxModal } from './components/LightboxModal';
import { Toast } from './components/Toast';

function PortfolioMain() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [lightboxArtwork, setLightboxArtwork] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#17212B] flex flex-col selection:bg-[#96C2DB]/40 font-sans antialiased">
      {/* Top Fixed Navbar */}
      <Navbar onOpenSettings={() => setSettingsOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onOpenSettings={() => setSettingsOpen(true)} />

        {/* 2. About Me */}
        <About />

        {/* 3. Technical Skills */}
        <Skills onOpenSettings={() => setSettingsOpen(true)} />

        {/* 4. Experience */}
        <Experience onOpenSettings={() => setSettingsOpen(true)} />

        {/* 5. Projects */}
        <Projects onOpenSettings={() => setSettingsOpen(true)} />

        {/* 6. Education */}
        <Education />

        {/* 7. Certifications */}
        <Certifications onOpenSettings={() => setSettingsOpen(true)} />

        {/* 8. Traditional Art & Creative Gallery */}
        <ArtGallery
          onOpenLightbox={(artwork) => setLightboxArtwork(artwork)}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        {/* 9. Contact */}
        <Contact />
      </main>

      {/* 10. Footer */}
      <Footer onOpenSettings={() => setSettingsOpen(true)} />

      {/* Settings & Admin Suite Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Artwork Lightbox Preview Modal */}
      <LightboxModal
        artwork={lightboxArtwork}
        onClose={() => setLightboxArtwork(null)}
      />

      {/* Global Notifications Toast */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}
