import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Play,
  ArrowRight,
  Check,
  Plus,
  Bot,
  SlidersHorizontal,
  BarChart3,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

interface HeroProps {
  onOpenDemo: () => void;
}

type DemoPrompt = 'ringkas' | 'unit' | 'banding';

interface PromptConfig {
  id: DemoPrompt;
  label: string;
  userMessage: string;
  assistantSummary: string[];
  metrics: {
    tw1: string;
    tw2: string;
    diff: string;
    diffTrend: 'up' | 'down';
    highlight: string;
    highlightLabel: string;
  };
  units: {
    name: string;
    tw1: number;
    tw2: number;
    tw2Color: string;
  }[];
}

const promptOptions: Record<DemoPrompt, PromptConfig> = {
  ringkas: {
    id: 'ringkas',
    label: 'Ringkas rapat direksi',
    userMessage: 'Ringkas 3 poin kinerja & deviasi untuk dewan pengawas.',
    assistantSummary: [
      'Penyelesaian naik +3,5 poin (93,1%).',
      'Unit B efisiensi tertinggi (97,8%).',
      'Unit C terkendala pasokan material (82,7%).'
    ],
    metrics: {
      tw1: '89,6%',
      tw2: '93,1%',
      diff: '+3,5',
      diffTrend: 'up',
      highlight: 'Unit C',
      highlightLabel: 'Deviasi -2,3 poin'
    },
    units: [
      { name: 'Unit A', tw1: 88.1, tw2: 94.5, tw2Color: '#38bdf8' },
      { name: 'Unit B', tw1: 92.4, tw2: 97.8, tw2Color: '#38bdf8' },
      { name: 'Unit C', tw1: 85.0, tw2: 82.7, tw2Color: '#f97316' }
    ]
  },
  unit: {
    id: 'unit',
    label: 'Capaian per unit kerja',
    userMessage: 'Bandingkan capaian per unit kerja.',
    assistantSummary: [
      'Unit B: 342 dari 350 target tercapai (97,8%).',
      'Unit A lampaui target triwulan (94,5%).',
      'Unit C: 198 dari 240 target layanan selesai.'
    ],
    metrics: {
      tw1: '89,6%',
      tw2: '93,1%',
      diff: '+3,5',
      diffTrend: 'up',
      highlight: 'Unit B',
      highlightLabel: 'Tertinggi 97,8%'
    },
    units: [
      { name: 'Unit A', tw1: 88.1, tw2: 94.5, tw2Color: '#38bdf8' },
      { name: 'Unit B', tw1: 92.4, tw2: 97.8, tw2Color: '#34d399' },
      { name: 'Unit C', tw1: 85.0, tw2: 82.7, tw2Color: '#f97316' }
    ]
  },
  banding: {
    id: 'banding',
    label: 'Banding TW I',
    userMessage: 'Bandingkan capaian TW I dan TW II.',
    assistantSummary: [
      'Kenaikan tertinggi di Unit A (+6,4 poin).',
      'Unit B stabil di atas 90%.',
      'Waktu verifikasi turun dari 4 ke 2 hari.'
    ],
    metrics: {
      tw1: '89,6%',
      tw2: '93,1%',
      diff: '+3,5',
      diffTrend: 'up',
      highlight: '+6,4%',
      highlightLabel: 'Unit A melonjak'
    },
    units: [
      { name: 'Unit A', tw1: 88.1, tw2: 94.5, tw2Color: '#38bdf8' },
      { name: 'Unit B', tw1: 92.4, tw2: 97.8, tw2Color: '#38bdf8' },
      { name: 'Unit C', tw1: 85.0, tw2: 82.7, tw2Color: '#fb923c' }
    ]
  }
};

const supportedSources = [
  { name: 'Rekap Excel', color: '#10b981' },
  { name: 'Notulen Word', color: '#38bdf8' },
  { name: 'Data CSV', color: '#f59e0b' },
  { name: 'Presentasi PPT', color: '#a855f7' },
  { name: 'Google Sheets', color: '#34d399' },
  { name: 'Laporan keuangan', color: '#eab308' },
  { name: 'SOP & Peraturan', color: '#818cf8' }
];

