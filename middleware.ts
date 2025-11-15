import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;

  const cookie = req.cookies.get("admin-auth")?.value;

  // if no login cookie → redirect
  if (!cookie || cookie !== "true") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  console.log("middleware running")
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin((?!/login).*)"],
};

