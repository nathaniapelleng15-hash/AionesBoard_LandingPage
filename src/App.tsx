import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NeedsContext from './components/NeedsContext';
import Features from './components/Features';
import Workflow from './components/Workflow';
import UseCases from './components/UseCases';
import ClosingCta from './components/ClosingCta';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoModalOpen(false);
  };

  return (
    <div className="min-h-[100dvh] bg-white text-slate-800 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Header onOpenDemo={handleOpenDemo} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Pembuka / Hero */}
        <Hero onOpenDemo={handleOpenDemo} />

        {/* 2. Konteks Kebutuhan */}
        <NeedsContext />

        {/* 3. Fitur Utama */}
        <Features />

        {/* 4. Cara Kerja */}
        <Workflow onOpenDemo={handleOpenDemo} />

        {/* 5. Contoh Penggunaan */}
        <UseCases />

        {/* 6. Penutup / CTA Akhir */}
        <ClosingCta onOpenDemo={handleOpenDemo} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Permintaan Demonstrasi */}
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </div>
  );
}
