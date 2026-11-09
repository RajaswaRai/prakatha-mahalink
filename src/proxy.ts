// middleware.ts (or middleware.js)
// Place this file in your root folder (same level as /app or /src)

import { auth } from "@/auth"; // Path to your Auth.js configuration
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  // Example: If user is not logged in and tries to access /about routes, redirect them
  if (!isLoggedIn && nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // Protects all routes under /about, /dashboard, and /profile
  matcher: ["/about/:path*", "/dashboard/:path*", "/profile/:path*"],
};
