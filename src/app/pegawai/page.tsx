"use client";
// components/TabComponent.tsx
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import {
  UseQueryResult,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { SingleUser } from "@/types";
import Link from "next/link";
import { UUID } from "crypto";
import { Toaster, toast } from "sonner";

function Layout({ children }: any) {
  const query = useQueryClient();
  
  const { data: akunPegawai, isLoading } = useQuery({
    queryKey: ["akun"],
    queryFn: async () => {
      const { data } = await supabase.from("user").select("*");
      return data;
    },
  });

  const handleDeleteUser = async (userId: UUID) => {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (!error) {
      const { error: hapusError } = await supabase
        .from("user")
        .delete()
        .eq("id", userId);
      if (!hapusError) {
        query.invalidateQueries({ queryKey: ["akun"] });
        toast.success("Berhasil Menghapus Akun!");
      }
    } else {
      toast.error("Gagal Menghapus akun!");
      toast.error(error.message);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (akunPegawai)
    return (
      <>
        <Toaster />
        <div className="flex justify-between px-4">
          <h1 className="text-2xl font-semibold">Table Akun Pegawai</h1>
        </div>
        <div className="overflow-x-auto border">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">No.</th>
              <th className="py-2 px-4 border-b">Nama</th>
              <th className="py-2 px-4 border-b">NIP</th>
              <th className="py-2 px-4 border-b">Jabatan</th>
              <th className="py-2 px-4 border-b">Nomor HP</th>
              <th className="py-2 px-4 border-b">E-mail</th>
              <th className="py-2 px-4 border-b">Alamat</th>
              <th className="py-2 px-4 border-b">Tanggal Pembuatan Akun</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {akunPegawai.length > 0 ? (
              akunPegawai.map((u: SingleUser, i: number) => (
                <tr className="text-center" key={u.id}>
                  <td className="py-2 px-4 border-b">{i + 1}</td>
                  <td className="py-2 px-4 border-b text-left">{u.name}</td>
                  <td className="py-2 px-4 border-b">{u.nip}</td>
                  <td className="py-2 px-4 border-b">{u.job_title}</td>
                  <td className="py-2 px-4 border-b">{u.contact}</td>
                  <td className="py-2 px-4 border-b">{u.email}</td>
                  <td className="py-2 px-4 border-b">{u.address}</td>
                  <td className="py-2 px-4 border-b">
                    {format(new Date(u.created_at), "dd MMMM yyyy HH:mm", {
                      locale: id,
                    })}
                  </td>
                  <td className="py-2 flex gap-2 px-4 border-b">
                    <Link
                      className="p-1 rounded-sm text-center bg-yellow-500 text-xs hover:scale-105 text-white font-bold"
                      href={`/pegawai/edit/${u.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(u.id as UUID)}
                      className="p-1 rounded-sm text-center bg-red-500 text-xs hover:scale-105 text-white font-bold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <h1 className="text-center text-md mt-4">Belum Akun Data Pegawai.</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        {children}
      </>
    );
}

export default Layout;
