import MyBlogCard from "@/components/my/MyBlogCard";
import MyCard from "@/components/my/MyCard";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Clock,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import CTA from "@/components/my/CTA";
import MyFooter from "@/components/my/MyFooter";

let organizations = [
  {
    type: "Himpunan Mahasiswa · Fakultas Teknik",
    name: "Himpunan Mahasiswa Teknik Informatika",
    abbr: "HMTI",
    desc: "Ruang kolaborasi mahasiswa teknik informatika lewat proyek, diskusi, dan pengabdian.",
    status: 1,
    members_count: "128 anggota aktif",
    badgeBg: "bg-blue-100 text-blue-700",
  },
  {
    type: "Universitas",
    name: "UKM Robotika · Nusa Robotic Team",
    abbr: "NRT",
    desc: "Riset dan kompetisi robotika: KRI, KRTI, dan bootcamp robotika dasar untuk mahasiswa baru.",
    status: 1,
    members_count: "64 anggota aktif",
    badgeBg: "bg-purple-100 text-purple-700",
  },
  {
    type: "Universitas",
    name: "UKM Paduan Suara · Swara Nusantara",
    abbr: "SWN",
    desc: "Paduan suara kampus. Konser akhir tahun dan festival paduan suara nasional.",
    status: 1,
    members_count: "92 anggota aktif",
    badgeBg: "bg-pink-100 text-pink-700",
  },
  {
    type: "Universitas",
    name: "KSR PMI Unit Universitas Nusantara",
    abbr: "KSR",
    desc: "Donor darah, pertolongan pertama, dan relawan tanggap bencana.",
    status: 1,
    members_count: "71 anggota aktif",
    badgeBg: "bg-amber-100 text-amber-700",
  },
  {
    type: "Universitas",
    name: "Rohis Al-Fikr",
    abbr: "AFK",
    desc: "Kajian Jumat, mentoring, dan kegiatan sosial keagamaan mahasiswa muslim.",
    status: 1,
    members_count: "143 anggota aktif",
    badgeBg: "bg-teal-100 text-teal-700",
  },
  {
    type: "Fakultas Ekonomi & Bisnis",
    name: "Himpunan Mahasiswa Akuntansi",
    abbr: "HMAK",
    desc: "Kelas pajak, olimpiade akuntansi, dan kunjungan industri.",
    status: 1,
    members_count: "112 anggota aktif",
    badgeBg: "bg-orange-100 text-orange-700",
  },
];

let events = [
  {
    month: "Okt",
    date: "24",
    title: "DesignLab 2026: Ide Jadi Karya",
    time: "Sabtu, 09.00-15.00 WIB",
    location: "Aula Gedung C, Universitas Nusantara",
    organizer: "Oleh HMTI",
    price: "Gratis",
    status: "Sisa 5 kursi",
  },
  {
    month: "Nov",
    date: "7",
    title: "Konser Akhir Tahun 'Pulang'",
    time: "Sabtu, 19.00 WIB",
    location: "Gedung Serbaguna Kampus",
    organizer: "Oleh Swara Nusantara",
    price: "Rp35.000",
    status: "112 kursi tersedia",
  },
];

let posts = [
  {
    category: "PRESTASI",
    org: "HMTI",
    title: "HMTI Raih Juara 2 Gemastik 2026 Kategori Pengembangan Aplikasi",
    author: "Dimas Prasetyo",
    date: "18 Okt 2026",
    readTime: "5 menit baca",
  },
  {
    category: "PENGABDIAN",
    org: "KSR PMI Unit",
    title: "KSR Kumpulkan 180 Kantong Darah dalam Sehari",
    author: "Salsabila Putri",
    date: "9 Okt 2026",
    readTime: "4 menit baca",
  },
  {
    category: "PANDUAN",
    org: "Pusat Kemahasiswaan",
    title: "Cara Menyusun LPJ Kegiatan yang Rapi dan Cepat Disetujui",
    author: "Pusat Kemahasiswaan",
    date: "2 Okt 2026",
    readTime: "6 menit baca",
  },
];

function Divider() {
  return <div className="my-16 border-t border-gray-100"></div>;
}

