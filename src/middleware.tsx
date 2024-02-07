import { NextRequest, NextResponse } from "next/server";
import isAuth from "./features/auth";
import { Roles } from "./features/auth/";

export default async function middleware(request: NextRequest) {
  if (!isAuth(request)) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl.origin));
  }
  if (
    !Roles.isResolved(request) &&
    !request.nextUrl.pathname.startsWith("/forbidden") &&
    !request.nextUrl.pathname.startsWith("/signin")
  ) {
    return NextResponse.redirect(new URL("/forbidden", request.nextUrl.origin));
  } else return NextResponse.next();
}
