"use client";

import { useState, type FormEvent } from "react";

type PortalAccount = {
  id: string;
  role: string;
  status: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  vendorType: string | null;
  modelRelease: {
    id: string;
    signedAt: string;
    agreementVersion: string;
  } | null;
};

type PortalEvent = {
  id: string;
  title: string;
  venue: string | null;
  address: string | null;
  city: string;
  startsAt: string;
  description: string | null;
  interest?: {
    id: string;
    status: string;
    note: string | null;
  } | null;
};

export function PortalDashboard({ account, events }: { account: PortalAccount; events: PortalEvent[] }) {
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState("");

  const roleContent = getRoleContent(account.role, account.vendorType);

  async function showInterest(eventId: string) {
    setBusyId(eventId);
    setMessage("");
    const response = await fetch("/api/portal/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
    });
    const result = await response.json();
    setMessage(result.message || "Updated.");
    setBusyId("");

    if (result.ok) {
      window.location.reload();
    }
  }

  async function cantMake(interestId: string) {
    setBusyId(interestId);
    setMessage("");
    const response = await fetch("/api/portal/cant-make", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interestId }),
    });
    const result = await response.json();
    setMessage(result.message || "Updated.");
    setBusyId("");

    if (result.ok) {
      window.location.reload();
    }
  }

  async function signModelRelease(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusyId("model-release");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/portal/model-release", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        legalName: formData.get("legalName"),
        dateOfBirth: formData.get("dateOfBirth"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        streetAddress: formData.get("streetAddress"),
        city: formData.get("city"),
        state: formData.get("state"),
        zip: formData.get("zip"),
        signature: formData.get("signature"),
        agreementAccepted: formData.get("agreementAccepted") === "on",
      }),
    });
    const result = await response.json().catch(() => ({ ok: false, message: "Unexpected server response." }));
    setMessage(result.message || "Updated.");
    setBusyId("");

    if (result.ok) {
      window.location.reload();
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="dashboard-shell">
      <header className="dashboard-topbar">
        <div>
          <strong>{account.name}</strong>
          <span>{roleContent.label}</span>
        </div>
        <button type="button" onClick={logout} className="dashboard-ghost-button">Logout</button>
      </header>

      <section className="dashboard-hero">
        <p>{roleContent.kicker}</p>
        <h1>{roleContent.heading}</h1>
        <span>{roleContent.description}</span>
      </section>

      {account.status === "PENDING" && (
        <section className="dashboard-card dashboard-review-card">
          <h2>Account Review In Progress</h2>
          <p className="dashboard-muted">
            Your profile is in the admin review queue. You can still see upcoming event dates and submit interest so the ONVIBE team knows where you want to participate.
          </p>
        </section>
      )}

      {account.role === "MODEL" && (
        <>
          <section className="dashboard-card">
            <h2>Availability Notice</h2>
            <p className="dashboard-muted">
              If you are selected for a gig and cannot make it, please let us know at least one week in advance so our team has time to fill the spot.
            </p>
          </section>

          {account.modelRelease ? (
            <section className="dashboard-card">
              <h2>Model Release Signed</h2>
              <p className="dashboard-muted">
                Your model release was signed on {new Date(account.modelRelease.signedAt).toLocaleString()}.
              </p>
              <div className="dashboard-actions">
                <a href="/api/portal/model-release/download" className="dashboard-button">Download Signed Copy</a>
              </div>
            </section>
          ) : (
            <section className="dashboard-card">
              <h2>Model Release Required</h2>
              <p className="dashboard-muted">
                Please review and sign the model and promotional content release before participating in ONVIBE event activations.
              </p>
              <details className="dashboard-release-text">
                <summary>Read Model Release Agreement</summary>
                <div>
                  <p><strong>Model And Promotional Content Release</strong></p>
                  <p>
                    I authorize ShopLobbi Inc., Vape Shop Maps Inc., and related companies, brands, event partners, sponsors, contractors, and representatives to photograph, film, record, livestream, and otherwise capture my name, image, likeness, appearance, voice, performance, statements, and biographical information at or in connection with covered events.
                  </p>
                  <p>
                    I grant unrestricted, worldwide, royalty-free, transferable, sublicensable, and perpetual rights to use, reproduce, edit, adapt, crop, combine, publish, display, distribute, advertise, promote, and otherwise use those materials in any media or format for company, brand, service, and event promotion.
                  </p>
                  <p>
                    I understand this is a master agreement for covered events I apply for and am accepted, confirmed, scheduled, or engaged to participate in. Event-specific written terms may supplement this agreement.
                  </p>
                  <p>
                    I confirm I am at least 18 years old, have authority to sign, understand the agreement, and voluntarily agree to its terms.
                  </p>
                </div>
              </details>
              <form onSubmit={signModelRelease} className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <DashboardField label="Legal name" name="legalName" defaultValue={account.name} />
                  <DashboardField label="Date of birth" name="dateOfBirth" type="date" />
                  <DashboardField label="Email" name="email" type="email" defaultValue={account.email} />
                  <DashboardField label="Phone" name="phone" defaultValue={account.phone || ""} />
                  <DashboardField label="Street address" name="streetAddress" />
                  <DashboardField label="City" name="city" defaultValue={account.city || ""} />
                  <DashboardField label="State" name="state" />
                  <DashboardField label="ZIP" name="zip" />
                  <DashboardField label="Digital signature" name="signature" />
                </div>
                <label className="dashboard-check">
                  <input name="agreementAccepted" type="checkbox" required />
                  <span>I have read and agree to the Model and Promotional Content Release. I confirm I am at least 18 years old.</span>
                </label>
                <button type="submit" disabled={busyId === "model-release"} className="dashboard-button">
                  {busyId === "model-release" ? "Signing" : "Sign Model Release"}
                </button>
              </form>
            </section>
          )}
        </>
      )}

      {account.role === "VENDOR" && (
        <section className="dashboard-card">
          <h2>{account.vendorType === "BRAND" ? "Brand Booth And Display Options" : "Vendor Review"}</h2>
          <p className="dashboard-muted">
            {account.vendorType === "BRAND"
              ? "Brands can request to booth in person, or ask about mailing approved products for an ONVIBE display table. Our staff can introduce your products using the positioning, talking points, and verbiage you email to the team."
              : "When you request to vend at an event, the admin team will review fit, space, timing, and event needs before confirming placement."}
          </p>
        </section>
      )}

      {account.role === "ATTENDEE" && (
        <section className="dashboard-card">
          <h2>Event Updates</h2>
          <p className="dashboard-muted">
            Mark intent to attend so ONVIBE can send you event reminders, updates, and important details as new stops are announced.
          </p>
        </section>
      )}

      {message && <p className="dashboard-status">{message}</p>}

      {account.role === "MODEL" && (
        <section className="dashboard-card dashboard-model-apply-note">
          <h2>Applying For Another Event</h2>
          <p className="dashboard-muted">
            When you mark interest in an event, the ONVIBE team will review availability and reach out to confirm the final date, time, arrival details, and next steps.
          </p>
        </section>
      )}

      <section className="dashboard-grid">
        {events.map((event) => (
          <article key={event.id} className="dashboard-card">
            <p className="dashboard-kicker">{new Date(event.startsAt).toLocaleString()}</p>
            <h2>{event.title}</h2>
            <p>{event.venue || "Venue TBA"}</p>
            <p>{event.address || event.city}</p>
            {event.description && <p className="dashboard-muted">{event.description}</p>}
            <div className="dashboard-actions">
              {event.interest?.status === "SELECTED" ? (
                <>
                  <span className="dashboard-pill selected">Selected</span>
                  <button type="button" disabled={busyId === event.interest.id} onClick={() => cantMake(event.interest!.id)} className="dashboard-danger-button">
                    Can&apos;t Make It
                  </button>
                </>
              ) : event.interest ? (
                <span className="dashboard-pill">{roleContent.submittedLabel}</span>
              ) : (
                <button type="button" disabled={busyId === event.id} onClick={() => showInterest(event.id)} className="dashboard-button">
                  {roleContent.actionLabel}
                </button>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function DashboardField({
  label,
  name,
  type = "text",
  defaultValue = "",
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="dashboard-label">{label}</label>
      <input id={name} name={name} type={type} required defaultValue={defaultValue} className="dashboard-input" />
    </div>
  );
}

function getRoleContent(role: string, vendorType?: string | null) {
  if (role === "ATTENDEE") {
    return {
      label: "Attendee dashboard",
      kicker: "Upcoming ONVIBE Events",
      heading: "Find The Next Stop",
      description: "See upcoming ONVIBE dates, mark your intent to attend, and watch for event updates.",
      actionLabel: "I Want To Attend",
      submittedLabel: "Intent To Attend Sent",
    };
  }

  if (role === "VENDOR") {
    if (vendorType === "BRAND") {
      return {
        label: "Brand dashboard",
        kicker: "Brand Activation Opportunities",
        heading: "Request A Booth Or Display",
        description: "Review upcoming ONVIBE dates and tell the team where your brand wants to be featured.",
        actionLabel: "Request Brand Booth Or Display",
        submittedLabel: "Brand Booth Request Sent",
      };
    }

    return {
      label: "Vendor dashboard",
      kicker: "Vendor Opportunities",
      heading: "Request To Vend",
      description: "Review upcoming ONVIBE event dates and tell the team where your business wants to vend.",
      actionLabel: "Request To Vend",
      submittedLabel: "Vendor Request Sent",
    };
  }

  return {
    label: "Bikini Team dashboard",
    kicker: "Bikini Team Dates",
    heading: "Choose Events You Want To Work",
    description: "See upcoming ONVIBE dates, submit interest, and watch your dashboard for selection updates.",
    actionLabel: "I Want To Join This Event",
    submittedLabel: "Interest Sent",
  };
}
