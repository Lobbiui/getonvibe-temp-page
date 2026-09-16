"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type FieldErrors = Record<string, string>;
type ResetResponse = {
  ok?: boolean;
  message?: string;
  fieldErrors?: Record<string, string | string[]>;
};

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

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [message, setMessage] = useState(token ? "" : "This reset link is missing a token.");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  async function submitReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setFieldErrors({});

    try {
      const formData = new FormData(event.currentTarget);
      const password = String(formData.get("password") || "");
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const result = (await response.json()) as ResetResponse;

      if (!response.ok || !result.ok) {
        setFieldErrors(normalizeFieldErrors(result.fieldErrors));
        setMessage(result.message || "Password reset failed. Please request a new reset link.");
        return;
      }

      setComplete(true);
      setMessage(result.message || "Password updated. You can now log in.");
    } catch {
      setMessage("We could not reach the password reset server. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="dashboard-card mx-auto max-w-xl">
      <form onSubmit={submitReset} className="grid gap-5">
        <div>
          <h2 className="text-2xl font-black uppercase text-white">Create New Password</h2>
          <p className="dashboard-muted mt-2">Use at least 8 characters.</p>
        </div>
        {!complete && (
          <div>
            <label htmlFor="password" className="dashboard-label">New password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              disabled={!token}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
              className={cn("dashboard-input", fieldErrors.password && "border-pink-300 ring-2 ring-pink-400/30")}
            />
            {fieldErrors.password && <p id="password-error" className="mt-2 text-sm font-bold text-pink-200">{fieldErrors.password}</p>}
          </div>
        )}
        {message && <p className="dashboard-status">{message}</p>}
        {!complete ? (
          <button type="submit" disabled={loading || !token} className="dashboard-button">
            {loading ? "Updating" : "Update Password"}
          </button>
        ) : (
          <a href="/login" className="dashboard-button text-center">Go To Login</a>
        )}
      </form>
    </section>
  );
}
