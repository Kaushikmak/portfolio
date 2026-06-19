import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "portfolio_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
    const expected = process.env.ADMIN_SESSION_SECRET;

    if (!cookie || !expected || cookie !== expected) {
      const loginUrl = new URL("/admin-login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
