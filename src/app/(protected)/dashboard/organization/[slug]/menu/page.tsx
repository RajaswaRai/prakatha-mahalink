"use client";

import { ChevronRight, Globe, Settings } from "lucide-react";
import { useState } from "react";

// Import Komponen Tab
import AgendaAcaraTab from "@/components/dashboard/AgendaAcaraTab";
import AnggotaTab from "@/components/dashboard/AnggotaTab";
import DokumenTab from "@/components/dashboard/DokumenTab";
import KeuanganTab from "@/components/dashboard/KeuanganTab";
import PengaturanTab from "@/components/dashboard/PengaturanTab";
import PengumumanTab from "@/components/dashboard/PengumumanTab";
import RingkasanTab from "@/components/dashboard/RingkasanTab";
import { AddMemberModal } from "@/components/dashboard/AddMemberModal";
import { CreateAnnouncementModal } from "@/components/dashboard/CreateAnnouncementModal";

export default function OrganizationDetailPage() {
  const [activeTab, setActiveTab] = useState("Agenda & acara");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] =
    useState(false);

  const tabs = [
    "Ringkasan",
    "Pengumuman",
    "Agenda & acara",
    "Anggota - 7 baru",
    "Keuangan",
    "Dokumen",
    "Pengaturan",
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <span className="hover:text-gray-800 cursor-pointer">Organisasi</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium">HMTI</span>
        </nav>

        {/* Header Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-700 font-bold text-base flex items-center justify-center shrink-0">
              TI
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Himpunan Mahasiswa Teknik Informatika
              </h1>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5 flex-wrap">
                <span>128 anggota</span>
                <span>·</span>
                <span>Kabinet Langkah Baru 2026/2027</span>
                <span>·</span>
                <span className="text-gray-700">kamu:</span>
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-medium text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Ketua
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
              <Globe className="w-4 h-4 text-gray-500" />
              <span>Halaman publik</span>
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">
              <Settings className="w-4 h-4 text-gray-500" />
              <span>Pengaturan</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 text-xs font-semibold overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 relative transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "text-gray-900 font-bold border-b-2 border-gray-900 -mb-[1px]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Conditional Tab Rendering */}
        <div className="pt-2">
          {activeTab === "Ringkasan" && <RingkasanTab />}
          {activeTab === "Pengumuman" && (
            <PengumumanTab
              onOpenCreateAnnouncement={() => setIsCreateAnnouncementOpen(true)}
            />
          )}
          {activeTab === "Agenda & acara" && <AgendaAcaraTab />}
          {activeTab === "Anggota - 7 baru" && (
            <AnggotaTab onOpenAddMember={() => setIsAddMemberOpen(true)} />
          )}
          {activeTab === "Keuangan" && <KeuanganTab />}
          {activeTab === "Dokumen" && <DokumenTab />}
          {activeTab === "Pengaturan" && <PengaturanTab />}
        </div>
      </div>

      {/* Global Modals */}
      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
      />
      <CreateAnnouncementModal
        isOpen={isCreateAnnouncementOpen}
        onClose={() => setIsCreateAnnouncementOpen(false)}
      />
    </div>
  );
}
