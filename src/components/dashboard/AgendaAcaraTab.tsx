import { CheckCircle2, Plus } from "lucide-react";

export default function AgendaAcaraTab() {
  const agendaList = [
    {
      date: "22 Okt",
      title: "Rapat Divisi Riset",
      subtitle: "C.108 · dibuat Yusuf Hakim",
      type: "Internal",
      typeColor: "bg-gray-100 text-gray-700",
      attendees: "14 / 18 hadir",
      status: "Terbit",
      statusDot: "bg-emerald-500",
      action: "Presensi",
    },
    {
      date: "24 Okt",
      title: "DesignLab 2026: Ide Jadi Karya",
      subtitle: "Aula Gedung C · 12 panitia",
      type: "Publik",
      typeColor: "bg-orange-50 text-orange-700",
      attendees: "233 / 250",
      status: "Terbit",
      statusDot: "bg-emerald-500",
      action: "Peserta",
    },
    {
      date: "14 Nov",
      title: "Seleksi tim Gemastik 2027",
      subtitle: "C.108",
      type: "Internal",
      typeColor: "bg-gray-100 text-gray-700",
      attendees: "—",
      status: "Draf",
      statusDot: "bg-amber-500",
      action: "Terbitkan",
      isDraftAction: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-900 rounded-xl text-xs font-semibold text-gray-900 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Semua · 3</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
            <Plus className="w-4 h-4 text-gray-500" />
            <span>Buat agenda internal</span>
          </button>
          <button className="flex items-center gap-2 bg-[#15224F] hover:bg-[#0F1938] text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Buat acara publik</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-semibold">
              <tr>
                <th className="py-3 px-6">Tanggal</th>
                <th className="py-3 px-6">Acara / agenda</th>
                <th className="py-3 px-6">Jenis</th>
                <th className="py-3 px-6">Peserta</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agendaList.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">{item.title}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      {item.subtitle}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md ${item.typeColor}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-medium whitespace-nowrap">
                    {item.attendees}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-gray-700 font-medium">
                      <span
                        className={`w-2 h-2 rounded-full ${item.statusDot}`}
                      />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${item.isDraftAction ? "bg-[#15224F] hover:bg-[#0F1938] text-white shadow-sm" : "border border-gray-200 hover:bg-gray-50 text-gray-800 shadow-sm"}`}
                      >
                        {item.action}
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 font-semibold transition-colors">
                        Ubah
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
