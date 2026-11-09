"use client";

import {
  Search,
  Bell,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Filter,
} from "lucide-react";

export default function EventsPage() {
  // Data kalender bulan Oktober 2026 (Grid 5 baris x 7 kolom)
  const calendarDays = [
    // Baris 1
    { date: 28, currentMonth: false },
    { date: 29, currentMonth: false },
    { date: 30, currentMonth: false },
    { date: 1, currentMonth: true },
    { date: 2, currentMonth: true },
    { date: 3, currentMonth: true },
    { date: 4, currentMonth: true },
    // Baris 2
    { date: 5, currentMonth: true },
    { date: 6, currentMonth: true },
    { date: 7, currentMonth: true },
    { date: 8, currentMonth: true },
    { date: 9, currentMonth: true },
    {
      date: 10,
      currentMonth: true,
      events: [
        {
          title: "Kajian Sabtu Pagi",
          color: "bg-emerald-100 text-emerald-800",
        },
      ],
    },
    { date: 11, currentMonth: true },
    // Baris 3
    { date: 12, currentMonth: true },
    { date: 13, currentMonth: true },
    { date: 14, currentMonth: true },
    { date: 15, currentMonth: true },
    { date: 16, currentMonth: true },
    {
      date: 17,
      currentMonth: true,
      events: [
        { title: "Bazar Nusa Preneur", color: "bg-orange-100 text-orange-800" },
      ],
    },
    { date: 18, currentMonth: true },
    // Baris 4 (Tanggal 24 Aktif)
    { date: 19, currentMonth: true },
    { date: 20, currentMonth: true },
    { date: 21, currentMonth: true },
    { date: 22, currentMonth: true, isToday: true },
    { date: 23, currentMonth: true },
    {
      date: 24,
      currentMonth: true,
      isSelected: true,
      events: [
        {
          title: "Kajian Sabtu Pagi",
          color: "bg-emerald-100 text-emerald-800",
        },
        {
          title: "DesignLab 2026",
          color: "bg-[#15224F] text-white",
          isRegistered: true,
        },
      ],
    },
    { date: 25, currentMonth: true },
    // Baris 5
    { date: 26, currentMonth: true },
    { date: 27, currentMonth: true },
    { date: 28, currentMonth: true },
    {
      date: 29,
      currentMonth: true,
      events: [
        { title: "Donor Darah", color: "bg-orange-100 text-orange-800" },
      ],
    },
    {
      date: 30,
      currentMonth: true,
      events: [
        { title: "Kelas Pajak UMKM", color: "bg-blue-100 text-blue-800" },
      ],
    },
    { date: 31, currentMonth: true },
    {
      date: 1,
      currentMonth: false,
      events: [
        { title: "Bootcamp Robotika", color: "bg-purple-100 text-purple-800" },
      ],
    },
  ];

  // Daftar acara untuk tanggal yang dipilih (24 Oktober 2026)
  const selectedDayEvents = [
    {
      time: "07.00–09.00",
      title: "Kajian Sabtu Pagi",
      desc: "Masjid Kampus · Kerohanian · Gratis",
      organizer: "Rohis Al-Fikr",
      quota: "64 / 150",
      status: "Pendaftaran dibuka",
      statusBadge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      action: "Daftar",
      actionStyle: "bg-[#15224F] hover:bg-[#0F1938] text-white",
    },
    {
      time: "09.00–15.00",
      title: "DesignLab 2026: Ide Jadi Karya",
      desc: "Aula Gedung C · Teknologi · Gratis",
      organizer: "HMTI",
      quota: "233 / 250",
      status: "Terdaftar",
      statusBadge: "bg-blue-50 text-blue-700 border border-blue-200",
      action: "Batalkan",
      actionStyle: "border border-gray-200 hover:bg-gray-50 text-gray-700",
    },
    {
      time: "13.00–16.00",
      title: "Latihan Gabungan Paduan Suara",
      desc: "Gedung Serbaguna · Seni & Budaya",
      organizer: "Swara Nusantara",
      quota: "Khusus anggota",
      status: "Internal",
      statusBadge: "bg-gray-100 text-gray-700 border border-gray-200",
      action: "Lihat",
      actionStyle: "border border-gray-200 hover:bg-gray-50 text-gray-700",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Top Header Navigation Bar */}
      <header className="h-16 w-full bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari organisasi, acara, atau artikel..."
            className="w-full bg-[#F8FAFC] border border-gray-200/80 rounded-xl pl-9 pr-12 py-2 text-xs text-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded border border-gray-200">
            ⌘K
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F2842F] rounded-full" />
          </button>
          <div className="flex items-center gap-2.5 pl-3 border-l border-gray-100">
            <div className="w-8 h-8 rounded-full bg-[#E5EEFF] text-[#15224F] font-semibold text-xs flex items-center justify-center">
              RA
            </div>
            <span className="text-xs font-semibold text-gray-800">
              Raka Aditya
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Header Title & Subtitle */}
        <div>
          <h1 className="text-3xl font-black text-[#15224F] tracking-tight">
            Acara
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            37 acara bulan ini dari 28 organisasi · 1 sudah kamu daftar
          </p>
        </div>

        {/* Filter & Search Controls Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari acara atau penyelenggara..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#15224F] shadow-sm transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded border border-gray-200">
              /
            </span>
          </div>

          <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors">
            <span>Kategori</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-90 text-gray-400" />
          </button>

          <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors">
            <span>Penyelenggara</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-90 text-gray-400" />
          </button>

          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors">
            Gratis
          </button>

          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors">
            Sudah kudaftar
          </button>
        </div>

        {/* Calendar Card Container */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
          {/* Calendar Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-base font-bold text-[#15224F]">
                Oktober 2026
              </h2>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6">
              <div className="flex items-center gap-4 text-[11px] font-medium text-gray-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#15224F]" />
                  <span>Sudah kamu daftar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                  <span>Acara lain (warna = kategori)</span>
                </div>
              </div>

              <button className="px-3.5 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold shadow-sm transition-colors">
                Hari ini
              </button>
            </div>
          </div>

          {/* Calendar Table Grid */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            {/* Days Header */}
            <div className="grid grid-cols-7 bg-gray-50/70 border-b border-gray-100 text-center text-[11px] font-semibold text-gray-400 py-2.5">
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
              <span>Min</span>
            </div>

            {/* Days Grid Cells */}
            <div className="grid grid-cols-7 auto-rows-fr bg-gray-100 gap-[1px]">
              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`min-h-[90px] bg-white p-2 flex flex-col justify-between transition-colors cursor-pointer hover:bg-gray-50/50 ${
                    day.isSelected
                      ? "ring-2 ring-[#15224F] ring-inset z-10"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold ${
                        !day.currentMonth
                          ? "text-gray-300"
                          : day.isToday
                            ? "w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
                            : "text-gray-800"
                      }`}
                    >
                      {day.date}
                    </span>
                  </div>

                  {/* Event Badges inside Calendar Cell */}
                  <div className="space-y-1 mt-1">
                    {day.events &&
                      day.events.map((ev, eIdx) => (
                        <div
                          key={eIdx}
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded truncate ${ev.color}`}
                        >
                          {ev.title}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Date Detail & Table Section */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-[#15224F]">
                Sabtu, 24 Oktober 2026
              </h3>
              <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 font-semibold text-[10px] rounded-full">
                3 acara
              </span>
            </div>

            <button className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              <span>Tampilkan semua bulan ini</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-gray-400">
            Klik tanggal lain di kalender untuk mengganti isi tabel ini.
          </p>

          {/* Events Table */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-semibold">
                  <tr>
                    <th className="py-3 px-6">Waktu</th>
                    <th className="py-3 px-6">Acara</th>
                    <th className="py-3 px-6">Penyelenggara</th>
                    <th className="py-3 px-6">Kuota</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedDayEvents.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                        {item.time}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          {item.desc}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700 font-medium whitespace-nowrap">
                        {item.organizer}
                      </td>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap">
                        {item.quota}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md ${item.statusBadge}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button className="px-3.5 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl font-semibold shadow-sm transition-colors">
                            Lihat
                          </button>
                          <button
                            className={`px-3.5 py-1.5 rounded-xl font-semibold shadow-sm transition-colors ${item.actionStyle}`}
                          >
                            {item.action}
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
      </div>
    </main>
  );
}
