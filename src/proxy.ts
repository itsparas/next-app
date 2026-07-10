import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Feature 13: Proxy (renamed from middleware.ts in Next.js 16)
// Runs at the edge before the app on every matching request.

export default function proxy(request: NextRequest) {
  const authCookie = request.cookies.get("devnotes-auth");

  // Protect /dashboard/* — redirect to /login if not authenticated
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !authCookie
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
