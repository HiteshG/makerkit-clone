import type UserData from '~/core/session/types/user-data';
import type MembershipRole from '~/lib/organizations/types/membership-role';

interface UserSession {
  auth: {
    accessToken: Maybe<string>;

    user: {
      id: string;
      email: Maybe<string>;
      phone: Maybe<string>;
    };
  };

  data: Maybe<UserData>;
  role: Maybe<MembershipRole>;
}

export default UserSession;
