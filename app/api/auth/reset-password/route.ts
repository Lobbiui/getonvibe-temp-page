import { NextResponse } from "next/server";
import { verifyPasswordResetToken } from "@/lib/auth";
import { passwordResetSchema } from "@/lib/dashboard-validation";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = passwordResetSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const resetSession = await verifyPasswordResetToken(parsed.data.token);

  if (!resetSession) {
    return NextResponse.json({ ok: false, message: "This reset link is invalid or expired." }, { status: 400 });
  }

  const account = await prisma.account.findUnique({
    where: { id: resetSession.accountId },
  });

  if (
    !account ||
    account.email !== resetSession.email ||
    account.updatedAt.toISOString() !== resetSession.accountUpdatedAt ||
    account.status === "SUSPENDED"
  ) {
    return NextResponse.json({ ok: false, message: "This reset link is invalid or expired." }, { status: 400 });
  }

  await prisma.account.update({
    where: { id: account.id },
    data: {
      passwordHash: await hashPassword(parsed.data.password),
      status: "APPROVED",
      approvedAt: account.approvedAt || new Date(),
    },
  });

  return NextResponse.json({ ok: true, message: "Password updated. You can now log in." });
}
