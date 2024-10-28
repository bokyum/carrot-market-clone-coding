import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default async function getSession() {
  const cookieData = await cookies();

  return getIronSession<SessionContent>(cookieData, {
    cookieName: process.env.COOKIE_USER_ID!,
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function saveSession(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
}

export async function clearSession() {
  const session = await getSession();
  session.destroy();
}
