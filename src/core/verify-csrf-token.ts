import csrf from 'edge-csrf';
import configuration from '~/configuration';
import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';

const CSRF_SECRET_COOKIE = 'csrfSecret';

async function verifyCsrfToken(token: string) {
  const csrfMiddleware = csrf({
    ignoreMethods: [],
    cookie: {
      secure: configuration.production,
      name: CSRF_SECRET_COOKIE,
    },
  });

  const origin = headers().get('referer') as string;
  const secret = cookies().get(CSRF_SECRET_COOKIE)?.value;
  const request = new NextRequest(origin);

  request.headers.set('X-CSRF-Token', token);

  if (secret) {
    request.cookies.set(CSRF_SECRET_COOKIE, secret);
  }

  const csrfError = await csrfMiddleware(request, new NextResponse());

  if (csrfError) {
    throw new Error('Invalid CSRF token');
  }
}

export default verifyCsrfToken;
