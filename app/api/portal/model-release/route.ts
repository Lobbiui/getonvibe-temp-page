import { AccountRole } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getAccountSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { modelReleaseSchema } from "@/lib/dashboard-validation";
import { modelReleaseAgreementText, modelReleaseVersion } from "@/lib/model-release";
import { sendModelReleaseSignedEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getAccountSession();

  if (!session) {
    return NextResponse.json({ ok: false, message: "Log in before signing the model release." }, { status: 401 });
  }

  const account = await prisma.account.findUnique({
    where: { id: session.accountId },
    include: { modelRelease: true },
  });

  if (!account || account.status === "SUSPENDED") {
    return NextResponse.json({ ok: false, message: "Account access is not available." }, { status: 403 });
  }

  if (account.role !== AccountRole.MODEL) {
    return NextResponse.json({ ok: false, message: "Model release signing is only available for model accounts." }, { status: 403 });
  }

  if (account.modelRelease) {
    return NextResponse.json({ ok: true, message: "Your model release is already signed." });
  }

  const body = await request.json().catch(() => null);
  const parsed = modelReleaseSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const headerStore = await headers();
  const ipAddress =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    null;

  const release = await prisma.modelRelease.create({
    data: {
      accountId: account.id,
      legalName: parsed.data.legalName,
      dateOfBirth: parsed.data.dateOfBirth,
      email: parsed.data.email,
      phone: parsed.data.phone,
      streetAddress: parsed.data.streetAddress,
      city: parsed.data.city,
      state: parsed.data.state,
      zip: parsed.data.zip,
      signature: parsed.data.signature,
      agreementText: modelReleaseAgreementText,
      agreementVersion: modelReleaseVersion,
      ipAddress,
      userAgent: headerStore.get("user-agent"),
    },
  });

  await sendModelReleaseSignedEmail(account, release).catch((error) => {
    console.error("Model release notification failed", error instanceof Error ? error.message : "Unknown error");
  });

  return NextResponse.json({
    ok: true,
    message: "Your model release has been signed and saved.",
  });
}
