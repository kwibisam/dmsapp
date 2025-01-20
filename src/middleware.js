import { NextResponse } from 'next/server';
import { decrypt } from '@/app/lib/session';
import { cookies } from 'next/headers';

async function getSession(req) {
  const cookie = (await cookies()).get('session')?.value;
  return decrypt(cookie);
}

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const session = await getSession(req);

  // Check if the route is protected (starts with /dashboard)
  const isProtectedRoute = path.startsWith('/dashboard');

  // Check if the route is public
  const publicRoutes = ['/sign-up', '/login', '/'];
  const isPublicRoute = publicRoutes.includes(path);

  // Redirect to /login if accessing a protected route without a valid session
  if (isProtectedRoute && !session?.token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect to /dashboard if accessing a public route while logged in
  if (
    isPublicRoute &&
    session?.token &&
    !path.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // Proceed to the requested route
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
