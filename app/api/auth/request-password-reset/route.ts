import { NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/auth";
import { passwordResetRequestSchema } from "@/lib/dashboard-validation";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/resend";

export const runtime = "nodejs";

const genericMessage = "If an active account exists for that email, a password reset link has been sent.";

function getSiteUrl(request: Request) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "https";

  if (host) {
    return `${protocol}://${host}`.replace(/\/$/, "");
  }

  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.getonvibe.com").replace(/\/$/, "");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = passwordResetRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Enter a valid email address.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const account = await prisma.account.findUnique({
    where: { email: parsed.data.email },
  });

  if (!account || account.status === "SUSPENDED") {
    return NextResponse.json({ ok: true, message: genericMessage });
  }

  const token = await createPasswordResetToken({
    accountId: account.id,
    email: account.email,
    accountUpdatedAt: account.updatedAt.toISOString(),
  });
  const resetUrl = `${getSiteUrl(request)}/reset-password?token=${encodeURIComponent(token)}`;

  await sendPasswordResetEmail(account, resetUrl).catch((error) => {
    console.error("Password reset email failed", error instanceof Error ? error.message : "Unknown error");
  });

  return NextResponse.json({ ok: true, message: genericMessage });
}
