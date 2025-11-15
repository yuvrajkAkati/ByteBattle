// src/app/api/admin/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("admin-auth", "", {
    path: "/",          // MUST match login
    httpOnly: false,    // MUST match login
    sameSite: "Lax",    // MUST match login
    maxAge: 0,          // Delete cookie
  });

  return res;
}
