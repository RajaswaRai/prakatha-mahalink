import {
  Search,
  Bell,
  ChevronRight,
  Upload,
  Info,
  ArrowRight,
} from "lucide-react";

export default function CreateOrganizationPage() {
  const founders = [
    { initials: "RA", name: "Raka Aditya" },
    { initials: "SP", name: "Sinta Puspita" },
    { initials: "DH", name: "Dewi Hapsari" },
    { initials: "GW", name: "Gilang Wibowo" },
    { initials: "MF", name: "Mira Fauziah" },
    { initials: "TA", name: "Teguh Ardiansyah" },
  ];

  return (
    <main>
      {/* Top Header Navigation Bar */}
      <header className="h-16 w-full bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari organisasi, acara, atau artikel..."
            className="w-full bg-[#F8FAFC] border border-gray-200/80 rounded-xl pl-9 pr-12 py-2 text-xs text-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded border border-gray-200">
            ⌘K
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F2842F] rounded-full" />
          </button>
          <div className="flex items-center gap-2.5 pl-3 border-l border-gray-100">
            <div className="w-8 h-8 rounded-full bg-[#E5EEFF] text-[#15224F] font-semibold text-xs flex items-center justify-center">
              RA
            </div>
            <span className="text-xs font-semibold text-gray-800">
              Raka Aditya
            </span>
          </div>
        </div>
      </header>

      {/* Form Page Content */}
      <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <span className="hover:text-gray-800 cursor-pointer">Organisasi</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium">
            Ajukan organisasi baru
          </span>
        </nav>

        {/* Main Grid: Form Left (2/3) + Approval Workflow Right (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Form Box */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#15224F] tracking-tight">
                Ajukan organisasi baru
              </h1>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Isi data dasar saja. Setelah disetujui Pusat Kemahasiswaan, kamu
                bisa mengatur pengurus, peran, dan divisi dari dashboard
                organisasi.
              </p>
            </div>

            {/* Input Group: Name & Abbreviation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Nama organisasi
                </label>
                <input
                  type="text"
                  defaultValue="Komunitas Desain Produk Nusantara"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#15224F] transition-colors"
                />
                <p className="text-[10px] text-gray-400">
                  Nama resmi yang tampil di Mantra
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Singkatan
                </label>
                <input
                  type="text"
                  defaultValue="KDPN"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#15224F] transition-colors"
                />
                <p className="text-[10px] text-gray-400">Maks. 6 huruf</p>
              </div>
            </div>

            {/* Input Group: Type, Category, Scope */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Jenis
                </label>
                <select
                  defaultValue="Komunitas"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#15224F] transition-colors"
                >
                  <option value="Komunitas">Komunitas</option>
                  <option value="UKM">UKM</option>
                  <option value="HIMA">HIMA</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Kategori
                </label>
                <select
                  defaultValue="Teknologi"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#15224F] transition-colors"
                >
                  <option value="Teknologi">Teknologi</option>
                  <option value="Seni">Seni & Budaya</option>
                  <option value="Sosial">Sosial</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Lingkup
                </label>
                <select
                  defaultValue="Universitas"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#15224F] transition-colors"
                >
                  <option value="Universitas">Universitas</option>
                  <option value="Fakultas">Fakultas</option>
                </select>
              </div>
            </div>

            {/* Textarea: Description & Purpose */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">
                Deskripsi & tujuan
              </label>
              <textarea
                rows={4}
                defaultValue="Wadah mahasiswa lintas jurusan yang tertarik desain produk digital: kelas riset pengguna, studi kasus, dan proyek nyata bersama UMKM sekitar kampus."
                className="w-full bg-white border border-gray-300 rounded-xl p-3.5 text-xs text-gray-800 focus:outline-none focus:border-[#15224F] transition-colors leading-relaxed"
              />
            </div>

            {/* Input: Advisor Teacher */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">
                Dosen pembina
              </label>
              <input
                type="text"
                defaultValue="Dr. Lestari Wulandari, M.Ds."
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#15224F] transition-colors"
              />
              <p className="text-[10px] text-gray-400">
                Pembina menyetujui lewat surat yang diunggah di bawah
              </p>
            </div>

            {/* Section: Founder Members */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-gray-700">
                Anggota pendiri ·{" "}
                <span className="text-gray-500 font-normal">
                  12 dari minimal 10 mahasiswa aktif
                </span>
              </label>

              <div className="flex flex-wrap gap-2">
                {founders.map((f) => (
                  <div
                    key={f.initials}
                    className="flex items-center gap-2 bg-[#F3F7FF] px-3 py-1.5 rounded-full border border-blue-100/60"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-200/70 text-[#15224F] text-[9px] font-bold flex items-center justify-center">
                      {f.initials}
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {f.name}
                    </span>
                  </div>
                ))}
                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600">
                  +6 lainnya
                </div>
              </div>

              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Contoh: 2410511077"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#15224F] transition-colors"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Undangan dikirim ke email kampus mereka
                </p>
              </div>
            </div>

            {/* Section: File Uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  AD/ART organisasi (PDF)
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gray-300 transition-colors bg-gray-50/50 cursor-pointer">
                  <Upload className="w-5 h-5 text-gray-400 mb-2" />
                  <p className="text-xs font-bold text-gray-800">
                    Tarik berkas ke sini atau pilih berkas
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    PDF, DOCX, XLSX, JPG, PNG · maks. 10 MB
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Surat persetujuan dosen pembina
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gray-300 transition-colors bg-gray-50/50 cursor-pointer">
                  <Upload className="w-5 h-5 text-gray-400 mb-2" />
                  <p className="text-xs font-bold text-gray-800">
                    Tarik berkas ke sini atau pilih berkas
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    PDF, DOCX, XLSX, JPG, PNG · maks. 10 MB
                  </p>
                </div>
              </div>
            </div>

            {/* Info Notice Banner */}
            <div className="bg-[#EEF9FF] border border-blue-100 rounded-xl p-4 flex items-start gap-3 text-xs text-[#15224F]">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="leading-relaxed">
                Pengurus, peran, dan divisi{" "}
                <span className="font-semibold">belum perlu diisi</span>.
                Semuanya diatur setelah organisasi disetujui, langsung dari
                dashboard organisasi.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button className="flex items-center gap-2 bg-[#15224F] hover:bg-[#0F1938] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
                <span>Kirim pengajuan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors">
                Simpan draf
              </button>
            </div>
          </div>

          {/* Right Workflow Box (Timeline Alur Persetujuan) */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-sm font-bold text-[#15224F]">
              Alur persetujuan
            </h2>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {/* Step 1 */}
              <div className="relative">
                <span className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#15224F] ring-4 ring-white" />
                <h3 className="text-xs font-bold text-gray-900">
                  1. Kirim pengajuan
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Data dasar, pendiri, dan dokumen
                </p>
                <span className="text-[10px] text-gray-400 font-medium">
                  Sekarang
                </span>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <span className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
                <h3 className="text-xs font-bold text-gray-900">
                  2. Ditinjau Pusat Kemahasiswaan
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Bisa diminta revisi dokumen
                </p>
                <span className="text-[10px] text-gray-400 font-medium">
                  ±5 hari kerja
                </span>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <span className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
                <h3 className="text-xs font-bold text-gray-900">
                  3. Disetujui & tampil di Mantra
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Web organisasi otomatis dibuat
                </p>
                <span className="text-[10px] text-gray-400 font-medium">
                  Setelah disetujui
                </span>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <span className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
                <h3 className="text-xs font-bold text-gray-900">
                  4. Atur pengurus, peran & divisi
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Seperti peran di Discord, bisa diubah kapan saja
                </p>
                <span className="text-[10px] text-gray-400 font-medium">
                  Dari dashboard organisasi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
