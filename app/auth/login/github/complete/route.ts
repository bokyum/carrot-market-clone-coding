import db from "@/libs/db";
import getSession from "@/libs/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const { error, access_token, token_type } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
    cache: "no-cache",
  });

  const { id, avartar_url, login } = await userProfileResponse.json();

  let user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (!user) {
    user = await db.user.create({
      data: {
        github_id: id + "",
        avatar: avartar_url,
        username: login,
      },
      select: {
        id: true,
      },
    });
  }

  const session = await getSession();
  session.id = user.id;
  await session.save();
  return redirect("/profile");
}