function Hero() {
  return (
    <div className="container mx-auto py-12 px-8 lg:px-20">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
        {/* Kotak kiri */}
        <div className="w-full lg:w-1/2 space-y-6">
          <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
            Pusat Kemahasiswaan · Universitas Nusantara
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight">
            Temukan organisasimu, ikuti acaranya, baca kabarnya.
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
            64 UKM, himpunan, dan BEM terdaftar resmi di Mantra. Lihat siapa
            pengurusnya, kapan pendaftaran dibuka, dan acara apa saja minggu ini
            — tanpa menunggu info dari grup WhatsApp.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              className="bg-[#1E293B] hover:bg-black px-6 py-3 rounded-xl text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
              href="/organisasi"
            >
              <span>Jelajahi Organisasi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              className="px-6 py-3 rounded-xl text-xs font-semibold inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 transition-colors shadow-sm"
              href="/acara"
            >
              <span>Lihat Acara</span>
            </Link>
          </div>

          <div className="flex gap-12 pt-6 border-t border-gray-100">
            <div>
              <h4 className="text-3xl text-[#1E293B] font-black">64</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                organisasi terdaftar
              </p>
            </div>
            <div>
              <h4 className="text-3xl text-[#1E293B] font-black">8.420</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                mahasiswa terhubung
              </p>
            </div>
            <div>
              <h4 className="text-3xl text-[#1E293B] font-black">37</h4>
              <p className="text-xs text-gray-500 mt-0.5">acara bulan ini</p>
            </div>
          </div>
        </div>

        {/* Kotak Kanan (Hero Banner / Carousel Preview) */}
        <div className="w-full lg:w-1/2 bg-gray-50 border border-gray-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="h-64 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 p-4 border border-gray-200/60">
            <ImageIcon className="w-8 h-8 mb-2 text-gray-300" />
            <span className="text-xs text-center text-gray-500">
              Foto/video kegiatan mahasiswa (faktor di atas banner Slider admin)
            </span>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/60 text-xs">
            <div className="flex items-center gap-2 text-gray-700 font-medium truncate">
              <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
              <span className="truncate">
                CentangKomunitas · Hapus/resik bersihkan 1,2 ton sampah di jalur
                pendakian
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 text-gray-400">
              <span className="text-[10px]">1/4 · DesignLab 2026</span>
              <button className="p-1 rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-700">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-700">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowTo() {
  return (
    <div className="border-t border-b border-gray-100 bg-white">
      <div className="flex justify-between gap-5 flex-wrap container mx-auto py-6 px-8 lg:px-20 text-xs">
        <div>
          <span className="text-emerald-700 mr-2 font-bold">01</span>
          <span className="text-gray-700 font-medium">
            Satu akun untuk seluruh kegiatan
          </span>
        </div>
        <div>
          <span className="text-emerald-700 mr-2 font-bold">02</span>
          <span className="text-gray-700 font-medium">
            Administrasi lebih tertata
          </span>
        </div>
        <div>
          <span className="text-emerald-700 mr-2 font-bold">03</span>
          <span className="text-gray-700 font-medium">
            Kolaborasi lintas organisasi
          </span>
        </div>
        <div>
          <span className="text-emerald-700 mr-2 font-bold">04</span>
          <span className="text-gray-700 font-medium">
            Transparan, dari awal hingga akhir
          </span>
        </div>
      </div>
    </div>
  );
}

function OrganizationsSection() {
  return (
    <div className="container mx-auto px-8 lg:px-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <p className="text-xs mb-2 text-gray-400 font-semibold uppercase tracking-wider">
            Organisasi
          </p>
          <h2 className="text-3xl font-bold text-[#1E293B]">
            Kenali organisasi di kampus
          </h2>
        </div>
        <Link
          href="/organisasi"
          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
        >
          Lihat semua organisasi <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org, i) => (
          <MyCard
            className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition-shadow"
            key={`org_card_${i}`}
          >
            <div className="h-full flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div
                    className={`p-3 rounded-xl font-bold text-sm w-12 h-12 flex items-center justify-center ${org.badgeBg}`}
                  >
                    {org.abbr}
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900 leading-snug">
                  {org.name}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {org.type} · {org.members_count}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                  {org.desc}
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-gray-50 text-xs">
                  <span className="text-gray-400 text-[10px]">
                    Pendaftaran dibuka
                  </span>
                  <Link
                    href="/organisasi"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Lihat profil
                  </Link>
                </div>
              </div>
            </div>
          </MyCard>
        ))}
      </div>
    </div>
  );
}

