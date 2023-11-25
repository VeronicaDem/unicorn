import { NextRequest, NextResponse } from 'next/server'
import isAuth from './features/auth'

export default async function middleware(request: NextRequest) {
    // Call our authentication function to check the request
    if (!isAuth(request) && !request.nextUrl.pathname.startsWith('/forbidden')) {
        // Respond with JSON indicating an error message
        console.log(request.nextUrl)
        return NextResponse.redirect(new URL("/forbidden", request.nextUrl.origin))
    }
    else return NextResponse.next();
}