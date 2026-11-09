import { Bell, Calendar, ChevronDown, Paperclip, Send } from "lucide-react";

interface ModalProps {
  onOpenCreateAnnouncement: () => void;
}

export default function PengumumanTab({
  onOpenCreateAnnouncement,
}: ModalProps) {
  const sentAnnouncements = [
    {
      id: 1,
      title: "Pembagian tim DesignLab sudah keluar",
      author: "Nadia Azzahra",
      time: "2 jam lalu",
      target: "Semua anggota",
      readCount: "96 / 128",
      canDelete: true,
    },
    {
      id: 2,
      title: "Rapat divisi hari ini 15.30",
      author: "Yusuf Hakim",
      time: "kemarin",
      target: "Divisi Riset",
      readCount: "15 / 18",
      canDelete: false,
    },
    {
      id: 3,
      title: "Iuran Oktober dibuka",
      author: "Rina Oktaviani",
      time: "3 hari lalu",
      target: "Semua anggota",
      readCount: "110 / 128",
      canDelete: false,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">
              Tulis pengumuman cepat
            </h2>
            <button
              onClick={onOpenCreateAnnouncement}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Buka Mode Modal
            </button>
          </div>
          <textarea
            rows={4}
            defaultValue="Seleksi tim Gemastik 2027 dibuka. Daftar lewat tautan di lampiran paling lambat 10 November."
            className="w-full bg-white border border-blue-500 rounded-xl p-4 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none transition-colors"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors">
                <span>Kirim ke: Divisi Riset</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors">
                <Paperclip className="w-3.5 h-3.5 text-gray-400" />
                <span>Lampiran · 1</span>
              </button>
            </div>
            <button className="flex items-center justify-center gap-2 bg-[#15224F] hover:bg-[#0F1938] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
              <Send className="w-3.5 h-3.5" />
              <span>Kirim pengumuman</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-700" />
            <h2 className="text-sm font-bold text-gray-900">Pengingat</h2>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            32 anggota belum membaca &ldquo;Pembagian tim DesignLab&rdquo;.
            Kirim ulang lewat WhatsApp?
          </p>
          <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors shadow-sm">
            <Bell className="w-3.5 h-3.5 text-gray-500" />
            <span>Kirim pengingat</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-900">Terkirim</h2>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-semibold">
                <tr>
                  <th className="py-3 px-6">Pengumuman</th>
                  <th className="py-3 px-6">Untuk</th>
                  <th className="py-3 px-6">Dibaca</th>
                  <th className="py-3 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sentAnnouncements.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {item.author} · {item.time}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium whitespace-nowrap">
                      {item.target}
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium whitespace-nowrap">
                      {item.readCount}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-gray-600 hover:text-gray-900 font-semibold transition-colors">
                          Ubah
                        </button>
                        {item.canDelete && (
                          <button className="text-gray-600 hover:text-red-600 font-semibold transition-colors">
                            Hapus
                          </button>
                        )}
                      </div>
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
