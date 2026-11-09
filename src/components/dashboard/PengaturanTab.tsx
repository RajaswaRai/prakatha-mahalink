"use client";

import {
  CreditCard,
  Globe,
  Info,
  Layers,
  Plus,
  Shield,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import PageBuilderModal from "./PageBuilderModal"; // Sesuaikan path import modal Anda

export default function PengaturanTab() {
  const [activeSettingsMenu, setActiveSettingsMenu] = useState("Peran");
  const [isPageBuilderOpen, setIsPageBuilderOpen] = useState(false);

  // State untuk peran yang sedang dipilih di panel tengah/kanan
  const [selectedRole, setSelectedRole] = useState({
    name: "Bendahara",
    memberCount: "1 orang · Rina Oktaviani",
    color: "bg-purple-600",
  });

  // State untuk toggle izin (permissions)
  const [permissions, setPermissions] = useState({
    lihatPengumuman: true,
    kirimPengumuman: false,
    terimaTolakPendaftar: false,
    aturPeranAnggota: false,
    catatTransaksiKas: true,
    verifikasiBayarIuran: true,
    lihatUnduhLaporan: true,
    buatUbahAcara: false,
    tulisArtikelBlog: false,
    kelolaPeranDivisi: false,
  });

  const settingsMenuItems = [
    { id: "Profil publik", label: "Profil publik", icon: Globe },
    { id: "Peran", label: "Peran", icon: Shield },
    { id: "Divisi", label: "Divisi", icon: Layers },
    { id: "Pendaftaran anggota", label: "Pendaftaran anggota", icon: UserPlus },
    { id: "Iuran", label: "Iuran", icon: CreditCard },
  ];

  const rolesList = [
    { name: "Ketua", count: "1 orang", color: "bg-blue-600" },
    { name: "Wakil Ketua", count: "1 orang", color: "bg-orange-500" },
    { name: "Sekretaris", count: "1 orang", color: "bg-teal-500" },
    { name: "Bendahara", count: "1 orang", color: "bg-purple-600" },
    { name: "Kepala Divisi", count: "4 orang", color: "bg-emerald-600" },
    { name: "Staf", count: "38 orang", color: "bg-amber-600" },
    { name: "Anggota", count: "82 orang", color: "bg-gray-400" },
  ];

  const divisionsList = [
    {
      title: "Divisi Riset & Teknologi",
      desc: "Kelas pemrograman, tim lomba, dan proyek aplikasi kampus.",
      headInitials: "YH",
      headName: "Yusuf Hakim",
      membersCount: "18 anggota",
      autoRole: "Staf",
    },
  ];

  const handleMenuClick = (menuId: string) => {
    if (menuId === "Profil publik") {
      setIsPageBuilderOpen(true);
    } else {
      setActiveSettingsMenu(menuId);
    }
  };

  const handleToggle = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Info Banner */}
      <div className="bg-[#EBF5FF] border border-blue-100 rounded-2xl p-4 flex items-center gap-3 text-xs text-blue-900 shadow-sm">
        <Info className="w-4 h-4 text-blue-500 shrink-0" />
        <p>
          HMTI disetujui Pusat Kemahasiswaan sejak 12 Sep 2026, jadi peran dan
          divisi bisa diatur kapan saja. Setiap perubahan tercatat di riwayat
          organisasi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. SIDEBAR MENU PENGATURAN (3 Kolom) */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-3 shadow-sm space-y-1">
          {settingsMenuItems.map((menu) => {
            const IconComponent = menu.icon;
            const isActive = activeSettingsMenu === menu.id;
            return (
              <button
                key={menu.id}
                onClick={() => handleMenuClick(menu.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left ${
                  isActive
                    ? "bg-[#F3F7FF] text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                />
                <span>{menu.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2. KONTEN DINAMIS BERDASARKAN MENU YANG DIPILIH */}
        {activeSettingsMenu === "Peran" ? (
          <>
            {/* KOLOM TENGAH: DAFTAR PERAN (4 Kolom) */}
            <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
              <div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Peran · 7
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Urutan menentukan tingkat. Seret untuk mengubah.
                </p>
              </div>

              <div className="space-y-1.5">
                {rolesList.map((role, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      setSelectedRole({
                        name: role.name,
                        memberCount: role.count,
                        color: role.color,
                      })
                    }
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      selectedRole.name === role.name
                        ? "bg-[#F3F7FF] border border-blue-200 shadow-sm"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${role.color}`}
                      />
                      <span className="text-xs font-bold text-gray-800">
                        {role.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {role.count}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl text-xs font-semibold transition-colors shadow-sm">
                <Plus className="w-4 h-4 text-gray-500" />
                <span>Buat peran</span>
              </button>
            </div>

            {/* KOLOM KANAN: DETAIL & IZIN PERAN (5 Kolom) */}
            <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
              {/* Header Edit Peran */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${selectedRole.color}`}
                  />
                  <h2 className="text-sm font-bold text-gray-900">
                    Edit peran · {selectedRole.name}
                  </h2>
                </div>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                  {selectedRole.memberCount}
                </span>
              </div>

              {/* Sub-tab navigasi kecil */}
              <div className="flex items-center gap-6 border-b border-gray-100 text-xs text-gray-500 pb-2">
                <span className="text-gray-900 font-bold border-b-2 border-gray-900 pb-2 -mb-2.5 cursor-pointer">
                  Izin
                </span>
                <span className="cursor-pointer hover:text-gray-800">
                  Tampilan
                </span>
                <span className="cursor-pointer hover:text-gray-800">
                  Anggota ({selectedRole.memberCount.split(" ")[0]})
                </span>
              </div>

              {/* Input Nama Peran & Warna */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Nama peran
                  </label>
                  <input
                    type="text"
                    value={selectedRole.name}
                    onChange={(e) =>
                      setSelectedRole({ ...selectedRole, name: e.target.value })
                    }
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-blue-600"
                  />
                  <p className="text-[10px] text-gray-400">
                    Tampil di samping nama anggota
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-700">
                    Warna
                  </label>
                  <div className="flex items-center gap-2.5">
                    {[
                      "bg-blue-600",
                      "bg-orange-500",
                      "bg-teal-500",
                      "bg-purple-600",
                      "bg-emerald-600",
                      "bg-amber-600",
                      "bg-rose-500",
                      "bg-cyan-600",
                    ].map((c, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setSelectedRole({ ...selectedRole, color: c })
                        }
                        className={`w-5 h-5 rounded-full ${c} ${selectedRole.color === c ? "ring-2 ring-offset-2 ring-blue-600" : "opacity-70"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* DAFTAR TOGGLE PERMISSION DENGAN KATEGORI */}
              <div className="space-y-5 pt-2">
                {/* KATEGORI: UMUM */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Umum
                  </span>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        Lihat pengumuman & agenda
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Semua anggota otomatis punya izin ini
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={permissions.lihatPengumuman}
                      onChange={() => handleToggle("lihatPengumuman")}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        Kirim pengumuman
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Ke semua anggota atau ke divisi tertentu
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={permissions.kirimPengumuman}
                      onChange={() => handleToggle("kirimPengumuman")}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* KATEGORI: ANGGOTA */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Anggota
                  </span>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        Terima atau tolak pendaftar
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Meninjau pengajuan bergabung
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={permissions.terimaTolakPendaftar}
                      onChange={() => handleToggle("terimaTolakPendaftar")}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        Atur peran anggota
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Hanya untuk peran di bawah perannya sendiri
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={permissions.aturPeranAnggota}
                      onChange={() => handleToggle("aturPeranAnggota")}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* KATEGORI: KEUANGAN */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Keuangan
                  </span>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        Catat transaksi kas
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Pemasukan dan pengeluaran organisasi
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={permissions.catatTransaksiKas}
                      onChange={() => handleToggle("catatTransaksiKas")}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        Verifikasi bukti bayar iuran
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Menandai lunas atau menolak bukti
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={permissions.verifikasiBayarIuran}
                      onChange={() => handleToggle("verifikasiBayarIuran")}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Save Changes Bar */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-amber-600 font-medium">
                  1 perubahan belum disimpan
                </span>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold">
                    Reset
                  </button>
                  <button className="px-4 py-1.5 bg-[#15224F] hover:bg-[#0F1938] text-white rounded-xl text-xs font-semibold shadow-sm">
                    Simpan perubahan
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* TAMPILAN JIKA MENU DIVISI DIPILIH (Default sebelumnya) */
          <>
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900">Divisi · 1</h2>
                <button className="flex items-center gap-1.5 bg-[#15224F] hover:bg-[#0F1938] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Buat divisi</span>
                </button>
              </div>

              <div className="space-y-3">
                {divisionsList.map((div, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xs font-bold text-gray-900">
                          {div.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                          {div.desc}
                        </p>
                      </div>
                      <button className="px-3.5 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl text-xs font-semibold shadow-sm transition-colors shrink-0">
                        Kelola
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-gray-900">Divisi baru</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Nama divisi
                  </label>
                  <input
                    type="text"
                    defaultValue="Hubungan Alumni"
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <button className="w-full bg-[#15224F] hover:bg-[#0F1938] text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors">
                  Simpan divisi
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Render PageBuilderModal Full-Screen jika 'Profil publik' diklik */}
      <PageBuilderModal
        isOpen={isPageBuilderOpen}
        onClose={() => setIsPageBuilderOpen(false)}
        pageTitle="Himpunan Mahasiswa Teknik Informatika"
      />
    </div>
  );
}
