"use client";
// components/TabComponent.tsx
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
import { getUser } from "@/actions";
import { Code, Laporan, SingleUser } from "@/types";

function Layout({ children }: { children: React.ReactNode }) {
  const [userQuery, akunQuery] = useQueries({
    queries: [
      {
        queryKey: ["user"],
        queryFn: getUser,
        select: (data:Code[]) => data.filter(d=> d.type === "masuk")
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

  // Gabungkan data dari table1 dengan data pegawai dari table2
  const result: Laporan[] = user
    ?.map((entry) => {
      const email = entry.name;
      if (pegawaiDict[email]) {
        return { ...entry, ...pegawaiDict[email] };
      }
      return entry as Laporan;
    }) || []

  return (
    <>
      <div className="flex justify-between px-4">
        <h1 className="text-2xl font-bold">Presensi Masuk</h1>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Nama</th>
            <th className="py-2 px-4 border-b">NIP</th>
            <th className="py-2 px-4 border-b">Jabatan</th>
            <th className="py-2 px-4 border-b">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {result.length > 0 ? (
            result.map((u: Laporan, i:number) => (
              <tr className="text-center" key={u.id}>
                <td className="py-2 px-4 border-b">{i+1}</td>
                <td className="py-2 px-4 border-b">{u.name}</td>
                <td className="py-2 px-4 border-b">{u.nip}</td>
                <td className="py-2 px-4 border-b">{u.job_title}</td>
                <td className="py-2 px-4 border-b">
                  {format(new Date(u.jam), "dd MMMM yyyy HH:mm", {
                    locale: id,
                  })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
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

export default Layout;
