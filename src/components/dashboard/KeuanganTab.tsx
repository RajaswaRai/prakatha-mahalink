import { Plus } from "lucide-react";

export default function KeuanganTab() {
  const pendingPayments = [
    {
      initials: "RA",
      name: "Raka Aditya",
      meta: "Staf · Divisi Riset",
      bill: "Iuran Oktober",
      amount: "Rp25.000",
      date: "22 Okt",
    },
  ];

  const transactions = [
    {
      date: "21 Okt",
      desc: "Konsumsi rapat kerja divisi",
      cat: "Konsumsi",
      in: "—",
      out: "Rp450.000",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[11px] text-gray-400 font-medium">
            Saldo kas
          </span>
          <div className="text-2xl font-black text-gray-900">Rp12.480.000</div>
          <span className="text-[10px] text-gray-400">per 22 Okt 2026</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[11px] text-gray-400 font-medium">
            Iuran Oktober masuk
          </span>
          <div className="text-2xl font-black text-gray-900">64%</div>
          <span className="text-[10px] text-gray-400">82 dari 128 anggota</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[11px] text-gray-400 font-medium">
            Bukti bayar menunggu
          </span>
          <div className="text-2xl font-black text-gray-900">4</div>
          <span className="text-[10px] text-orange-600 font-medium">
            Diverifikasi Bendahara
          </span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[11px] text-gray-400 font-medium">
            Pengeluaran Oktober
          </span>
          <div className="text-2xl font-black text-gray-900">Rp3.150.000</div>
          <span className="text-[10px] text-gray-400">
            Konsumsi & sewa alat
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">
            Bukti bayar menunggu verifikasi
          </h2>
          <button className="flex items-center gap-2 bg-[#15224F] hover:bg-[#0F1938] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span>Catat transaksi</span>
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-semibold">
                <tr>
                  <th className="py-3 px-6">Anggota</th>
                  <th className="py-3 px-6">Tagihan</th>
                  <th className="py-3 px-6">Nominal</th>
                  <th className="py-3 px-6">Dikirim</th>
                  <th className="py-3 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingPayments.map((p, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {p.initials}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-gray-400">
                            {p.meta}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium whitespace-nowrap">
                      {p.bill}
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-bold whitespace-nowrap">
                      {p.amount}
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      {p.date}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button className="px-3 py-1.5 bg-[#15224F] hover:bg-[#0F1938] text-white rounded-xl font-semibold shadow-sm transition-colors">
                        Setujui
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-900">Transaksi terakhir</h2>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-semibold">
                <tr>
                  <th className="py-3 px-6">Tanggal</th>
                  <th className="py-3 px-6">Keterangan</th>
                  <th className="py-3 px-6">Kategori</th>
                  <th className="py-3 px-6">Masuk</th>
                  <th className="py-3 px-6 text-right">Keluar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((tx, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      {tx.desc}
                    </td>
                    <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
                      {tx.cat}
                    </td>
                    <td className="py-4 px-6 text-emerald-600 font-semibold whitespace-nowrap">
                      {tx.in}
                    </td>
                    <td className="py-4 px-6 text-right text-gray-900 font-semibold whitespace-nowrap">
                      {tx.out}
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
