"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

type Mode = "login" | "register";
type AccountRoleValue = "ATTENDEE" | "MODEL" | "VENDOR";
type FieldErrors = Record<string, string>;
type AuthApiResult = {
  ok?: boolean;
  message?: string;
  fieldErrors?: Record<string, string | string[]>;
};

const vendorTypes = ["BRAND", "FOOD", "STORE", "OTHER"] as const;

function formDataValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function optionalFormDataValue(formData: FormData, key: string) {
  const value = formDataValue(formData, key);

  return value || undefined;
}

function normalizeFieldErrors(fieldErrors?: Record<string, string | string[]>): FieldErrors {
  if (!fieldErrors) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(fieldErrors).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] || "Please check this field." : value,
    ]),
  );
}

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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setFieldErrors({});

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formDataValue(formData, "email"),
          password: formDataValue(formData, "password"),
        }),
      });
      const result = await readAuthResponse(response);

      if (!response.ok || !result.ok) {
        setFieldErrors(normalizeFieldErrors(result.fieldErrors));
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
    setFieldErrors({});

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          name: formDataValue(formData, "name"),
          email: formDataValue(formData, "email"),
          phone: optionalFormDataValue(formData, "phone"),
          password: formDataValue(formData, "password"),
          city: optionalFormDataValue(formData, "city"),
          instagram: optionalFormDataValue(formData, "instagram"),
          businessName: optionalFormDataValue(formData, "businessName"),
          vendorType: optionalFormDataValue(formData, "vendorType"),
          website: optionalFormDataValue(formData, "website"),
          notes: optionalFormDataValue(formData, "notes"),
        }),
      });
      const result = await readAuthResponse(response);

      if (!response.ok || !result.ok) {
        setFieldErrors(normalizeFieldErrors(result.fieldErrors));
        setMessage(result.message || "Registration failed. Please check the form and try again.");
        return;
      }

      form.reset();
      setFieldErrors({});
      setMode("login");
      setMessage("Account created and approved. Log in with the email and password you just created.");
    } catch {
      setMessage("We could not reach the registration server. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="dashboard-card mx-auto max-w-3xl">
      <div className="dashboard-tabs">
        <button type="button" onClick={() => { setMode("register"); setFieldErrors({}); setMessage(""); }} className={mode === "register" ? "active" : ""}>
          Register
        </button>
        <button type="button" onClick={() => { setMode("login"); setFieldErrors({}); setMessage(""); }} className={mode === "login" ? "active" : ""}>
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
                onClick={() => { setRole(value as AccountRoleValue); setFieldErrors({}); setMessage(""); }}
                className={`dashboard-choice ${role === value ? "active" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" name="name" errors={fieldErrors} />
            <Field label="Email" name="email" type="email" errors={fieldErrors} />
            <Field label="Phone" name="phone" errors={fieldErrors} />
            <Field label="City" name="city" errors={fieldErrors} />
            <Field label="Password" name="password" type="password" errors={fieldErrors} />
            <Field label="Instagram" name="instagram" errors={fieldErrors} />
            {role === "VENDOR" && (
              <>
                <Field label="Business name" name="businessName" errors={fieldErrors} />
                <div>
                  <label htmlFor="vendorType" className="dashboard-label">Vendor type</label>
                  <select
                    id="vendorType"
                    name="vendorType"
                    className={cn("dashboard-input", fieldErrors.vendorType && "border-pink-300 ring-2 ring-pink-400/30")}
                    defaultValue="BRAND"
                    aria-invalid={Boolean(fieldErrors.vendorType)}
                    aria-describedby={fieldErrors.vendorType ? "vendorType-error" : undefined}
                  >
                    {vendorTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {fieldErrors.vendorType && <p id="vendorType-error" className="mt-2 text-sm font-bold text-pink-200">{fieldErrors.vendorType}</p>}
                </div>
                <Field label="Website" name="website" errors={fieldErrors} />
              </>
            )}
          </div>
          <div>
            <label htmlFor="notes" className="dashboard-label">Notes</label>
            <textarea id="notes" name="notes" rows={4} className="dashboard-input" />
          </div>
          <p className="dashboard-muted">
            Accounts are approved immediately. Log in after registration to view event dates, submit interest, and track updates.
          </p>
          {message && <p className="dashboard-status">{message}</p>}
          <button type="submit" disabled={loading} className="dashboard-button">
            {loading ? "Submitting" : "Create Account"}
          </button>
        </form>
      ) : (
        <form onSubmit={submitLogin} className="grid gap-5">
          <Field label="Email" name="email" type="email" errors={fieldErrors} />
          <Field label="Password" name="password" type="password" errors={fieldErrors} />
          {message && <p className="dashboard-status">{message}</p>}
          <button type="submit" disabled={loading} className="dashboard-button">
            {loading ? "Logging In" : "Login"}
          </button>
        </form>
      )}
    </section>
  );
}

function Field({ label, name, errors, type = "text" }: { label: string; name: string; errors: FieldErrors; type?: string }) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={name} className="dashboard-label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={["name", "email", "password"].includes(name)}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? errorId : undefined}
        className={cn("dashboard-input", errors[name] && "border-pink-300 ring-2 ring-pink-400/30")}
      />
      {errors[name] && <p id={errorId} className="mt-2 text-sm font-bold text-pink-200">{errors[name]}</p>}
    </div>
  );
}
