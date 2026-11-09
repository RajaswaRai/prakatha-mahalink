import { auth } from "@/auth";
import RegistrationForm from "./components/RegistrationForm";
import { Link2 } from "lucide-react"; // Or use any icon/SVG for the logo

export default async function CreateAccountPage() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="flex-1 bg-[#F3F7FF] flex flex-col justify-between p-12">
        {/* Top Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#1E293B]">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 leading-tight">Mantra</h1>
            <p className="text-xs text-gray-500">
              Pusat Kemahasiswaan · Univ. Nusantara
            </p>
          </div>
        </div>

        {/* Center Illustration / Card Box */}
        <div className="my-auto mx-auto w-full max-w-md bg-gray-100/80 border border-gray-200/60 rounded-2xl h-80 flex flex-col items-center justify-center text-center p-6 shadow-inner">
          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-gray-400 mb-3 shadow-sm">
            {/* Placeholder image icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Mahasiswa mengisi formulir pendaftaran UKM saat Expo Organisasi
          </p>
        </div>

        {/* Bottom Testimonial Quote */}
        <div>
          <blockquote className="italic text-gray-700 text-lg font-serif mb-2">
            &ldquo;Dulu daftar ulang UKM harus isi Google Form tiap tahun.
            Sekarang cukup sekali.&rdquo;
          </blockquote>
          <p className="text-xs text-gray-500">
            — Salsabila, anggota KSR PMI Unit
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-[1.5] bg-white overflow-y-auto">
        <div className="max-w-lg mx-auto py-5">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
