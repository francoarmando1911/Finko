/** @description Middleware de autenticación — protege rutas privadas y redirige rutas de auth si ya hay sesión */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/** @description Rutas accesibles sin sesión iniciada */
const PUBLIC_ROUTES = ["/login", "/registro"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  if (!sessionCookie && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionCookie && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  /* Excluye API, assets estáticos e íconos generados */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon|apple-icon|manifest).*)"],
};