import i18next, { i18n } from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

import getI18nSettings, { I18N_COOKIE_NAME } from './i18n.settings';
import resourcesToBackend from 'i18next-resources-to-backend';

let promise: Promise<i18n>;

function initializeI18nClient(lng?: Maybe<string>, ns?: string[]) {
  const settings = getI18nSettings(lng, ns);

  if (promise) {
    return promise;
  }

  promise = new Promise<i18n>((resolve, reject) => {
    return i18next
      .use(initReactI18next)
      .use(
        resourcesToBackend((language: string, namespace: string) => {
          return import(`../../public/locales/${language}/${namespace}.json`);
        }),
      )
      .use(LanguageDetector)
      .init(
        {
          ...settings,
          detection: {
            order: ['htmlTag', 'cookie', 'navigator'],
            caches: ['cookie'],
            lookupCookie: I18N_COOKIE_NAME,
          },
          interpolation: {
            escapeValue: false,
          },
        },
        (err) => {
          if (err) {
            return reject(err);
          }

          resolve(i18next);
        },
      );
  });

  return promise;
}

export default initializeI18nClient;
