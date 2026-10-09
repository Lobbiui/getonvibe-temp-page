import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { contactInquirySchema } from "@/lib/contact-inquiry";
import { sendContactInquiryEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = contactInquirySchema.parse(await request.json());
    const sent = await sendContactInquiryEmail(payload);

    if (!sent) {
      return NextResponse.json({ ok: false, message: "We could not send your message right now. Please try again shortly." }, { status: 503 });
    }

    return NextResponse.json({ ok: true, message: "Thank you. Your message has been sent to the GetOnVibe team." });
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = Object.fromEntries(error.issues.map((issue) => [String(issue.path[0] || "form"), issue.message]));
      return NextResponse.json({ ok: false, message: "Review the highlighted fields and try again.", fieldErrors }, { status: 400 });
    }

    console.error("Contact inquiry submission failed", { reason: error instanceof Error ? error.message : "Unknown error" });
    return NextResponse.json({ ok: false, message: "We could not send your message right now. Please try again shortly." }, { status: 500 });
  }
}
