const { createMiddlewareClient } = require("@supabase/auth-helpers-nextjs");
const { cookies } = require("next/headers");
const { NextResponse } = require("next/server");

export async function middleware(req){
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({req, res})
    await supabase.auth.getSession()
    return res
}