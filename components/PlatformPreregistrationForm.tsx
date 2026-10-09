"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  audienceInterestLabels,
  audienceInterestValues,
  creatorOpportunityLabels,
  creatorOpportunityValues,
} from "@/lib/platform-preregistration";

type AudienceInterest = (typeof audienceInterestValues)[number];
type CreatorOpportunity = (typeof creatorOpportunityValues)[number];

type SubmitState = {
  loading: boolean;
  ok: boolean;
  message: string;
  fieldErrors: Record<string, string>;
};

const initialState: SubmitState = { loading: false, ok: false, message: "", fieldErrors: {} };

export function PlatformPreregistrationForm({
  defaultInterest,
  source = "public-website",
  heading = "Find your place in what comes next.",
}: {
  defaultInterest?: AudienceInterest;
  source?: string;
  heading?: string;
}) {
  const [audienceInterests, setAudienceInterests] = useState<AudienceInterest[]>(
    defaultInterest ? [defaultInterest] : [],
  );
  const [creatorInterests, setCreatorInterests] = useState<CreatorOpportunity[]>([]);
  const [state, setState] = useState(initialState);
  const isCreator = audienceInterests.includes("CREATOR");
  const audienceSummary = useMemo(
    () => audienceInterests.map((interest) => audienceInterestLabels[interest]).join(", "),
    [audienceInterests],
  );

  function toggleAudience(interest: AudienceInterest) {
    setAudienceInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest],
    );
  }

  function toggleCreatorInterest(interest: CreatorOpportunity) {
    setCreatorInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest],
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState({ ...initialState, loading: true });

    try {
      const response = await fetch("/api/preregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          website: data.get("website"),
          audienceInterests,
          creatorOpportunityInterests: isCreator ? creatorInterests : [],
          source,
          consent: data.get("consent") === "on",
          company: data.get("company"),
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!response.ok || !result.ok) {
        setState({
          loading: false,
          ok: false,
          message: result.message || "We could not save your interest. Please try again.",
          fieldErrors: result.fieldErrors || {},
        });
        return;
      }

      form.reset();
      setAudienceInterests(defaultInterest ? [defaultInterest] : []);
      setCreatorInterests([]);
      setState({ loading: false, ok: true, message: result.message || "You are on the list.", fieldErrors: {} });
    } catch {
      setState({
        loading: false,
        ok: false,
        message: "We could not reach the signup service. Your form has not been submitted yet.",
        fieldErrors: {},
      });
    }
  }

  return (
    <section className="gateway-preregister" id="early-access" aria-labelledby="early-access-title">
      <div className="gateway-preregister-intro">
        <p>GetOnVibe Early Access</p>
        <h2 id="early-access-title">{heading}</h2>
        <span>Select every path that fits. You can be a creator, run a business, and still join as a fan.</span>
        <strong>This joins an interest list. It does not create an active platform account.</strong>
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
          <label className="gateway-form-wide">
            <span>Website or primary social link <em>Optional</em></span>
            <input name="website" type="url" inputMode="url" placeholder="https://" />
            {state.fieldErrors.website && <small>{state.fieldErrors.website}</small>}
          </label>
        </div>

        <fieldset>
          <legend>I&apos;m interested as a</legend>
          <div className="gateway-choice-grid gateway-audience-choices">
            {audienceInterestValues.map((interest) => {
              const selected = audienceInterests.includes(interest);
              return (
                <label className={selected ? "is-selected" : ""} key={interest}>
                  <input
                    checked={selected}
                    onChange={() => toggleAudience(interest)}
                    type="checkbox"
                    value={interest}
                  />
                  <i aria-hidden="true">{selected && <Check size={15} />}</i>
                  <span>{audienceInterestLabels[interest]}</span>
                </label>
              );
            })}
          </div>
          {state.fieldErrors.audienceInterests && <small>{state.fieldErrors.audienceInterests}</small>}
        </fieldset>

        {isCreator && (
          <fieldset className="gateway-opportunity-choices">
            <legend>Creator opportunities I want to hear about</legend>
            <div className="gateway-choice-grid">
              {creatorOpportunityValues.map((interest) => {
                const selected = creatorInterests.includes(interest);
                return (
                  <label className={selected ? "is-selected" : ""} key={interest}>
                    <input
                      checked={selected}
                      onChange={() => toggleCreatorInterest(interest)}
                      type="checkbox"
                      value={interest}
                    />
                    <i aria-hidden="true">{selected && <Check size={15} />}</i>
                    <span>{creatorOpportunityLabels[interest]}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        <label className="gateway-consent">
          <input name="consent" type="checkbox" required />
          <span>I agree to receive GetOnVibe early-access and opportunity updates. I understand that joining does not guarantee onboarding, selection, compensation, or an active account.</span>
        </label>
        {state.fieldErrors.consent && <small>{state.fieldErrors.consent}</small>}

        <div className="gateway-form-submit">
          <button type="submit" disabled={state.loading || audienceInterests.length === 0}>
            {state.loading ? "Joining the list" : "Join Early Access"} <ArrowRight size={18} />
          </button>
          <span>{audienceSummary || "Choose at least one path to continue."}</span>
        </div>

        {state.message && (
          <p className={`gateway-form-status ${state.ok ? "is-success" : ""}`} role="status" aria-live="polite">
            {state.message}
          </p>
        )}
      </form>
    </section>
  );
}
