import Link from "next/link";

export default function MyFooter() {
  return (
    <div className="bg-[#222744] p-20 text-white">
      <div className="flex justify-between mb-10">
        <div>
          <h1 className="text-2xl mb-2 font-bold">Mantra</h1>
          <p className="text-sm text-[#CED1E0]">
            Ruang bertumbuh, bergerak, dan berdampak bersama.
            <br />
            Platform organisasi mahasiswa Universitas Nusantara.
          </p>
        </div>
        <div>
          <h2 className="font-bold">Jelajahi</h2>
          <div className="flex gap-5">
            <Link className="text-sm text-[#CED1E0]" href="">
              Organisasi
            </Link>
            <Link className="text-sm text-[#CED1E0]" href="">
              Acara
            </Link>
            <Link className="text-sm text-[#CED1E0]" href="">
              Jurnal
            </Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold">Butuh bantuan?</h2>
          <Link className="text-sm text-[#CED1E0]" href="">
            mantra@iti.ac.id
          </Link>
          <p className="text-sm text-[#CED1E0]">Senin-Jumat, 08:00-16:00 WIB</p>
        </div>
      </div>

      <div className="flex gap-32">
        <h1 className="text-sm text-[#CED1E0]">
          &copy; 2026 Mantra - Institur Teknologi Indonesia
        </h1>
        <div className="flex gap-5">
          <Link className="text-sm text-[#CED1E0]" href="">
            Kebijakan privasi
          </Link>
          <Link className="text-sm text-[#CED1E0]" href="">
            Ketentuan penggunaan
          </Link>
        </div>
      </div>
    </div>
  );
}
