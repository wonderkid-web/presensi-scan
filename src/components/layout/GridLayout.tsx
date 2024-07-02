"use client";
import React from "react";
import { Inter } from "next/font/google";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

function GridLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const showSidebarAndNavbar = ![
    "/proses/gagal",
    "/proses/sukses",
    "/signin",
  ].includes(pathname);

  return (
    <div className={inter.className}>
      <div className="h-full grid grid-cols-[150px_1fr_1fr_1fr_1fr] grid-rows-[75px_1fr_1fr_1fr_1fr] gap-4">
        {showSidebarAndNavbar && (
          <div className="row-span-5">
            <Sidebar />
          </div>
        )}
        {showSidebarAndNavbar && (
          <div className="col-span-4">
            <Navbar />
          </div>
        )}
        <div
          className={
            showSidebarAndNavbar
              ? "col-span-4 row-span-4 col-start-2 row-start-2"
              : "col-span-5 row-span-5"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default GridLayout;
