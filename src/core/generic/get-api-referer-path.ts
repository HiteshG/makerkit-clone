import { URL } from 'url';

export default function getApiRefererPath<
  ReadonlyHeaders extends Omit<Headers, 'append' | 'delete' | 'set'>
>(headers: ReadonlyHeaders, defaultPath = '/') {
  const fullPath = headers.get('referer') || headers.get('origin');

  if (!fullPath) {
    return defaultPath;
  }

  const url = new URL(fullPath);

  return url.pathname;
}
