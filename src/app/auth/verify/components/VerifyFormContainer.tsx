'use client';

import { useCallback } from 'react';
import configuration from '~/configuration';
import MultiFactorChallengeContainer from '~/app/auth/components/MultiFactorChallengeContainer';

function VerifyFormContainer() {
  const onSuccess = useCallback(() => {
    window.location.assign(configuration.paths.appHome);
  }, []);

  return <MultiFactorChallengeContainer onSuccess={onSuccess} />;
}

export default VerifyFormContainer;
