import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, isValidAccessToken } from "@/lib/access-token";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/unlock" || pathname === "/api/access/login") return NextResponse.next();

  const password = process.env.DEMO_SITE_PASSWORD;
  const secret = process.env.DEMO_SESSION_SECRET;
  if (!password || !secret || secret.length < 32) {
    return new NextResponse("Demo access is not configured. Set DEMO_SITE_PASSWORD and a 32+ character DEMO_SESSION_SECRET.", { status: 503 });
  }

  if (await isValidAccessToken(request.cookies.get(ACCESS_COOKIE)?.value, secret)) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Access password required" }, { status: 401 });
  }
  const url = request.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
