import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET /users ", request);
  return Response.json({
    ok: true,
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("POST /users ", data);
  return Response.json({
    ok: true,
  });
}
