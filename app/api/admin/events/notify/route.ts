import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { eventNotificationSchema } from "@/lib/dashboard-validation";
import { prisma } from "@/lib/db";
import {
  getRecentEventAnnouncementRecipients,
  sendNewEventAnnouncementBatch,
} from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const body = await request.json().catch(() => null);
  const parsed = eventNotificationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Choose an event to notify." },
      { status: 400 },
    );
  }

  const event = await prisma.event.findUnique({ where: { id: parsed.data.eventId } });

  if (!event) {
    return NextResponse.json({ ok: false, message: "Event was not found." }, { status: 404 });
  }

  const accounts = await prisma.account.findMany({
    where: { status: { not: "SUSPENDED" } },
    orderBy: { createdAt: "desc" },
  });

  const recentlyNotified = parsed.data.excludeRecent
    ? await getRecentEventAnnouncementRecipients(
        event.title,
        new Date(event.createdAt.getTime() - 60_000),
      )
    : new Set<string>();

  const recipients = accounts.filter(
    (account) => !recentlyNotified.has(account.email.toLowerCase()),
  );
  const result = await sendNewEventAnnouncementBatch(recipients, event);

  return NextResponse.json({
    ok: result.failedCount === 0,
    message:
      result.failedCount === 0
        ? `Event notification queued for ${result.sentCount} remaining account${result.sentCount === 1 ? "" : "s"}.`
        : `${result.sentCount} event notifications queued; ${result.failedCount} failed.`,
    totalAccountCount: accounts.length,
    alreadyNotifiedCount: recentlyNotified.size,
    attemptedCount: recipients.length,
    sentCount: result.sentCount,
    failedCount: result.failedCount,
  });
}
