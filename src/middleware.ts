import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./updateSession";

const public_routes = ["/auth/login", "/auth/register", "/auth/e-confirmation"];

export function isPublicRoute(pathname: string) {
  return public_routes.includes(pathname);
}

export async function middleware(request: NextRequest) {
  // Update user session to check authentication status
  const { user, response } = await updateSession(request);
  const path = request.nextUrl.pathname;

  // --- Start of new logic for /auth/e-confirmation ---
  if (path === "/auth/e-confirmation") {
    // 1. If user is authenticated, they don't need to confirm. Redirect to home.
    if (user) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    // 2. If not authenticated, check if they came from the register page
    const referer = request.headers.get("referer");
    // Ensure referer exists and its path is the registration page
    if (referer && new URL(referer).pathname === "/auth/register") {
      // Allow access if coming from registration
      return response;
    }

    // 3. If not authenticated and not from register, redirect to login.
    // This prevents direct URL access.
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  // --- End of new logic ---

  // If user is authenticated and tries to access other public routes (login/register)
  if (user && isPublicRoute(path)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // If route is protected and user is not authenticated, redirect to login
  if (!isPublicRoute(path) && !user) {
    const redirectUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(redirectUrl.toString());
  }

  // Otherwise, allow the request to proceed
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};