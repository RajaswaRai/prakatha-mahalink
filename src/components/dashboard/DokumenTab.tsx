import { Folder, Search, Upload } from "lucide-react";

export default function DokumenTab() {
  const folders = [
    { name: "Semua", count: 42, active: true },
    { name: "AD/ART & aturan", count: 4, active: false },
    { name: "Notulen", count: 12, active: false },
  ];

  const documents = [
    {
      name: "AD-ART HMTI 2026.pdf",
      size: "1,1 MB",
      folder: "AD/ART & aturan",
      date: "2 Sep 2026",
      access: "Internal",
      accessBg: "bg-gray-100 text-gray-700",
      action: "Unduh",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari dokumen..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-blue-600 transition-colors shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#15224F] hover:bg-[#0F1938] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors">
          <Upload className="w-4 h-4" />
          <span>Unggah dokumen</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-1">
          {folders.map((folder, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${folder.active ? "bg-[#F3F7FF] text-blue-700 font-bold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-2.5">
                <Folder
                  className={`w-4 h-4 ${folder.active ? "text-blue-600" : "text-gray-400"}`}
                />
                <span>{folder.name}</span>
              </div>
              <span className="text-[11px] text-gray-400 font-normal">
                {folder.count}
              </span>
            </div>
          ))}
        </div>

        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-semibold">
                <tr>
                  <th className="py-3 px-6">Nama</th>
                  <th className="py-3 px-6">Folder</th>
                  <th className="py-3 px-6">Diperbarui</th>
                  <th className="py-3 px-6">Akses</th>
                  <th className="py-3 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {documents.map((doc, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{doc.name}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {doc.size}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 whitespace-nowrap">
                      {doc.folder}
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      {doc.date}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md ${doc.accessBg}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {doc.access}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl font-semibold shadow-sm transition-colors">
                        {doc.action}
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
