import { z } from "zod";
import { isAtLeastTwentyOne } from "@/lib/age";

export const submissionTypes = ["attendee", "brand-vendor", "food-vendor", "hotel-partner"] as const;

const phoneSchema = z.string().trim().min(7, "Phone number is required.");
const emailSchema = z.string().trim().email("Enter a valid email address.");
const requiredText = (label: string) => z.string().trim().min(1, `${label} is required.`);
const optionalText = z.string().trim().optional();
const consentSchema = z.literal(true, {
  error: "Consent is required.",
});

const baseSchema = z.object({
  sourcePage: z.string().trim().optional(),
  company: z.string().trim().optional(),
});

export const attendeeSchema = baseSchema.extend({
  type: z.literal("attendee"),
  fullName: requiredText("Full name"),
  email: emailSchema,
  phone: phoneSchema,
  dateOfBirth: requiredText("Date of birth").refine((value) => isAtLeastTwentyOne(value), {
    message: "You must be 21 or older to attend.",
  }),
  consent: consentSchema,
});

export const productCategories = [
  "Vape",
  "Smoke",
  "Edibles",
  "Glass",
  "Wellness",
  "Accessories",
  "Retailer",
  "Other",
] as const;

export const brandVendorSchema = baseSchema.extend({
  type: z.literal("brand-vendor"),
  brandName: requiredText("Brand name"),
  contactName: requiredText("Contact name"),
  email: emailSchema,
  phone: phoneSchema,
  websiteOrInstagram: optionalText,
  productCategory: z.enum(productCategories, {
    error: "Choose a product category.",
  }),
  message: optionalText,
  coaConfirmation: z.literal(true, {
    error: "Legal hemp and COA confirmation is required.",
  }),
  consent: consentSchema,
});

export const foodVendorSchema = baseSchema.extend({
  type: z.literal("food-vendor"),
  businessName: requiredText("Business name"),
  contactName: requiredText("Contact name"),
  email: emailSchema,
  phone: phoneSchema,
  cuisineType: requiredText("Cuisine type"),
  websiteOrInstagram: optionalText,
  message: optionalText,
  consent: consentSchema,
});

export const hotelPartnershipInterests = [
  "Room Block",
  "Discounted Attendee Rate",
  "Preferred Hotel Listing",
  "Shuttle / Transportation Coordination",
  "Hospitality Package",
  "Sponsorship / Brand Partnership",
  "Other",
] as const;

export const hotelPartnerSchema = baseSchema.extend({
  type: z.literal("hotel-partner"),
  hotelName: requiredText("Hotel / Property Name"),
  contactName: requiredText("Contact name"),
  email: emailSchema,
  phone: phoneSchema,
  propertyAddress: requiredText("Property address"),
  website: optionalText,
  partnershipInterest: z.enum(hotelPartnershipInterests, {
    error: "Choose a partnership interest.",
  }),
  roomCapacity: optionalText,
  message: optionalText,
  consent: consentSchema,
});

export const signupSchema = z.discriminatedUnion("type", [
  attendeeSchema,
  brandVendorSchema,
  foodVendorSchema,
  hotelPartnerSchema,
]);

export type SignupPayload = z.infer<typeof signupSchema>;
export type SubmissionType = SignupPayload["type"];

export const successMessages: Record<SubmissionType, string> = {
  attendee:
    "You are on the list. Watch your inbox for ONVIBE Festival details and GetOnVibe launch updates.",
  "brand-vendor":
    "Your brand vendor inquiry has been received. Our team will review fit, availability, and compliance requirements.",
  "food-vendor":
    "Your food vendor inquiry has been received. Our team will review availability and follow up with next steps.",
  "hotel-partner":
    "Your hotel partnership inquiry has been received. Our team will review the opportunity and follow up with next steps.",
};

export function getEmailFromPayload(payload: SignupPayload) {
  return payload.email;
}

export function getNameFromPayload(payload: SignupPayload) {
  if (payload.type === "attendee") {
    return payload.fullName;
  }

  return payload.contactName;
}
