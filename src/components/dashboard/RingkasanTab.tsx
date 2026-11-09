import { ChevronRight, Send, Settings } from "lucide-react";

export default function RingkasanTab() {
  const pendingRequests = [
    {
      initials: "AR",
      name: "Aulia Rahma",
      major: "TI 2026 · pilih Divisi Riset & Teknologi",
      reason:
        '"Ingin belajar membuat aplikasi bareng kakak tingkat dan ikut tim Gemastik."',
    },
    {
      initials: "BS",
      name: "Bagus Setiawan",
      major: "TI 2025 · pilih Divisi Media & Komunikasi",
      reason: '"Suka desain grafis dan ingin mengelola Instagram HMTI."',
    },
    {
      initials: "CL",
      name: "Citra Lestari",
      major: "TI 2026 · pilih Divisi Pengabdian Masyarakat",
      reason: '"Pernah jadi relawan literasi digital di desa."',
    },
  ];

  const coreOfficers = [
    {
      initials: "FR",
      name: "Fajar Ramadhan",
      role: "Wakil Ketua",
      badgeBg: "bg-orange-50 text-orange-700",
      dot: "bg-orange-500",
    },
    {
      initials: "DP",
      name: "Dimas Prasetyo",
      role: "Sekretaris",
      badgeBg: "bg-teal-50 text-teal-700",
      dot: "bg-teal-500",
    },
    {
      initials: "RO",
      name: "Rina Oktaviani",
      role: "Bendahara",
      badgeBg: "bg-purple-50 text-purple-700",
      dot: "bg-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[11px] text-gray-400 font-medium">
            Anggota aktif
          </span>
          <div className="text-3xl font-black text-gray-900">128</div>
          <span className="text-[10px] text-emerald-600 font-medium">
            +9 bulan ini
          </span>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[11px] text-gray-400 font-medium">
            Pengajuan menunggu
          </span>
          <div className="text-3xl font-black text-gray-900">7</div>
          <span className="text-[10px] text-orange-600 font-medium">
            Tertua 4 hari lalu
          </span>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[11px] text-gray-400 font-medium">
            Iuran Oktober masuk
          </span>
          <div className="text-3xl font-black text-gray-900">64%</div>
          <span className="text-[10px] text-gray-400">
            Rp2.050.000 dari Rp3.200.000
          </span>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[11px] text-gray-400 font-medium">
            Acara bulan ini
          </span>
          <div className="text-3xl font-black text-gray-900">3</div>
          <span className="text-[10px] text-gray-400">1 butuh panitia</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">
                Pengajuan bergabung · 7 menunggu
              </h2>
              <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                Lihat semua <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {pendingRequests.map((req, idx) => (
                <div
                  key={idx}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {req.initials}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">
                        {req.name}
                      </h3>
                      <p className="text-[11px] text-gray-400">{req.major}</p>
                      <p className="text-xs text-gray-700 italic mt-1">
                        {req.reason}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold transition-colors">
                      Tolak
                    </button>
                    <button className="px-3 py-1.5 bg-[#1E293B] hover:bg-black text-white rounded-xl text-xs font-semibold transition-colors shadow-sm">
                      Terima
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900">
              Tulis pengumuman
            </h2>
            <textarea
              rows={3}
              placeholder="Tulis pengumuman untuk anggota..."
              className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-blue-500 resize-none transition-colors"
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors">
                <span>Kirim ke: semua anggota</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#1E293B] hover:bg-black text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
                <Send className="w-3.5 h-3.5" />
                <span>Kirim pengumuman</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                Peranmu: Ketua
              </h3>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Semua izin aktif. Kamu bisa membuat peran baru dan membagi izin
                ke pengurus lain.
              </p>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
              <Settings className="w-4 h-4 text-gray-500" />
              <span>Atur peran & divisi</span>
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-gray-900">Pengurus inti</h3>
            <div className="space-y-3">
              {coreOfficers.map((officer, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                      {officer.initials}
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      {officer.name}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md ${officer.badgeBg}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${officer.dot}`}
                    />
                    {officer.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
