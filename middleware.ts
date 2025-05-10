// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import createMiddleware from 'next-intl/middleware';

// import { routing } from './i18n/routing';

// const handleI18nRouting = createMiddleware(routing);

// const isProtectedRoute = createRouteMatcher(['/:locale/dashboard(.*)']);

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) await auth.protect();

//   return handleI18nRouting(req);
// });

// export const config = {
//   matcher: ['/', '/(uk|ru)/:path*'],
// };

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);
const isProtectedRoute = createRouteMatcher(['/:locale/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();

  // 💡 Обязательно сохранить ответ от next-intl middleware
  const intlResponse = handleI18nRouting(req);
  if (intlResponse) return intlResponse;

  return NextResponse.next();
});

export const config = {
  matcher: ['/', '/(uk|ru)/:path*'],
};
