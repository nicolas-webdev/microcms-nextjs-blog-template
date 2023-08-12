import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const OLD_PATH = "/post/";
const NEW_PATH = "/blog/";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(
    new URL(request.nextUrl.pathname.replace(OLD_PATH, NEW_PATH), request.url)
  );
}

export const config = {
  matcher: "/post/:path*",
};
