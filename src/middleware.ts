import { NextRequest, NextResponse } from 'next/server';
import csrf from 'edge-csrf';

import HttpStatusCode from '~/core/generic/http-status-code.enum';
import configuration from '~/configuration';
import createMiddlewareClient from '~/core/supabase/middleware-client';
import GlobalRole from '~/core/session/types/global-role';

const CSRF_SECRET_COOKIE = 'csrfSecret';
const NEXT_ACTION_HEADER = 'next-action';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|locales|assets|api/stripe/webhook).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // const csrfResponse = await withCsrfMiddleware(request, response);
  const sessionResponse = await sessionMiddleware(request, response);

  return await adminMiddleware(request, sessionResponse);
}

async function sessionMiddleware(req: NextRequest, res: NextResponse) {
  const supabase = createMiddlewareClient(req, res);

  await supabase.auth.getSession();

  return res;
}

async function withCsrfMiddleware(
  request: NextRequest,
  response = new NextResponse(),
) {
  
  const csrfMiddleware = csrf({
    cookie: {
      secure: configuration.production,
      name: CSRF_SECRET_COOKIE,
    },
    ignoreMethods: isServerAction(request)
      ? ['POST']
      : 
        ['GET', 'HEAD', 'OPTIONS'],
  });

  const csrfError = await csrfMiddleware(request, response);

  if (csrfError) {
    return NextResponse.json('Invalid CSRF token', {
      status: HttpStatusCode.Forbidden,
    });
  }

  return response;
}

function isServerAction(request: NextRequest) {
  const headers = new Headers(request.headers);

  return headers.has(NEXT_ACTION_HEADER);
}

async function adminMiddleware(request: NextRequest, response: NextResponse) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  if (!isAdminPath) {
    return response;
  }

  const supabase = createMiddlewareClient(request, response);
  const user = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(configuration.paths.signIn);
  }

  const role = user.data.user?.app_metadata['role'];

  if (!role || role !== GlobalRole.SuperAdmin) {
    return NextResponse.redirect(`${configuration.site.siteUrl}/404`);
  }

  return response;
}
