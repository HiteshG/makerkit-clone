'use client';

import { useCallback, useContext } from 'react';

import UserSessionContext from '~/core/session/contexts/user-session';
import useUserSession from '~/core/hooks/use-user-session';
import UserData from '~/core/session/types/user-data';
import If from '~/core/ui/If';

import UpdatePhoneNumberForm from '../components/UpdatePhoneNumberForm';
import SettingsTile from '../../components/SettingsTile';
import UpdateProfileForm from '../components/UpdateProfileForm';
import ProfileDangerZone from '../components/ProfileDangerZone';

import { refreshSessionAction } from '../actions';

import configuration from '~/configuration';

const allowAccountDeletion = configuration.features.enableAccountDeletion;
const allowPhoneNumberUpdate = configuration.auth.providers.phoneNumber;

function UpdateProfileFormContainer() {
  const { userSession, setUserSession } = useContext(UserSessionContext);
  const session = useUserSession();

  const onUpdateProfileData = useCallback(
    async (data: Partial<UserData>) => {
      const userRecordData = userSession?.data;

      if (userRecordData) {
        setUserSession({
          ...userSession,
          data: {
            ...userRecordData,
            ...data,
          },
        });
      }

      await refreshSessionAction();
    },
    [setUserSession, userSession],
  );

  if (!session) {
    return null;
  }

  return (
    <div className={'flex flex-col space-y-8'}>
      <SettingsTile
        heading={"My Details"}
        subHeading={"Manage your profile details"}
      >
        <UpdateProfileForm
          session={session}
          onUpdateProfileData={onUpdateProfileData}
        />
      </SettingsTile>

      <If condition={allowPhoneNumberUpdate}>
        <SettingsTile
          heading={"Update Phone Number"}
          subHeading={"Link your phone number to your account"}
        >
          <UpdatePhoneNumberForm
            session={session}
            onUpdate={async () => {
              await refreshSessionAction();
            }}
          />
        </SettingsTile>
      </If>

      <If condition={allowAccountDeletion}>
        <SettingsTile
          heading={"Danger Zone"}
          subHeading={"Some actions cannot be undone. Please be careful."}
        >
          <ProfileDangerZone />
        </SettingsTile>
      </If>
    </div>
  );
}

export default UpdateProfileFormContainer;
