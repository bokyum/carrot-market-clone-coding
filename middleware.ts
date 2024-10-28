import { NextRequest } from "next/server";

// 모든 request에 대해 middleware를 실행

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(pathname);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
