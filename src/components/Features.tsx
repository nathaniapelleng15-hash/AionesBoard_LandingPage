import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ShieldCheck,
  BellRing,
  FileCheck,
  BarChart3,
  FileText,
  TrendingUp,
  Users,
  SlidersHorizontal
} from 'lucide-react';

export default function Features() {
  const [activeCitation, setActiveCitation] = useState<1 | 2>(1);
  const [selectedInstruction, setSelectedInstruction] = useState<number>(0);

  const instructions = [
    'Ganti jadi grafik garis',
    'Tambahkan garis target 95%',
    'Urutkan dari terendah',
    'Fokus Unit C saja'
  ];

  return (
    <section id="fitur" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-xs sm:text-[13px] font-bold tracking-[0.14em] text-[#0284c7] uppercase mb-3">
            FITUR
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#1b1446] leading-[1.12] mb-3">
            Koleksi dokumen. Siap jadi dashboard.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Kumpulkan dokumen, ajukan pertanyaan, ubah jawaban jadi tampilan rapat.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Featured Dark Card (spans 2 columns on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-[#1b1446] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#2b2269] shadow-xl shadow-purple-950/20"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#38d1f0] mb-5">
                <FileCheck className="w-5 h-5 text-[#38d1f0] stroke-[2]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Setiap angka punya rujukan
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mb-6">
                Klik nomor rujukan untuk cek kutipan dokumen asal. Nol angka tanpa sumber.
              </p>
            </div>

            {/* Interactive Citations Preview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-2">
              
              {/* Left snippet with clickable badges */}
              <div className="md:col-span-6 p-4 rounded-xl bg-[#241a54] border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  JAWABAN ASISTEN:
                </p>
                <p>
                  Penyelesaian pekerjaan TW II mencapai{' '}
                  <span className="font-bold text-white">93,1%</span>{' '}
                  <button
                    type="button"
                    onClick={() => setActiveCitation(1)}
                    onMouseEnter={() => setActiveCitation(1)}
                    className={`inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold rounded-sm cursor-pointer transition-all ${
                      activeCitation === 1
                        ? 'bg-[#38d1f0] text-[#1b1446] ring-2 ring-[#38d1f0]/50 scale-110'
                        : 'bg-rose-500/80 text-white hover:bg-rose-500'
                    }`}
                  >
                    1
                  </button>
                  . Unit C di bawah target karena keterlambatan pasokan{' '}
                  <button
                    type="button"
                    onClick={() => setActiveCitation(2)}
                    onMouseEnter={() => setActiveCitation(2)}
                    className={`inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold rounded-sm cursor-pointer transition-all ${
                      activeCitation === 2
                        ? 'bg-[#38d1f0] text-[#1b1446] ring-2 ring-[#38d1f0]/50 scale-110'
                        : 'bg-cyan-500/80 text-white hover:bg-cyan-500'
                    }`}
                  >
                    2
                  </button>
                  .
                </p>
                <p className="mt-3 text-[10px] text-slate-400 italic">
                  Klik rujukan 1 atau 2 untuk melihat kutipan asal.
                </p>
              </div>

              {/* Right document citation preview box */}
              <div className="md:col-span-6 p-4 rounded-xl bg-[#150f33] border border-white/10 text-xs flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {activeCitation === 1 ? (
                    <motion.div
                      key="cit-1"
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                          PDF
                        </span>
                        <span className="font-bold text-white text-[11px]">
                          Laporan Operasional TW II - hlm. 4
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        "...total 1.000 permintaan layanan, sebanyak 931 pekerjaan diselesaikan{' '}
                        <mark className="bg-[#38d1f0]/30 text-[#38d1f0] font-semibold px-1 rounded">
                          (93,1%)
                        </mark>
                        . Notulen 18 Juni mencatat keterlambatan material..."
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cit-2"
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
                          DOC
                        </span>
                        <span className="font-bold text-white text-[11px]">
                          Notulen Rapat 18 Juni - hlm. 2
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        "...rapat mencatat bahwa{' '}
                        <mark className="bg-[#f97316]/30 text-[#fdba74] font-semibold px-1 rounded">
                          Unit C tertunda akibat pasokan material
                        </mark>{' '}
                        pada minggu ke-3..."
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mt-3 text-[10px] text-slate-400 flex items-center justify-between border-t border-white/5 pt-2">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
                    <span>Rujukan terverifikasi</span>
                  </span>
                  <span className="text-[#38d1f0] font-semibold">Tersinkronisasi</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Card 2: Dashboard dari percakapan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-900/5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-800 mb-5">
                <BarChart3 className="w-5 h-5 text-slate-800 stroke-[2]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1b1446] mb-2">
                Dashboard otomatis
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                KPI, grafik, dan tabel tersusun dari satu perintah chat.
              </p>
            </div>

            {/* Mini Bar Chart Graphic */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-end justify-between gap-2 h-20 px-2 pt-2">
                {[
                  { h: '60%', color: 'bg-indigo-600' },
                  { h: '85%', color: 'bg-[#38bdf8]' },
                  { h: '45%', color: 'bg-indigo-800' },
                  { h: '95%', color: 'bg-[#0284c7]' },
                  { h: '70%', color: 'bg-indigo-700' },
                  { h: '88%', color: 'bg-[#38bdf8]' }
                ].map((bar, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: bar.h }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className={`w-full rounded-t-sm ${bar.color}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Ringkas siap rapat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-900/5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-800 mb-5">
                <FileText className="w-5 h-5 text-slate-800 stroke-[2]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1b1446] mb-2">
                Ringkas siap rapat
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Ubah laporan panjang jadi poin singkat untuk pimpinan.
              </p>
            </div>

            {/* Visual Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                <span>BAHAN RAPAT DIREKSI</span>
                <span className="text-slate-400">3 POIN</span>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">Penyelesaian naik 3,5 poin dari TW I</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="truncate">Unit C perlu dukungan pasokan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  <span className="truncate">Unit B jadi acuan praktik kerja</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Card 4: Bandingkan periode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-900/5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-800 mb-5">
                <TrendingUp className="w-5 h-5 text-slate-800 stroke-[2]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1b1446] mb-2">
                Bandingkan periode
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Pantau tren triwulanan tanpa olah manual spreadsheet.
              </p>
            </div>

            {/* Visual SVG Sparkline Graphic */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex justify-between items-center mb-1">
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                  <BellRing className="w-3 h-3 text-emerald-600" />
                  <span>Ambang batas aktif</span>
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  93,1%
                </span>
              </div>
              <div className="relative h-14 w-full">
                <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                  <path
                    d="M 10 50 Q 60 45 100 35 T 190 12"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="190" cy="12" r="5" fill="#10b981" />
                  <circle cx="190" cy="12" r="8" fill="#10b981" opacity="0.3" className="animate-ping" />
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium">
                <span>TW III '25</span>
                <span>TW IV</span>
                <span>TW I</span>
                <span>TW II</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Ruang kerja per tim */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-900/5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-800 mb-5">
                <Users className="w-5 h-5 text-slate-800 stroke-[2]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1b1446] mb-2">
                Ruang kerja per tim
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Dokumen dan riwayat chat tersimpan aman per proyek.
              </p>
            </div>

            {/* Check Pills */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center gap-2 text-xs font-semibold text-purple-900">
                <Check className="w-4 h-4 text-purple-700 stroke-[2.5]" />
                <span>Akses sesuai peran</span>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center gap-2 text-xs font-semibold text-purple-900">
                <Check className="w-4 h-4 text-purple-700 stroke-[2.5]" />
                <span>Riwayat jawaban tersimpan</span>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Ubah tampilan cukup dengan kalimat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-900/5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-800 mb-5">
                <SlidersHorizontal className="w-5 h-5 text-slate-800 stroke-[2]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1b1446] mb-2">
                Ubah tampilan via chat
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Ketik instruksi lanjutan untuk mengubah visualisasi secara instan.
              </p>
            </div>

            {/* Interactive Command Chips */}
            <div className="flex flex-wrap gap-2.5">
              {instructions.map((item, idx) => {
                const isActive = selectedInstruction === idx;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedInstruction(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1b1446] text-white shadow-md shadow-purple-950/20'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-xs ${
                        idx === 0
                          ? 'bg-cyan-400'
                          : idx === 1
                          ? 'bg-amber-400'
                          : idx === 2
                          ? 'bg-purple-400'
                          : 'bg-emerald-400'
                      }`}
                    />
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
