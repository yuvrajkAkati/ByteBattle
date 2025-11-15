// src/app/api/admin/login/route.js
import { NextResponse } from "next/server";
import { ADMIN_EMAILS } from "@/lib/admin";

export async function POST(req) {
  // safe parse
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, password } = body ?? {};

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  // NOTE: for now password is a static test value "admin123"
  if (!ADMIN_EMAILS.includes(email) || password !== "admin123") {
    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  // Set cookie with known attributes that middleware will check
  res.cookies.set("admin-auth", "true", {
    path: "/",
    httpOnly: false,
    sameSite: "Lax",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return res;
}
