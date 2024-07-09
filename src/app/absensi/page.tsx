// @ts-nocheck
"use client";

import { createCode, getCode, getUser } from "@/actions";
import { useToggler } from "@/helper/zustand";
import { Code } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useInterval } from "react-interval-hook";

import QRCode from "react-qr-code";
import uuid from "react-uuid";

export default function Home() {
  const queryClient = useQueryClient();
  const { toggler } = useToggler();

  const { data, isLoading } = useQuery<Code>({
    queryFn: getCode,
    queryKey: ["code"],
    select: (data) =>
      data.reduce((latest, current) => {
        return new Date(latest.createdAt) > new Date(current.createdAt)
          ? latest
          : current;
      }, data[0]),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCode,
    mutationKey: ["create"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["code"] });
    },
  });

  const toggling = () => toggler();

  useInterval(() => {
    // mutate();
  }, 60 * 3);

  const currentDate = new Date();
  const formattedDate = format(currentDate, "eeee, MMMM d, yyyy HH:mm");

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <main className="flex flex-col">
      <button
        className="bg-sky-600 text-white py-2 px-1 rounded-md font-semibold w-fit mx-auto"
        onClick={toggling}
      >
        tampil
      </button>
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
      {/* <pre>{JSON.stringify(data?.code_masuk, null, 2)}</pre> */}
      {data ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
          <div className="flex gap-5 flex-col items-center">
            <h1 className="font-bold underline text-2xl">Absen Masuk</h1>

            <div>
              <QRCode
                key={uuid()}
                size={200}
                // value={`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr-code-masuk/${code.code_masuk}`}
                value={`${data?.code_masuk}`}
              />
            </div>
          </div>
          <div className="flex gap-5 flex-col items-center">
            <h1 className="font-bold underline text-2xl">Absen Pulang</h1>

            <QRCode
              key={uuid()}
              size={200}
              // value={`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr-code-pulang/${code.code_keluar}`}
              value={`${data?.code_keluar}`}
            />
          </div>
        </div>
      ) : (
        <h1 className="text-2xl text-center font-bold mt-16 text-gray-500">
          Belum Ada QR Code
        </h1>
      )}
      <div className="grid grid-cols-1 place-items-center mt-10">
        <p className="text-lg font-semibold">
          Tanggal Sekarang: {formattedDate}
        </p>
      </div>
    </main>
  );
}
