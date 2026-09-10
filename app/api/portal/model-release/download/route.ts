import { NextResponse } from "next/server";
import { getAccountSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { buildModelReleasePdf } from "@/lib/model-release";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAccountSession();

  if (!session) {
    return NextResponse.json({ ok: false, message: "Log in to download your model release." }, { status: 401 });
  }

  const release = await prisma.modelRelease.findUnique({
    where: { accountId: session.accountId },
    include: { account: true },
  });

  if (!release) {
    return NextResponse.json({ ok: false, message: "No signed model release found." }, { status: 404 });
  }

  const pdf = buildModelReleasePdf(release);

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="onvibe-model-release-${release.id}.pdf"`,
    },
  });
}
