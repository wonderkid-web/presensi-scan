import { Code } from "@/types";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: any }) {
  const code = params.code;
  try {
    const raw = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/code`);
    const codes : Code[] = await raw.json();

    const checkCode = codes.find(currCode=> currCode.code_masuk == code)

    if (checkCode) {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user`,{
        name: "Muhammad Wahyu Ramadhan",
        jam: new Date(),
        type:"masuk"
      })

      return NextResponse.json({
        message: "Berhasil Absen Masuk",
        createdAt: new Date(),
        currentUser: checkCode
      });
    } else {
      return NextResponse.json({
        message: "Gagal Absen Masuk",
        createdAt: new Date(),
        checkCode
      });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
