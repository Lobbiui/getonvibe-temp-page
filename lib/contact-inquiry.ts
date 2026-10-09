import { z } from "zod";

export const contactInquiryTypes = [
  "PARTNERSHIP",
  "CREATOR_OPPORTUNITY",
  "BUSINESS_CAMPAIGN",
  "EVENT_HOSTING",
  "PRESS_MEDIA",
  "COMMUNITY",
  "OTHER",
] as const;

export const contactInquiryLabels: Record<(typeof contactInquiryTypes)[number], string> = {
  PARTNERSHIP: "Partnership or sponsorship",
  CREATOR_OPPORTUNITY: "Creator opportunity",
  BUSINESS_CAMPAIGN: "Business or campaign",
  EVENT_HOSTING: "Event or hosting",
  PRESS_MEDIA: "Press or media",
  COMMUNITY: "Community connection",
  OTHER: "Something else",
};

const optionalUrl = z.union([z.literal(""), z.string().url("Enter a complete URL, including https://")]);

export const contactInquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "Keep your name under 100 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  organization: z.string().trim().max(120, "Keep the organization name under 120 characters.").optional().default(""),
  website: optionalUrl.optional().default(""),
  inquiryType: z.enum(contactInquiryTypes, { message: "Choose what you want to discuss." }),
  message: z.string().trim().min(20, "Tell us a little more so we can route your message.").max(4000, "Keep your message under 4,000 characters."),
  consent: z.literal(true, { message: "Confirm that GetOnVibe may reply to your inquiry." }),
  company: z.string().max(0).optional().default(""),
});

export type ContactInquiryPayload = z.infer<typeof contactInquirySchema>;
