import Link from "next/link";

export default function CTA() {
  return (
    <div className="flex gap-5 justify-between p-32 bg-[#EEEEFA]">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <div>
          <h3 className="text-4xl mb-4">
            Langkah kecilmu, awal cerita yang besar.
          </h3>
          <p className="">
            Buat akun mahasiswa dan temukan komunitas untuk tumbuh bersama.
          </p>
        </div>
        <div>
          <Link
            className="bg-[#222744] px-20 py-3 rounded-md text-white text-sm inline-block"
            href=""
          >
            Mulai Perjalananmu
          </Link>
        </div>
      </div>
    </div>
  );
}
