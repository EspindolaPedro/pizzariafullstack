import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function AuthMiddleware(req: NextRequest) {
  try {
    const token = req.cookies.get("@nextAuth.token")?.value;
    const currentPath = new URL(req.url).pathname;

    if (token && currentPath === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!token && currentPath !== '/') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch (error) {
    console.error('Error fetching or validating token:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/category/:path*', '/product/:path*'], 
};
