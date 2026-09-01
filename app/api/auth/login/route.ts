import { NextResponse } from "next/server";
import { createAccountSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { accountLoginSchema } from "@/lib/dashboard-validation";
import { verifyPassword } from "@/lib/password";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = accountLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Enter a valid email and password." }, { status: 400 });
  }

  const account = await prisma.account.findUnique({
    where: { email: parsed.data.email },
  });

  if (!account || !(await verifyPassword(parsed.data.password, account.passwordHash))) {
    return NextResponse.json({ ok: false, message: "Email or password is incorrect." }, { status: 401 });
  }

  if (account.status === "SUSPENDED") {
    return NextResponse.json({
      ok: false,
      message: "This account is not active. Contact the ONVIBE team for help.",
    }, { status: 403 });
  }

  await createAccountSession(account.id);

  return NextResponse.json({ ok: true, message: "Logged in." });
}
