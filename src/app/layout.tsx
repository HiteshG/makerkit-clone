import './globals.css';

import { cookies } from 'next/headers';
import classNames from 'clsx';

import initializeServerI18n from '~/i18n/i18n.server';
import { I18N_COOKIE_NAME } from '~/i18n/i18n.settings';

import ThemeSetter from '~/components/ThemeSetter';
import Fonts from '~/components/Fonts';

import configuration from '~/configuration';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const i18n = await initializeServerI18n(getLanguageCookie());

  return (
    <html lang={i18n.language} className={getClassName()}>
      <Fonts />
      <ThemeSetter />

      <body>{children}</body>
    </html>
  );
}

function getClassName() {
  const themeCookie = cookies().get('theme')?.value;
  const theme = themeCookie ?? configuration.theme;
  const dark = theme === 'dark';

  return classNames({
    dark,
  });
}

function getLanguageCookie() {
  return cookies().get(I18N_COOKIE_NAME)?.value;
}

export const metadata = {
  title: configuration.site.name,
  description: configuration.site.description,
  metadataBase: new URL(configuration.site.siteUrl!),
  openGraph: {
    url: configuration.site.siteUrl,
    siteName: configuration.site.siteName,
    description: configuration.site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: configuration.site.name,
    description: configuration.site.description,
    creator: configuration.site.twitterHandle,
  },
  icons: {
    icon: '/assets/images/favicon/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/assets/images/favicon/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
};
