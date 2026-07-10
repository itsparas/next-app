import { cookies } from "next/headers";

const AUTH_COOKIE = "devnotes-auth";

export type Session = {
  readonly username: string;
  readonly role: "user" | "admin";
};

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(AUTH_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export async function login(): Promise<void> {
  const cookieStore = await cookies();
  const session: Session = { username: "Demo User", role: "admin" };
  cookieStore.set(AUTH_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}
