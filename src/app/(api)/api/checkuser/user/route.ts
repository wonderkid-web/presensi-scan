import { NextResponse } from "next/server";

export async function GET() {
  const raw = await fetch(`https://660159c687c91a11641aa8d1.mockapi.io/code`);
  const codes = await raw.json();

  return NextResponse.json({ test: "test", codes });
}
