import db from "@/libs/db";
import {
  getAccessToken,
  getGithubUserEmail,
  getGithubUserProfile,
} from "@/libs/github";

import { saveSession } from "@/libs/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }
  const { error, access_token, token_type } = await getAccessToken(code);
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const { id, avartar_url, login } = await getGithubUserProfile(
    access_token,
    token_type,
  );
  // email 정보 찾기
  const email = await getGithubUserEmail(access_token, token_type);

  let user = await db.user.findUnique({
    where: {
      github_id: String(id),
    },
    select: {
      id: true,
    },
  });
  if (!user) {
    user = await db.user.create({
      data: {
        github_id: String(id),
        avatar: avartar_url,
        username: login,
        email,
      },
      select: {
        id: true,
      },
    });
  }
  await saveSession(user.id);
  return redirect("/profile");
}
