import { ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#120d2d] text-slate-400 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Col 1: Wordmark & Description */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-1 text-2xl font-black tracking-tight text-white">
              <span>aionesboard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#38d1f0]" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Ruang kerja dokumen cerdas BUMD. Ubah laporan dan notulen jadi dashboard siap rapat lewat percakapan.
            </p>
            <div className="text-xs text-slate-500 pt-1">
              <a href="https://aionesboard.app" className="font-semibold text-[#38d1f0] hover:underline">
                aionesboard.app
              </a>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div className="md:col-span-3 space-y-2">
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Navigasi
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#manfaat" className="hover:text-white transition-colors">
                  Manfaat
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-white transition-colors">
                  Fitur
                </a>
              </li>
              <li>
                <a href="#cara-kerja" className="hover:text-white transition-colors">
                  Cara kerja
                </a>
              </li>
              <li>
                <a href="#contoh" className="hover:text-white transition-colors">
                  Contoh penggunaan
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem / Info */}
          <div className="md:col-span-3 space-y-2">
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Solusi Tata Kelola
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Platform analitik dan tata kelola data dokumen cerdas untuk BUMD dan pemerintah daerah.
            </p>
            <div className="pt-2">
              <a
                href="https://aionesboard.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38d1f0] hover:underline"
              >
                <span>aionesboard.app</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {currentYear} aionesboard. Hak cipta dilindungi.
          </div>
          <div>
            Ruang kerja dokumen cerdas untuk BUMD
          </div>
        </div>
      </div>
    </footer>
  );
}
