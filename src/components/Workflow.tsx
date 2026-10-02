import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface WorkflowProps {
  onOpenDemo: () => void;
}

const steps = [
  {
    num: 1,
    badgeBg: 'bg-[#6366f1] text-white shadow-md shadow-indigo-500/20',
    title: 'Unggah sumber',
    desc: 'Unggah laporan PDF, Excel, atau notulen.',
    inputPreview: 'Laporan_TW2.pdf · Rekap.xlsx',
    borderColor: 'border-indigo-200'
  },
  {
    num: 2,
    badgeBg: 'bg-[#06b6d4] text-white shadow-md shadow-cyan-500/20',
    title: 'Tanya lewat chat',
    desc: 'Ketik indikator dan periode yang dicari.',
    inputPreview: '"Penyelesaian per unit, TW II"',
    borderColor: 'border-cyan-200'
  },
  {
    num: 3,
    badgeBg: 'bg-[#10b981] text-white shadow-md shadow-emerald-500/20',
    title: 'Verifikasi data',
    desc: 'Cek angka dan sitasi ke dokumen asal.',
    inputPreview: '93,1% → Laporan hlm. 4',
    borderColor: 'border-emerald-200'
  },
  {
    num: 4,
    badgeBg: 'bg-slate-100 text-slate-700 border border-slate-300',
    title: 'Sesuaikan visual',
    desc: 'Ubah grafik atau ringkas via chat.',
    inputPreview: '"Ringkas jadi 3 poin"',
    borderColor: 'border-slate-200'
  }
];

export default function Workflow({ onOpenDemo }: WorkflowProps) {
  return (
    <section id="cara-kerja" className="py-16 md:py-24 bg-[#f8f7fd] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-3xl"
        >
          <p className="text-xs sm:text-[13px] font-bold tracking-[0.14em] text-[#0284c7] uppercase mb-3">
            CARA KERJA
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#1b1446] leading-[1.12]">
            4 langkah dari dokumen ke dashboard.
          </h2>
        </motion.div>

        {/* 4-Step Pipeline */}
        <div className="relative mb-12">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-indigo-500 via-cyan-400 to-slate-300 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge */}
                  <div className="mb-5">
                    <span
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-base font-black ${step.badgeBg}`}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-lg font-bold text-[#1b1446] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[44px]">
                    {step.desc}
                  </p>
                </div>

                {/* Input / Output Preview Box */}
                <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs text-xs font-mono text-slate-700 truncate">
                  {step.inputPreview}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Action */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenDemo}
            className="h-12 px-6 rounded-lg bg-[#1b1446] text-white font-bold text-sm sm:text-base inline-flex items-center gap-2 hover:bg-[#281f62] transition-colors cursor-pointer shadow-md shadow-purple-950/10"
          >
            <span>Jadwalkan Demo</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
