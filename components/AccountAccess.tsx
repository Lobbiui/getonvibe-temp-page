"use client";

import { useState, type FormEvent } from "react";

type Mode = "login" | "register";
type AccountRoleValue = "ATTENDEE" | "MODEL" | "VENDOR";

const vendorTypes = ["BRAND", "FOOD", "STORE", "OTHER"] as const;

export function AccountAccess() {
  const [mode, setMode] = useState<Mode>("register");
  const [role, setRole] = useState<AccountRoleValue>("MODEL");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const result = await response.json();

    setLoading(false);

    if (!response.ok || !result.ok) {
      setMessage(result.message || "Login failed.");
      return;
    }

    window.location.href = "/dashboard";
  }

  async function submitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        password: formData.get("password"),
        city: formData.get("city"),
        instagram: formData.get("instagram"),
        businessName: formData.get("businessName"),
        vendorType: formData.get("vendorType") || undefined,
        website: formData.get("website"),
        notes: formData.get("notes"),
      }),
    });
    const result = await response.json();

    setLoading(false);
    setMessage(result.message || (result.ok ? "Registration received." : "Registration failed."));

    if (result.ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <section className="dashboard-card mx-auto max-w-3xl">
      <div className="dashboard-tabs">
        <button type="button" onClick={() => setMode("register")} className={mode === "register" ? "active" : ""}>
          Register
        </button>
        <button type="button" onClick={() => setMode("login")} className={mode === "login" ? "active" : ""}>
          Login
        </button>
      </div>

      {mode === "register" ? (
        <form onSubmit={submitRegister} className="grid gap-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["MODEL", "Bikini Team"],
              ["VENDOR", "Vendor"],
              ["ATTENDEE", "Event Updates"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setRole(value as AccountRoleValue)}
                className={`dashboard-choice ${role === value ? "active" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" />
            <Field label="City" name="city" />
            <Field label="Password" name="password" type="password" />
            <Field label="Instagram" name="instagram" />
            {role === "VENDOR" && (
              <>
                <Field label="Business name" name="businessName" />
                <div>
                  <label htmlFor="vendorType" className="dashboard-label">Vendor type</label>
                  <select id="vendorType" name="vendorType" className="dashboard-input" defaultValue="BRAND">
                    {vendorTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <Field label="Website" name="website" />
              </>
            )}
          </div>
          <div>
            <label htmlFor="notes" className="dashboard-label">Notes</label>
            <textarea id="notes" name="notes" rows={4} className="dashboard-input" />
          </div>
          <p className="dashboard-muted">
            Bikini team and vendor accounts require admin approval before dashboard access is opened.
          </p>
          {message && <p className="dashboard-status">{message}</p>}
          <button type="submit" disabled={loading} className="dashboard-button">
            {loading ? "Submitting" : "Create Account"}
          </button>
        </form>
      ) : (
        <form onSubmit={submitLogin} className="grid gap-5">
          <Field label="Email" name="email" type="email" />
          <Field label="Password" name="password" type="password" />
          {message && <p className="dashboard-status">{message}</p>}
          <button type="submit" disabled={loading} className="dashboard-button">
            {loading ? "Logging In" : "Login"}
          </button>
        </form>
      )}
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="dashboard-label">{label}</label>
      <input id={name} name={name} type={type} required={["name", "email", "password"].includes(name)} className="dashboard-input" />
    </div>
  );
}
