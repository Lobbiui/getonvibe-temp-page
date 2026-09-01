"use client";

import { useState } from "react";

type PortalAccount = {
  id: string;
  role: string;
  status: string;
  name: string;
  email: string;
  vendorType: string | null;
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
        <section className="dashboard-card">
          <h2>Availability Notice</h2>
          <p className="dashboard-muted">
            If you are selected for a gig and cannot make it, please let us know at least one week in advance so our team has time to fill the spot.
          </p>
        </section>
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
