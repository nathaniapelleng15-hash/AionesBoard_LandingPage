import { useState, useEffect, useRef } from 'react';
import { X, Check, Mail, Copy, ExternalLink, AlertCircle } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [nama, setNama] = useState('');
  const [instansi, setInstansi] = useState('');
  const [email, setEmail] = useState('');
  const [kebutuhan, setKebutuhan] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedData, setSubmittedData] = useState<{
    nama: string;
    instansi: string;
    email: string;
    kebutuhan: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [clipboardError, setClipboardError] = useState('');
  const firstInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      const focusFrame = window.requestAnimationFrame(() => {
        firstInputRef.current?.focus();
      });

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key === 'Tab' && dialogRef.current) {
          const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ));
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.cancelAnimationFrame(focusFrame);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previousFocusRef.current?.focus();
      };
    } else {
      document.body.style.overflow = '';
      setErrors({});
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!nama.trim()) {
      newErrors.nama = 'Nama lengkap wajib diisi.';
    }
    if (!instansi.trim()) {
      newErrors.instansi = 'Nama BUMD atau instansi wajib diisi.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email kantor wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Format email kantor tidak valid.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData({
        nama: nama.trim(),
        instansi: instansi.trim(),
        email: email.trim(),
        kebutuhan: kebutuhan.trim() || 'Ingin membahas sumber data dan kebutuhan dashboard di instansi.',
      });
    }
  };

  const handleCopyDetails = async () => {
    if (!submittedData) return;
    const text = `Permintaan demo aionesboard
Nama: ${submittedData.nama}
Instansi: ${submittedData.instansi}
Email Kantor: ${submittedData.email}
Kebutuhan: ${submittedData.kebutuhan}
Domain: aionesboard.app`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setClipboardError('');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setClipboardError('Salin otomatis tidak tersedia. Pilih rincian di atas lalu salin secara manual.');
    }
  };

  const mailtoLink = submittedData
    ? `mailto:kontak@aionesboard.app?subject=${encodeURIComponent(
        `Permintaan Demo aionesboard - ${submittedData.instansi}`
      )}&body=${encodeURIComponent(
        `Yth. Tim aionesboard (aionesboard.app),\n\nKami ingin menjadwalkan sesi demo aionesboard untuk instansi kami.\n\nBerikut rincian kontak kami:\n- Nama: ${submittedData.nama}\n- Instansi: ${submittedData.instansi}\n- Email Kantor: ${submittedData.email}\n- Kebutuhan dashboard: ${submittedData.kebutuhan}\n\nMohon informasi waktu yang tersedia untuk sesi demo.\n\nTerima kasih.`
      )}`
    : '#';

  const handleResetForm = () => {
    setSubmittedData(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#190d46]/70 backdrop-blur-xs"
    >
      {/* Modal Container */}
      <div ref={dialogRef} className="bg-white border border-[#2a1570] rounded-[8px] shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[92dvh]">
        
        {/* Header with #2a1570 banner */}
        <div className="px-6 py-4 border-b border-[#190d46] flex items-center justify-between bg-[#2a1570] text-white">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-white">
              {submittedData ? 'Tinjau Permintaan Demo' : 'Jadwalkan Demo aionesboard'}
            </h2>
            <p className="text-xs text-[#ece7fa] mt-0.5">
              {submittedData
                ? 'Rincian ini belum dikirim. Lanjutkan melalui aplikasi email Anda.'
                : 'Isi data kontak untuk menyiapkan permintaan demo.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Tutup jendela formulir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {!submittedData ? (
            /* Input Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="text-xs text-[#475569] mb-2 font-medium">
                Tanda bintang (<span className="text-rose-600 font-bold">*</span>) menunjukkan kolom wajib diisi.
              </div>

              {/* Field: Nama Lengkap */}
              <div>
                <label htmlFor="nama" className="block text-xs font-bold text-[#172033] mb-1">
                  Nama Lengkap <span className="text-rose-600">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="nama"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.nama)}
                  aria-describedby={errors.nama ? 'nama-error' : undefined}
                  value={nama}
                  onChange={(e) => {
                    setNama(e.target.value);
                    if (errors.nama) setErrors({ ...errors, nama: '' });
                  }}
                  placeholder="Contoh: Budi Prasetyo, S.E."
                  className={`w-full px-3.5 py-2.5 text-sm border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2a1570] text-[#172033] ${
                    errors.nama ? 'border-rose-500 bg-rose-50/30' : 'border-[#cbd2df]'
                  }`}
                />
                {errors.nama && (
                  <p id="nama-error" className="text-xs text-rose-600 mt-1 font-medium">{errors.nama}</p>
                )}
              </div>

              {/* Field: Nama BUMD / Instansi */}
              <div>
                <label htmlFor="instansi" className="block text-xs font-bold text-[#172033] mb-1">
                  Nama BUMD / Instansi <span className="text-rose-600">*</span>
                </label>
                <input
                  id="instansi"
                  type="text"
                  autoComplete="organization"
                  required
                  aria-invalid={Boolean(errors.instansi)}
                  aria-describedby={errors.instansi ? 'instansi-error' : undefined}
                  value={instansi}
                  onChange={(e) => {
                    setInstansi(e.target.value);
                    if (errors.instansi) setErrors({ ...errors, instansi: '' });
                  }}
                  placeholder="Contoh: Perumda Air Minum Tirta Daerah"
                  className={`w-full px-3.5 py-2.5 text-sm border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2a1570] text-[#172033] ${
                    errors.instansi ? 'border-rose-500 bg-rose-50/30' : 'border-[#cbd2df]'
                  }`}
                />
                {errors.instansi && (
                  <p id="instansi-error" className="text-xs text-rose-600 mt-1 font-medium">{errors.instansi}</p>
                )}
              </div>

              {/* Field: Email Kantor */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-[#172033] mb-1">
                  Email Kantor <span className="text-rose-600">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : 'email-hint'}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="Email kantor Anda"
                  className={`w-full px-3.5 py-2.5 text-sm border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2a1570] text-[#172033] ${
                    errors.email ? 'border-rose-500 bg-rose-50/30' : 'border-[#cbd2df]'
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-rose-600 mt-1 font-medium">{errors.email}</p>
                )}
                <p id="email-hint" className="text-[11px] text-[#475569] mt-1">
                  Gunakan email kedinasan atau korporasi untuk verifikasi instansi.
                </p>
              </div>

              {/* Field: Kebutuhan Dashboard */}
              <div>
                <label htmlFor="kebutuhan" className="block text-xs font-bold text-[#172033] mb-1">
                  Kebutuhan Dashboard <span className="text-[#475569] font-normal">(Opsional)</span>
                </label>
                <textarea
                  id="kebutuhan"
                  rows={3}
                  aria-describedby="kebutuhan-hint"
                  value={kebutuhan}
                  onChange={(e) => setKebutuhan(e.target.value)}
                  placeholder="Ceritakan kebutuhan dashboard Anda"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#cbd2df] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2a1570] text-[#172033]"
                />
                <p id="kebutuhan-hint" className="text-[11px] text-[#475569] mt-1">Sebutkan sumber data, indikator, atau tampilan yang ingin dibahas.</p>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-bold text-[#475569] hover:text-[#172033] rounded-[8px] hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-11 px-6 text-xs font-bold text-white bg-[#2a1570] hover:bg-[#190d46] rounded-[8px] transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a1570]"
                >
                  Tinjau Permintaan
                </button>
              </div>
            </form>
          ) : (
            /* Transparent Submission State */
            <div className="space-y-4">
              <div className="p-4 bg-[#dbffff] border border-[#017cc3] rounded-[8px] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#017cc3] shrink-0 mt-0.5" />
                <div className="text-xs text-[#172033] leading-relaxed">
                  <span className="font-bold block mb-0.5">Permintaan belum terkirim</span>
                  aionesboard belum menerima data dari formulir ini. Buka draf email, periksa isinya, lalu pilih Kirim. Anda juga dapat menyalin rinciannya.
                </div>
              </div>

              {/* Summary of Data */}
              <div className="bg-[#f8fafc] border border-[#cbd2df] rounded-[8px] p-4 space-y-2.5 text-xs text-[#172033]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-[#2a1570]">Rincian Permintaan:</span>
                  <span className="text-[11px] font-semibold text-[#017cc3]">aionesboard</span>
                </div>
                <div>
                  <span className="text-[#475569] block font-medium">Nama Lengkap:</span>
                  <span className="font-bold text-[#172033]">{submittedData.nama}</span>
                </div>
                <div>
                  <span className="text-[#475569] block font-medium">Instansi / BUMD:</span>
                  <span className="font-bold text-[#172033]">{submittedData.instansi}</span>
                </div>
                <div>
                  <span className="text-[#475569] block font-medium">Email Kantor:</span>
                  <span className="font-bold text-[#172033]">{submittedData.email}</span>
                </div>
                <div>
                  <span className="text-[#475569] block font-medium">Kebutuhan Dashboard:</span>
                  <span className="text-[#172033] leading-relaxed">{submittedData.kebutuhan}</span>
                </div>
              </div>

              {/* Email and copy actions using brand colors */}
              <div className="space-y-2 pt-2">
                <a
                  href={mailtoLink}
                  className="w-full flex items-center justify-center gap-2 h-11 px-4 text-xs font-bold text-white bg-[#017cc3] hover:bg-[#0068a6] rounded-[8px] transition-colors text-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>Buka di Aplikasi Email Kantor</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="w-full flex items-center justify-center gap-2 h-10 px-4 text-xs font-bold text-[#172033] bg-white border border-[#cbd2df] hover:bg-slate-50 rounded-[8px] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-[#017cc3] font-bold">Tersalin ke Papan Klip</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#475569]" />
                      <span>Salin Teks Rincian</span>
                    </>
                  )}
                </button>
              </div>
              {clipboardError && <p role="status" className="text-xs text-[#172033]">{clipboardError}</p>}

              <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs font-semibold text-[#017cc3] hover:underline"
                >
                  Ubah data formulir
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-[#172033] bg-slate-100 hover:bg-slate-200 rounded-[8px]"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
