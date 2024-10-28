export async function getAccessToken(code: string) {
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

  return await accessTokenResponse.json();
}

//option: "user" | "user/emails"
export async function getGithubUserProfile(
  access_token: string,
  token_type: string,
) {
  const userProfileResponse = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
    cache: "no-cache",
  });

  const result = await userProfileResponse.json();

  return result;
}
interface Email {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}
export async function getGithubUserEmail(
  access_token: string,
  token_type: string,
) {
  const userEmailResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
    cache: "no-cache",
  });

  const emails = await userEmailResponse.json();

  return emails.find(
    (email: Email) =>
      email.primary === true &&
      email.verified === true &&
      email.visibility === "public",
  ).email;
}
