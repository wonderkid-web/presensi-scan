import { getCode } from "@/actions";
import { supabase } from "@/lib/supabase";
import { Code, User } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { params: any }) {
  const url = req.url;
  const { data } = await supabase.from("user").select("*");
  // const codes = await getCode();
  const raw = await fetch(`https://660159c687c91a11641aa8d1.mockapi.io/code`);
  const codes = await raw.json()

  const searchParams = new URLSearchParams(url.split("?")[1])!;

  const email = searchParams.get("email")?.toLowerCase();
  const code = searchParams.get("code");

  try {
    console.log(codes);
  } catch (error) {
    // console.log(error)
  }

  const user = data?.find((u: User) => u.email == email);
  // const checkCode = codes.find((currCode) => currCode.code_masuk == code);

  if (user) {
    console.log("Scan Berhasil");
  } else {
    console.log("Gagal Scan");
  }

  return NextResponse.json({ url, data });
}
