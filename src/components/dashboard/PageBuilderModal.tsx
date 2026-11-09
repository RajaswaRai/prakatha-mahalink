"use client";

import { useState } from "react";
import {
  X,
  Monitor,
  Smartphone,
  Eye,
  Send,
  Plus,
  ChevronRight,
  Image as ImageIcon,
  Palette,
  CheckCircle2,
} from "lucide-react";

interface PageBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageTitle?: string;
}

export default function PageBuilderModal({
  isOpen,
  onClose,
  pageTitle = "Himpunan Mahasiswa Teknik Informatika",
}: PageBuilderModalProps) {
  // State untuk simulasi ubah dinamis mirip WordPress
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [activeSection, setActiveSection] = useState("Hero");

  // State data dinamis untuk bagian "Hero"
  const [heroData, setHeroData] = useState({
    eyebrow: "Kegiatan mahasiswa",
    title: "Belajar, berkarya, dan berdampak bersama HMTI.",
    subtitle:
      "Kelas mingguan, proyek pengabdian untuk UMKM, dan tim lomba nasional.",
    buttonText: "Ajukan bergabung",
    captionPhoto: "Foto sampul saat ini: pengurus di depan Gedung C.",
    accentColor: "blue", // blue, purple, orange, red
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#F1F5F9] animate-in fade-in duration-200 overflow-hidden">
      {/* ================= TOP HEADER BAR ================= */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            title="Tutup Editor"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-900">
                Customizer Builder
              </span>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-md">
                · Draf · Belum diterbitkan
              </span>
            </div>
            <h1 className="text-sm font-bold text-gray-800">{pageTitle}</h1>
          </div>
        </div>

        {/* Device Switcher & Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 border border-gray-200">
            <button
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "desktop"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "mobile"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl text-xs font-semibold transition-colors shadow-sm">
            <Eye className="w-4 h-4 text-gray-500" />
            <span>Lihat sebagai tamu</span>
          </button>

          <button
            onClick={() => {
              alert("Perubahan berhasil diterbitkan!");
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2 bg-[#15224F] hover:bg-[#0F1938] text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Terbitkan</span>
          </button>
        </div>
      </header>

      {/* ================= MAIN BUILDER BODY ================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ---- LEFT SIDEBAR: CONTROL PANEL (Mirip WP Customizer) ---- */}
        <aside className="w-96 bg-white border-r border-gray-200 flex flex-col shrink-0 z-10 shadow-sm">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Bagian Halaman
            </span>
            <p className="text-[11px] text-gray-500">
              Seret untuk mengubah urutan / matikan untuk menyembunyikan dari
              tamu.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* List Section Accordion / Selector */}
            <div className="space-y-2">
              {[
                "Hero",
                "Tentang & Visi-Misi",
                "Pengurus",
                "Divisi",
                "Artikel",
                "Kontak & Pendaftaran",
              ].map((section) => (
                <div
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    activeSection === section
                      ? "border-blue-600 bg-blue-50/30 text-blue-900 shadow-sm"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>{section}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl text-xs font-semibold transition-colors">
              <Plus className="w-4 h-4 text-gray-500" />
              <span>Tambah bagian</span>
            </button>

            <hr className="border-gray-100 my-4" />

            {/* Dynamic Controls untuk Section yang aktif (Contoh: HERO) */}
            {activeSection === "Hero" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  Pengaturan Hero
                </h3>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Judul Utama
                  </label>
                  <textarea
                    rows={2}
                    value={heroData.title}
                    onChange={(e) =>
                      setHeroData({ ...heroData, title: e.target.value })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-blue-600 resize-none transition-colors"
                  />
                  <span className="text-[10px] text-gray-400">
                    Maks. 60 karakter
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Subjudul
                  </label>
                  <textarea
                    rows={2}
                    value={heroData.subtitle}
                    onChange={(e) =>
                      setHeroData({ ...heroData, subtitle: e.target.value })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-blue-600 resize-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Teks Tombol Utama
                  </label>
                  <input
                    type="text"
                    value={heroData.buttonText}
                    onChange={(e) =>
                      setHeroData({ ...heroData, buttonText: e.target.value })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Foto Sampul Uploader */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Foto Sampul
                  </label>
                  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col items-center justify-center text-center space-y-2">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                    <span className="text-[11px] text-gray-500">
                      {heroData.captionPhoto}
                    </span>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-700 shadow-sm transition-colors">
                      Ganti foto sampul
                    </button>
                  </div>
                </div>

                {/* Warna Aksen */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-700">
                    Warna Aksen
                  </label>
                  <div className="flex items-center gap-3">
                    {["blue", "purple", "orange", "red", "emerald"].map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() =>
                            setHeroData({ ...heroData, accentColor: color })
                          }
                          className={`w-6 h-6 rounded-full transition-transform ${
                            heroData.accentColor === color
                              ? "ring-2 ring-offset-2 ring-blue-600 scale-110"
                              : "opacity-80"
                          } bg-${color === "blue" ? "blue-600" : color === "purple" ? "purple-600" : color === "orange" ? "orange-500" : color === "red" ? "rose-600" : "emerald-600"}`}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ---- RIGHT AREA: LIVE PREVIEW CANVAS ---- */}
        <main className="flex-1 bg-[#E2E8F0] overflow-y-auto p-8 flex items-center justify-center">
          <div
            className={`bg-white shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col ${
              viewMode === "desktop"
                ? "w-full max-w-5xl h-[85vh]"
                : "w-[400px] h-[85vh]"
            }`}
          >
            {/* Mockup Browser Bar */}
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              </div>
              <div className="bg-white px-4 py-1 rounded-md text-[11px] text-gray-400 border border-gray-200 w-1/2 text-center truncate">
                hmti.universitasnusantara.ac.id
              </div>
              <div className="text-[10px] text-gray-500 font-medium uppercase">
                Pratinjau ({viewMode})
              </div>
            </div>

            {/* Simulated Live Web Content */}
            <div className="flex-1 overflow-y-auto bg-white p-6 space-y-12">
              {/* Navbar Mockup */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#15224F] text-white font-bold text-xs flex items-center justify-center">
                    H
                  </div>
                  <span className="text-xs font-bold text-gray-900">
                    HMTI Universitas Nusantara
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-gray-600">
                  <span className="font-semibold text-blue-600">Beranda</span>
                  <span>Organisasi</span>
                  <span>Blog</span>
                </div>
              </div>

              {/* DYNAMIC HERO SECTION PREVIEW (Ikut berubah sesuai input kiri) */}
              <div className="space-y-6 pt-4">
                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                  🌿 {heroData.eyebrow}
                </span>

                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight max-w-2xl">
                  {heroData.title}
                </h2>

                <p className="text-sm text-gray-600 max-w-xl leading-relaxed">
                  {heroData.subtitle}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <button className="px-5 py-2.5 bg-[#15224F] text-white text-xs font-semibold rounded-xl shadow-md">
                    {heroData.buttonText}
                  </button>
                  <button className="px-5 py-2.5 border border-gray-200 text-gray-800 text-xs font-semibold rounded-xl">
                    Ikut kelas HMTI
                  </button>
                </div>

                {/* Statistik Mini */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 max-w-md">
                  <div>
                    <div className="text-xl font-black text-gray-900">128</div>
                    <div className="text-[10px] text-gray-400">
                      Anggota aktif
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-gray-900">4</div>
                    <div className="text-[10px] text-gray-400">Divisi</div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-gray-900">2008</div>
                    <div className="text-[10px] text-gray-400">
                      Tahun berdiri
                    </div>
                  </div>
                </div>
              </div>

              {/* Placeholder Section Lainnya */}
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center space-y-2">
                <p className="text-xs font-semibold text-gray-700">
                  Bagian lainnya (Tentang, Pengurus, Divisi, Artikel)
                </p>
                <p className="text-[11px] text-gray-400">
                  Klik salah satu bagian di panel kiri untuk mulai mengedit
                  kontennya secara dinamis.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
