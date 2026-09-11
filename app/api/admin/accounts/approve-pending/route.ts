import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { sendAccountApprovedEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST() {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const pendingAccounts = await prisma.account.findMany({
    where: { status: "PENDING" },
  });

  if (pendingAccounts.length === 0) {
    return NextResponse.json({ ok: true, message: "No pending accounts to approve.", approvedCount: 0 });
  }

  await prisma.account.updateMany({
    where: { status: "PENDING" },
    data: {
      status: "APPROVED",
      approvedAt: new Date(),
    },
  });

  const emailResults = await Promise.allSettled(
    pendingAccounts.map((account) => sendAccountApprovedEmail({ ...account, status: "APPROVED" })),
  );
  const failedEmailCount = emailResults.filter((result) => result.status === "rejected" || result.value === false).length;

  if (failedEmailCount > 0) {
    console.error("Bulk account approval welcome email failures", { failedEmailCount });
  }

  return NextResponse.json({
    ok: true,
    message: `${pendingAccounts.length} pending account${pendingAccounts.length === 1 ? "" : "s"} approved.`,
    approvedCount: pendingAccounts.length,
    failedEmailCount,
  });
}
