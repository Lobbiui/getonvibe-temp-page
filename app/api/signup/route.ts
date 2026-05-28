import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getEmailConfigStatus, sendLeadEmails } from "@/lib/resend";
import { signupSchema, successMessages } from "@/lib/validation";

export const runtime = "nodejs";

function withDevelopmentDebug(
  body: Record<string, unknown>,
  debug: Record<string, unknown>,
) {
  if (process.env.NODE_ENV === "production") {
    return body;
  }

  return {
    ...body,
    debug,
  };
}

function validationResponse(error: ZodError) {
  const fieldErrors = error.issues.reduce<Record<string, string>>((acc, issue) => {
    const field = issue.path.join(".");

    if (field && !acc[field]) {
      acc[field] = issue.message;
    }

    return acc;
  }, {});

  return NextResponse.json(
    {
      ok: false,
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    },
    { status: 400 },
  );
}

function missingEmailConfigResponse() {
  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction
    ? "Signup email service is not configured. Please try again later."
    : "Signup email service is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.";

  if (!isProduction) {
    const status = getEmailConfigStatus();
    console.warn("Signup email configuration missing", status);
  }

  return NextResponse.json({ ok: false, message }, { status: 503 });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Submit valid JSON." },
      { status: 400 },
    );
  }

  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return validationResponse(parsed.error);
  }

  if (parsed.data.company) {
    return NextResponse.json({
      ok: true,
      message: successMessages[parsed.data.type],
    });
  }

  const config = getEmailConfigStatus();

  if (!config.hasApiKey || !config.hasFromEmail) {
    return missingEmailConfigResponse();
  }

  try {
    const emailResult = await sendLeadEmails(parsed.data);

    return NextResponse.json(
      withDevelopmentDebug(
        {
          ok: true,
          message: successMessages[parsed.data.type],
        },
        {
          internalNotificationAttempted: emailResult.internalNotificationAttempted,
          internalNotificationSucceeded: emailResult.internalNotificationSucceeded,
        },
      ),
    );
  } catch (error) {
    console.error("Signup email send failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      {
        ok: false,
        message: "We could not complete the signup right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
