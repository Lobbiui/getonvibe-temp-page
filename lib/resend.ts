import { Resend } from "resend";
import type { SignupPayload, SubmissionType } from "@/lib/validation";
import { formatFieldLabel } from "@/lib/utils";

const audienceEnvByType: Partial<Record<SubmissionType, string>> = {
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

  if (type === "model") {
    return ["model", "event-activation"];
  }

  return [type];
}

function getInternalSubject(type: SubmissionType) {
  if (type === "hotel-partner") {
    return "ONVIBE lead: hotel partnership";
  }

  if (type === "store-host") {
    return "ONVIBE lead: store host";
  }

  return `ONVIBE lead: ${type}`;
}

function getOutboundInternalSubject(type: SubmissionType, subject: string) {
  if (type === "hotel-partner") {
    return subject;
  }

  return `[ACTION REQUIRED] ${subject}`;
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
    subject: getInternalSubject(payload.type),
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
  if (payload.type === "model") {
    return {
      subject: "Your ONVIBE model signup was received",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your model signup was received</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for applying for ONVIBE event activations. Our team will review event fit, availability, and next steps.</p>
          <p style="color:#cbd5e1;line-height:1.6;">Upcoming event opportunities, call times, location details, and participation requirements will be shared with selected applicants.</p>
        </div>
      `,
    };
  }

  if (payload.type === "brand-vendor") {
    return {
      subject: "ONVIBE brand activation inquiry received",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your brand activation inquiry was received</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for applying for ONVIBE event opportunities. Our team will review fit, availability, and compliance requirements, including legal hemp space alignment and current COA readiness for applicable products.</p>
          <p style="color:#cbd5e1;line-height:1.6;">Tour stop details and vendor next steps will be shared with selected applicants as details are finalized.</p>
        </div>
      `,
    };
  }

  if (payload.type === "food-vendor") {
    return {
      subject: "ONVIBE food vendor inquiry received",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your food vendor inquiry was received</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for applying for ONVIBE event opportunities. Our team will review availability and follow up with next steps for current and future tour stops.</p>
        </div>
      `,
    };
  }

  if (payload.type === "hotel-partner") {
    return {
      subject: "Your ONVIBE Festival hotel partnership inquiry was received",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your hotel partnership inquiry was received</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for submitting a hotel partnership inquiry for ONVIBE Festival. The ONVIBE team will review the opportunity and follow up with next steps.</p>
          <p style="color:#cbd5e1;line-height:1.6;">Venue, timing, lodging partnership details, and hospitality opportunities will be reviewed as planning continues.</p>
        </div>
      `,
    };
  }

  if (payload.type === "store-host") {
    return {
      subject: "Your ONVIBE store host inquiry was received",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your store host inquiry was received</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for submitting your store for the ONVIBE Tennessee Community Tour. Our team will review location fit, parking lot availability, and timing for future stops.</p>
          <p style="color:#cbd5e1;line-height:1.6;">If the location is a fit, we will follow up with next steps for event planning and requirements.</p>
        </div>
      `,
    };
  }

  return {
    subject: "You are on the ONVIBE Events list",
    html: `
      <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
        <h1 style="margin:0 0 12px;font-size:24px;">You are on the list</h1>
        <p style="color:#cbd5e1;line-height:1.6;">You are registered for ONVIBE event updates, tour stop announcements, and future community events.</p>
        <p style="color:#cbd5e1;line-height:1.6;">Age, entry, and participation requirements may vary by event. Valid ID may be required.</p>
      </div>
    `,
  };
}

export async function upsertAudienceContact(payload: SignupPayload) {
  const resend = getResendClient();
  const audienceEnv = audienceEnvByType[payload.type];
  const audienceId = audienceEnv ? process.env[audienceEnv] : undefined;

  if (!resend || !audienceId) {
    return;
  }

  const name = payload.type === "attendee" || payload.type === "model" ? payload.fullName : payload.contactName;
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
        subject: getOutboundInternalSubject(payload.type, internal.subject),
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
