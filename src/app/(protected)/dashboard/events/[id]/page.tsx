"use client";

import {
  Search,
  Bell,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Share2,
  ExternalLink,
  Users,
} from "lucide-react";

export default function EventDetailPage() {
  const eventSchedule = [
    {
      time: "08.30 WIB",
      desc: "Registrasi ulang (sebutkan nama/NIM di meja panitia)",
    },
    { time: "09.00 WIB", desc: "Pembukaan oleh Ketua HMTI" },
    { time: "09.30 WIB", desc: "Kelas singkat: dari masalah ke ide" },
    { time: "11.00 WIB", desc: "Kerja tim bersama mentor" },
    { time: "12.00 WIB", desc: "Istirahat, salat, makan siang" },
    { time: "13.00 WIB", desc: "Kerja tim lanjutan" },
    { time: "14.15 WIB", desc: "Presentasi 5 menit per tim" },
    { time: "15.00 WIB", desc: "Penutupan & pengumuman" },
  ];

  const contacts = [
    {
      initials: "AF",
      name: "Anisa Fitri",
      role: "Divisi Media HMTI · WA 0812-8877-1045",
    },
    {
      initials: "YH",
      name: "Yusuf Hakim",
      role: "Ketua pelaksana · WA 0857-1122-3390",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
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

      {/* Main Page Container */}
      <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <span className="hover:text-gray-800 cursor-pointer">Acara</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium">
            DesignLab 2026: Ide Jadi Karya
          </span>
        </nav>

        {/* Hero Banner Image Box */}
        <div className="w-full h-72 bg-[#EEF2F7] border border-gray-200/80 rounded-2xl flex flex-col items-center justify-center text-center p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-gray-200/70 flex items-center justify-center text-gray-400 mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-xs text-gray-500">
            Banner DesignLab 2026: peserta presentasi prototipe di Aula Gedung C
          </p>
        </div>

        {/* Grid Content Layout: Left Details (2/3) + Right Action Card (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Title, Organizers, About, Schedule, Location, Contacts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-md">
                  Teknologi
                </span>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md">
                  Akan datang
                </span>
                <span className="px-2.5 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold rounded-md">
                  Publik
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-[#15224F] tracking-tight">
                DesignLab 2026: Ide Jadi Karya
              </h1>

              <div className="flex items-center gap-2 pt-1">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                  TI
                </div>
                <span className="text-xs text-gray-500">
                  Diselenggarakan oleh{" "}
                  <strong className="text-gray-800 font-semibold">
                    Himpunan Mahasiswa Teknik Informatika
                  </strong>
                </span>
              </div>
            </div>

            {/* Tentang Acara Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-[#15224F]">
                Tentang acara
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Satu hari untuk mengubah keluhan kampus jadi prototipe. Peserta
                dibagi ke tim lintas fakultas, didampingi mentor dari studio
                desain Jakarta dan alumni HMTI. Tidak perlu pengalaman desain —
                bawa laptop dan rasa penasaran.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Yang kamu dapat: sertifikat elektronik, makan siang, dan
                kesempatan magang di 3 studio mitra untuk tim terbaik.
              </p>
            </div>

            {/* Susunan Acara Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-[#15224F]">
                Susunan acara
              </h2>
              <div className="divide-y divide-gray-100">
                {eventSchedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3 first:pt-0 last:pb-0 flex items-center gap-6"
                  >
                    <span className="w-20 text-xs font-bold text-gray-900 shrink-0">
                      {item.time}
                    </span>
                    <span className="text-xs text-gray-600">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lokasi Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-[#15224F]">Lokasi</h2>
              <p className="text-xs text-gray-600">
                Aula Gedung C lantai 3, Universitas Nusantara · Jl. Merdeka Raya
                No. 45, Depok
              </p>

              {/* Map Placeholder Box */}
              <div className="w-full h-44 bg-[#EEF2F7] border border-gray-200/80 rounded-xl flex flex-col items-center justify-center text-center p-4">
                <MapPin className="w-5 h-5 text-gray-400 mb-1" />
                <p className="text-[11px] text-gray-400">
                  Peta lokasi (Google embed): Aula Gedung C
                </p>
              </div>

              <button className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1.5 pt-1">
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Narahubung Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-[#15224F]">Narahubung</h2>
              <div className="space-y-3">
                {contacts.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {c.initials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-gray-400">{c.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Floating Sticky Action Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">
            {/* Meta Info List */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[11px] text-gray-400">Tanggal</div>
                  <div className="text-xs font-bold text-gray-900">
                    Sabtu, 24 Oktober 2026
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[11px] text-gray-400">Waktu</div>
                  <div className="text-xs font-bold text-gray-900">
                    09.00–15.00 WIB
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-gray-400 font-bold text-sm leading-none mt-0.5 shrink-0">
                  Rp
                </span>
                <div>
                  <div className="text-[11px] text-gray-400">Biaya</div>
                  <div className="text-xs font-bold text-gray-900">Gratis</div>
                </div>
              </div>
            </div>

            {/* Quota Progress Bar */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700">Kuota</span>
                <span className="text-gray-500 font-medium">
                  232 / 250 terisi
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#15224F] h-full w-[92%]" />
              </div>
              <p className="text-[10px] text-orange-600 font-medium pt-0.5">
                Sisa 18 kursi · pendaftaran ditutup 23 Okt, 23.59 WIB
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button className="w-full flex items-center justify-center gap-2 bg-[#15224F] hover:bg-[#0F1938] text-white py-3 rounded-xl text-xs font-semibold shadow-sm transition-colors">
                <span>Bergabung Acara</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1.5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-[11px] font-semibold transition-colors">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>Tambah ke Kalender</span>
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-[11px] font-semibold transition-colors">
                  <Share2 className="w-3.5 h-3.5 text-gray-500" />
                  <span>Bagikan ke WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Friends / Mutual Info Footer */}
            <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
              <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>
                <strong className="text-gray-800 font-semibold">
                  5 TAF 11 FKM
                </strong>{" "}
                · Termasuk 3 temanmu dari HMTI
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
