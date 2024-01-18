'use client';

import TopLoadingBarIndicator from '~/components/TopLoadingBarIndicator';
import LoadingOverlay from '~/core/ui/LoadingOverlay';

function GlobalLoadingIndicator({
  children,
  displayLogo = false,
  fullPage = false,
}: React.PropsWithChildren<{
  displayLogo?: boolean;
  fullPage?: boolean;
}>) {
  const Text = children ?? "Loading. Please wait...";

  return (
    <>
      <TopLoadingBarIndicator />

      <div className={'flex flex-1 flex-col items-center justify-center py-48'}>
        <LoadingOverlay displayLogo={displayLogo} fullPage={fullPage}>
          {Text}
        </LoadingOverlay>
      </div>
    </>
  );
}

export default GlobalLoadingIndicator;
