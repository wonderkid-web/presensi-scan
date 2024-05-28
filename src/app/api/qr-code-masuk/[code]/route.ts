// import { Code } from "@/types";
// import axios from "axios";
// import { redirect } from "next/navigation";
// import { NextResponse } from "next/server";

// export async function GET(req: Request, { params }: { params: any }) {
//   const code = params.code;
//   try {
//     // const raw = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/code`);
//     const raw = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/code`,{
//       cache:"no-store"
//     });
//     const codes : Code[] = await raw.json();

//     const checkCode = codes.find(currCode=> currCode.code_masuk == code)

//     console.log('checkcode', checkCode)
//     console.log('id', code)
//     console.log('codes', codes)

//     if (checkCode) {
//       await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user`,{
//         name: "Muhammad Wahyu Ramadhan",
//         jam: new Date(),
//         type:"masuk"
//       })

//       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/proses/sukses`)

//     } else {
//       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/proses/gagal`)

//     }
//   } catch (error) {
//     return NextResponse.json({ error });
//   }
// }

import { supabase } from "@/lib/supabase";
import { Code } from "@/types";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: any }) {
  const code = params.code;
  let status;

  const url = req.url;
  const searchParams = new URLSearchParams(url.split("?")[1])!;
  const email = searchParams.get("email")?.toLowerCase();
  // const code = searchParams.get("code");

  if (!email) return NextResponse.json({ error: "User Tidak Ada!" });

  const { data: user } = await supabase.from("user").select("*");
  const raw = await fetch(`https://660159c687c91a11641aa8d1.mockapi.io/code`);
  const codes: Code[] = await raw.json();

  const checkCode = codes.find((data) => data.code_masuk == code);

  const checkUser = user?.find((u) => u.email === email);

  if (checkCode && checkUser) status = true;
  else status = false;

  try {
    if (status) {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user`, {
        name: email,
        jam: new Date(),
        type: "masuk",
      });

      // return NextResponse.json({
      //   status,
      //   checkCode,
      //   checkUser,
      //   codes,
      //   code,
      //   user,
      // });
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proses/sukses`
      );
    } else {
      // return NextResponse.json({
      //   status,
      //   checkCode,
      //   checkUser,
      //   codes,
      //   code,
      //   user,
      // });
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proses/gagal`
      );
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
