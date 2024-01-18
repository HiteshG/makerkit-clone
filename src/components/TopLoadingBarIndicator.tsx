'use client';

import { createRef, useEffect, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

function TopLoadingBarIndicator() {
  const ref = createRef<LoadingBarRef>();
  const runningRef = useRef(false);

  useEffect(() => {
    if (!ref.current || runningRef.current) {
      return;
    }

    const loadingBarRef = ref.current;

    loadingBarRef.continuousStart(0, 250);
    runningRef.current = true;

    return () => {
      loadingBarRef.complete();
      runningRef.current = false;
    };
  }, [ref]);

  return (
    <LoadingBar
      height={4}
      waitingTime={0}
      shadow
      className={'bg-primary'}
      color={''}
      ref={ref}
    />
  );
}

export default TopLoadingBarIndicator;
