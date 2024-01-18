export function getCookie(name: string) {
  const cookieDict = document.cookie
    .split(';')
    .map((x) => x.split('='))
    .reduce((accum, current) => {
      accum[current[0].trim()] = current[1];
      return accum;
    }, Object());

  return cookieDict[name];
}

export function setCookie(
  name: string,
  value: string,
  options: {
    path?: string;
    expires?: Date;
    sameSite?: 'strict' | 'lax' | 'none';
    httpOnly?: boolean;
  } = {
    path: '/',
    sameSite: 'lax',
    expires: undefined,
    httpOnly: false,
  },
) {
  let cookieText = `${name}=${value};`;

  if (options.path) {
    cookieText += ` Path=${options.path};`;
  }

  if (options.expires) {
    cookieText += ` Expires=${options.expires};`;
  }

  if (options.sameSite) {
    cookieText += ` SameSite=${options.sameSite};`;
  }

  if (options.httpOnly) {
    cookieText += ` HttpOnly;`;
  }

  document.cookie = cookieText;
}
