import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { adminSelectSchema } from "@/lib/dashboard-validation";
import { sendSelectedForEventEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const body = await request.json().catch(() => null);
  const parsed = adminSelectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Interest is required." }, { status: 400 });
  }

  const interest = await prisma.eventInterest.update({
    where: { id: parsed.data.interestId },
    data: {
      status: "SELECTED",
      selectedAt: new Date(),
    },
    include: {
      account: true,
      event: true,
    },
  });

  await sendSelectedForEventEmail(interest.account, interest.event).catch((error) => {
    console.error("Selected for event email failed", error instanceof Error ? error.message : "Unknown error");
  });

  return NextResponse.json({ ok: true, message: "Participant selected and notified." });
}
