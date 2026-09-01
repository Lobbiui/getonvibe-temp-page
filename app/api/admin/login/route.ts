import { NextResponse } from "next/server";
import { createAdminSession, getAdminCredentials } from "@/lib/auth";
import { adminLoginSchema } from "@/lib/dashboard-validation";
import { verifyPassword } from "@/lib/password";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Enter a valid admin email and password." }, { status: 400 });
  }

  const credentials = getAdminCredentials();

  if (!credentials.email || !credentials.passwordHash) {
    console.error("Admin login attempted without admin credentials configured.");
    return NextResponse.json({ ok: false, message: "Admin login is not configured." }, { status: 503 });
  }

  const emailMatches = parsed.data.email === credentials.email;
  const passwordMatches = await verifyPassword(parsed.data.password, credentials.passwordHash);

  if (!emailMatches || !passwordMatches) {
    return NextResponse.json({ ok: false, message: "Admin email or password is incorrect." }, { status: 401 });
  }

  await createAdminSession(credentials.email);

  return NextResponse.json({ ok: true });
}
