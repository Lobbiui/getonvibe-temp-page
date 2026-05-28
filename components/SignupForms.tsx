"use client";

import { ClipboardCheck, Mail, Store, Utensils } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  attendeeSchema,
  brandVendorSchema,
  foodVendorSchema,
  productCategories,
  successMessages,
  type SubmissionType,
} from "@/lib/validation";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";

type FieldErrors = Record<string, string>;

type SubmitState = {
  loading: boolean;
  message: string;
  errors: FieldErrors;
  ok: boolean;
};

const initialState: SubmitState = {
  loading: false,
  message: "",
  errors: {},
  ok: false,
};

const tabs: Array<{ type: SubmissionType; label: string; icon: typeof Mail }> = [
  { type: "attendee", label: "Attendee Pre-Registration", icon: Mail },
  { type: "brand-vendor", label: "Brand Vendor Inquiry", icon: Store },
  { type: "food-vendor", label: "Food Vendor Inquiry", icon: Utensils },
];

function formDataValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function payloadFromForm(type: SubmissionType, formData: FormData) {
  const base = {
    type,
    sourcePage: typeof window !== "undefined" ? window.location.href : "",
    company: formDataValue(formData, "company"),
    consent: formData.get("consent") === "on",
  };

  if (type === "attendee") {
    return {
      ...base,
      fullName: formDataValue(formData, "fullName"),
      email: formDataValue(formData, "email"),
      phone: formDataValue(formData, "phone"),
      dateOfBirth: formDataValue(formData, "dateOfBirth"),
    };
  }

  if (type === "brand-vendor") {
    return {
      ...base,
      brandName: formDataValue(formData, "brandName"),
      contactName: formDataValue(formData, "contactName"),
      email: formDataValue(formData, "email"),
      phone: formDataValue(formData, "phone"),
      websiteOrInstagram: formDataValue(formData, "websiteOrInstagram"),
      productCategory: formDataValue(formData, "productCategory"),
      message: formDataValue(formData, "message"),
      coaConfirmation: formData.get("coaConfirmation") === "on",
    };
  }

  return {
    ...base,
    businessName: formDataValue(formData, "businessName"),
    contactName: formDataValue(formData, "contactName"),
    email: formDataValue(formData, "email"),
    phone: formDataValue(formData, "phone"),
    cuisineType: formDataValue(formData, "cuisineType"),
    websiteOrInstagram: formDataValue(formData, "websiteOrInstagram"),
    message: formDataValue(formData, "message"),
  };
}

function schemaForType(type: SubmissionType) {
  if (type === "attendee") {
    return attendeeSchema;
  }

  if (type === "brand-vendor") {
    return brandVendorSchema;
  }

  return foodVendorSchema;
}

function errorsFromIssues(issues: Array<{ path: PropertyKey[]; message: string }>) {
  return issues.reduce<FieldErrors>((acc, issue) => {
    const key = issue.path.join(".");

    if (key && !acc[key]) {
      acc[key] = issue.message;
    }

    return acc;
  }, {});
}

function Field({
  label,
  name,
  type = "text",
  errors,
  required,
  children,
}: {
  label: string;
  name: string;
  type?: string;
  errors: FieldErrors;
  required?: boolean;
  children?: ReactNode;
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-bold text-slate-100">
        {label}
      </label>
      {children || (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? errorId : undefined}
          className="min-h-12 w-full rounded-md border border-white/15 bg-slate-950/70 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30"
        />
      )}
      {errors[name] && (
        <p id={errorId} className="mt-2 text-sm font-bold text-fuchsia-200">
          {errors[name]}
        </p>
      )}
    </div>
  );
}

