import { cookies } from 'next/headers';

const SIDEBAR_STATE_COOKIE_NAME = 'sidebarState';

export function parseSidebarStateCookie() {
  return cookies().get(SIDEBAR_STATE_COOKIE_NAME)?.value;
}
