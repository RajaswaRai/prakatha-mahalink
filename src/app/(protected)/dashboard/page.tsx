// import { auth } from "@/auth";
// import { Suspense } from "react";

// export const instant = false;

// function DashboardSkeleton() {
//   return <h1>Loading...</h1>;
// }

// export default async function DashboardPage() {
//   const session = await auth();
//   if (!session) return <div>Not authenticated</div>;

//   return (
//     <Suspense fallback={DashboardSkeleton()}>
//       <h1>Dashboard Page</h1>
//     </Suspense>
//   );
// }

import MySideBar from "@/components/my/MySideBar";
import {
  Search,
  Bell,
  ChevronRight,
  Clock,
  MapPin,
  Upload,
  Calendar as CalendarIcon,
  Image as ImageIcon,
  Plus,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="flex-1 flex flex-col min-w-0">
      {/* Top Header / Navigation Bar[cite: 3] */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
        {/* Search Bar[cite: 3] */}
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

        {/* Right Header Actions[cite: 3] */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2.5 pl-3 border-l border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs flex items-center justify-center">
              RA
            </div>
            <span className="text-xs font-semibold text-gray-800">
              Raka Aditya
            </span>
          </div>
        </div>
      </header>

      {/* Dashboard Body Content[cite: 3] */}
      <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Greeting & Quick Action Banner[cite: 3] */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-gray-400">
              RABU, 28 OKTOBER 2026
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
              Selamat siang, Raka
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Hari ini ada rapat divisi riset pukul 15.30, iuran HMTI Oktober
              jatuh tempo 3 hari lagi.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200/80 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
              <Search className="w-3.5 h-3.5 text-gray-500" />
              <span>Cari organisasi</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              <span>Ajukan organisasi</span>
            </button>
          </div>
        </div>

        {/* Grid Layout untuk Konten Utama[cite: 3] */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri & Tengah (Lebar 2 Kolom)[cite: 3] */}
          <div className="lg:col-span-2 space-y-8">
            {/* Agenda Saya[cite: 3] */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">Agenda saya</h2>
                <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                  Kalender <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Agenda Item 1 */}
                <div className="p-4 rounded-xl border border-blue-100 bg-[#F0F7FF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 text-orange-600 text-center rounded-lg px-2.5 py-1.5 min-w-[48px]">
                      <span className="block text-[10px] font-bold uppercase">
                        Okt
                      </span>
                      <span className="block text-sm font-black">28</span>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">
                        Rapat Divisi Riset HMTI
                      </h3>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> Hari ini, 15.30-17.00 WIB
                        · <MapPin className="w-3 h-3" /> Ruang C.108 · Internal
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-medium bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">
                        ✓ Akan datang
                      </span>
                    </div>
                  </div>
                </div>

                {/* Agenda Item 2 */}
                <div className="p-4 rounded-xl border border-gray-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 text-orange-600 text-center rounded-lg px-2.5 py-1.5 min-w-[48px]">
                      <span className="block text-[10px] font-bold uppercase">
                        Okt
                      </span>
                      <span className="block text-sm font-black">29</span>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">
                        Donor Darah & Cek Kesehatan
                      </h3>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> Kamis · 08.00 WIB · Lobi
                        Rektorat · KSR PMI Unit · pengingat H-1 piket
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">
                        • Terdaftar
                      </span>
                    </div>
                  </div>
                </div>

                {/* Agenda Item 3 */}
                <div className="p-4 rounded-xl border border-gray-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 text-amber-700 text-center rounded-lg px-2.5 py-1.5 min-w-[48px]">
                      <span className="block text-[10px] font-bold uppercase">
                        Nov
                      </span>
                      <span className="block text-sm font-black">1</span>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">
                        Bootcamp Robotika Dasar
                      </h3>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> Sabtu · 08.30 WIB · Lab
                        Robotika, Gedung D
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
                        • Ragu-ragu
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tagihan Iuran[cite: 3] */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">
                  Tagihan iuran
                </h2>
                <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                  Riwayat <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-5 rounded-xl border border-orange-100 bg-[#FFFBF5] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-800">
                      Iuran HMTI - Oktober 2026
                    </span>
                    <span className="bg-orange-100 text-orange-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                      Belum bayar
                    </span>
                  </div>
                  <div className="text-2xl font-black text-gray-900 mt-1">
                    Rp25.000
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Jatuh tempo Sabtu, 31 Oktober 2026 · transfer ke BSI
                    722.486.769 a.n. HMTI Univ. Nusantara
                  </p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#1E293B] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm whitespace-nowrap">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah bukti bayar</span>
                </button>
              </div>
            </div>

            {/* Pengumuman dari Organisasimu[cite: 3] */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-4">
                Pengumuman dari organisasimu
              </h2>

              <div className="divide-y divide-gray-100">
                <div className="py-3 first:pt-0 last:pb-0 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        HMTI
                      </span>
                      <span className="text-[10px] text-gray-400">
                        2 jam lalu
                      </span>
                    </div>
                    <p className="text-xs text-gray-800 mt-1 font-medium">
                      Pembagian tim DesignLab sudah keluar. Cek grup divisi atau
                      lampiran di dashboard HMTI.
                    </p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                </div>

                <div className="py-3 first:pt-0 last:pb-0 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        KSR PMI Unit
                      </span>
                      <span className="text-[10px] text-gray-400">Kemarin</span>
                    </div>
                    <p className="text-xs text-gray-800 mt-1 font-medium">
                      Relawan donor darah 29 Okt: kumpul 07.30 di Lobi Rektorat,
                      pakai rompi KSR.
                    </p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                </div>

                <div className="py-3 first:pt-0 last:pb-0 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        HMTI
                      </span>
                      <span className="text-[10px] text-gray-400">
                        3 hari lalu
                      </span>
                    </div>
                    <p className="text-xs text-gray-800 mt-1 font-medium">
                      Iuran Oktober dibuka. Pembayaran sebagian boleh, sisanya
                      sebelum 30 Nov.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Acara Terbaru[cite: 3] */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">
                  Acara terbaru
                </h2>
                <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                  Semua acara <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card Acara 1 */}
                <div className="border border-gray-200/80 rounded-xl overflow-hidden bg-white flex flex-col justify-between">
                  <div>
                    <div className="h-32 bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-4 border-b border-gray-100">
                      <ImageIcon className="w-6 h-6 mb-1 text-gray-300" />
                      <span className="text-[10px] text-center text-gray-400">
                        Foto kegiatan: Bootcamp Robotika Dasar
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-orange-100 text-orange-600 text-center rounded-lg px-2 py-1 min-w-[40px]">
                          <span className="block text-[9px] font-bold uppercase">
                            Nov
                          </span>
                          <span className="block text-xs font-black">1</span>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-gray-900 leading-tight">
                            Bootcamp Robotika Dasar
                          </h3>
                          <p className="text-[10px] text-gray-500 mt-1">
                            Sabtu, 08.30-16.00 WIB
                          </p>
                          <p className="text-[10px] text-gray-500">
                            Lab Robotika, Gedung D
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            oleh Nusa Robotic Team
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-gray-900">Rp25.000</span>
                    <span className="text-orange-600 font-medium text-[10px]">
                      Sisa 5 kursi
                    </span>
                  </div>
                </div>

                {/* Card Acara 2 */}
                <div className="border border-gray-200/80 rounded-xl overflow-hidden bg-white flex flex-col justify-between">
                  <div>
                    <div className="h-32 bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-4 border-b border-gray-100">
                      <ImageIcon className="w-6 h-6 mb-1 text-gray-300" />
                      <span className="text-[10px] text-center text-gray-400">
                        Foto kegiatan: Kelas Pajak untuk UMKM Mahasiswa
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-orange-100 text-orange-600 text-center rounded-lg px-2 py-1 min-w-[40px]">
                          <span className="block text-[9px] font-bold uppercase">
                            Okt
                          </span>
                          <span className="block text-xs font-black">30</span>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-gray-900 leading-tight">
                            Kelas Pajak untuk UMKM Mahasiswa
                          </h3>
                          <p className="text-[10px] text-gray-500 mt-1">
                            Jumat, 15.30-17.00 WIB
                          </p>
                          <p className="text-[10px] text-gray-500">
                            Zoom Meeting
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            oleh HMAK
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-600">Gratis</span>
                    <span className="text-orange-600 font-medium text-[10px]">
                      141 kursi tersedia
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terbaru dari Blog[cite: 3] */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">
                  Terbaru dari Blog
                </h2>
                <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                  Blog <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Blog Item 1 */}
                <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="w-full sm:w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-400">
                    <ImageIcon className="w-5 h-5 text-gray-300" />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                          PRESTASI
                        </span>
                        <span className="text-[9px] text-gray-400">· HMTI</span>
                      </div>
                      <h3 className="text-xs font-bold text-gray-900 mt-1 leading-snug">
                        HMTI Raih Juara 2 Gemastik 2026 Kategori Pengembangan
                        Aplikasi
                      </h3>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">
                      Dimas Prasetyo · 18 Okt 2026 · 4 menit baca
                    </p>
                  </div>
                </div>

                {/* Blog Item 2 */}
                <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="w-full sm:w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-400">
                    <ImageIcon className="w-5 h-5 text-gray-300" />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          PENGABDIAN
                        </span>
                        <span className="text-[9px] text-gray-400">
                          · KSR PMI Unit
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-gray-900 mt-1 leading-snug">
                        KSR Kumpulkan 180 Kantong Darah dalam Sehari
                      </h3>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">
                      Salsabila Putri · 9 Okt 2026 · 4 menit baca
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan (Lebar 1 Kolom)[cite: 3] */}
          <div className="space-y-8">
            {/* Organisasi Saya[cite: 3] */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-4">
                Organisasi saya
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      TI
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">HMTI</h3>
                      <p className="text-[10px] text-gray-400">
                        Staf Divisi Riset · periode 2026/2027
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                      KSR
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">
                        KSR PMI Unit
                      </h3>
                      <p className="text-[10px] text-gray-400">
                        Anggota · sejak 2024
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Status Pengajuan[cite: 3] */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-4">
                Status pengajuan
              </h2>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-gray-100 bg-[#FAFAFA]">
                  <h3 className="text-xs font-bold text-gray-900">
                    Komunitas Desain Produk Nusantara
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Pengajuan organisasi baru · ditinjau Pusat Kemahasiswaan
                  </p>
                  <div className="mt-2.5">
                    <span className="text-[10px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
                      • Diajukan
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-100 bg-[#FAFAFA]">
                  <h3 className="text-xs font-bold text-gray-900">
                    Bergabung ke Nusa Robotic Team
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Diajukan 18 Okt · ditinjau sekretaris
                  </p>
                  <div className="mt-2.5">
                    <span className="text-[10px] font-medium bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md">
                      • Menunggu persetujuan
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-100 bg-[#FAFAFA]">
                  <h3 className="text-xs font-bold text-gray-900">
                    Pinjam proyektor Epson EB-X31 (HMTI)
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Ambil 29 Okt di C.108 · kembali 2 Nov
                  </p>
                  <div className="mt-2.5">
                    <span className="text-[10px] font-medium bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">
                      ✓ Disetujui
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
