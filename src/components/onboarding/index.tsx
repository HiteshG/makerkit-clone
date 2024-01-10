import React, { useState } from 'react';
import Details from './Details';
import Invites from './Invites';
import Complete from './Complete';
import Steper from '@/core/ui/stepper';

const Onboarding = () => {
  const [current, setCurrent] = useState<number>(0);

  return (
    <>
      <Steper steps={["Details", "Invites", "Complete"]} currentStep={current} />
      {current === 0 && <Details next={() => setCurrent(1)} />}
      {current === 1 && <Invites next={() => setCurrent(2)} />}
      {current === 2 && <Complete />}
    </>
  );
}

export default Onboarding;
