import { AccountRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { accountRegisterSchema } from "@/lib/dashboard-validation";
import { hashPassword } from "@/lib/password";
import { sendAccountApprovedEmail, sendAccountRegisteredEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = accountRegisterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.role === AccountRole.VENDOR && !data.businessName) {
    return NextResponse.json(
      { ok: false, message: "Business name is required for vendors.", fieldErrors: { businessName: ["Business name is required."] } },
      { status: 400 },
    );
  }

  try {
    const account = await prisma.account.create({
      data: {
        role: data.role,
        status: "APPROVED",
        name: data.name,
        email: data.email,
        phone: data.phone,
        passwordHash: await hashPassword(data.password),
        city: data.city,
        instagram: data.instagram,
        businessName: data.businessName,
        vendorType: data.vendorType,
        website: data.website,
        notes: data.notes,
        approvedAt: new Date(),
      },
    });

    await sendAccountRegisteredEmail(account).catch((error) => {
      console.error("Account registration notification failed", error instanceof Error ? error.message : "Unknown error");
    });

    await sendAccountApprovedEmail(account).catch((error) => {
      console.error("Account welcome email failed", error instanceof Error ? error.message : "Unknown error");
    });

    return NextResponse.json({
      ok: true,
      message: "Your account is ready. Log in to see upcoming events.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message.includes("Unique constraint")) {
      return NextResponse.json(
        { ok: false, message: "An account already exists for that email." },
        { status: 409 },
      );
    }

    console.error("Account registration failed", "Database write failed");
    return NextResponse.json({ ok: false, message: "Registration failed. Please try again." }, { status: 500 });
  }
}
