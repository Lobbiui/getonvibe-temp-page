import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { adminAccountActionSchema } from "@/lib/dashboard-validation";
import { sendAccountApprovedEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const body = await request.json().catch(() => null);
  const parsed = adminAccountActionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Account is required." }, { status: 400 });
  }

  const account = await prisma.account.update({
    where: { id: parsed.data.accountId },
    data: {
      status: "APPROVED",
      approvedAt: new Date(),
    },
  });

  await sendAccountApprovedEmail(account).catch((error) => {
    console.error("Account approval email failed", error instanceof Error ? error.message : "Unknown error");
  });

  return NextResponse.json({ ok: true, message: "Account approved." });
}
