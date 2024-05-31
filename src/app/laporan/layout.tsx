"use client"
import useAuthChecker from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = useAuthChecker();

  if (!user) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Menu Laporan</h1>

        <div className="flex gap-3">
          <Link
            href={"/laporan/masuk"}
            className="bg-blue-400 px-2 py-1 text-white rounded-sm font-bold text-center flex justify-center items-center"
          >
            Laporan Masuk
          </Link>
          <Link
            href={"/laporan/pulang"}
            className="bg-blue-400 px-2 py-1 text-white rounded-sm font-bold text-center flex justify-center items-center"
          >
            Laporan Pulang
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
