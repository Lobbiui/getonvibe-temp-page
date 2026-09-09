"use client";

import { useState, type FormEvent } from "react";

type Mode = "login" | "register";
type AccountRoleValue = "ATTENDEE" | "MODEL" | "VENDOR";
type AuthApiResult = {
  ok?: boolean;
  message?: string;
};

const vendorTypes = ["BRAND", "FOOD", "STORE", "OTHER"] as const;

async function readAuthResponse(response: Response): Promise<AuthApiResult> {
  try {
    return (await response.json()) as AuthApiResult;
  } catch {
    return {
      ok: false,
      message: "The server returned an unexpected response. Please refresh and try again.",
    };
  }
}

export function AccountAccess() {
  const [mode, setMode] = useState<Mode>("register");
  const [role, setRole] = useState<AccountRoleValue>("MODEL");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const result = await readAuthResponse(response);

      if (!response.ok || !result.ok) {
        setMessage(result.message || "Login failed. Please check your email and password.");
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setMessage("We could not reach the login server. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function submitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
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
      const result = await readAuthResponse(response);

      if (!response.ok || !result.ok) {
        setMessage(result.message || "Registration failed. Please check the form and try again.");
        return;
      }

      form.reset();
      setMode("login");
      setMessage("Registration received. Log in with the email and password you just created.");
    } catch {
      setMessage("We could not reach the registration server. Please refresh and try again.");
    } finally {
      setLoading(false);
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
            Bikini team and vendor accounts are reviewed by the ONVIBE team. You can still log in to view event dates and submit interest while review is pending.
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
