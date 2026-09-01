import { NextResponse } from "next/server";
import { getAccountSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { interestSchema } from "@/lib/dashboard-validation";
import { sendEventInterestEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getAccountSession();

  if (!session) {
    return NextResponse.json({ ok: false, message: "Log in first." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = interestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Choose an event." }, { status: 400 });
  }

  const account = await prisma.account.findUnique({ where: { id: session.accountId } });

  if (!account || account.status === "SUSPENDED") {
    return NextResponse.json({ ok: false, message: "This account is not active." }, { status: 403 });
  }

  const event = await prisma.event.findFirst({
    where: { id: parsed.data.eventId, isPublished: true },
  });

  if (!event) {
    return NextResponse.json({ ok: false, message: "Event was not found." }, { status: 404 });
  }

  const interest = await prisma.eventInterest.upsert({
    where: {
      accountId_eventId: {
        accountId: account.id,
        eventId: event.id,
      },
    },
    update: {
      status: "INTERESTED",
      note: parsed.data.note,
      cantMakeAt: null,
      cantMakeNote: null,
    },
    create: {
      accountId: account.id,
      eventId: event.id,
      note: parsed.data.note,
    },
  });

  await sendEventInterestEmail(account, event).catch((error) => {
    console.error("Event interest notification failed", error instanceof Error ? error.message : "Unknown error");
  });

  const messageByRole = {
    ATTENDEE: "Your intent to attend was sent.",
    MODEL: "Your interest in joining this event was sent.",
    VENDOR: "Your vendor interest was sent.",
  } as const;

  return NextResponse.json({ ok: true, message: messageByRole[account.role], interestId: interest.id });
}
