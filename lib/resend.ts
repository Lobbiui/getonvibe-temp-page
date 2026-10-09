import { AccountRole, InterestStatus, MessageAudience, VendorType } from "@prisma/client";
import type { ModelRelease } from "@prisma/client";
import { Resend } from "resend";
import { buildModelReleasePdf } from "@/lib/model-release";
import type { SignupPayload, SubmissionType } from "@/lib/validation";
import type { PlatformLeadPayload } from "@/lib/platform-preregistration";
import type { ContactInquiryPayload } from "@/lib/contact-inquiry";
import { contactInquiryLabels } from "@/lib/contact-inquiry";
import { audienceInterestLabels, creatorOpportunityLabels } from "@/lib/platform-preregistration";
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

  if (type === "creator") {
    return "ONVIBE lead: creator co-promotion";
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

export function getDashboardNotifyRecipients() {
  return getNotifyRecipients();
}

function resendSendFailed(result: ResendSendResult) {
  return Boolean(result.error);
}

function formatResendError(error: unknown) {
  if (!error) {
    return "Unknown error";
  }

  if (error instanceof Error) {
    return error.message;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
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

function renderPlainEmail(title: string, body: string) {
  return `
    <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
      <h1 style="margin:0 0 12px;font-size:24px;">${htmlEscape(title)}</h1>
      ${body
        .split("\n")
        .filter(Boolean)
        .map((line) => `<p style="color:#cbd5e1;line-height:1.6;">${htmlEscape(line)}</p>`)
        .join("")}
    </div>
  `;
}

export type DashboardAccountEmail = {
  id: string;
  role: AccountRole;
  status: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  instagram: string | null;
  businessName: string | null;
  vendorType: VendorType | null;
};

export type DashboardEventEmail = {
  id: string;
  title: string;
  city: string;
  venue: string | null;
  address: string | null;
  startsAt: Date;
};

export async function sendDashboardInternalEmail(subject: string, html: string) {
  const resend = getResendClient();
  const from = getInternalFromEmail();
  const recipients = getNotifyRecipients();

  if (!resend || !from || recipients.length === 0) {
    console.warn("Dashboard internal email skipped because email configuration is incomplete.");
    return false;
  }

  const results = await Promise.allSettled(
    recipients.map((recipient) =>
      resend.emails.send({
        from,
        to: recipient,
        subject,
        html,
      }),
    ),
  );

  const failed = results.filter((result) => result.status === "rejected" || resendSendFailed(result.value)).length;

  if (failed > 0) {
    console.error("Dashboard internal email failed", {
      failedRecipientCount: failed,
      totalRecipientCount: recipients.length,
    });
  }

  return failed === 0;
}

export async function sendContactInquiryEmail(payload: ContactInquiryPayload) {
  const resend = getResendClient();
  const from = getInternalFromEmail();
  const recipients = getNotifyRecipients();

  if (!resend || !from || recipients.length === 0) {
    console.warn("Contact inquiry email skipped because email configuration is incomplete.");
    return false;
  }

  const topic = contactInquiryLabels[payload.inquiryType];
  const result = await resend.emails.send({
    from,
    to: recipients,
    replyTo: payload.email,
    subject: `GetOnVibe contact: ${topic}`,
    html: `
      <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
        <h1 style="margin:0 0 12px;font-size:24px;">New GetOnVibe contact inquiry</h1>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;background:#0f172a;border:1px solid #1f2937;">
          <tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#cbd5e1;">Name</th><td style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#f8fafc;">${htmlEscape(payload.name)}</td></tr>
          <tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#cbd5e1;">Email</th><td style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#f8fafc;">${htmlEscape(payload.email)}</td></tr>
          <tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#cbd5e1;">Topic</th><td style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#f8fafc;">${htmlEscape(topic)}</td></tr>
          <tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#cbd5e1;">Organization</th><td style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#f8fafc;">${htmlEscape(payload.organization || "Not provided")}</td></tr>
          <tr><th align="left" style="padding:8px 12px;color:#cbd5e1;">Website</th><td style="padding:8px 12px;color:#f8fafc;">${htmlEscape(payload.website || "Not provided")}</td></tr>
        </table>
        <h2 style="margin:24px 0 8px;font-size:18px;">Message</h2>
        <p style="color:#cbd5e1;line-height:1.7;white-space:pre-wrap;">${htmlEscape(payload.message)}</p>
      </div>
    `,
  });

  if (resendSendFailed(result)) {
    console.error("Contact inquiry email failed", { reason: formatResendError(result.error) });
    return false;
  }

  return true;
}

export async function sendAccountRegisteredEmail(account: DashboardAccountEmail) {
  await sendDashboardInternalEmail(
    `New ONVIBE ${account.role.toLowerCase()} account registered`,
    `
      <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
        <h1 style="margin:0 0 12px;font-size:24px;">New account registration</h1>
        <p style="color:#cbd5e1;line-height:1.6;">A ${htmlEscape(account.role.toLowerCase())} account was registered and auto-approved.</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;background:#0f172a;border:1px solid #1f2937;">
          <tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#cbd5e1;">Name</th><td style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#f8fafc;">${htmlEscape(account.name)}</td></tr>
          <tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#cbd5e1;">Email</th><td style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#f8fafc;">${htmlEscape(account.email)}</td></tr>
          <tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#cbd5e1;">Phone</th><td style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#f8fafc;">${htmlEscape(account.phone || "")}</td></tr>
          <tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#cbd5e1;">City</th><td style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#f8fafc;">${htmlEscape(account.city || "")}</td></tr>
          <tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#cbd5e1;">Business</th><td style="padding:8px 12px;border-bottom:1px solid #1f2937;color:#f8fafc;">${htmlEscape(account.businessName || "")}</td></tr>
          <tr><th align="left" style="padding:8px 12px;color:#cbd5e1;">Vendor Type</th><td style="padding:8px 12px;color:#f8fafc;">${htmlEscape(account.vendorType || "")}</td></tr>
        </table>
      </div>
    `,
  );
}

function buildNewEventAnnouncementEmail(account: DashboardAccountEmail, event: DashboardEventEmail, from: string) {
  const roleCopy =
    account.role === "VENDOR" && account.vendorType === "BRAND"
      ? "A new ONVIBE event is posted in your dashboard. Log in to request a booth, table display, or managed brand activation for this stop."
      : {
          ATTENDEE: "A new ONVIBE event is posted in your dashboard. Log in to mark your intent to attend and watch for updates.",
          MODEL: "A new ONVIBE event is posted in your dashboard. Log in to let the team know if you want to be considered for this date.",
          VENDOR: "A new ONVIBE event is posted in your dashboard. Log in to request vending interest for this stop.",
        }[account.role];

  return {
    from,
    to: account.email,
    subject: `New ONVIBE event posted: ${event.title}`,
    html: renderPlainEmail(
      "New ONVIBE event posted",
      `${roleCopy}\nEvent: ${event.title}\nLocation: ${event.venue || "Venue TBA"} ${event.address || event.city}\nDate: ${event.startsAt.toLocaleString("en-US", { timeZone: "America/Chicago" })}\nDashboard: ${process.env.NEXT_PUBLIC_SITE_URL || "https://www.getonvibe.com"}/dashboard`,
    ),
    tags: [
      { name: "message_type", value: "event_announcement" },
      { name: "event_id", value: event.id },
    ],
  };
}

export async function sendNewEventAnnouncementEmail(account: DashboardAccountEmail, event: DashboardEventEmail) {
  const resend = getResendClient();
  const from = getInternalFromEmail();

  if (!resend || !from) {
    return false;
  }

  const result = await resend.emails.send(buildNewEventAnnouncementEmail(account, event, from));

  return !resendSendFailed(result);
}

export async function sendNewEventAnnouncementBatch(accounts: DashboardAccountEmail[], event: DashboardEventEmail) {
  const resend = getResendClient();
  const from = getInternalFromEmail();

  if (accounts.length === 0) {
    return { sentCount: 0, failedCount: 0, failureReasons: [] };
  }

  if (!resend || !from) {
    return { sentCount: 0, failedCount: accounts.length, failureReasons: ["Email configuration is incomplete."] };
  }

  const result = await resend.batch.send(
    accounts.map((account) => buildNewEventAnnouncementEmail(account, event, from)),
    { batchValidation: "permissive" },
  );

  if (result.error) {
    console.error("New event batch notification failed", {
      code: result.error.name,
      statusCode: result.error.statusCode,
      recipientCount: accounts.length,
    });
    return {
      sentCount: 0,
      failedCount: accounts.length,
      failureReasons: [`${result.error.name} (${result.error.statusCode || "unknown status"})`],
    };
  }

  const failedCount = result.data.errors?.length || 0;
  const failureReasonCounts = new Map<string, number>();

  for (const error of result.data.errors || []) {
    const safeMessage = error.message.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]");
    failureReasonCounts.set(safeMessage, (failureReasonCounts.get(safeMessage) || 0) + 1);
  }

  if (failedCount > 0) {
    console.error("New event batch notification validation failures", {
      failedRecipientCount: failedCount,
      recipientCount: accounts.length,
    });
  }

  return {
    sentCount: result.data.data.length,
    failedCount,
    failureReasons: Array.from(failureReasonCounts, ([message, count]) => `${message} (${count})`),
  };
}

const october3ReminderSubject = "Tomorrow: Free GetOnVibe Halloween Car Wash in Old Hickory";
const attendeeConfirmationSubject = "You are on the ONVIBE Events list";

async function listAllOutboundEmails(resend: Resend) {
  const emails: Array<{ id: string; subject: string; to: string[] }> = [];
  let after: string | undefined;

  for (let page = 0; page < 100; page += 1) {
    const result = await resend.emails.list({ limit: 100, ...(after ? { after } : {}) });

    if (result.error) {
      throw new Error(`Resend email history lookup failed: ${result.error.name}`);
    }

    emails.push(...result.data.data);

    if (!result.data.has_more || result.data.data.length === 0) {
      break;
    }

    after = result.data.data.at(-1)?.id;
  }

  return emails;
}

export async function sendOctober3AttendeeReminderFromHistory(dryRun: boolean) {
  const resend = getResendClient();
  const historyResend = process.env.RESEND_READ_API_KEY
    ? new Resend(process.env.RESEND_READ_API_KEY)
    : resend;
  const from = getInternalFromEmail();

  if (!resend || !historyResend || !from) {
    return {
      ok: false,
      candidateCount: 0,
      alreadySentCount: 0,
      attemptedCount: 0,
      sentCount: 0,
      failedCount: 0,
      error: "Email configuration is incomplete.",
    };
  }

  const history = await listAllOutboundEmails(historyResend);
  const candidates = new Set(
    history
      .filter((email) => email.subject === attendeeConfirmationSubject)
      .flatMap((email) => email.to)
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
  const alreadySent = new Set(
    history
      .filter((email) => email.subject === october3ReminderSubject)
      .flatMap((email) => email.to)
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
  const recipients = Array.from(candidates).filter((email) => !alreadySent.has(email));

  if (dryRun || recipients.length === 0) {
    return {
      ok: true,
      candidateCount: candidates.size,
      alreadySentCount: alreadySent.size,
      attemptedCount: recipients.length,
      sentCount: 0,
      failedCount: 0,
    };
  }

  let sentCount = 0;
  let failedCount = 0;

  for (let offset = 0; offset < recipients.length; offset += 100) {
    const batch = recipients.slice(offset, offset + 100);
    const result = await resend.batch.send(
      batch.map((email) => ({
        from,
        to: email,
        replyTo: "support@getonvibe.com",
        subject: october3ReminderSubject,
        html: renderPlainEmail(
          "The GetOnVibe event is tomorrow",
          "Join us Saturday, October 3 from 12PM to 3PM for the GetOnVibe Costume-Kini Halloween event.\n\nLocation: 14665-D Lebanon Rd, Old Hickory, TN 37138\n\nThe event is free to attend and includes a free exterior car wash, food vendors, onsite brands, music, Dunk the Chef, and community. Everyone is welcome.\n\nEvent details: https://www.getonvibe.com",
        ),
        tags: [
          { name: "message_type", value: "attendee_reminder" },
          { name: "event_date", value: "2026_10_03" },
        ],
      })),
      { batchValidation: "permissive" },
    );

    if (result.error) {
      console.error("October 3 attendee reminder batch failed", {
        code: result.error.name,
        statusCode: result.error.statusCode,
        recipientCount: batch.length,
      });
      failedCount += batch.length;
      continue;
    }

    sentCount += result.data.data.length;
    failedCount += result.data.errors?.length || 0;
  }

  return {
    ok: failedCount === 0,
    candidateCount: candidates.size,
    alreadySentCount: alreadySent.size,
    attemptedCount: recipients.length,
    sentCount,
    failedCount,
  };
}

export async function getRecentEventAnnouncementRecipients(eventTitle: string, since: Date) {
  const resend = getResendClient();

  if (!resend) {
    return new Set<string>();
  }

  const result = await resend.emails.list({ limit: 100 });

  if (result.error) {
    console.error("Recent event notification lookup failed", {
      code: result.error.name,
      statusCode: result.error.statusCode,
    });
    return new Set<string>();
  }

  const subject = `New ONVIBE event posted: ${eventTitle}`;
  const recipients = result.data.data
    .filter((email) => email.subject === subject && new Date(email.created_at) >= since)
    .flatMap((email) => email.to.map((recipient) => recipient.toLowerCase()));

  return new Set(recipients);
}

export async function sendAccountApprovedEmail(account: DashboardAccountEmail) {
  const resend = getResendClient();
  const from = getInternalFromEmail();

  if (!resend || !from) {
    return false;
  }

  const result = await resend.emails.send({
    from,
    to: account.email,
    subject: "Your ONVIBE account was approved",
    html: renderPlainEmail(
      "Your ONVIBE account was approved",
      "Welcome to ONVIBE Events. Your ONVIBE account has been approved.\nYou can now log in, view upcoming event dates, show interest in opportunities that fit you, and track updates from the ONVIBE team.\nDashboard: https://www.getonvibe.com/login",
    ),
  });

  return !resendSendFailed(result);
}

export async function sendPasswordResetEmail(account: DashboardAccountEmail, resetUrl: string) {
  const resend = getResendClient();
  const from = getInternalFromEmail();

  if (!resend || !from) {
    return false;
  }

  const result = await resend.emails.send({
    from,
    to: account.email,
    subject: "Reset your ONVIBE account password",
    html: renderPlainEmail(
      "Reset your ONVIBE account password",
      `We received a request to reset your ONVIBE account password.\nUse this secure link within 1 hour: ${resetUrl}\nIf you did not request this, you can ignore this email.`,
    ),
  });

  return !resendSendFailed(result);
}

export async function sendModelReleaseSignedEmail(account: DashboardAccountEmail, release: ModelRelease) {
  const resend = getResendClient();
  const from = getInternalFromEmail();
  const recipients = getNotifyRecipients();

  if (!resend || !from || recipients.length === 0) {
    console.warn("Model release notification skipped because email configuration is incomplete.");
    return false;
  }

  const pdf = buildModelReleasePdf({ ...release, account });
  const signedAt = release.signedAt.toLocaleString("en-US", { timeZone: "America/Chicago" });
  const results = await Promise.allSettled(
    recipients.map((recipient) =>
      resend.emails.send({
        from,
        to: recipient,
        subject: `Signed model release: ${account.name}`,
        html: renderPlainEmail(
          "Signed model release received",
          `A model release has been signed and saved.\nName: ${release.legalName}\nAccount email: ${account.email}\nPhone: ${release.phone}\nSigned at: ${signedAt} Central Time\nRelease version: ${release.agreementVersion}`,
        ),
        attachments: [
          {
            filename: `onvibe-model-release-${release.id}.pdf`,
            content: pdf.toString("base64"),
          },
        ],
      }),
    ),
  );

  const failed = results.filter((result) => result.status === "rejected" || resendSendFailed(result.value)).length;

  if (failed > 0) {
    console.error("Model release notification failed", {
      failedRecipientCount: failed,
      totalRecipientCount: recipients.length,
    });
  }

  return failed === 0;
}

export async function sendEventInterestEmail(account: DashboardAccountEmail, event: DashboardEventEmail) {
  const actionByRole =
    account.role === "VENDOR" && account.vendorType === "BRAND"
      ? "requested a brand booth or display for"
      : {
          ATTENDEE: "marked intent to attend",
          MODEL: "wants to join the Bikini Team for",
          VENDOR: "requested to vend at",
        }[account.role];

  await sendDashboardInternalEmail(
    `[ACTION REQUIRED] ${account.name} ${actionByRole} ${event.title}`,
    renderPlainEmail(
      "New event response",
      `${account.name} ${actionByRole} ${event.title}.\nRole: ${account.role.toLowerCase()}\nVendor type: ${account.vendorType || ""}\nEmail: ${account.email}\nEvent: ${event.title}\nLocation: ${event.venue || ""} ${event.address || ""}\nDate: ${event.startsAt.toLocaleString("en-US", { timeZone: "America/Chicago" })}`,
    ),
  );
}

export async function sendSelectedForEventEmail(account: DashboardAccountEmail, event: DashboardEventEmail) {
  const resend = getResendClient();
  const from = getInternalFromEmail();

  if (!resend || !from) {
    return false;
  }

  const result = await resend.emails.send({
    from,
    to: account.email,
    subject: `You are confirmed for ${event.title}`,
    html: renderPlainEmail(
      "You are confirmed",
      `You are confirmed for ${event.title}.\nPlease log in to your dashboard to review the event details and confirm your availability.\nIf you cannot make it, use the Can't Make It button as soon as possible. Please let us know at least one week in advance so we have time to fill the spot.`,
    ),
  });

  return !resendSendFailed(result);
}

export async function sendCantMakeEventEmail(account: DashboardAccountEmail, event: DashboardEventEmail) {
  await sendDashboardInternalEmail(
    `[ACTION REQUIRED] ${account.name} cannot make ${event.title}`,
    renderPlainEmail(
      "Confirmed participant cannot make it",
      `${account.name} marked that they cannot make ${event.title}.\nRole: ${account.role.toLowerCase()}\nEmail: ${account.email}\nEvent date: ${event.startsAt.toLocaleString("en-US", { timeZone: "America/Chicago" })}`,
    ),
  );
}

export async function sendAdminMessageEmail(account: DashboardAccountEmail, subject: string, body: string) {
  const resend = getResendClient();
  const from = getInternalFromEmail();

  if (!resend || !from) {
    return false;
  }

  try {
    const result = await resend.emails.send({
      from,
      to: account.email,
      subject,
      html: renderPlainEmail(subject, body),
    });

    if (resendSendFailed(result)) {
      console.error("Admin message email failed", {
        reason: formatResendError(result.error),
      });
    }

    return !resendSendFailed(result);
  } catch (error) {
    console.error("Admin message email failed", {
      reason: error instanceof Error ? error.message : "Unknown error",
    });

    return false;
  }
}

export function audienceMatchesAccount(audience: MessageAudience, account: DashboardAccountEmail, interestStatus?: InterestStatus) {
  if (audience === "ALL") {
    return true;
  }

  if (audience === "ATTENDEES") {
    return account.role === "ATTENDEE";
  }

  if (audience === "MODELS") {
    return account.role === "MODEL";
  }

  if (audience === "VENDORS") {
    return account.role === "VENDOR";
  }

  if (audience === "INTERESTED") {
    return interestStatus === "INTERESTED";
  }

  return interestStatus === "SELECTED";
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
      subject: "Your ONVIBE model signup is in",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your model signup is in</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for joining the ONVIBE model list for event activations, carwash teams, photo moments, and future promotional events.</p>
          <p style="color:#cbd5e1;line-height:1.6;">Dashboard accounts are approved immediately. Create an account or log in at www.getonvibe.com/login to see upcoming events, mark interest, sign the model release, and track confirmations.</p>
          <p style="color:#cbd5e1;line-height:1.6;">Event participation is confirmed separately by the ONVIBE team based on the needs of each event.</p>
        </div>
      `,
    };
  }

  if (payload.type === "brand-vendor") {
    return {
      subject: "Your ONVIBE brand signup is in",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your brand signup is in</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for joining the ONVIBE brand list for vendor spots, sponsorships, giveaways, and onsite activation opportunities.</p>
          <p style="color:#cbd5e1;line-height:1.6;">Dashboard accounts are approved immediately. Create an account or log in at www.getonvibe.com/login to see upcoming events, mark interest, and track confirmations.</p>
          <p style="color:#cbd5e1;line-height:1.6;">Brand placement and compliance details are confirmed separately by the ONVIBE team for each event.</p>
        </div>
      `,
    };
  }

  if (payload.type === "food-vendor") {
    return {
      subject: "Your ONVIBE food vendor signup is in",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your food vendor signup is in</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for joining the ONVIBE food vendor list for current and future tour stops.</p>
          <p style="color:#cbd5e1;line-height:1.6;">Dashboard accounts are approved immediately. Create an account or log in at www.getonvibe.com/login to see upcoming events, mark interest, and track confirmations.</p>
          <p style="color:#cbd5e1;line-height:1.6;">Food vendor placement is confirmed separately by the ONVIBE team for each event.</p>
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

  if (payload.type === "creator") {
    return {
      subject: "Your ONVIBE creator inquiry was received",
      html: `
        <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
          <h1 style="margin:0 0 12px;font-size:24px;">Your creator inquiry was received</h1>
          <p style="color:#cbd5e1;line-height:1.6;">Thank you for reaching out about attending an ONVIBE event as a content creator. Our team will review co-promotion fit and follow up with next steps.</p>
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

  const name = payload.type === "attendee" || payload.type === "model" || payload.type === "creator" ? payload.fullName : payload.contactName;
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

export async function sendPlatformLeadEmails(payload: PlatformLeadPayload) {
  const resend = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL;
  const internalFrom = getInternalFromEmail();
  const notifyRecipients = getNotifyRecipients();

  if (!resend || !from || !internalFrom) {
    return "skipped" as const;
  }

  const audience = payload.audienceInterests.map((interest) => audienceInterestLabels[interest]).join(", ");
  const opportunities = payload.creatorOpportunityInterests
    .map((interest) => creatorOpportunityLabels[interest])
    .join(", ");

  const internalBody = `
    <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
      <h1 style="margin:0 0 12px;font-size:24px;">New GetOnVibe early-access interest</h1>
      <p><strong>Name:</strong> ${htmlEscape(payload.name)}</p>
      <p><strong>Email:</strong> ${htmlEscape(payload.email)}</p>
      <p><strong>Audience interests:</strong> ${htmlEscape(audience)}</p>
      <p><strong>Creator opportunities:</strong> ${htmlEscape(opportunities || "None selected")}</p>
      <p><strong>Website:</strong> ${htmlEscape(payload.website || "Not provided")}</p>
      <p><strong>Source:</strong> ${htmlEscape(payload.source || "Direct")}</p>
    </div>
  `;

  const internalResults = await Promise.allSettled(
    notifyRecipients.map((recipient) =>
      resend.emails.send({
        from: internalFrom,
        to: recipient,
        replyTo: payload.email,
        subject: "New GetOnVibe early-access interest",
        html: internalBody,
      }),
    ),
  );

  const internalFailures = internalResults.filter(
    (result) => result.status === "rejected" || resendSendFailed(result.value),
  ).length;

  if (internalFailures > 0) {
    console.error("Platform lead notification failed", {
      failedRecipientCount: internalFailures,
      totalRecipientCount: notifyRecipients.length,
    });
  }

  const confirmation = await resend.emails.send({
    from,
    to: payload.email,
    subject: "You are on the GetOnVibe early-access list",
    html: `
      <div style="background:#020617;color:#f8fafc;font-family:Arial,sans-serif;padding:24px;">
        <h1 style="margin:0 0 12px;font-size:24px;">Find Your Vibe.</h1>
        <p style="color:#cbd5e1;line-height:1.6;">Thanks for joining the GetOnVibe early-access interest list.</p>
        <p style="color:#cbd5e1;line-height:1.6;">We recorded your interest in: ${htmlEscape(audience)}.</p>
        <p style="color:#cbd5e1;line-height:1.6;">This does not create an active platform account or guarantee selection for creator opportunities. We will contact you when the right onboarding path opens.</p>
      </div>
    `,
  });

  if (resendSendFailed(confirmation)) {
    throw new Error("Platform lead confirmation failed.");
  }

  return "sent" as const;
}
