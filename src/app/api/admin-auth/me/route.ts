import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "portfolio_admin_session";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_SESSION_SECRET;
  const authenticated = Boolean(session && expected && session === expected);
  return NextResponse.json({ authenticated });
}
