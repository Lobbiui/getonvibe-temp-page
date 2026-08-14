"use client";

import { ClipboardCheck, Mail, Megaphone, Store, UserRound, Utensils } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  attendeeSchema,
  brandVendorSchema,
  foodVendorSchema,
  modelSchema,
  productCategories,
  successMessages,
  type SubmissionType,
} from "@/lib/validation";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";

type HubSubmissionType = "attendee" | "model" | "food-vendor" | "brand-vendor";
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

const tabs: Array<{
  type: HubSubmissionType;
  label: string;
  kicker: string;
  icon: typeof Mail;
}> = [
  { type: "attendee", label: "Attend", kicker: "Get event drops", icon: Mail },
  { type: "model", label: "Models", kicker: "Join activations", icon: UserRound },
  { type: "food-vendor", label: "Food Vendors", kicker: "Feed the crowd", icon: Utensils },
  { type: "brand-vendor", label: "Brands", kicker: "Activate onsite", icon: Store },
];

function formDataValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function payloadFromForm(type: HubSubmissionType, formData: FormData) {
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

  if (type === "model") {
    return {
      ...base,
      fullName: formDataValue(formData, "fullName"),
      email: formDataValue(formData, "email"),
      phone: formDataValue(formData, "phone"),
      city: formDataValue(formData, "city"),
      instagram: formDataValue(formData, "instagram"),
      experience: formDataValue(formData, "experience"),
      ageConfirmation: formData.get("ageConfirmation") === "on",
    };
  }

  if (type === "food-vendor") {
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

function schemaForType(type: HubSubmissionType) {
  if (type === "attendee") {
    return attendeeSchema;
  }

  if (type === "model") {
    return modelSchema;
  }

  if (type === "food-vendor") {
    return foodVendorSchema;
  }

  return brandVendorSchema;
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
      <label htmlFor={name} className="mb-2 block text-sm font-black uppercase tracking-[0.12em] text-slate-100">
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
          className="min-h-12 w-full rounded-md border border-white/15 bg-black/55 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30"
        />
      )}
      {errors[name] && (
        <p id={errorId} className="mt-2 text-sm font-bold text-pink-200">
          {errors[name]}
        </p>
      )}
    </div>
  );
}

function ConsentFields({ type, errors }: { type: HubSubmissionType; errors: FieldErrors }) {
  return (
    <div className="space-y-3">
      {type === "model" && (
        <label className="flex gap-3 rounded-md border border-pink-400/25 bg-pink-500/10 p-4 text-sm leading-6 text-slate-100">
          <input name="ageConfirmation" type="checkbox" className="mt-1 h-4 w-4 accent-pink-400" />
          <span>I confirm I am 18 or older and available for event activation review.</span>
        </label>
      )}
      {errors.ageConfirmation && (
        <p className="text-sm font-bold text-pink-200">{errors.ageConfirmation}</p>
      )}

      {type === "brand-vendor" && (
        <label className="flex gap-3 rounded-md border border-cyan-300/25 bg-cyan-300/10 p-4 text-sm leading-6 text-slate-100">
          <input name="coaConfirmation" type="checkbox" className="mt-1 h-4 w-4 accent-cyan-300" />
          <span>
            I confirm this brand operates in the legal hemp space where applicable and can provide active, verifiable COAs for applicable products.
          </span>
        </label>
      )}
      {errors.coaConfirmation && (
        <p className="text-sm font-bold text-pink-200">{errors.coaConfirmation}</p>
      )}

      <label className="flex gap-3 rounded-md border border-white/15 bg-white/5 p-4 text-sm leading-6 text-slate-200">
        <input name="consent" type="checkbox" className="mt-1 h-4 w-4 accent-cyan-300" />
        <span>I consent to receive ONVIBE Events and GetOnVibe communications.</span>
      </label>
      {errors.consent && <p className="text-sm font-bold text-pink-200">{errors.consent}</p>}
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
          : "border-pink-300/40 bg-pink-500/10 text-pink-100",
      )}
      role="status"
    >
      {state.message}
    </div>
  );
}

