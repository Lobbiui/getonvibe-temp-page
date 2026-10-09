import { LeadConfirmationStatus, type PlatformLead } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { platformLeadSchema } from "@/lib/platform-preregistration";
import { sendPlatformLeadEmails } from "@/lib/resend";

export const runtime = "nodejs";

function validationResponse(error: ZodError) {
  const fieldErrors = error.issues.reduce<Record<string, string>>((errors, issue) => {
    const field = issue.path.join(".");
    if (field && !errors[field]) errors[field] = issue.message;
    return errors;
  }, {});

  return NextResponse.json(
    { ok: false, message: "Please check the highlighted fields.", fieldErrors },
    { status: 400 },
  );
}

function mergeValues(current: string[], incoming: string[]) {
  return Array.from(new Set([...current, ...incoming]));
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Submit valid form data." }, { status: 400 });
  }

  const parsed = platformLeadSchema.safeParse(body);
  if (!parsed.success) return validationResponse(parsed.error);

  if (parsed.data.company) {
    return NextResponse.json({ ok: true, message: "You are on the interest list." });
  }

  const payload = parsed.data;
  const submittedAt = new Date();

  let lead: PlatformLead;

  try {
    lead = await prisma.$transaction(async (database) => {
      const existing = await database.platformLead.findUnique({ where: { email: payload.email } });

      if (existing) {
        return database.platformLead.update({
          where: { id: existing.id },
          data: {
            name: payload.name,
            audienceInterests: mergeValues(existing.audienceInterests, payload.audienceInterests),
            creatorOpportunityInterests: mergeValues(
              existing.creatorOpportunityInterests,
              payload.creatorOpportunityInterests,
            ),
            website: payload.website || existing.website,
            sourceLatest: payload.source || existing.sourceLatest,
            consentAt: submittedAt,
            confirmationStatus: LeadConfirmationStatus.PENDING,
            confirmationError: null,
            lastSubmittedAt: submittedAt,
          },
        });
      }

      return database.platformLead.create({
        data: {
          name: payload.name,
          email: payload.email,
          audienceInterests: payload.audienceInterests,
          creatorOpportunityInterests: payload.creatorOpportunityInterests,
          website: payload.website || null,
          sourceFirst: payload.source || null,
          sourceLatest: payload.source || null,
          consentAt: submittedAt,
          lastSubmittedAt: submittedAt,
        },
      });
    });
  } catch {
    console.error("Platform preregistration could not be saved.");
    return NextResponse.json(
      { ok: false, message: "We could not save your interest right now. Please try again shortly." },
      { status: 503 },
    );
  }

  try {
    const emailStatus = await sendPlatformLeadEmails(payload);
    try {
      await prisma.platformLead.update({
        where: { id: lead.id },
        data: {
          confirmationStatus:
            emailStatus === "sent" ? LeadConfirmationStatus.SENT : LeadConfirmationStatus.SKIPPED,
        },
      });
    } catch {
      console.error("Platform lead confirmation status could not be updated", { leadId: lead.id });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 500) : "Email delivery failed.";
    try {
      await prisma.platformLead.update({
        where: { id: lead.id },
        data: { confirmationStatus: LeadConfirmationStatus.FAILED, confirmationError: message },
      });
    } catch {
      console.error("Platform lead email failure status could not be updated", { leadId: lead.id });
    }
    console.error("Platform lead email delivery failed", { leadId: lead.id });
  }

  return NextResponse.json({
    ok: true,
    message: "You are on the GetOnVibe early-access interest list.",
  });
}
