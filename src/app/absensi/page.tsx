"use client";

import { createCode, getCode, getUser } from "@/actions";
import useAuth from "@/hooks/useAuth";
import { Code } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

import QRCode from "react-qr-code";
import uuid from "react-uuid";

export default function Home() {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();
  const router = useRouter();

  const { data, isLoading } = useQuery<Code[]>({
    queryFn: getCode,
    queryKey: ["code"],
  });

  const { data: user, isLoading: isLoadingUser } = useQuery<Code[]>({
    queryFn: getUser,
    queryKey: ["user"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCode,
    mutationKey: ["create"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["code"] });
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <main className="flex flex-col">
      <div className="grid grid-cols-1 place-items-center">
        <button
          disabled={isPending}
          className={`${
            !isPending ? "bg-slate-300" : "bg-slate-500"
          } p-2 mt-4 rounded-md  w-fit`}
          onClick={() => mutate()}
        >
          Buat QRCode Absen
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
        <div className="flex gap-5 flex-col items-center">
          <h1 className="font-bold underline text-2xl">Absen Masuk</h1>
          {data?.map((code) => (
            <div key={code.code_keluar}>
              <QRCode
                key={uuid()}
                size={200}
                // value={`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr-code-masuk/${code.code_masuk}`}
                value={`${code.code_masuk}`}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-5 flex-col items-center">
          <h1 className="font-bold underline text-2xl">Absen Keluar</h1>
          {data?.map((code) => (
            <QRCode
              key={uuid()}
              size={200}
              // value={`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr-code-pulang/${code.code_keluar}`}
              value={`${code.code_keluar}`}
            />
          ))}
        </div>
      </div>
      {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
        <div className="flex gap-5">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div> */}
    </main>
  );
}
