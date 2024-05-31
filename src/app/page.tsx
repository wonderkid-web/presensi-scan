"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import foto1 from "@/../public/foto1.jpg";
import foto2 from "@/../public/foto2.jpg";
import foto3 from "@/../public/foto3.jpg";
import { useAuth } from "@/lib/zustand";
import useAuthChecker from "@/hooks/useAuth";

export default function Home() {
   const user = useAuthChecker()

   if(!user){
      return null
   }

  return (
    <main className="flex flex-col justify-center relative bg-slate-50 top-[-30px]">
      <h1 className="text-2xl  font-bold text-center mb-4">
        Selamat Datang Di Website Admin Presensi Online
      </h1>
      <h1 className="text-2xl  font-bold text-center mb-4">
        Sekolah Yayasan Pendidikan Amal Luhur
      </h1>
      <div className="flex gap-4 px-4 mt-5">
        <div className="w-1/3 h-1/3 relative overflow-hidden rounded-md scale-90 drop-shadow-md">
          <Image src={foto3} alt="foto1" objectFit="cover" />
        </div>
        <div className="w-1/3 h-1/3 relative overflow-hidden rounded-md scale-110 drop-shadow-md">
          <Image src={foto1} alt="foto1" objectFit="cover" />
        </div>
        <div className="w-1/3 h-1/3 relative overflow-hidden rounded-md scale-90 drop-shadow-md">
          <Image src={foto2} alt="foto1" objectFit="cover" />
        </div>
      </div>
    </main>
  );
}
