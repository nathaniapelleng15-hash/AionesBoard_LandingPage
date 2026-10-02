import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';

interface ClosingCtaProps {
  onOpenDemo: () => void;
}

export default function ClosingCta({ onOpenDemo }: ClosingCtaProps) {
  return (
    <section className="relative overflow-hidden bg-[#18123f] text-white py-20 md:py-28">
      {/* Background Image with subtle opacity */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <img
          src="/pooya-adami-CQGKKOJgmCM-unsplash.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-15 mix-blend-luminosity scale-105"
        />
        {/* Soft edge gradient to blend seamlessly into the section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#18123f]/90 via-[#18123f]/40 to-[#18123f]/90" />
      </div>

      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-t from-indigo-500/20 via-cyan-500/15 to-transparent blur-3xl opacity-80"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#38d1f0] mb-5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Demonstrasi Langsung</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white mb-4 leading-tight [text-wrap:balance]">
            Siap ubah dokumen jadi dashboard rapat?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Jadwalkan demo singkat 15 menit menggunakan contoh laporan instansi Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenDemo}
              className="h-12 px-7 rounded-lg bg-white text-[#18123f] font-bold text-base inline-flex items-center gap-2.5 shadow-xl shadow-black/30 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>Jadwalkan Demo</span>
              <ArrowRight className="w-4 h-4 text-[#18123f]" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
