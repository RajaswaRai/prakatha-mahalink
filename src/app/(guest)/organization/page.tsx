import CTA from "@/components/my/CTA";
import MyFooter from "@/components/my/MyFooter";
import {
  Search,
  Bell,
  ChevronDown,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Users,
  Building2,
} from "lucide-react";

export default function OrganisasiPage() {
  const categories = [
    { label: "Semua", count: 64, active: true },
    { label: "UKM", count: 39, active: false },
    { label: "HIMA", count: 19, active: false },
    { label: "BEM", count: 4, active: false },
    { label: "DPM", count: 2, active: false },
  ];

  const organizations = [
    {
      code: "HMTI",
      badgeColor: "bg-blue-100 text-blue-700",
      name: "Himpunan Mahasiswa Teknik Informatika",
      scope: "Fakultas Teknik · 128 anggota aktif",
      description:
        "Ruang kolaborasi mahasiswa Teknik Informatika lewat proyek, diskusi, dan pengabdian.",
      tags: [{ label: "Himpunan", color: "bg-blue-50 text-blue-600" }],
      status: "Pendaftaran dibuka",
      statusType: "open",
    },
    {
      code: "BEM U",
      badgeColor: "bg-orange-100 text-orange-700",
      name: "BEM Universitas Nusantara · Kabinet Sinergi Karya",
      scope: "Universitas · 86 anggota aktif",
      description:
        "Lembaga eksekutif mahasiswa tingkat universitas. Advokasi, kesejahteraan mahasiswa, dan pengabdian.",
      tags: [
        { label: "Sosial", color: "bg-amber-50 text-amber-700" },
        { label: "BEM", color: "bg-gray-100 text-gray-600" },
      ],
      status: "Kuota anggota penuh",
      statusType: "full",
    },
    {
      code: "NRT",
      badgeColor: "bg-purple-100 text-purple-700",
      name: "UKM Robotika · Nusa Robotic Team",
      scope: "Universitas · 64 anggota aktif",
      description:
        "Riset dan kompetisi robotika: KRI, KRTI, dan bootcamp robotika dasar untuk mahasiswa baru.",
      tags: [
        { label: "Teknologi", color: "bg-blue-50 text-blue-600" },
        { label: "UKM", color: "bg-gray-100 text-gray-600" },
      ],
      status: "Pendaftaran dibuka",
      statusType: "open",
    },
    {
      code: "SWN",
      badgeColor: "bg-pink-100 text-pink-700",
      name: "UKM Paduan Suara · Swara Nusantara",
      scope: "Universitas · 92 anggota aktif",
      description:
        "Paduan suara kampus. Konser akhir tahun dan festival paduan suara nasional.",
      tags: [
        { label: "Seni & Budaya", color: "bg-pink-50 text-pink-600" },
        { label: "UKM", color: "bg-gray-100 text-gray-600" },
      ],
      status: "Pendaftaran dibuka",
      statusType: "open",
    },
    {
      code: "FTS",
      badgeColor: "bg-emerald-100 text-emerald-700",
      name: "UKM Futsal Universitas Nusantara",
      scope: "Universitas · 57 anggota aktif",
      description:
        "Latihan rutin Selasa & Jumat, turnamen antar fakultas, dan liga mahasiswa regional.",
      tags: [
        { label: "Olahraga", color: "bg-emerald-50 text-emerald-600" },
        { label: "UKM", color: "bg-gray-100 text-gray-600" },
      ],
      status: "Pendaftaran dibuka",
      statusType: "open",
    },
    {
      code: "AFK",
      badgeColor: "bg-teal-100 text-teal-700",
      name: "Rohis Al-Fikr",
      scope: "Universitas · 143 anggota aktif",
      description:
        "Kajian Jumat, mentoring, dan kegiatan sosial keagamaan mahasiswa muslim.",
      tags: [
        { label: "Kerohanian", color: "bg-teal-50 text-teal-700" },
        { label: "UKM", color: "bg-gray-100 text-gray-600" },
      ],
      status: "Pendaftaran dibuka",
      statusType: "open",
    },
    {
      code: "KSR",
      badgeColor: "bg-amber-100 text-amber-700",
      name: "KSR PMI Unit Universitas Nusantara",
      scope: "Universitas · 71 anggota aktif",
      description:
        "Donor darah, pertolongan pertama, dan relawan tanggap bencana.",
      tags: [
        { label: "Sosial", color: "bg-amber-50 text-amber-700" },
        { label: "UKM", color: "bg-gray-100 text-gray-600" },
      ],
      status: "Pendaftaran dibuka",
      statusType: "open",
    },
    {
      code: "NPR",
      badgeColor: "bg-orange-100 text-orange-700",
      name: "UKM Kewirausahaan · Nusa Preneur",
      scope: "Universitas · 48 anggota aktif",
      description:
        "Inkubasi usaha mahasiswa, bazar kampus, dan kelas UMKM digital.",
      tags: [
        { label: "Kewirausahaan", color: "bg-orange-50 text-orange-700" },
        { label: "UKM", color: "bg-gray-100 text-gray-600" },
      ],
      status: "Kuot anggota penuh",
      statusType: "full",
    },
  ];

  return (
    <main>
      {/* Page Content Body */}
      <div className="p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Header Title & Subtitle */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Organisasi
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            64 organisasi resmi ·{" "}
            <span className="text-gray-700 font-medium">
              23 sedang membuka pendaftaran
            </span>
          </p>
        </div>

        {/* Category Tabs (Semua, UKM, HIMA, dll) */}
        <div className="flex items-center gap-6 border-b border-gray-200 text-xs font-semibold">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`pb-3 relative transition-colors ${
                cat.active
                  ? "text-gray-900 font-bold border-b-2 border-gray-900 -mb-[1px]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {cat.label} · {cat.count}
            </button>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Search Inside Filter */}
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari organisasi, acara, atau artikel..."
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-8 py-2 text-xs text-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-mono">
                /
              </span>
            </div>

            {/* Dropdown Filters */}
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <span>Jenis: UKM</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <span>Kategori</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <span>Fakultas</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* Active Toggle Button */}
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-900 rounded-xl text-xs font-medium text-gray-900 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Pendaftaran dibuka</span>
            </button>
          </div>

          {/* Right Sorting & Reset */}
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
            <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <span>Urutkan: Terbaru</span>
            </button>
            <button className="text-xs text-blue-600 hover:underline font-medium">
              Reset
            </button>
          </div>
        </div>

        {/* Info Jumlah Ditampilkan */}
        <p className="text-xs text-gray-500">
          Menampilkan 12 dari 64 · urut: pendaftaran segera ditutup
        </p>

        {/* Grid Kartu Organisasi (4 Kolom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizations.map((org, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Top Card Header */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs ${org.badgeColor}`}
                  >
                    {org.code}
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>

                {/* Title & Scope */}
                <h3 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2">
                  {org.name}
                </h3>
                <p className="text-[10px] text-gray-400 mt-1">{org.scope}</p>

                {/* Description */}
                <p className="text-[11px] text-gray-600 mt-2.5 line-clamp-3 leading-relaxed">
                  {org.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {org.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${tag.color}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Status */}
              <div className="mt-6 pt-3 border-t border-gray-50 flex items-center gap-1.5 text-[10px] font-medium">
                {org.statusType === "open" ? (
                  <>
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span className="text-amber-700">{org.status}</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-500">{org.status}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center pt-4 pb-8">
          <button className="px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl text-xs font-semibold shadow-sm transition-colors">
            Muat 12 organisasi lagi
          </button>
        </div>
      </div>

      <CTA />
      <MyFooter />
    </main>
  );
}
