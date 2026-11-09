import { Download, Plus } from "lucide-react";

interface ModalProps {
  onOpenAddMember: () => void;
}

export default function AnggotaTab({ onOpenAddMember }: ModalProps) {
  const pendingMembers = [
    {
      initials: "AR",
      name: "Aulia Rahma",
      info: 'TI 2026 · "Ingin belajar membuat aplikasi bareng kakak tingkat."',
      division: "Riset & Teknologi",
      submitted: "21 Okt",
    },
  ];

  const allMembers = [
    {
      initials: "FR",
      name: "Fajar Ramadhan",
      nim: "NIM 2210511055",
      division: "Pengurus inti",
      role: "Wakil Ketua",
      roleBg: "bg-orange-50 text-orange-700",
      status: "Aktif",
    },
    {
      initials: "YH",
      name: "Yusuf Hakim",
      nim: "NIM 2310511012",
      division: "Riset & Teknologi",
      role: "Kepala Divisi",
      roleBg: "bg-emerald-50 text-emerald-700",
      status: "Aktif",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-900">
          Pendaftar menunggu · 1
        </h2>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-semibold">
                <tr>
                  <th className="py-3 px-6">Pendaftar</th>
                  <th className="py-3 px-6">Divisi pilihan</th>
                  <th className="py-3 px-6">Diajukan</th>
                  <th className="py-3 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingMembers.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {item.initials}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            {item.info}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium whitespace-nowrap">
                      {item.division}
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      {item.submitted}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 bg-[#15224F] hover:bg-[#0F1938] text-white rounded-xl font-semibold shadow-sm transition-colors">
                          Terima
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">
            Semua anggota · 128
          </h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Ekspor Excel</span>
            </button>
            <button
              onClick={onOpenAddMember}
              className="flex items-center gap-2 bg-[#15224F] hover:bg-[#0F1938] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah anggota</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-semibold">
                <tr>
                  <th className="py-3 px-6">Nama</th>
                  <th className="py-3 px-6">Divisi</th>
                  <th className="py-3 px-6">Peran</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allMembers.map((mem, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {mem.initials}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            {mem.name}
                          </div>
                          <div className="text-[11px] text-gray-400">
                            {mem.nim}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium whitespace-nowrap">
                      {mem.division}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md ${mem.roleBg}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {mem.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {mem.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl font-semibold shadow-sm transition-colors">
                        Atur peran
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
