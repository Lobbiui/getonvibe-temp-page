import { AccountRole, MessageAudience, VendorType } from "@prisma/client";
import { z } from "zod";

const emailSchema = z.string().trim().email("Enter a valid email address.").toLowerCase();
const passwordSchema = z.string().min(8, "Password must be at least 8 characters.");
const requiredText = (label: string) => z.string().trim().min(1, `${label} is required.`);
const optionalText = z.preprocess(
  (value) => (value === null || value === "" ? undefined : value),
  z.string().trim().optional(),
);

export const accountRegisterSchema = z.object({
  role: z.enum(AccountRole),
  name: requiredText("Name"),
  email: emailSchema,
  phone: optionalText,
  password: passwordSchema,
  city: optionalText,
  instagram: optionalText,
  businessName: optionalText,
  vendorType: z.enum(VendorType).optional(),
  website: optionalText,
  notes: optionalText,
});

export const accountLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
});

export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});

export const passwordResetSchema = z.object({
  token: requiredText("Reset token"),
  password: passwordSchema,
});

export const adminLoginSchema = accountLoginSchema;

export const eventSchema = z.object({
  title: requiredText("Title"),
  city: requiredText("City"),
  venue: optionalText,
  address: optionalText,
  startsAt: requiredText("Start date and time"),
  endsAt: optionalText,
  description: optionalText,
  isPublished: z.boolean().default(true),
});

export const interestSchema = z.object({
  eventId: requiredText("Event"),
  note: optionalText,
});

export const cantMakeSchema = z.object({
  interestId: requiredText("Interest"),
  note: optionalText,
});

export const adminAccountActionSchema = z.object({
  accountId: requiredText("Account"),
});

export const adminSelectSchema = z.object({
  interestId: requiredText("Interest"),
});

export const adminMessageSchema = z.object({
  audience: z.enum(MessageAudience),
  eventId: optionalText,
  accountId: optionalText,
  subject: requiredText("Subject"),
  body: requiredText("Message"),
});

export const modelReleaseSchema = z.object({
  legalName: requiredText("Legal name"),
  dateOfBirth: requiredText("Date of birth"),
  email: emailSchema,
  phone: requiredText("Phone"),
  streetAddress: requiredText("Street address"),
  city: requiredText("City"),
  state: requiredText("State"),
  zip: requiredText("ZIP"),
  signature: requiredText("Digital signature"),
  agreementAccepted: z.literal(true, {
    error: "You must agree to the model release before signing.",
  }),
});

export type AccountRegisterInput = z.infer<typeof accountRegisterSchema>;
