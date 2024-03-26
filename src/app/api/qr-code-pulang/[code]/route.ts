import { Code } from "@/types";
import axios from "axios";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: any }) {
  const code = params.code;
  try {
    const raw = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/code`, {
      cache: "no-store",
    });
    const codes: Code[] = await raw.json();

    const checkCode = codes.find((currCode) => currCode.code_keluar == code);

    console.log("checkcode", checkCode);
    console.log("id", code);
    console.log("codes", codes);

    if (checkCode) {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user`, {
        name: "Muhammad Wahyu Ramadhan",
        jam: new Date(),
        type: "pulang",
      });

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proses/sukses`
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proses/gagal`
      );
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
