"use client";

import { useState, type FormEvent } from "react";

export function AdminLoginForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
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

    window.location.href = "/admin";
  }

  return (
    <form onSubmit={handleSubmit} className="dashboard-card mx-auto grid max-w-md gap-5">
      <div>
        <label htmlFor="email" className="dashboard-label">Admin email</label>
        <input id="email" name="email" type="email" required className="dashboard-input" />
      </div>
      <div>
        <label htmlFor="password" className="dashboard-label">Password</label>
        <input id="password" name="password" type="password" required className="dashboard-input" />
      </div>
      {message && <p className="dashboard-error">{message}</p>}
      <button type="submit" disabled={loading} className="dashboard-button">
        {loading ? "Logging In" : "Log In"}
      </button>
    </form>
  );
}
