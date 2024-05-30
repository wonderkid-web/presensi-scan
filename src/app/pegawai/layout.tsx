import Link from "next/link";
import React from "react";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Menu Manajemen Data Pegawai</h1>

        <Link
          href={"/pegawai/registrasi"}
          className="bg-blue-400 px-2 py-1 text-white rounded-sm font-bold text-center"
        >
          Tambah Akun
        </Link>
      </div>
      {children}
    </div>
  );
}

export default layout;
