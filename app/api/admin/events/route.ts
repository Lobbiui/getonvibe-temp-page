import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { eventSchema } from "@/lib/dashboard-validation";

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

  return NextResponse.json({ ok: true, message: "Event posted.", eventId: event.id });
}
