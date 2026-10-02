import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Copy,
  Check,
  FileText,
  Building2,
  Droplets,
  Landmark,
  Stethoscope,
  Bus,
  Store,
  TrendingUp,
  CreditCard,
  Presentation,
  type LucideIcon
} from 'lucide-react';

interface TabItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  prompt: string;
  files: string[];
  metrics: {
    label: string;
    value: string;
    sub: string;
    color: string;
  }[];
}

const tabs: TabItem[] = [
  {
    id: 'evaluasi',
    title: 'Evaluasi operasional',
    subtitle: 'Rapat bulanan unit',
    icon: TrendingUp,
    prompt: 'Ringkas capaian TW II dan kendala operasional per unit untuk rapat bulanan.',
    files: ['Laporan_Operasional_TW2.pdf', 'Rekap_Layanan.xlsx'],
    metrics: [
      { label: 'Poin utama', value: '4', sub: 'fokus unit kerja', color: 'text-[#38d1f0]' },
      { label: 'Grafik', value: '2', sub: 'capaian vs target', color: 'text-white' },
      { label: 'Rujukan', value: '14', sub: 'halaman sumber', color: 'text-[#34d399]' }
    ]
  },
  {
    id: 'anggaran',
    title: 'Realisasi anggaran',
    subtitle: 'Rapat keuangan',
    icon: CreditCard,
    prompt: 'Bandingkan serapan anggaran semester I vs target tahunan per pos belanja.',
    files: ['Realisasi_Anggaran.xlsx', 'Rencana_Kerja.pdf'],
    metrics: [
      { label: 'Pos belanja', value: '6', sub: 'kategori akun', color: 'text-[#38d1f0]' },
      { label: 'Grafik', value: '2', sub: 'deviasi & proyeksi', color: 'text-white' },
      { label: 'Rujukan', value: '18', sub: 'pos buku besar', color: 'text-[#34d399]' }
    ]
  },
  {
    id: 'presentasi',
    title: 'Bahan direksi',
    subtitle: 'Dewan pengawas',
    icon: Presentation,
    prompt: 'Susun 5 poin capaian semester I untuk paparan direksi dan dewan pengawas.',
    files: ['Laporan_Semester_I.pdf', 'Notulen_RUPS.docx'],
    metrics: [
      { label: 'Poin utama', value: '5', sub: 'siap dipaparkan', color: 'text-[#38d1f0]' },
      { label: 'Grafik', value: '3', sub: 'tren & perbandingan', color: 'text-white' },
      { label: 'Rujukan', value: '12', sub: 'halaman sumber', color: 'text-[#34d399]' }
    ]
  }
];

const tabOrder = ['evaluasi', 'anggaran', 'presentasi'];
const ROTATE_INTERVAL = 4500; // 4.5 detik per rotasi

const allSectors = [
  { name: 'PDAM', icon: Droplets },
  { name: 'Pasar', icon: Store },
  { name: 'Bank Daerah', icon: Landmark },
  { name: 'RSUD', icon: Stethoscope },
  { name: 'Transportasi', icon: Bus },
  { name: 'Aneka Usaha', icon: Building2 },
];

export default function UseCases() {
  const [activeTab, setActiveTab] = useState<string>('evaluasi');
  const [copied, setCopied] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  // Auto-cycle through tabs: Evaluasi operasional -> Realisasi anggaran -> Bahan direksi
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabOrder.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabOrder.length;
        return tabOrder[nextIndex];
      });
    }, ROTATE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${currentTab.prompt}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contoh" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-3xl"
        >
          <p className="text-xs sm:text-[13px] font-bold tracking-[0.14em] text-[#0284c7] uppercase mb-3">
            CONTOH INSTRUKSI
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#1b1446] leading-[1.12] mb-3">
            Sesuai kebutuhan rapat.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Pilih skenario pelaporan untuk melihat contoh prompt dan dashboard yang dihasilkan.
          </p>
        </motion.div>

        {/* 6 Sector Pill Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-9 pb-3 border-b border-slate-100 text-xs">
          <span className="font-bold text-slate-400 uppercase tracking-wider mr-1">
            Sektor:
          </span>
          {allSectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <span
                key={sector.name}
                className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/80 font-semibold text-slate-700 flex items-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{sector.name}</span>
              </span>
            );
          })}
        </div>

        {/* Split Section: Tabs on Left, Interactive Dark Terminal on Right */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Left Column: 3 Selectable Cards with Auto-Cycle Motion */}
          <div className="lg:col-span-4 space-y-3">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                  className={`relative overflow-hidden w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    isActive
                      ? 'bg-white border-[#6366f1] ring-2 ring-[#6366f1]/25 shadow-lg shadow-indigo-950/5 scale-[1.01]'
                      : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                      isActive
                        ? 'bg-[#1b1446] text-white border-[#1b1446]'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-base font-bold leading-tight ${isActive ? 'text-[#1b1446]' : 'text-slate-800'}`}>
                      {tab.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {tab.subtitle}
                    </p>
                  </div>

                  {/* Active Auto-cycle Progress Line Indicator */}
                  {isActive && (
                    <motion.div
                      key={`progress-${activeTab}-${isPaused}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isPaused ? 0 : 1 }}
                      transition={{
                        duration: isPaused ? 0 : ROTATE_INTERVAL / 1000,
                        ease: 'linear'
                      }}
                      style={{ originX: 0 }}
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-indigo-600 rounded-b-2xl"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Dark Interactive Window */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-[#2b2269] bg-[#1b1446] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 14, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(2px)' }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Top Bar / Label */}
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3.5">
                    INSTRUKSI KE CHATBOT
                  </p>

                  {/* Prompt Box */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#241a54] border border-white/10 mb-6 relative group">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                        "{currentTab.prompt}"
                      </p>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#34d399]" />
                            <span className="text-[#34d399]">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-300" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Source File Tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3 border-t border-white/10">
                      {currentTab.files.map((file) => (
                        <div
                          key={file}
                          className="px-2.5 py-1 rounded-md bg-[#160f35] border border-white/10 text-[11px] font-medium text-slate-300 flex items-center gap-1.5"
                        >
                          <FileText className="w-3 h-3 text-[#38d1f0]" />
                          <span>{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Preview Box */}
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    CONTOH HASIL (DATA ILUSTRASI)
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {currentTab.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#241a54] border border-white/10 flex flex-col justify-between"
                      >
                        <p className="text-[11px] text-slate-400 font-medium">
                          {metric.label}
                        </p>
                        <p className={`text-2xl sm:text-3xl font-black mt-1 mb-0.5 ${metric.color}`}>
                          {metric.value}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {metric.sub}
                        </p>
                      </div>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
