"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import foto1 from "@/../public/foto1.jpg"



const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


export default function Home() {
  const { user: currentUser } = useAuth();
  const router = useRouter();

  // if (!currentUser) {
  //   router.push("/signin");
  //   return null; // Menghindari rendering ganda saat redirect
  // }

  return (
    <main className="flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-center mb-4">Selamat Datang Admin</h1>
       <div className="w-2/4 h-2/4 mx-auto relative">
          <Image src={foto1} alt="foto1" objectFit="cover"/>
       </div>
    </main>
  );
}