export function SignupForms() {
  const [active, setActive] = useState<HubSubmissionType>("attendee");
  const [states, setStates] = useState<Record<HubSubmissionType, SubmitState>>({
    attendee: initialState,
    model: initialState,
    "food-vendor": initialState,
    "brand-vendor": initialState,
  });

  const activeState = states[active];
  const activeTab = useMemo(() => tabs.find((tab) => tab.type === active), [active]);

  async function handleSubmit(type: HubSubmissionType, event: FormEvent<HTMLFormElement>) {
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
          message: result.message || successMessages[type as SubmissionType],
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
      eyebrow="Get involved"
      title="Choose your lane."
      copy="Attend the next event, apply for model activations, bring a food truck, or put your brand in front of the ONVIBE crowd."
    >
      <div id="models" className="absolute -mt-24" aria-hidden="true" />
      <div id="food-vendors" className="absolute -mt-24" aria-hidden="true" />
      <div id="brands" className="absolute -mt-24" aria-hidden="true" />
      <div className="glass-panel glow-border rounded-lg p-4 sm:p-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4" role="tablist" aria-label="ONVIBE signup forms">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              type="button"
              role="tab"
              aria-selected={active === tab.type}
              onClick={() => setActive(tab.type)}
              className={cn(
                "min-h-20 rounded-md border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-300",
                active === tab.type
                  ? "border-pink-400 bg-pink-500 text-white shadow-[0_0_28px_rgba(236,72,153,0.35)]"
                  : "border-white/15 bg-white/5 text-slate-200 hover:border-cyan-300",
              )}
            >
              <span className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em]">
                <tab.icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </span>
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] opacity-80">
                {tab.kicker}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-7">
          <div className="mb-5 flex items-center gap-3">
            {activeTab && <activeTab.icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />}
            <h3 className="text-2xl font-black text-white">{activeTab?.label}</h3>
          </div>

          {active === "attendee" && (
            <form className="grid gap-5" onSubmit={(event) => handleSubmit("attendee", event)}>
              <input className="hidden" tabIndex={-1} autoComplete="off" name="company" aria-hidden="true" />
              <div className="rounded-md border border-cyan-300/35 bg-cyan-300/10 p-4 text-sm font-bold leading-6 text-cyan-100">
                Get event drops, location updates, special announcements, and GetOnVibe launch news first.
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name" name="fullName" errors={activeState.errors} required />
                <Field label="Email" name="email" type="email" errors={activeState.errors} required />
                <Field label="Phone number" name="phone" type="tel" errors={activeState.errors} required />
                <Field label="Date of birth" name="dateOfBirth" type="date" errors={activeState.errors} required />
              </div>
              <ConsentFields type="attendee" errors={activeState.errors} />
              <StatusMessage state={activeState} />
              <button type="submit" disabled={activeState.loading} className="event-submit-button">
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                {activeState.loading ? "Submitting" : "Get Event Updates"}
              </button>
            </form>
          )}

          {active === "model" && (
            <form className="grid gap-5" onSubmit={(event) => handleSubmit("model", event)}>
              <input className="hidden" tabIndex={-1} autoComplete="off" name="company" aria-hidden="true" />
              <div className="rounded-md border border-pink-300/35 bg-pink-500/10 p-4 text-sm font-bold leading-6 text-pink-100">
                Model applicants can be reviewed for ONVIBE event activations, carwash teams, photo moments, and future promotional events.
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name" name="fullName" errors={activeState.errors} required />
                <Field label="Email" name="email" type="email" errors={activeState.errors} required />
                <Field label="Phone number" name="phone" type="tel" errors={activeState.errors} required />
                <Field label="City" name="city" errors={activeState.errors} required />
                <Field label="Instagram" name="instagram" errors={activeState.errors} required />
              </div>
              <Field label="Experience / notes" name="experience" errors={activeState.errors}>
                <textarea id="experience" name="experience" rows={4} className="event-textarea" />
              </Field>
              <ConsentFields type="model" errors={activeState.errors} />
              <StatusMessage state={activeState} />
              <button type="submit" disabled={activeState.loading} className="event-submit-button">
                <UserRound className="h-4 w-4" aria-hidden="true" />
                {activeState.loading ? "Submitting" : "Apply For Model Activations"}
              </button>
            </form>
          )}

          {active === "food-vendor" && (
            <form className="grid gap-5" onSubmit={(event) => handleSubmit("food-vendor", event)}>
              <input className="hidden" tabIndex={-1} autoComplete="off" name="company" aria-hidden="true" />
              <div className="rounded-md border border-cyan-300/35 bg-cyan-300/10 p-4 text-sm font-bold leading-6 text-cyan-100">
                Food trucks and food vendors can apply for ONVIBE event opportunities and future tour stops.
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
                <textarea id="message" name="message" rows={4} className="event-textarea" />
              </Field>
              <ConsentFields type="food-vendor" errors={activeState.errors} />
              <StatusMessage state={activeState} />
              <button type="submit" disabled={activeState.loading} className="event-submit-button">
                <Utensils className="h-4 w-4" aria-hidden="true" />
                {activeState.loading ? "Submitting" : "Submit Food Vendor Inquiry"}
              </button>
            </form>
          )}

          {active === "brand-vendor" && (
            <form className="grid gap-5" onSubmit={(event) => handleSubmit("brand-vendor", event)}>
              <input className="hidden" tabIndex={-1} autoComplete="off" name="company" aria-hidden="true" />
              <div className="rounded-md border border-pink-300/35 bg-pink-500/10 p-4 text-sm font-bold leading-6 text-pink-100">
                Brands can apply for vendor spots, sponsorships, giveaways, and onsite activation opportunities.
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Brand name" name="brandName" errors={activeState.errors} required />
                <Field label="Contact name" name="contactName" errors={activeState.errors} required />
                <Field label="Email" name="email" type="email" errors={activeState.errors} required />
                <Field label="Phone number" name="phone" type="tel" errors={activeState.errors} required />
                <Field label="Website or Instagram" name="websiteOrInstagram" errors={activeState.errors} />
                <Field label="Category" name="productCategory" errors={activeState.errors} required>
                  <select id="productCategory" name="productCategory" required className="event-select">
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
                <textarea id="message" name="message" rows={4} className="event-textarea" />
              </Field>
              <ConsentFields type="brand-vendor" errors={activeState.errors} />
              <StatusMessage state={activeState} />
              <button type="submit" disabled={activeState.loading} className="event-submit-button">
                <Megaphone className="h-4 w-4" aria-hidden="true" />
                {activeState.loading ? "Submitting" : "Submit Brand Activation Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
