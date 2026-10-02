import { motion } from 'motion/react';
import { SlidersHorizontal, ArrowUpDown, BarChart3 } from 'lucide-react';

const benefits = [
  {
    role: 'KEPALA UNIT',
    roleColor: 'text-indigo-600',
    icon: SlidersHorizontal,
    title: 'Pilih indikator penting',
    desc: 'Grafik, tabel, dan pencapaian target otomatis tersusun di kanvas.',
    example: 'Tampilkan penyelesaian per unit'
  },
  {
    role: 'PERENCANAAN',
    roleColor: 'text-indigo-600',
    icon: ArrowUpDown,
    title: 'Bandingkan unit & periode',
    desc: 'Selisih triwulan dan deviasi langsung terlihat berdampingan.',
    example: 'Bandingkan TW I dan TW II'
  },
  {
    role: 'DIREKSI',
    roleColor: 'text-indigo-600',
    icon: BarChart3,
    title: 'Ringkasan eksekutif',
    desc: 'Ubah laporan tebal jadi 3 poin ringkas dengan sitasi dokumen asal.',
    example: 'Ringkas 3 poin untuk direksi'
  }
];

export default function NeedsContext() {
  return (
    <section id="manfaat" className="py-16 md:py-24 bg-[#f8f7fd] border-b border-slate-200">
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
            MANFAAT
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#1b1446] leading-[1.12] mb-3">
            Satu dashboard. Tiga kebutuhan rapat.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Dokumen yang sama, tampilan berbeda untuk kebutuhan teknis, evaluasi, hingga pimpinan.
          </p>
        </motion.div>

        {/* 3 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-900/10 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Clean 1-Color Vector Icon Box */}
                  <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-800 mb-6 transition-colors group-hover:bg-[#1b1446] group-hover:text-white group-hover:border-[#1b1446]">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Role Tag */}
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${card.roleColor}`}>
                    {card.role}
                  </p>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#1b1446] mb-2 leading-snug">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-600 mb-6">
                  {card.desc}
                </p>
              </div>

              {/* Example Footer with dashed top border */}
              <div className="pt-4 border-t border-dashed border-slate-200 text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-700">Contoh: </span>
                <span className="italic text-slate-600">"{card.example}"</span>
              </div>
            </motion.article>
          );
        })}
        </div>

      </div>
    </section>
  );
}
