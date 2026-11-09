"use client";

import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    nim: "",
    email: "",
    programStudi: "Teknik Informatika",
    angkatan: "2026",
    password: "",
    agreePrivacy: true,
    whatsappReminder: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const targetValue =
      e.target.type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: targetValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted Data:", formData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white p-6 rounded-lg shadow-sm space-y-5 text-gray-700 text-sm"
      >
        {/* Nama Lengkap */}
        <div>
          <label className="block font-medium text-gray-800 mb-1">
            Nama lengkap
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Aulia Rahma"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">Sesuai KTM</p>
        </div>

        {/* NIM */}
        <div>
          <label className="block font-medium text-gray-800 mb-1">NIM</label>
          <input
            type="text"
            name="nim"
            placeholder="2610511023"
            value={formData.nim}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">10 digit sesuai KTM</p>
        </div>

        {/* Program Studi & Angkatan */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-medium text-gray-800 mb-1">
              Program studi
            </label>
            <div className="relative">
              <select
                name="programStudi"
                value={formData.programStudi}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Teknik Elektro">Teknik Elektro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-800 mb-1">
              Angkatan
            </label>
            <div className="relative">
              <select
                name="angkatan"
                value={formData.angkatan}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kotak Persetujuan Privacy */}
        <div className="bg-slate-50 p-3.5 rounded-lg flex items-start space-x-3">
          <input
            type="checkbox"
            id="agreePrivacy"
            name="agreePrivacy"
            checked={formData.agreePrivacy}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 text-blue-900 border-gray-300 rounded focus:ring-blue-500 accent-[#12224d]"
          />
          <label
            htmlFor="agreePrivacy"
            className="text-xs text-gray-600 leading-relaxed cursor-pointer"
          >
            Saya setuju NIM, prodi, dan kontak saya diproses Pusat Kemahasiswaan
            Universitas Nusantara untuk keanggotaan organisasi, sesuai UU No. 27
            Tahun 2022 tentang Perlindungan Data Pribadi.
          </label>
        </div>

        {/* Butang Buat Akun */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-[#12224d] hover:bg-[#0d1838] text-white font-medium rounded-md flex items-center justify-center space-x-2 transition-colors duration-200 mt-2"
        >
          <span>Buat akun</span>
        </button>
      </form>
    </div>
  );
}
