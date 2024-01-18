import configuration from '~/configuration';
import isBrowser from '~/core/generic/is-browser';

let initialized = false;

async function initializeBrowserSentry() {
  const dsn = configuration.sentry.dsn;

  if (!dsn) {
    if (!configuration.production) {
      warnSentryNotConfigured();
    }

    return;
  }

  const Sentry = await import('@sentry/react');
  const { BrowserTracing } = await import('@sentry/browser');

  if (!isBrowser() || initialized) {
    return;
  }

  Sentry.init({
    dsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
    environment: configuration.environment,
  });

  initialized = true;
}

function warnSentryNotConfigured() {
  console.warn(
    `[Optional] Sentry DSN was not provided. You may add a SENTRY_DSN environment variable to enable error tracking.`,
  );
}

export default initializeBrowserSentry;
