import { useCallback, useRef } from 'react';
import useCsrfToken from '~/core/hooks/use-csrf-token';

const CSRF_TOKEN_HEADER = 'x-csrf-token';

function useFetch<Body = unknown>(
  path: string,
  method: HttpMethod = 'POST',
  config?: Partial<{
    headers: StringObject;
    redirect: RequestRedirect;
  }>
) {
  const headersRef = useRef(config?.headers);
  const csrfToken = useCsrfToken();

  return useCallback(
    (body: Body) => {
      if (!headersRef.current) {
        headersRef.current = {};
      }

      if (csrfToken) {
        headersRef.current[CSRF_TOKEN_HEADER] = csrfToken;
      }

      return buildFetchRequest({
        url: path,
        body: JSON.stringify(body),
        method,
        headers: headersRef.current,
      });
    },
    [csrfToken, method, path]
  );
}

async function buildFetchRequest(params: {
  url: string;
  body: string;
  method: string;
  redirect?: RequestRedirect;
  headers?: StringObject;
}) {
  const { url, method, body, redirect, headers } = params;

  const options: RequestInit = {
    method,
    redirect,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
  };

  const methodsSupportingBody: HttpMethod[] = ['POST', 'PUT', 'DELETE'];
  const supportsBody = methodsSupportingBody.includes(method as HttpMethod);

  if (body && supportsBody) {
    options.body = body;
  }

  return fetch(url, options);
}

export default useFetch;
