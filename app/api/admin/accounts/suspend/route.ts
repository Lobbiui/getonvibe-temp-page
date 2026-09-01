import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { adminAccountActionSchema } from "@/lib/dashboard-validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const body = await request.json().catch(() => null);
  const parsed = adminAccountActionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Account is required." }, { status: 400 });
  }

  await prisma.account.update({
    where: { id: parsed.data.accountId },
    data: {
      status: "SUSPENDED",
    },
  });

  return NextResponse.json({ ok: true, message: "Account suspended." });
}
