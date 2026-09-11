import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { sendAdminMessageEmail } from "@/lib/resend";

export const runtime = "nodejs";

const subject = "Your GetOnVibe account is active";
const body = `Hi,

Your GetOnVibe account is active and ready to use.

Please log in here:
https://www.getonvibe.com/login

Once you are logged in, your dashboard lets you view upcoming ONVIBE Community Tour events, mark interest in the events you want to attend or participate in, and track updates from our team.

For Bikini Team model accounts, please also sign the model release form inside your dashboard before participating in an event.

If you have any trouble logging in or using your dashboard, reply to this email or contact office@lobbicore.com.

Thank you,
GetOnVibe Team`;

export async function POST() {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const [totalAccounts, approvedAccounts, pendingAccounts, suspendedAccounts, recipients] = await Promise.all([
    prisma.account.count(),
    prisma.account.count({ where: { status: "APPROVED" } }),
    prisma.account.count({ where: { status: "PENDING" } }),
    prisma.account.count({ where: { status: "SUSPENDED" } }),
    prisma.account.findMany({
      where: { status: { not: "SUSPENDED" } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const results = await Promise.allSettled(
    recipients.map(async (account) => {
      const sent = await sendAdminMessageEmail(account, subject, body);

      await prisma.messageLog.create({
        data: {
          accountId: account.id,
          audience: "ALL",
          subject,
          body,
          sentTo: account.email,
        },
      });

      return sent;
    }),
  );

  const sentCount = results.filter((result) => result.status === "fulfilled" && result.value).length;
  const failedCount = results.length - sentCount;

  if (failedCount > 0) {
    console.error("Active account notice email failures", { failedCount });
  }

  return NextResponse.json({
    ok: true,
    message: `Active account notice sent to ${sentCount} account${sentCount === 1 ? "" : "s"}.`,
    counts: {
      totalAccounts,
      approvedAccounts,
      pendingAccounts,
      suspendedAccounts,
      eligibleRecipients: recipients.length,
      sentCount,
      failedCount,
    },
  });
}
