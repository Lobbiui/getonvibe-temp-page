import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { eventSchema } from "@/lib/dashboard-validation";
import { sendNewEventAnnouncementEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const body = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the event fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const event = await prisma.event.create({
    data: {
      title: parsed.data.title,
      city: parsed.data.city,
      venue: parsed.data.venue,
      address: parsed.data.address,
      startsAt: new Date(parsed.data.startsAt),
      endsAt: parsed.data.endsAt ? new Date(parsed.data.endsAt) : null,
      description: parsed.data.description,
      isPublished: parsed.data.isPublished,
    },
  });

  let notifiedCount = 0;

  if (event.isPublished) {
    const accounts = await prisma.account.findMany({
      where: { status: { not: "SUSPENDED" } },
      orderBy: { createdAt: "desc" },
    });

    const results = await Promise.allSettled(
      accounts.map((account) => sendNewEventAnnouncementEmail(account, event)),
    );

    notifiedCount = results.filter((result) => result.status === "fulfilled" && result.value).length;

    const failedCount = results.length - notifiedCount;

    if (failedCount > 0) {
      console.error("New event notification failures", `${failedCount} notification emails failed`);
    }
  }

  return NextResponse.json({
    ok: true,
    message: event.isPublished
      ? `Event posted. Notification email queued for ${notifiedCount} account${notifiedCount === 1 ? "" : "s"}.`
      : "Event saved as unpublished.",
    eventId: event.id,
    notifiedCount,
  });
}
