// @ts-nocheck
"use client";
// components/TabComponent.tsx
import React, { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { UseQueryResult, useQueries } from "@tanstack/react-query";
import { getUser } from "@/actions";
import { Code, Laporan, SingleUser } from "@/types";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Page({ children }: any) {
  const [nama, setNama] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");

  const [userQuery, akunQuery] = useQueries({
    queries: [
      {
        queryKey: ["user"],
        queryFn: getUser,
      },
      {
        queryKey: ["akun"],
        queryFn: async () => {
          const { data } = await supabase.from("user").select("*");
          return data;
        },
      },
    ],
  });

  const {
    data: user,
    isLoading: isLoadingUser,
  }: UseQueryResult<Code[], any> = userQuery;

  const { data: akun, isLoading: akunLoading } = akunQuery;

  if (isLoadingUser || akunLoading) return <p>Loading...</p>;

  const pegawaiDict = akun?.reduce((acc: any, pegawai: SingleUser) => {
    acc[pegawai.email] = pegawai;
    return acc;
  }, {});

  const laporanMasuk = user?.filter((entry) => entry.type === "masuk") || [];
  const laporanPulang = user?.filter((entry) => entry.type === "pulang") || [];

  const result: Laporan[] = laporanMasuk.map((masuk) => {
    const pulangTerdekat = laporanPulang
      .filter((pulang) => pulang.name === masuk.name && new Date(pulang.jam) > new Date(masuk.jam))
      .sort((a, b) => new Date(a.jam).getTime() - new Date(b.jam).getTime())[0];

    return {
      ...masuk,
      pulangJam: pulangTerdekat ? pulangTerdekat.jam : null,
      ...pegawaiDict[masuk.name],
    };
  });

  const filteredResults = result.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredResults.map((u: Laporan, i: number) => ({
        No: i + 1,
        Nama: u.name,
        NIP: u.nip,
        Jabatan: u.job_title,
        TanggalMasuk: format(new Date(u.jam), "dd MMMM yyyy HH:mm", { locale: id }),
        TanggalPulang: u.pulangJam ? format(new Date(u.pulangJam), "dd MMMM yyyy HH:mm", { locale: id }) : "Belum Pulang",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Presensi");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Presensi.xlsx");
  };

  return (
    <>
      <div className="flex justify-between px-4 mb-4">
        <h1 className="text-2xl font-bold">Presensi Guru</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
      </div>
      <div className="mb-4 px-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Cari berdasarkan nama"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Nama</th>
            <th className="py-2 px-4 border-b">NIP</th>
            <th className="py-2 px-4 border-b">Jabatan</th>
            <th className="py-2 px-4 border-b">Tanggal Masuk</th>
            <th className="py-2 px-4 border-b">Tanggal Pulang</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.length > 0 ? (
            filteredResults.map((u: Laporan, i: number) => (
              <tr className="text-center" key={u.id}>
                <td className="py-2 px-4 border-b">{i + 1}</td>
                <td className="py-2 px-4 border-b">{u.name}</td>
                <td className="py-2 px-4 border-b">{u.nip}</td>
                <td className="py-2 px-4 border-b">{u.job_title}</td>
                <td className="py-2 px-4 border-b">
                  {format(new Date(u.jam), "dd MMMM yyyy HH:mm", {
                    locale: id,
                  })}
                </td>
                <td className="py-2 px-4 border-b">
                  {u.pulangJam ? format(new Date(u.pulangJam), "dd MMMM yyyy HH:mm", {
                    locale: id,
                  }) : "Belum Pulang"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <h1 className="text-center text-md">Absen Kosong</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {children}
    </>
  );
}

export default Page;