function ConsentFields({ type, errors }: { type: SubmissionType; errors: FieldErrors }) {
  return (
    <div className="space-y-3">
      {type === "brand-vendor" && (
        <label className="flex gap-3 rounded-md border border-cyan-300/20 bg-cyan-300/5 p-4 text-sm leading-6 text-slate-200">
          <input
            name="coaConfirmation"
            type="checkbox"
            aria-describedby={errors.coaConfirmation ? "coaConfirmation-error" : undefined}
            className="mt-1 h-4 w-4 accent-cyan-300"
          />
          <span>
            I confirm this brand operates in the legal hemp space and can provide active, verifiable COAs for applicable products.
          </span>
        </label>
      )}
      {errors.coaConfirmation && (
        <p id="coaConfirmation-error" className="text-sm font-bold text-fuchsia-200">
          {errors.coaConfirmation}
        </p>
      )}
      <label className="flex gap-3 rounded-md border border-white/15 bg-white/5 p-4 text-sm leading-6 text-slate-200">
        <input
          name="consent"
          type="checkbox"
          aria-describedby={errors.consent ? "consent-error" : undefined}
          className="mt-1 h-4 w-4 accent-cyan-300"
        />
        <span>I consent to receive ONVIBE Festival and GetOnVibe launch communications.</span>
      </label>
      {errors.consent && (
        <p id="consent-error" className="text-sm font-bold text-fuchsia-200">
          {errors.consent}
        </p>
      )}
    </div>
  );
}

function StatusMessage({ state }: { state: SubmitState }) {
  if (!state.message) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-md border px-4 py-3 text-sm font-bold",
        state.ok
          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
          : "border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-100",
      )}
      role="status"
    >
      {state.message}
    </div>
  );
}

