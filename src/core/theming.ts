import configuration from '~/configuration';
import { getCookie, setCookie } from '~/core/generic/cookies';

const THEME_KEY = `theme`;

const LIGHT_THEME_META_COLOR = configuration.site.themeColor;
const DARK_THEME_META_COLOR = configuration.site.themeColorDark;
const DEFAULT_THEME = configuration.theme;

export const DARK_THEME_CLASSNAME = `dark`;
export const LIGHT_THEME_CLASSNAME = `light`;
export const SYSTEM_THEME_CLASSNAME = 'system';

export function getStoredTheme() {
  try {
    return getCookie(THEME_KEY) ?? DEFAULT_THEME;
  } catch (e) {
    return DEFAULT_THEME;
  }
}

export function setTheme(theme: string | null) {
  const root = getHtml();

  const setThemeCookie = (value: string) => {
    setCookie(THEME_KEY, value, {
      path: '/',
    });
  };

  root.classList.remove(DARK_THEME_CLASSNAME);
  root.classList.remove(LIGHT_THEME_CLASSNAME);

  switch (theme) {
    case SYSTEM_THEME_CLASSNAME:
      setThemeCookie(SYSTEM_THEME_CLASSNAME);

      if (isDarkSystemTheme()) {
        root.classList.add(DARK_THEME_CLASSNAME);
      }

      return;

    case DARK_THEME_CLASSNAME:
      root.classList.add(DARK_THEME_CLASSNAME);

      setMetaTag(DARK_THEME_META_COLOR);
      setThemeCookie(DARK_THEME_CLASSNAME);

      return;

    case LIGHT_THEME_CLASSNAME:
      setMetaTag(LIGHT_THEME_META_COLOR);
      setThemeCookie(LIGHT_THEME_CLASSNAME);

      return;
  }
}

function getHtml() {
  return document.firstElementChild as HTMLHtmlElement;
}

function getThemeMetaTag() {
  return document.querySelector(`meta[name='theme-color']`);
}

function setMetaTag(value: string) {
  const callback = () => {
    let tag = getThemeMetaTag();

    if (tag) {
      tag.setAttribute('content', value);
    } else {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'theme-color');
      tag.setAttribute('content', value);
      document.head.appendChild(tag);
    }
  };

  if (document.readyState === 'complete') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

export function isDarkSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function loadSelectedTheme() {
  setTheme(getStoredTheme());
}
