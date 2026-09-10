import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { buildModelReleasePdf } from "@/lib/model-release";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ releaseId: string }> },
) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const { releaseId } = await params;
  const release = await prisma.modelRelease.findUnique({
    where: { id: releaseId },
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
