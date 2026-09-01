import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const adminCookie = "onvibe_admin_session";
const accountCookie = "onvibe_account_session";
const encoder = new TextEncoder();

type AdminSession = {
  kind: "admin";
  email: string;
};

type AccountSession = {
  kind: "account";
  accountId: string;
};

function getSessionSecret() {
  const secret = process.env.AUTH_SECRET || process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be set to at least 32 characters.");
  }

  return encoder.encode(secret);
}

async function signSession(payload: AdminSession | AccountSession) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSessionSecret());
}

async function verifySession<T>(token: string, kind: string) {
  const result = await jwtVerify(token, getSessionSecret());

  if (result.payload.kind !== kind) {
    return null;
  }

  return result.payload as T;
}

export async function createAdminSession(email: string) {
  const cookieStore = await cookies();
  const token = await signSession({ kind: "admin", email });

  cookieStore.set(adminCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookie)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifySession<AdminSession>(token, "admin");
  } catch {
    return null;
  }
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookie);
}

export async function createAccountSession(accountId: string) {
  const cookieStore = await cookies();
  const token = await signSession({ kind: "account", accountId });

  cookieStore.set(accountCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAccountSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(accountCookie)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifySession<AccountSession>(token, "account");
  } catch {
    return null;
  }
}

export async function clearAccountSession() {
  const cookieStore = await cookies();
  cookieStore.delete(accountCookie);
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL?.trim().toLowerCase() || "",
    passwordHash: process.env.ADMIN_PASSWORD_HASH || "",
  };
}
