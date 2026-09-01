import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { adminMessageSchema } from "@/lib/dashboard-validation";
import { audienceMatchesAccount, sendAdminMessageEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const body = await request.json().catch(() => null);
  const parsed = adminMessageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the message fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const accounts = await prisma.account.findMany({
    where: {
      status: "APPROVED",
      ...(data.accountId ? { id: data.accountId } : {}),
    },
    include: {
      interests: data.eventId
        ? {
            where: { eventId: data.eventId },
          }
        : false,
    },
    orderBy: { createdAt: "desc" },
  });

  const recipients = accounts.filter((account) =>
    audienceMatchesAccount(data.audience, account, account.interests?.[0]?.status),
  );

  const results = await Promise.allSettled(
    recipients.map(async (account) => {
      const sent = await sendAdminMessageEmail(account, data.subject, data.body);

      await prisma.messageLog.create({
        data: {
          accountId: account.id,
          eventId: data.eventId || null,
          audience: data.audience,
          subject: data.subject,
          body: data.body,
          sentTo: account.email,
        },
      });

      return sent;
    }),
  );

  const sentCount = results.filter((result) => result.status === "fulfilled" && result.value).length;

  return NextResponse.json({
    ok: true,
    message: `Message queued for ${sentCount} recipient${sentCount === 1 ? "" : "s"}.`,
    sentCount,
  });
}
