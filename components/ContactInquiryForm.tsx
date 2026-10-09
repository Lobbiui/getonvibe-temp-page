"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { contactInquiryLabels, contactInquiryTypes } from "@/lib/contact-inquiry";

type FormState = {
  loading: boolean;
  ok: boolean;
  message: string;
  fieldErrors: Record<string, string>;
};

const initialState: FormState = { loading: false, ok: false, message: "", fieldErrors: {} };

export function ContactInquiryForm() {
  const [state, setState] = useState(initialState);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState({ ...initialState, loading: true });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          organization: data.get("organization"),
          website: data.get("website"),
          inquiryType: data.get("inquiryType"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          company: data.get("company"),
        }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string; fieldErrors?: Record<string, string> };

      if (!response.ok || !result.ok) {
        setState({
          loading: false,
          ok: false,
          message: result.message || "We could not send your message. Please try again.",
          fieldErrors: result.fieldErrors || {},
        });
        return;
      }

      form.reset();
      setState({ loading: false, ok: true, message: result.message || "Your message is on its way.", fieldErrors: {} });
    } catch {
      setState({ loading: false, ok: false, message: "We could not reach the contact service. Please try again.", fieldErrors: {} });
    }
  }

  return (
    <section className="gateway-preregister gateway-contact-form-shell" id="contact-form" aria-labelledby="contact-form-title">
      <div className="gateway-preregister-intro">
        <p>Contact GetOnVibe</p>
        <h2 id="contact-form-title">Start the conversation.</h2>
        <span>Tell us what you are building, planning, or hoping to bring to the GetOnVibe community.</span>
        <strong>Your message goes directly to the GetOnVibe team.</strong>
      </div>

      <form className="gateway-preregister-form" onSubmit={submit} noValidate>
        <input className="gateway-honeypot" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="gateway-form-grid">
          <label>
            <span>Name</span>
            <input name="name" autoComplete="name" required />
            {state.fieldErrors.name && <small>{state.fieldErrors.name}</small>}
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
            {state.fieldErrors.email && <small>{state.fieldErrors.email}</small>}
          </label>
          <label>
            <span>Organization <em>Optional</em></span>
            <input name="organization" autoComplete="organization" />
            {state.fieldErrors.organization && <small>{state.fieldErrors.organization}</small>}
          </label>
          <label>
            <span>Website or social link <em>Optional</em></span>
            <input name="website" type="url" inputMode="url" placeholder="https://" />
            {state.fieldErrors.website && <small>{state.fieldErrors.website}</small>}
          </label>
          <label className="gateway-form-wide">
            <span>What would you like to discuss?</span>
            <select name="inquiryType" defaultValue="" required>
              <option value="" disabled>Choose a topic</option>
              {contactInquiryTypes.map((type) => <option value={type} key={type}>{contactInquiryLabels[type]}</option>)}
            </select>
            {state.fieldErrors.inquiryType && <small>{state.fieldErrors.inquiryType}</small>}
          </label>
          <label className="gateway-form-wide">
            <span>Message</span>
            <textarea name="message" rows={7} required />
            {state.fieldErrors.message && <small>{state.fieldErrors.message}</small>}
          </label>
        </div>

        <label className="gateway-consent">
          <input name="consent" type="checkbox" required />
          <span>I agree that GetOnVibe may use the information above to respond to this inquiry.</span>
        </label>
        {state.fieldErrors.consent && <small>{state.fieldErrors.consent}</small>}

        <div className="gateway-form-submit">
          <button type="submit" disabled={state.loading}>
            {state.loading ? "Sending message" : "Send message"} <ArrowRight size={18} />
          </button>
          <span>We will reply using the email address you provide.</span>
        </div>

        {state.message && <p className={`gateway-form-status ${state.ok ? "is-success" : ""}`} role="status" aria-live="polite">{state.message}</p>}
      </form>
    </section>
  );
}
