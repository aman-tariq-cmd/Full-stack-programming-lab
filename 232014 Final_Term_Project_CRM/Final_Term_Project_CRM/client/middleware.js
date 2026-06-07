import { NextResponse } from 'next/server';

const TOKEN_KEY = 'crm_token';

export function middleware(request) {
  const rawToken = request.cookies.get(TOKEN_KEY)?.value;
  const token = rawToken ? decodeURIComponent(rawToken) : null;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isDashboard = pathname === '/dashboard' || pathname.startsWith('/dashboard/');

  if (isDashboard && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/login', '/register'],
};
