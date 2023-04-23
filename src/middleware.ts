import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyToken } from './services/authentication.service';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthRoute = isAuth(request.nextUrl.pathname);

  if (!token) {
    if (!isAuthRoute) {
      return redirectToAuthUrl(request);
    }
    return NextResponse.next();
  }

  const verification = await verifyToken(token.value);
  console.log(isAuthRoute, verification.data?.authenticated);

  if (!isAuthRoute && !verification.data?.authenticated) {
    return redirectToAuthUrl(request);
  }
  if (isAuthRoute) {
    if (!verification.data?.authenticated) {
      return NextResponse.next();
    }
    return redirectToMainUrl(request);
  }

  return NextResponse.next();
}

function isAuth(route: string) {
  const authRoutes = ['/auth', '/auth/signup'];
  if (authRoutes.includes(route)) {
    return true;
  }
  return false;
}

function redirectToAuthUrl(request: NextRequest) {
  const signinUrl = new URL('/auth', request.url);
  return NextResponse.redirect(signinUrl);
}

function redirectToMainUrl(request: NextRequest) {
  const signinUrl = new URL('/', request.url);
  return NextResponse.redirect(signinUrl);
}

export const config = {
  matcher: ['/', '/auth', '/auth/signup', '/account', '/transaction'],
};