export default function Hero({ onOpenDemo }: HeroProps) {
  const [activePrompt, setActivePrompt] = useState<DemoPrompt>('ringkas');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const currentConfig = promptOptions[activePrompt];

  const scrollToWorkflow = () => {
    document.getElementById('cara-kerja')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#18123f] text-white pt-12 pb-0 md:pt-16 lg:pt-20">
      {/* Background Image with subtle opacity */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <img
          src="/arlington-research-kN_kViDchA0-unsplash.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-15 mix-blend-luminosity scale-105"
        />
        {/* Soft edge gradient to blend seamlessly into the section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#18123f]/85 via-[#18123f]/50 to-[#18123f]" />
      </div>

      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-indigo-500/15 via-cyan-500/10 to-transparent blur-3xl opacity-70"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            {/* Category / Eyebrow */}
            <p className="mb-4 text-xs sm:text-[13px] font-bold tracking-[0.14em] text-[#a99bf8] uppercase">
              GENERATOR DASHBOARD RAG UNTUK BUMD
            </p>

            {/* Main Headline */}
            <h1 className="text-[38px] sm:text-[46px] lg:text-[50px] font-extrabold leading-[1.08] tracking-tight text-white mb-5 [text-wrap:balance]">
              Unggah laporan.<br />
              Tanya. <span className="text-[#38d1f0]">Dapatkan</span><br />
              <span className="text-[#38d1f0]">dashboard.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-[17px] leading-relaxed text-slate-300 mb-8 max-w-[44ch]">
              Tanya lewat chat, dapatkan dashboard instan. Setiap angka tersitasi langsung ke dokumen asal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-7">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenDemo}
                className="h-12 px-6 rounded-lg bg-white text-[#18123f] font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-lg shadow-black/20 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <span>Jadwalkan Demo</span>
                <ArrowRight className="w-4 h-4 text-[#18123f]" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToWorkflow}
                className="h-12 px-5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base inline-flex items-center gap-2 transition-all cursor-pointer backdrop-blur-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Lihat Alur Kerja</span>
              </motion.button>
            </div>

            {/* Trust Checkpoints */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300/90 font-medium">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 text-[#38d1f0]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>Sitasi ke dokumen asal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/15 text-[#38d1f0]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>40 Preset 6 sektor BUMD</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {/* Window Container */}
            <div className="rounded-2xl border border-white/15 bg-[#120d2d] shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-sm">
              
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#19133c] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 ml-1">
                    <span className="font-semibold text-white">Evaluasi Operasional</span>
                    <span className="text-white/40">/</span>
                    <span className="text-slate-400 text-[11px]">Triwulan II 2026</span>
                  </div>
                </div>
                <div className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-slate-300">
                  Data contoh
                </div>
              </div>

              {/* 3-Column Workspace */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
                
                {/* 1. Left Mini Sidebar: SUMBER */}
                <div className="md:col-span-3 bg-[#150f33] p-3.5 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                      <span>SUMBER</span>
                      <span className="text-xs font-bold text-white bg-white/10 px-1.5 py-0.2 rounded">3</span>
                    </div>

                    <div className="space-y-2">
                      {/* Document 1: PDF */}
                      <div className="p-2.5 rounded-lg border border-purple-500/30 bg-[#21184a]/80 hover:bg-[#21184a] transition-colors">
                        <div className="flex items-start gap-2">
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            PDF
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-white truncate leading-tight">
                              Laporan Operasional TW II
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">24 halaman</p>
                          </div>
                        </div>
                      </div>

                      {/* Document 2: XLS */}
                      <div className="p-2.5 rounded-lg border border-white/10 bg-[#1a133f] hover:bg-[#21184a] transition-colors">
                        <div className="flex items-start gap-2">
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            XLS
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-white truncate leading-tight">
                              Rekap Layanan per Unit
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">3 sheet</p>
                          </div>
                        </div>
                      </div>

                      {/* Document 3: DOC */}
                      <div className="p-2.5 rounded-lg border border-white/10 bg-[#1a133f] hover:bg-[#21184a] transition-colors">
                        <div className="flex items-start gap-2">
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                            DOC
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-white truncate leading-tight">
                              Notulen Rapat Juni
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">6 halaman</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-3 w-full py-2 border border-dashed border-white/20 rounded-lg text-[10px] font-medium text-slate-400 hover:text-white hover:border-white/40 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Tambah sumber</span>
                  </button>
                </div>

                {/* 2. Middle Panel: BAHAN RAPAT & CHARTS */}
                <div className="md:col-span-5 bg-[#1b1442] p-3.5 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
                  <div>
                    {/* Panel Header */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          BAHAN RAPAT
                        </span>
                        <h2 className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Ringkasan direksi</span>
                          <span className="text-slate-400">•</span>
                          <span>TW II</span>
                        </h2>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                        2026
                      </span>
                    </div>

                    {/* 4 Metric Cards */}
                    <div className="grid grid-cols-4 gap-1.5 mb-3">
                      <div className="p-2 rounded-lg bg-[#241a54] border border-white/10">
                        <span className="text-[8px] font-semibold uppercase text-slate-400 block">TW I</span>
                        <span className="text-xs font-black text-white block mt-0.5">
                          {currentConfig.metrics.tw1}
                        </span>
                        <span className="text-[7.5px] text-slate-400 block truncate">gabungan</span>
                      </div>

                      <div className="p-2 rounded-lg bg-[#241a54] border border-white/10">
                        <span className="text-[8px] font-semibold uppercase text-slate-400 block">TW II</span>
                        <span className="text-xs font-black text-[#38d1f0] block mt-0.5">
                          {currentConfig.metrics.tw2}
                        </span>
                        <span className="text-[7.5px] text-slate-400 block truncate">gabungan</span>
                      </div>

                      <div className="p-2 rounded-lg bg-[#241a54] border border-white/10">
                        <span className="text-[8px] font-semibold uppercase text-slate-400 block">Selisih</span>
                        <span className="text-xs font-black text-[#34d399] block mt-0.5">
                          {currentConfig.metrics.diff}
                        </span>
                        <span className="text-[7.5px] text-slate-400 block truncate">poin</span>
                      </div>

                      <div className="p-2 rounded-lg bg-[#241a54] border border-white/10">
                        <span className="text-[8px] font-semibold uppercase text-slate-400 block">Highlight</span>
                        <span className="text-xs font-black text-rose-300 block mt-0.5 truncate">
                          {currentConfig.metrics.highlight}
                        </span>
                        <span className="text-[7.5px] text-rose-300/80 block truncate">
                          {currentConfig.metrics.highlightLabel}
                        </span>
                      </div>
                    </div>

                    {/* Bar Chart Section */}
                    <div className="p-3 rounded-xl bg-[#150f33] border border-white/10">
                      <div className="flex items-center justify-between text-[11px] mb-2.5">
                        <span className="font-bold text-white text-[11px]">Penyelesaian per unit</span>
                        <div className="flex items-center gap-3 text-[9px]">
                          <span className="flex items-center gap-1 text-slate-400">
                            <span className="w-2 h-2 rounded-xs bg-[#60559a]" /> TW I
                          </span>
                          <span className="flex items-center gap-1 text-slate-300 font-semibold">
                            <span className="w-2 h-2 rounded-xs bg-[#38bdf8]" /> TW II
                          </span>
                        </div>
                      </div>

                      {/* Chart Canvas with target 95% line */}
                      <div className="relative pt-4 pb-2 border-b border-white/15">
                        {/* Target line: 95% */}
                        <div className="absolute top-2 left-0 right-0 border-t border-dashed border-amber-300/50 flex justify-end">
                          <span className="text-[8px] font-bold text-amber-300 bg-[#150f33] px-1 -mt-2">
                            target 95%
                          </span>
                        </div>

                        {/* Bars Group */}
                        <div className="grid grid-cols-3 gap-4 items-end h-[100px] px-2">
                          {currentConfig.units.map((unit) => {
                            const isHovered = hoveredBar === unit.name;
                            return (
                              <div
                                key={unit.name}
                                className="flex flex-col items-center justify-end h-full group cursor-pointer"
                                onMouseEnter={() => setHoveredBar(unit.name)}
                                onMouseLeave={() => setHoveredBar(null)}
                              >
                                <div className="flex items-end justify-center gap-1.5 w-full h-[85px]">
                                  {/* TW I Bar */}
                                  <div className="flex flex-col items-center flex-1 max-w-[20px]">
                                    <span className="text-[7.5px] text-slate-400 mb-0.5 opacity-80 group-hover:opacity-100">
                                      {unit.tw1}%
                                    </span>
                                    <motion.div
                                      initial={{ height: 0 }}
                                      animate={{ height: `${(unit.tw1 / 100) * 65}px` }}
                                      transition={{ duration: 0.5, ease: 'easeOut' }}
                                      className="w-full bg-[#60559a] rounded-t-sm"
                                    />
                                  </div>

                                  {/* TW II Bar */}
                                  <div className="flex flex-col items-center flex-1 max-w-[20px]">
                                    <span className="text-[7.5px] font-bold text-white mb-0.5 group-hover:text-[#38d1f0]">
                                      {unit.tw2}%
                                    </span>
                                    <motion.div
                                      initial={{ height: 0 }}
                                      animate={{ height: `${(unit.tw2 / 100) * 65}px` }}
                                      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                                      className="w-full rounded-t-sm shadow-sm"
                                      style={{ backgroundColor: unit.tw2Color }}
                                    />
                                  </div>
                                </div>

                                <span className={`text-[9px] mt-1.5 font-medium transition-colors ${
                                  isHovered ? 'text-white font-bold' : 'text-slate-400'
                                }`}>
                                  {unit.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Micro tip */}
                  <div className="mt-2 text-[9px] text-slate-400 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3 h-3 text-[#38d1f0]" />
                    <span>Visualisasi otomatis diperbarui sesuai instruksi percakapan.</span>
                  </div>
                </div>

                {/* 3. Right Panel: CHAT ASSISTANT */}
                <div className="md:col-span-4 bg-[#140e32] p-3.5 flex flex-col justify-between">
                  <div>
                    {/* Assistant Header */}
                    <div className="flex items-center gap-2 pb-2.5 border-b border-white/10 mb-3">
                      <div className="w-6 h-6 rounded-md bg-[#241a54] flex items-center justify-center text-[#38d1f0]">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate leading-tight">
                          Asisten aionesboard
                        </p>
                        <div className="flex items-center gap-1.5 text-[9px] text-[#34d399] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                          <span>membaca 3 sumber</span>
                        </div>
                      </div>
                    </div>

                    {/* Chat Bubble Area */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePrompt}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-2.5"
                      >
                        {/* User Request Bubble */}
                        <div className="p-2.5 rounded-xl rounded-tr-xs bg-[#3b2c8a] text-white text-[11px] leading-relaxed font-medium shadow-md">
                          {currentConfig.userMessage}
                        </div>

                        {/* Assistant Reading Indicator */}
                        <div className="flex items-center gap-2 text-[10px] text-slate-300 font-medium py-1 px-1">
                          <span className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38d1f0] animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38d1f0] animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38d1f0] animate-bounce" style={{ animationDelay: '300ms' }} />
                          </span>
                          <span>Membaca sumber...</span>
                        </div>

                        {/* Assistant Bullet Points */}
                        <div className="p-2.5 rounded-xl bg-[#1b1442] border border-white/10 text-[10px] text-slate-300 space-y-1.5">
                          {currentConfig.assistantSummary.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#38d1f0] font-bold shrink-0">•</span>
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Interactive Quick Prompt Chips */}
                  <div className="pt-3 border-t border-white/10 space-y-1.5">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      PILIH PERTANYAAN:
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {(['ringkas', 'unit', 'banding'] as DemoPrompt[]).map((key) => {
                        const opt = promptOptions[key];
                        const isActive = activePrompt === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setActivePrompt(key)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              isActive
                                ? 'bg-[#291e63] text-white border border-[#38d1f0]/60 shadow-sm'
                                : 'bg-[#1a133f] text-slate-400 hover:text-white hover:bg-[#21184a] border border-white/5'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#38d1f0]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Micro Caption */}
            <p className="mt-2.5 text-center text-xs text-slate-400">
              Ilustrasi dengan data contoh. Klik pertanyaan di panel kanan untuk mencoba.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Bottom Bar: Supported File Types / Strip */}
      <div className="w-full bg-[#120d2d] border-t border-white/10 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
            SUMBER YANG BISA DIBACA
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {supportedSources.map((source) => (
              <div
                key={source.name}
                className="px-3 py-1.5 rounded-lg bg-[#1a133f] border border-white/5 hover:border-white/20 transition-colors flex items-center gap-2 text-slate-300 font-medium text-xs"
              >
                <span
                  className="w-2 h-2 rounded-xs shrink-0"
                  style={{ backgroundColor: source.color }}
                />
                <span>{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
