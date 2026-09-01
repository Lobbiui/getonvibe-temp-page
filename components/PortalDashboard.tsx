"use client";

import { useState } from "react";

type PortalAccount = {
  id: string;
  role: string;
  status: string;
  name: string;
  email: string;
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
          <span>{account.role.toLowerCase()} dashboard</span>
        </div>
        <button type="button" onClick={logout} className="dashboard-ghost-button">Logout</button>
      </header>

      <section className="dashboard-hero">
        <p>Upcoming Dates</p>
        <h1>Your ONVIBE Dashboard</h1>
        <span>Show interest in upcoming events and watch this dashboard for selection updates.</span>
      </section>

      <section className="dashboard-card">
        <h2>Availability Notice</h2>
        <p className="dashboard-muted">
          If you are selected for a gig and cannot make it, please let us know at least one week in advance so our team has time to fill the spot.
        </p>
      </section>

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
                <span className="dashboard-pill">{event.interest.status.replace("_", " ")}</span>
              ) : (
                <button type="button" disabled={busyId === event.id} onClick={() => showInterest(event.id)} className="dashboard-button">
                  I&apos;m Interested
                </button>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
