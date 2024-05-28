// import { Code } from "@/types";
// import axios from "axios";
// import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// export async function GET(req: Request, params: { params: any }) {
//   const url = req.url;
//   let status;

//   const searchParams = new URLSearchParams(url.split("?")[1])!;

//   const email = searchParams.get("email")?.toLowerCase();
//   const code = searchParams.get("code");

//   const raw = await fetch(`https://660159c687c91a11641aa8d1.mockapi.io/code`);
//   const codes: Code[] = await raw.json();
//   const checkUser = codes.find((data) => data.code_masuk == code);

//   if (checkUser) status = true;
//   else status = false;
  
//   try {
//     if (checkUser) {
//       await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user`, {
//         name: email,
//         jam: new Date(),
//         type: "masuk",
//       });

//       return NextResponse.redirect(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/proses/sukses`
//       );
//     } else {
//       return NextResponse.redirect(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/proses/gagal`
//       );
//     }
//   } catch (error) {
//     return NextResponse.json({ error });
//   }
// }


export async function GET(){
  const {data:user} = await supabase.from("user").select("*")

  const checkUser = user?.find(u=> u.email === "tewst@test.com")

  
  if(checkUser){
    return NextResponse.json({text:"sukses"})  
  }
  
  return NextResponse.json({text:"gagal"})
}