function EventsSection() {
  return (
    <div className="container mx-auto px-8 lg:px-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <p className="text-xs mb-2 text-gray-400 font-semibold uppercase tracking-wider">
            Jangan Lewatkan
          </p>
          <h2 className="text-3xl font-bold text-[#1E293B]">
            Minggu ini di kampus
          </h2>
        </div>
        <Link
          href="/acara"
          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
        >
          Semua acara <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="h-36 bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-4 border-b border-gray-100">
                <ImageIcon className="w-6 h-6 mb-1 text-gray-300" />
                <span className="text-[10px] text-center text-gray-400">
                  Foto kegiatan: {ev.title}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 text-orange-600 text-center rounded-xl px-3 py-2 min-w-[50px]">
                    <span className="block text-[10px] font-bold uppercase">
                      {ev.month}
                    </span>
                    <span className="block text-base font-black">
                      {ev.date}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {ev.time}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {ev.location}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {ev.organizer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-900">{ev.price}</span>
              <span className="text-orange-600 font-medium text-[11px]">
                {ev.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogSection() {
  return (
    <div className="container mx-auto px-8 lg:px-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <p className="text-xs mb-2 text-gray-400 font-semibold uppercase tracking-wider">
            Blog · Dari Organisasi & Pusat Kemahasiswaan
          </p>
          <h2 className="text-3xl font-bold text-[#1E293B]">
            Cerita dari kampus
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
        >
          Semua artikel blog <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Large Blog Post */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="h-56 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 mb-6 border border-gray-200/60">
            <ImageIcon className="w-8 h-8 text-gray-300" />
            <span className="text-xs ml-2 text-gray-400">
              Suasana DesignLab 2026, mahasiswa merancang prototipe
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                KESEHATAN
              </span>
              <span className="text-xs text-gray-400">· HMTI</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
              Catatan dari DesignLab: 214 Mahasiswa, 38 Prototipe
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Apa yang terjadi ketika 214 mahasiswa dari 9 fakultas diberi satu
              hari untuk mengubah keluhan kampus menjadi prototipe.
            </p>
            <p className="text-[11px] text-gray-400">
              Dimas Prasetyo · 12 Oktober 2026 · 4 menit baca
            </p>
          </div>
        </div>

        {/* List of Other Blog Posts */}
        <div className="space-y-4">
          {posts.map((post, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex gap-4 items-center"
            >
              <div className="w-24 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 text-gray-400">
                <ImageIcon className="w-5 h-5 text-gray-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    · {post.org}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 truncate leading-snug">
                  {post.title}
                </h4>
                <p className="text-[10px] text-gray-400 mt-2">
                  {post.author} · {post.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CallToAction() {
  return (
    <div className="container mx-auto px-8 lg:px-20 mb-16">
      <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
            Untuk seluruh civitas akademika Universitas Nusantara
          </p>
          <h2 className="text-3xl font-bold text-[#1E293B]">
            Satu akun mahasiswa, semua organisasi kampus.
          </h2>
          <div className="flex flex-wrap gap-6 mt-4 text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Surat
              pengantar terintegrasi
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tagihan
              iuran transparan di tempat
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Pengingat
              terkonfirmasi
            </span>
          </div>
        </div>
        <div>
          <Link
            href="/auth/register"
            className="bg-[#1E293B] hover:bg-black text-white px-6 py-3.5 rounded-xl text-xs font-semibold shadow-sm inline-block transition-colors whitespace-nowrap"
          >
            Buat akun mahasiswa →
          </Link>
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            Cukup 2 menit · validasi via NIM
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Hero />
      <HowTo />
      <Divider />
      <OrganizationsSection />
      <Divider />
      <EventsSection />
      <Divider />
      <BlogSection />
      <Divider />
      <CallToAction />
      <CTA />
      <MyFooter />
    </div>
  );
}
