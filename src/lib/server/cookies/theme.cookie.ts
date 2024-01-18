import { cookies } from 'next/headers';

const THEME_COOKIE_NAME = 'theme';

export function parseThemeCookie() {
  return cookies().get(THEME_COOKIE_NAME)?.value;
}
