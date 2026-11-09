"use client";

import { useState } from "react";
import {
  Share2,
  Bell,
  UserPlus,
  ChevronRight,
  Clock,
  MapPin,
  ArrowRight,
  ImageIcon,
} from "lucide-react";

export default function PublicOrganizationPage() {
  const [activeTab, setActiveTab] = useState("Tentang organisasi");

  const tabs = ["Tentang organisasi", "Kepengurusan", "Acara", "Artikel"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <span className="hover:text-gray-800 cursor-pointer">Organisasi</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium">
            Himpunan Mahasiswa Teknik Informatika
          </span>
        </nav>

        {/* Banner Placeholder Header */}
        <div className="w-full h-56 lg:h-64 bg-[#EAEFF8] rounded-2xl border border-gray-200/60 flex flex-col items-center justify-center text-gray-400 p-6 text-center shadow-inner">
          <ImageIcon className="w-8 h-8 mb-2 text-gray-300" />
          <p className="text-xs text-gray-400">
            Banner HMTI: mahasiswa berdiskusi di taman kampus (diunggah
            pengurus)
          </p>
        </div>

        {/* Profile Info Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#D6E6FF] text-[#1E3A8A] font-bold text-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              HMTI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#E6F4EA] text-[#137333] px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#137333]" />
                  Organisasi terverifikasi
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                Himpunan Mahasiswa Teknik Informatika
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Fakultas Teknik · Berdiri sejak 2008 · 128 anggota aktif
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button className="p-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition-colors shadow-sm">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
              <Bell className="w-4 h-4 text-gray-500" />
              <span>Ikuti</span>
            </button>
            <button className="flex items-center gap-2 bg-[#1A2542] hover:bg-[#0F172A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
              <UserPlus className="w-4 h-4" />
              <span>Ajukan bergabung</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 text-xs font-semibold pt-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 relative transition-colors ${
                activeTab === tab
                  ? "text-gray-900 font-bold border-b-2 border-gray-900 -mb-[1px]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Grid Content (2 Columns Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
          {/* Left Column (2 Kolom) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Box: Visi & Misi */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Belajar, berkarya, dan berdampak.
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed mt-2">
                  HMTI adalah ruang kolaborasi mahasiswa Teknik Informatika
                  Universitas Nusantara. Kami menghubungkan pembelajaran di
                  kelas dengan pengalaman nyata melalui proyek, diskusi, dan
                  pengabdian.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-900">Visi kami</h3>
                <p className="text-xs text-gray-600 leading-relaxed mt-1">
                  Menjadi komunitas teknologi yang inklusif, inovatif, dan
                  memberi manfaat bagi masyarakat.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-900 mb-2">Misi</h3>
                <ul className="space-y-2 text-xs text-gray-600 list-disc list-inside leading-relaxed">
                  <li>
                    Kelas mingguan pemrograman & desain untuk semua angkatan
                  </li>
                  <li>Proyek pengabdian digital untuk UMKM sekitar kampus</li>
                  <li>Pendampingan lomba nasional (Gemastik, Hology, KMIPN)</li>
                </ul>
              </div>
            </div>

            {/* Box: Kegiatan Terdekat */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900">
                  Kegiatan terdekat
                </h2>
                <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                  Semua acara <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="border border-gray-100 rounded-xl overflow-hidden bg-white flex flex-col md:flex-row items-center p-4 gap-4">
                {/* Photo Placeholder */}
                <div className="w-full md:w-56 h-36 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 p-4 border border-gray-100 flex-shrink-0">
                  <ImageIcon className="w-6 h-6 mb-1 text-gray-300" />
                  <span className="text-[10px] text-center text-gray-400">
                    Foto kegiatan: DesignLab 2026: Ide Jadi Karya
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex-1 flex flex-col justify-between w-full h-36 py-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 text-red-600 text-center rounded-xl px-3 py-1.5 min-w-[50px] border border-red-100">
                      <span className="block text-[10px] font-bold uppercase">
                        OKT
                      </span>
                      <span className="block text-base font-black">24</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-snug">
                        DesignLab 2026: Ide Jadi Karya
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Sabtu, 09.00-15.00 WIB
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Aula Gedung C,
                        Universitas Nusantara
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        oleh HMTI
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-2 text-xs">
                    <span className="font-bold text-gray-900">Gratis</span>
                    <span className="text-orange-600 font-medium text-[11px]">
                      Sisa 18 kursi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (1 Kolom Sidebar) */}
          <div className="space-y-6">
            {/* Box: Pendaftaran Anggota Dibuka */}
            <div className="bg-[#FFF8F6] border border-orange-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-2.5">
                <UserPlus className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-xs font-bold text-orange-950">
                    Pendaftaran anggota dibuka
                  </h3>
                  <p className="text-[11px] text-orange-800/80 mt-1 leading-relaxed">
                    Ditutup otomatis bila kuota divisi sudah penuh · 41
                    pendaftar
                  </p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-[#1A2542] hover:bg-[#0F172A] text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors shadow-sm">
                <UserPlus className="w-4 h-4" />
                <span>Ajukan bergabung</span>
              </button>
            </div>

            {/* Box: Kepengurusan 2026/2027 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-gray-900">
                Kepengurusan 2026/2027
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[11px] text-gray-400 block mb-0.5">
                    Ketua
                  </span>
                  <p className="font-bold text-gray-900">Nadia Azzahra</p>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 block mb-0.5">
                    Wakil ketua
                  </span>
                  <p className="font-bold text-gray-900">Fajar Ramadhan</p>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 block mb-0.5">
                    Periode aktif
                  </span>
                  <p className="font-bold text-gray-900">
                    1 September 2026–31 Agustus 2027
                  </p>
                </div>
              </div>
            </div>

            {/* Box: Terhubung dengan kami */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-gray-900">
                Terhubung dengan kami
              </h3>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-[11px] text-gray-400 block mb-0.5">
                    Email organisasi
                  </span>
                  <a
                    href="mailto:hmti@nusantara.ac.id"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    hmti@nusantara.ac.id
                  </a>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 block mb-0.5">
                    Instagram
                  </span>
                  <a
                    href="https://instagram.com/hmti.nusantara"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    @hmti.nusantara
                  </a>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 block mb-0.5">
                    Sekretariat
                  </span>
                  <p className="font-bold text-gray-900">
                    Gedung C, lantai 1, ruang C.108
                  </p>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 block mb-0.5">
                    Kumpul rutin
                  </span>
                  <p className="font-bold text-gray-900">
                    Kamis, 16.00–18.00 WIB · ruang C.108
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
