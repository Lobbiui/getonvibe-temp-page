import { Resend } from "resend";
import type { SignupPayload, SubmissionType } from "@/lib/validation";
import { formatFieldLabel } from "@/lib/utils";

const audienceEnvByType: Record<SubmissionType, string> = {
  attendee: "RESEND_ATTENDEE_AUDIENCE_ID",
  "brand-vendor": "RESEND_BRAND_VENDOR_AUDIENCE_ID",
  "food-vendor": "RESEND_FOOD_VENDOR_AUDIENCE_ID",
};

const requiredNotifyEmails = ["support@getonvibe.com", "office@lobbicore.com"];

type LeadEmailResult = {
  internalNotificationAttempted: boolean;
  internalNotificationSucceeded: boolean;
  confirmationSucceeded: boolean;
};

type ResendSendResult = Awaited<ReturnType<Resend["emails"]["send"]>>;

export function getLeadTags(type: SubmissionType) {
  if (type === "attendee") {
    return ["attendee", "app-launch"];
  }

  return [type];
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export function getEmailConfigStatus() {
  return {
    hasApiKey: Boolean(process.env.RESEND_API_KEY),
    hasFromEmail: Boolean(process.env.RESEND_FROM_EMAIL),
    hasInternalFromEmail: Boolean(getInternalFromEmail()),
    notifyRecipients: getNotifyRecipients(),
  };
}

function getNotifyRecipients() {
  const configuredRecipients = process.env.LEADS_NOTIFY_EMAIL
    ? process.env.LEADS_NOTIFY_EMAIL.split(/[;,]/)
    : [];

  return Array.from(
    new Set(
      [...requiredNotifyEmails, ...configuredRecipients]
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

function resendSendFailed(result: ResendSendResult) {
  return Boolean(result.error);
}

function getInternalFromEmail() {
  return process.env.RESEND_INTERNAL_FROM_EMAIL || process.env.RESEND_FROM_EMAIL;
}

function getReplyToEmail(payload: SignupPayload) {
  return payload.email;
}

function htmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderFields(payload: SignupPayload) {
  return Object.entries(payload)
    .filter(([key]) => key !== "company")
    .map(([key, value]) => {
      const printable = Array.isArray(value) ? value.join(", ") : String(value ?? "");
      return `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#cbd5e1;">${htmlEscape(
        formatFieldLabel(key),
      )}</th><td style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#f8fafc;">${htmlEscape(
        printable,
      )}</td></tr>`;
    })
    .join("");
}

export function buildInternalNotificationEmail(payload: SignupPayload) {
  const timestamp = new Date().toISOString();
  const tags = getLeadTags(payload.type).join(", ");

  return {
    subject: `ONVIBE lead: ${payload.type}`,
    html: `
      <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
        <h1 style="margin:0 0 12px;font-size:24px;">ONVIBE Festival Lead</h1>
        <p style="margin:0 0 16px;color:#cbd5e1;">Submission type: ${htmlEscape(payload.type)}</p>
        <p style="margin:0 0 16px;color:#cbd5e1;">Lead tags: ${htmlEscape(tags)}</p>
        <p style="margin:0 0 16px;color:#cbd5e1;">Timestamp: ${htmlEscape(timestamp)}</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;background:#0f172a;border:1px solid #1f2937;">
          ${renderFields(payload)}
        </table>
      </div>
    `,
  };
}

export function buildConfirmationEmail(payload: SignupPayload) {
  if (payload.type === "brand-vendor") {
    return {
      subject: "ONVIBE Festival brand vendor inquiry received",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your brand vendor inquiry was received</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for applying for ONVIBE Festival in Nashville. Our team will review fit, availability, and compliance requirements, including legal hemp space alignment and current COA readiness for applicable products.</p>
          <p style="color:#cbd5e1;line-height:1.6;">Venue, time, and vendor next steps will be shared with selected applicants as details are finalized.</p>
        </div>
      `,
    };
  }

  if (payload.type === "food-vendor") {
    return {
      subject: "ONVIBE Festival food vendor inquiry received",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your food vendor inquiry was received</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for applying for ONVIBE Festival in Nashville. Our team will review availability and follow up with next steps as the festival layout is finalized.</p>
        </div>
      `,
    };
  }

  return {
    subject: "You are on the ONVIBE Festival and GetOnVibe launch list",
    html: `
      <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
        <h1 style="margin:0 0 12px;font-size:24px;">You are on the list</h1>
        <p style="color:#cbd5e1;line-height:1.6;">You are registered for ONVIBE Festival updates and GetOnVibe launch communications. Venue, time, competition details, special guest judges, and launch announcements will go to the list first.</p>
        <p style="color:#cbd5e1;line-height:1.6;">ONVIBE Festival is a 21 plus event. Valid government-issued ID is required at entry.</p>
      </div>
    `,
  };
}

export async function upsertAudienceContact(payload: SignupPayload) {
  const resend = getResendClient();
  const audienceId = process.env[audienceEnvByType[payload.type]];

  if (!resend || !audienceId) {
    return;
  }

  const name = payload.type === "attendee" ? payload.fullName : payload.contactName;
  const properties = {
    lead_type: payload.type,
    lead_tags: getLeadTags(payload.type).join(","),
    source_page: payload.sourcePage || null,
  };

  try {
    await resend.contacts.create({
      audienceId,
      email: payload.email,
      firstName: name,
      unsubscribed: false,
      properties,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";

    if (message.includes("already") || message.includes("exists")) {
      await resend.contacts.update({
        audienceId,
        email: payload.email,
        firstName: name,
        unsubscribed: false,
        properties,
      });
      return;
    }

    throw error;
  }
}

export async function sendLeadEmails(payload: SignupPayload): Promise<LeadEmailResult> {
  const resend = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL;
  const internalFrom = getInternalFromEmail();
  const notifyRecipients = getNotifyRecipients();

  if (!resend || !from || !internalFrom) {
    throw new Error("Email configuration is incomplete.");
  }

  const internal = buildInternalNotificationEmail(payload);
  const confirmation = buildConfirmationEmail(payload);

  const internalResults = await Promise.allSettled(
    notifyRecipients.map((recipient) =>
      resend.emails.send({
        from: internalFrom,
        to: recipient,
        replyTo: getReplyToEmail(payload),
        subject: `[ACTION REQUIRED] ${internal.subject}`,
        html: internal.html,
      }),
    ),
  );

  const failedInternalCount = internalResults.filter((result) => {
    if (result.status === "rejected") {
      return true;
    }

    return resendSendFailed(result.value);
  }).length;

  if (failedInternalCount > 0) {
    console.error("Internal lead notification send failed", {
      submissionType: payload.type,
      failedRecipientCount: failedInternalCount,
      totalRecipientCount: notifyRecipients.length,
    });
  }

  const confirmationResult = await resend.emails.send({
    from,
    to: payload.email,
    bcc: notifyRecipients,
    subject: confirmation.subject,
    html: confirmation.html,
  });

  if (resendSendFailed(confirmationResult)) {
    throw new Error("Confirmation email send failed.");
  }

  try {
    await upsertAudienceContact(payload);
  } catch (error) {
    console.warn("Resend audience contact sync failed", error instanceof Error ? error.message : "Unknown error");
  }

  return {
    internalNotificationAttempted: notifyRecipients.length > 0,
    internalNotificationSucceeded: failedInternalCount === 0,
    confirmationSucceeded: true,
  };
}
