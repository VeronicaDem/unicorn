import { NextRequest, NextResponse } from "next/server";
import isAuth from "./features/auth";
import { Roles } from "./features/auth/";

export default async function middleware(request: NextRequest) {
  return isAuth(request)
    .then((authUser) => {
      if (
        !request.nextUrl.pathname.startsWith("/forbidden") &&
        !request.nextUrl.pathname.startsWith("/signin")
      ) {
        if (!authUser) {
          return NextResponse.redirect(
            new URL("/signin", request.nextUrl.origin)
          );
        }
        return Roles.isResolved(request)
          .then((isResolved) => {
            if (!isResolved) {
              return NextResponse.redirect(
                new URL("/forbidden", request.nextUrl.origin)
              );
            } else {
              return NextResponse.next();
            }
          })
          .catch((err) => {
            console.log("Error. Redirect to forbidden page", err);
            return NextResponse.redirect(
              new URL("/forbidden", request.nextUrl.origin)
            );
          });
      }
      return NextResponse.next();
    })
    .catch((err) => {
      return NextResponse.redirect(new URL("/signin", request.nextUrl.origin));
    });
}