export function SignupForms() {
  const [active, setActive] = useState<SubmissionType>("attendee");
  const [states, setStates] = useState<Record<SubmissionType, SubmitState>>({
    attendee: initialState,
    "brand-vendor": initialState,
    "food-vendor": initialState,
  });

  const activeState = states[active];
  const activeTab = useMemo(() => tabs.find((tab) => tab.type === active), [active]);

  async function handleSubmit(type: SubmissionType, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = payloadFromForm(type, new FormData(form));
    const schema = schemaForType(type);
    const parsed = schema.safeParse(payload);

    if (!parsed.success) {
      setStates((current) => ({
        ...current,
        [type]: {
          ...initialState,
          errors: errorsFromIssues(parsed.error.issues),
          message: "Please check the highlighted fields and try again.",
        },
      }));
      return;
    }

    setStates((current) => ({
      ...current,
      [type]: { ...initialState, loading: true },
    }));

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setStates((current) => ({
          ...current,
          [type]: {
            ...initialState,
            errors: result.fieldErrors || {},
            message: result.message || "Submission failed. Please try again.",
          },
        }));
        return;
      }

      form.reset();
      setStates((current) => ({
        ...current,
        [type]: {
          ...initialState,
          ok: true,
          message: result.message || successMessages[type],
        },
      }));
    } catch {
      setStates((current) => ({
        ...current,
        [type]: {
          ...initialState,
          message: "Network error. Please try again.",
        },
      }));
    }
  }

  return (
    <Section
      id="signup"
      eyebrow="Get on the list"
      title="Choose your lane and claim first access."
      copy="Attendees get ONVIBE Festival details and GetOnVibe launch updates. Vendors can apply for limited onsite opportunities."
    >
      <div id="vendor-forms" className="absolute -mt-24" aria-hidden="true" />
      <div className="glass-panel glow-border rounded-lg p-4 sm:p-6">
        <div className="grid gap-3 md:grid-cols-3" role="tablist" aria-label="Signup forms">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              type="button"
              role="tab"
              aria-selected={active === tab.type}
              onClick={() => setActive(tab.type)}
              className={cn(
                "flex min-h-14 items-center justify-center gap-2 rounded-md border px-4 text-sm font-black uppercase tracking-[0.12em] transition focus:outline-none focus:ring-2 focus:ring-cyan-300",
                active === tab.type
                  ? "border-cyan-300 bg-cyan-300 text-slate-950"
                  : "border-white/15 bg-white/5 text-slate-200 hover:border-fuchsia-300",
              )}
            >
              <tab.icon className="h-4 w-4" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-5 flex items-center gap-3">
            {activeTab && <activeTab.icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />}
            <h3 className="text-2xl font-black text-white">{activeTab?.label}</h3>
          </div>

          {active === "attendee" && (
            <form className="grid gap-5" onSubmit={(event) => handleSubmit("attendee", event)}>
              <input className="hidden" tabIndex={-1} autoComplete="off" name="company" aria-hidden="true" />
              <div className="rounded-md border border-fuchsia-300/40 bg-fuchsia-300/10 p-4 text-sm font-bold leading-6 text-fuchsia-100">
                Must be 21 or older to attend. Valid government-issued ID required at entry.
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name" name="fullName" errors={activeState.errors} required />
                <Field label="Email" name="email" type="email" errors={activeState.errors} required />
                <Field label="Phone number" name="phone" type="tel" errors={activeState.errors} required />
                <Field label="Date of birth" name="dateOfBirth" type="date" errors={activeState.errors} required />
              </div>
              <ConsentFields type="attendee" errors={activeState.errors} />
              <StatusMessage state={activeState} />
              <button
                type="submit"
                disabled={activeState.loading}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                {activeState.loading ? "Submitting" : "Secure Event Updates and App Launch Access"}
              </button>
            </form>
          )}

          {active === "brand-vendor" && (
            <form
              className="grid gap-5"
              onSubmit={(event) => handleSubmit("brand-vendor", event)}
            >
              <input className="hidden" tabIndex={-1} autoComplete="off" name="company" aria-hidden="true" />
              <div className="rounded-md border border-cyan-300/40 bg-cyan-300/10 p-4 text-sm font-bold leading-6 text-cyan-100">
                Limited brand vendor spots available. Legal hemp space entities only. Current COAs required.
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Brand name" name="brandName" errors={activeState.errors} required />
                <Field label="Contact name" name="contactName" errors={activeState.errors} required />
                <Field label="Email" name="email" type="email" errors={activeState.errors} required />
                <Field label="Phone number" name="phone" type="tel" errors={activeState.errors} required />
                <Field label="Website or Instagram" name="websiteOrInstagram" errors={activeState.errors} />
                <Field label="Product category" name="productCategory" errors={activeState.errors} required>
                  <select
                    id="productCategory"
                    name="productCategory"
                    required
                    aria-invalid={Boolean(activeState.errors.productCategory)}
                    aria-describedby={activeState.errors.productCategory ? "productCategory-error" : undefined}
                    className="min-h-12 w-full rounded-md border border-white/15 bg-slate-950/70 px-4 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="">Choose category</option>
                    {productCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Message" name="message" errors={activeState.errors}>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-md border border-white/15 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30"
                />
              </Field>
              <ConsentFields type="brand-vendor" errors={activeState.errors} />
              <StatusMessage state={activeState} />
              <button
                type="submit"
                disabled={activeState.loading}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                {activeState.loading ? "Submitting" : "Submit Brand Vendor Application"}
              </button>
            </form>
          )}

          {active === "food-vendor" && (
            <form className="grid gap-5" onSubmit={(event) => handleSubmit("food-vendor", event)}>
              <input className="hidden" tabIndex={-1} autoComplete="off" name="company" aria-hidden="true" />
              <div className="rounded-md border border-fuchsia-300/40 bg-fuchsia-300/10 p-4 text-sm font-bold leading-6 text-fuchsia-100">
                Limited food vendor spots available.
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Business name" name="businessName" errors={activeState.errors} required />
                <Field label="Contact name" name="contactName" errors={activeState.errors} required />
                <Field label="Email" name="email" type="email" errors={activeState.errors} required />
                <Field label="Phone number" name="phone" type="tel" errors={activeState.errors} required />
                <Field label="Cuisine type" name="cuisineType" errors={activeState.errors} required />
                <Field label="Website or Instagram" name="websiteOrInstagram" errors={activeState.errors} />
              </div>
              <Field label="Message" name="message" errors={activeState.errors}>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-md border border-white/15 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30"
                />
              </Field>
              <ConsentFields type="food-vendor" errors={activeState.errors} />
              <StatusMessage state={activeState} />
              <button
                type="submit"
                disabled={activeState.loading}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                {activeState.loading ? "Submitting" : "Submit Food Vendor Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
