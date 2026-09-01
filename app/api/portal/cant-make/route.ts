import { NextResponse } from "next/server";
import { getAccountSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cantMakeSchema } from "@/lib/dashboard-validation";
import { sendCantMakeEventEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getAccountSession();

  if (!session) {
    return NextResponse.json({ ok: false, message: "Log in first." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = cantMakeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Select the event you cannot make." }, { status: 400 });
  }

  const interest = await prisma.eventInterest.findFirst({
    where: {
      id: parsed.data.interestId,
      accountId: session.accountId,
      status: "SELECTED",
    },
    include: {
      account: true,
      event: true,
    },
  });

  if (!interest) {
    return NextResponse.json({ ok: false, message: "Selected event was not found." }, { status: 404 });
  }

  await prisma.eventInterest.update({
    where: { id: interest.id },
    data: {
      status: "CANT_MAKE",
      cantMakeAt: new Date(),
      cantMakeNote: parsed.data.note,
    },
  });

  await sendCantMakeEventEmail(interest.account, interest.event).catch((error) => {
    console.error("Cannot make event notification failed", error instanceof Error ? error.message : "Unknown error");
  });

  return NextResponse.json({ ok: true, message: "Thanks for letting us know. Our team has been notified." });
}
