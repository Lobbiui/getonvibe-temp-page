"use client";

import { useState, type FormEvent } from "react";

const messageAudiences = ["ALL", "ATTENDEES", "MODELS", "VENDORS", "INTERESTED", "SELECTED"] as const;

type AdminAccount = {
  id: string;
  role: string;
  status: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  instagram: string | null;
  businessName: string | null;
  vendorType: string | null;
  createdAt: string;
};

type AdminEvent = {
  id: string;
  title: string;
  city: string;
  venue: string | null;
  address: string | null;
  startsAt: string;
};

type AdminInterest = {
  id: string;
  status: string;
  note: string | null;
  account: AdminAccount;
  event: AdminEvent;
};

export function AdminDashboard({
  accounts,
  events,
  interests,
}: {
  accounts: AdminAccount[];
  events: AdminEvent[];
  interests: AdminInterest[];
}) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState("");

  async function postJson(url: string, payload: Record<string, unknown>) {
    setBusy(url);
    setMessage("");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    setMessage(result.message || "Updated.");
    setBusy("");

    if (result.ok) {
      window.location.reload();
    }
  }

  async function createEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await postJson("/api/admin/events", {
      title: formData.get("title"),
      city: formData.get("city"),
      venue: formData.get("venue"),
      address: formData.get("address"),
      startsAt: formData.get("startsAt"),
      endsAt: formData.get("endsAt"),
      description: formData.get("description"),
      isPublished: formData.get("isPublished") === "on",
    });
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await postJson("/api/admin/messages", {
      audience: formData.get("audience"),
      eventId: formData.get("eventId") || undefined,
      accountId: formData.get("accountId") || undefined,
      subject: formData.get("subject"),
      body: formData.get("body"),
    });
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const pendingAccounts = accounts.filter((account) => account.status === "PENDING");
  const attendeeCount = accounts.filter((account) => account.role === "ATTENDEE").length;
  const modelCount = accounts.filter((account) => account.role === "MODEL").length;
  const vendorCount = accounts.filter((account) => account.role === "VENDOR").length;

  return (
    <main className="dashboard-shell">
      <header className="dashboard-topbar">
        <div>
          <strong>ONVIBE Admin</strong>
          <span>Approvals, events, interest, and messages</span>
        </div>
        <button type="button" onClick={logout} className="dashboard-ghost-button">Logout</button>
      </header>

      <section className="dashboard-hero">
        <p>Admin Dashboard</p>
        <h1>Track Everything</h1>
        <span>Approve accounts, post event dates, select participants, and message your ONVIBE list.</span>
      </section>

      {message && <p className="dashboard-status">{message}</p>}

      <section className="dashboard-stats">
        <div><strong>{accounts.length}</strong><span>Total accounts</span></div>
        <div><strong>{attendeeCount}</strong><span>Attendees</span></div>
        <div><strong>{modelCount}</strong><span>Bikini Team</span></div>
        <div><strong>{vendorCount}</strong><span>Vendors</span></div>
      </section>

      <section className="dashboard-stats">
        <div><strong>{pendingAccounts.length}</strong><span>Pending approvals</span></div>
        <div><strong>{events.length}</strong><span>Posted events</span></div>
        <div><strong>{interests.length}</strong><span>Total event responses</span></div>
        <div><strong>{interests.filter((interest) => interest.status === "SELECTED").length}</strong><span>Selected</span></div>
      </section>

      <section className="dashboard-two-column">
        <div className="dashboard-card">
          <h2>Pending Approvals</h2>
          <div className="dashboard-list">
            {pendingAccounts.length === 0 && <p className="dashboard-muted">No pending accounts.</p>}
            {pendingAccounts.map((account) => (
              <article key={account.id}>
                <strong>{account.name}</strong>
                <span>{account.role} {account.businessName ? `- ${account.businessName}` : ""}</span>
                <small>{account.email}</small>
                <button type="button" disabled={busy !== ""} onClick={() => postJson("/api/admin/accounts/approve", { accountId: account.id })} className="dashboard-button">
                  Approve
                </button>
              </article>
            ))}
          </div>
        </div>

        <form onSubmit={createEvent} className="dashboard-card grid gap-4">
          <h2>Post Event</h2>
          <Field label="Title" name="title" />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="City" name="city" />
            <Field label="Venue" name="venue" required={false} />
            <Field label="Address" name="address" required={false} />
            <Field label="Starts at" name="startsAt" type="datetime-local" />
            <Field label="Ends at" name="endsAt" type="datetime-local" required={false} />
          </div>
          <div>
            <label htmlFor="description" className="dashboard-label">Description</label>
            <textarea id="description" name="description" rows={4} className="dashboard-input" />
          </div>
          <label className="dashboard-check">
            <input name="isPublished" type="checkbox" defaultChecked />
            <span>Publish to user dashboards</span>
          </label>
          <button type="submit" className="dashboard-button">Post Event</button>
        </form>
      </section>

      <section className="dashboard-card">
        <h2>Event Responses And Selections</h2>
        <div className="dashboard-table">
          {interests.map((interest) => (
            <article key={interest.id}>
              <div>
                <strong>{interest.account.name}</strong>
                <span>{interest.account.role} - {interest.account.email}</span>
              </div>
              <div>
                <strong>{interest.event.title}</strong>
                <span>{new Date(interest.event.startsAt).toLocaleString()}</span>
              </div>
              <span className={`dashboard-pill ${interest.status === "SELECTED" ? "selected" : ""}`}>
                {getResponseLabel(interest)}
              </span>
              {interest.status !== "SELECTED" && (
                <button type="button" onClick={() => postJson("/api/admin/interests/select", { interestId: interest.id })} className="dashboard-button">
                  Select
                </button>
              )}
            </article>
          ))}
          {interests.length === 0 && <p className="dashboard-muted">No event responses yet.</p>}
        </div>
      </section>

      <section className="dashboard-card">
        <h2>Account Directory</h2>
        <div className="dashboard-table">
          {accounts.map((account) => (
            <article key={account.id}>
              <div>
                <strong>{account.name}</strong>
                <span>{account.email}</span>
              </div>
              <div>
                <strong>{getAccountRoleLabel(account)}</strong>
                <span>{account.businessName || account.city || "No extra details"}</span>
              </div>
              <span className={`dashboard-pill ${account.status === "APPROVED" ? "selected" : ""}`}>{account.status}</span>
              {account.status === "PENDING" && (
                <button type="button" disabled={busy !== ""} onClick={() => postJson("/api/admin/accounts/approve", { accountId: account.id })} className="dashboard-button">
                  Approve
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      <form onSubmit={sendMessage} className="dashboard-card grid gap-4">
        <h2>Message People</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="audience" className="dashboard-label">Audience</label>
            <select id="audience" name="audience" className="dashboard-input" defaultValue="ALL">
              {messageAudiences.map((audience) => (
                <option key={audience} value={audience}>{audience.replace("_", " ")}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="eventId" className="dashboard-label">Event filter</label>
            <select id="eventId" name="eventId" className="dashboard-input" defaultValue="">
              <option value="">Any event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="accountId" className="dashboard-label">Direct recipient</label>
            <select id="accountId" name="accountId" className="dashboard-input" defaultValue="">
              <option value="">No direct recipient</option>
              {accounts.filter((account) => account.status === "APPROVED").map((account) => (
                <option key={account.id} value={account.id}>{account.name} - {account.email}</option>
              ))}
            </select>
          </div>
        </div>
        <Field label="Subject" name="subject" />
        <div>
          <label htmlFor="body" className="dashboard-label">Message</label>
          <textarea id="body" name="body" rows={6} required className="dashboard-input" />
        </div>
        <button type="submit" className="dashboard-button">Send Message</button>
      </form>
    </main>
  );
}

function Field({ label, name, type = "text", required = true }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="dashboard-label">{label}</label>
      <input id={name} name={name} type={type} required={required} className="dashboard-input" />
    </div>
  );
}

function getAccountRoleLabel(account: AdminAccount) {
  if (account.role === "ATTENDEE") {
    return "Attendee";
  }

  if (account.role === "VENDOR") {
    if (account.vendorType === "BRAND") {
      return "Brand";
    }

    return account.vendorType ? `${account.vendorType} vendor` : "Vendor";
  }

  return "Bikini Team";
}

function getResponseLabel(interest: AdminInterest) {
  if (interest.status === "SELECTED") {
    return "Selected";
  }

  if (interest.account.role === "ATTENDEE") {
    return "Wants to attend";
  }

  if (interest.account.role === "VENDOR") {
    if (interest.account.vendorType === "BRAND") {
      return "Wants brand booth/display";
    }

    return "Wants to vend";
  }

  return "Wants to work event";
}
