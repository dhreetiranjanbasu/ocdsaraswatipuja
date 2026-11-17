import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, createAccessToken, verifyPassword } from "@/lib/access-token";

export async function POST(request: NextRequest) {
  const expected = process.env.DEMO_SITE_PASSWORD;
  const secret = process.env.DEMO_SESSION_SECRET;
  if (!expected || !secret || secret.length < 32) {
    return NextResponse.json({ error: "Site access is not configured." }, { status: 503 });
  }
  let submitted: unknown;
  try {
    const body = await request.json();
    submitted = body?.password;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof submitted !== "string" || submitted.length > 256 || !(await verifyPassword(submitted, expected))) {
    return NextResponse.json({ error: "Incorrect password. Please try again." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACCESS_COOKIE, await createAccessToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
