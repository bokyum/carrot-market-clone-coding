import { NextRequest } from "next/server";
import getSession from "./libs/session";

// 모든 request에 대해 middleware를 실행

const protectedRoutes = ["/profile", "/settings"];

export async function middleware(request: NextRequest) {
  const session = await getSession();
  console.log(session);
  const pathname = request.nextUrl.pathname;
  if (protectedRoutes.includes(pathname)) {
    return Response.redirect(new URL("/", request.url), 302);
  }
}
