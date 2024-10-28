import { NextRequest, NextResponse } from "next/server";
import getSession from "./libs/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/auth/login": true,
  "/auth/login/sms": true,
  "/auth/login/sms/confirm": true,
  "/auth/create-account": true,
  "/auth/login/github": true,
  "/auth/login/github/complete": true,
};
export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
