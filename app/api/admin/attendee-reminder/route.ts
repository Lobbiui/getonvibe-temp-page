import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-guard";
import { sendOctober3AttendeeReminderFromHistory } from "@/lib/resend";

export const runtime = "nodejs";

const reminderRequestSchema = z.object({
  dryRun: z.boolean().default(true),
});

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const body = await request.json().catch(() => null);
  const parsed = reminderRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Submit a valid reminder request." }, { status: 400 });
  }

  try {
    const result = await sendOctober3AttendeeReminderFromHistory(parsed.data.dryRun);

    return NextResponse.json({
      ...result,
      message: parsed.data.dryRun
        ? "Attendee reminder preview complete. No emails were sent."
        : `Attendee reminder queued for ${result.sentCount} recipient${result.sentCount === 1 ? "" : "s"}.`,
    });
  } catch (error) {
    console.error(
      "October 3 attendee reminder failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      { ok: false, message: "The attendee reminder could not be processed." },
      { status: 500 },
    );
  }
}
