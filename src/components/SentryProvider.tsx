import useSentry from '~/core/hooks/use-sentry';

const SentryBrowserWrapper: React.FCC = ({ children }) => {
  useSentry();

  return <>{children}</>;
};

export default SentryBrowserWrapper;
