import Link from "next/link";
import React from "react";

function page({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex flex-col gap-4">
   <p className="text-md ">Tekan Menu kanan diatas untuk menampilkan Laporan Masuk/Pulang dari pegawai</p>
  </div>
}

export default page;
