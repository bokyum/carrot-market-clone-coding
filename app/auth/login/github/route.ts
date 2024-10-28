import { redirect } from "next/navigation";

const baseURL = "https://github.com/login/oauth/authorize";

export function GET() {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
    allow_signup: "true",
  };
  const formmatedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formmatedParams}`;
  return redirect(finalURL);
}
