import { z } from "zod";

export const audienceInterestValues = ["CREATOR", "BUSINESS", "FAN_COMMUNITY"] as const;
export const creatorOpportunityValues = [
  "GETONVIBE_ASSIGNMENTS",
  "COORDINATED_BRAND_CAMPAIGNS",
  "DIRECT_BRAND_COLLABORATIONS",
  "EVENTS_ACTIVATIONS",
  "GENERAL_CREATOR_ONBOARDING",
  "FUTURE_MEMBERSHIP_UPDATES",
] as const;

export const platformLeadSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name.").max(120),
    email: z.string().trim().toLowerCase().email("Enter a valid email address."),
    audienceInterests: z.array(z.enum(audienceInterestValues)).min(1, "Choose at least one interest."),
    creatorOpportunityInterests: z.array(z.enum(creatorOpportunityValues)).default([]),
    website: z
      .union([
        z.literal(""),
        z.string().trim().url("Enter a complete website or social URL.").refine(
          (value) => /^https?:\/\//i.test(value),
          "Use a complete http or https link.",
        ),
      ])
      .optional(),
    source: z.string().trim().max(160).optional(),
    consent: z.literal(true, { error: "Consent is required." }),
    company: z.string().trim().optional(),
  })
  .superRefine((value, context) => {
    if (value.creatorOpportunityInterests.length > 0 && !value.audienceInterests.includes("CREATOR")) {
      context.addIssue({
        code: "custom",
        path: ["creatorOpportunityInterests"],
        message: "Select Creator to join creator opportunity updates.",
      });
    }
  });

export type PlatformLeadPayload = z.infer<typeof platformLeadSchema>;

export const audienceInterestLabels: Record<(typeof audienceInterestValues)[number], string> = {
  CREATOR: "Creator",
  BUSINESS: "Business",
  FAN_COMMUNITY: "Fan / Community",
};

export const creatorOpportunityLabels: Record<(typeof creatorOpportunityValues)[number], string> = {
  GETONVIBE_ASSIGNMENTS: "GetOnVibe promotional assignments",
  COORDINATED_BRAND_CAMPAIGNS: "Coordinated brand campaigns",
  DIRECT_BRAND_COLLABORATIONS: "Direct brand collaborations",
  EVENTS_ACTIVATIONS: "Events and activations",
  GENERAL_CREATOR_ONBOARDING: "General creator onboarding",
  FUTURE_MEMBERSHIP_UPDATES: "Future membership updates",
};
