import {
  Search,
  ChevronDown,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Plus,
} from "lucide-react";

export default function OrganisasiDashboardPage() {
  const myOrganizations = [
    {
      code: "HMTI",
      badgeBg: "bg-blue-100 text-blue-700",
      name: "Himpunan Mahasiswa Teknik Informatika",
      scope: "Fakultas Teknik · 128 anggota aktif",
      desc: "Ruang kolaborasi mahasiswa Teknik Informatika lewat proyek, diskusi, dan pengabdian.",
      tags: [{ label: "Himpunan", bg: "bg-blue-50 text-blue-600" }],
      status: "Aktif",
      statusBadge: "bg-emerald-50 text-emerald-600",
      role: "Staf Divisi Riset",
    },
    {
      code: "KSR",
      badgeBg: "bg-amber-100 text-amber-700",
      name: "KSR PMI Unit Universitas Nusantara",
      scope: "Universitas · 71 anggota aktif",
      desc: "Donor darah, pertolongan pertama, dan relawan tanggap bencana.",
      tags: [
        { label: "Sosial", bg: "bg-amber-50 text-amber-700" },
        { label: "UKM", bg: "bg-gray-100 text-gray-600" },
      ],
      status: "Aktif",
      statusBadge: "bg-emerald-50 text-emerald-600",
      role: "Anggota",
    },
  ];

  const categories = [
    { label: "Semua", count: 64, active: true },
    { label: "UKM", count: 39, active: false },
    { label: "HIMA", count: 19, active: false },
    { label: "BEM", count: 4, active: false },
    { label: "DPM", count: 2, active: false },
  ];

  const otherOrganizations = [
    {
      code: "BEM U",
      badgeBg: "bg-orange-100 text-orange-700",
      name: "BEM Universitas Nusantara · Kabinet Sinergi Karya",
      scope: "Universitas · 86 anggota aktif",
      desc: "Lembaga eksekutif mahasiswa tingkat universitas. Advokasi, kesejahteraan mahasiswa, dan pengabdian.",
      tags: [
        { label: "Sosial", bg: "bg-amber-50 text-amber-700" },
        { label: "BEM", bg: "bg-gray-100 text-gray-600" },
      ],
      status: "Kuota anggota penuh",
      isOpen: false,
    },
    {
      code: "NRT",
      badgeBg: "bg-purple-100 text-purple-700",
      name: "UKM Robotika · Nusa Robotic Team",
      scope: "Universitas · 64 anggota aktif",
      desc: "Riset dan kompetisi robotika: KRI, KRTI, dan bootcamp robotika dasar untuk mahasiswa baru.",
      tags: [
        { label: "Teknologi", bg: "bg-blue-50 text-blue-600" },
        { label: "UKM", bg: "bg-gray-100 text-gray-600" },
      ],
      status: "Pendaftaran dibuka",
      isOpen: true,
    },
    {
      code: "SWN",
      badgeBg: "bg-pink-100 text-pink-700",
      name: "UKM Paduan Suara · Swara Nusantara",
      scope: "Universitas · 92 anggota aktif",
      desc: "Paduan suara kampus. Konser akhir tahun dan festival paduan suara nasional.",
      tags: [
        { label: "Seni & Budaya", bg: "bg-pink-50 text-pink-600" },
        { label: "UKM", bg: "bg-gray-100 text-gray-600" },
      ],
      status: "Pendaftaran dibuka",
      isOpen: true,
    },
    {
      code: "FTS",
      badgeBg: "bg-emerald-100 text-emerald-700",
      name: "UKM Futsal Universitas Nusantara",
      scope: "Universitas · 57 anggota aktif",
      desc: "Latihan rutin Selasa & Jumat, turnamen antar fakultas, dan liga mahasiswa regional.",
      tags: [
        { label: "Olahraga", bg: "bg-emerald-50 text-emerald-600" },
        { label: "UKM", bg: "bg-gray-100 text-gray-600" },
      ],
      status: "Pendaftaran dibuka",
      isOpen: true,
    },
    {
      code: "AFK",
      badgeBg: "bg-teal-100 text-teal-700",
      name: "Rohis Al-Fikr",
      scope: "Universitas · 143 anggota aktif",
      desc: "Kajian Jumat, mentoring, dan kegiatan sosial keagamaan mahasiswa muslim.",
      tags: [
        { label: "Kerohanian", bg: "bg-teal-50 text-teal-700" },
        { label: "UKM", bg: "bg-gray-100 text-gray-600" },
      ],
      status: "Pendaftaran dibuka",
      isOpen: true,
    },
    {
      code: "NPR",
      badgeBg: "bg-orange-100 text-orange-700",
      name: "UKM Kewirausahaan · Nusa Preneur",
      scope: "Universitas · 48 anggota aktif",
      desc: "Inkubasi usaha mahasiswa, bazar kampus, dan kelas UMKM digital.",
      tags: [
        { label: "Kewirausahaan", bg: "bg-orange-50 text-orange-700" },
        { label: "UKM", bg: "bg-gray-100 text-gray-600" },
      ],
      status: "Kuota anggota penuh",
      isOpen: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header Title & Action Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
          <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors self-start md:self-auto">
            <Plus className="w-4 h-4 text-gray-500" />
            <span>Ajukan organisasi baru</span>
          </button>
        </div>

        {/* Section: Organisasimu */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-900">Organisasimu</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myOrganizations.map((org, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs ${org.badgeBg}`}
                    >
                      {org.code}
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 leading-snug">
                    {org.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {org.scope}
                  </p>

                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                    {org.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {org.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${tag.bg}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px]">
                  <span
                    className={`inline-flex items-center gap-1 font-medium px-2 py-0.5 rounded-md ${org.statusBadge}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    {org.status}
                  </span>
                  <span className="text-gray-500 font-medium">{org.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Jelajahi Organisasi Lain */}
        <div className="space-y-6 pt-4 border-t border-gray-200">
          <h2 className="text-sm font-bold text-gray-900">
            Jelajahi organisasi lain
          </h2>

          {/* Category Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-200 text-xs font-semibold overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className={`pb-3 relative transition-colors whitespace-nowrap ${
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
              {/* Search Box */}
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

            {/* Sorting & Reset */}
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

          <p className="text-xs text-gray-500">
            Menampilkan 12 dari 64 · urut: pendaftaran segera ditutup
          </p>

          {/* Grid Kartu Organisasi Lain (3 Kolom seperti gambar) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherOrganizations.map((org, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs ${org.badgeBg}`}
                    >
                      {org.code}
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>

                  <h3 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2">
                    {org.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-1">{org.scope}</p>

                  <p className="text-[11px] text-gray-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {org.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {org.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${tag.bg}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-50 flex items-center gap-1.5 text-[10px] font-medium">
                  <Clock
                    className={`w-3 h-3 ${org.isOpen ? "text-amber-600" : "text-gray-400"}`}
                  />
                  <span
                    className={org.isOpen ? "text-amber-700" : "text-gray-500"}
                  >
                    {org.status}
                  </span>
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
      </div>
    </div>
  );
}
