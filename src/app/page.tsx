"use client";

import { createCode, getCode } from "@/actions";
import { Code } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import QRCode from "react-qr-code";
import uuid from "react-uuid";



export default function Home() {
  const queryClient = useQueryClient()

  const {data, isLoading} = useQuery<Code[]>({
    queryFn: getCode,
    queryKey: ["code"]
  })

  const {mutate, isPending} = useMutation({
    mutationFn: createCode,
    mutationKey: ["create"],
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:["code"]})
    }
  })

  if(isLoading) return <h1>Loading...</h1>

  return (
    <main className="flex flex-col">
      <div className="grid grid-cols-1 place-items-center">
        <button disabled={isPending} className={`${!isPending ? 'bg-slate-300' : 'bg-slate-500'} p-2 mt-4 rounded-md  w-fit`} onClick={()=> mutate()}>Generate Code</button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
        <div className="flex gap-5">
          {
            data?.map(code=> <>
            <QRCode key={uuid()} size={100} value={`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr-code-masuk/${code.code_masuk}`} />
            </>)
          }
        </div>
        <div className="flex gap-5">
        {
            data?.map(code=> <QRCode key={uuid()} size={100} value={`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr-code-pulang/${code.code_keluar}`} />)
          }
        </div>
      </div>
    </main>
  );
}
