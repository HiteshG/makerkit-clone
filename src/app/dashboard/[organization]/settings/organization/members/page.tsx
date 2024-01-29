import { redirect } from 'next/navigation';
import { use } from 'react';

import type { User } from '@supabase/gotrue-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import Trans from '~/core/ui/Trans';

import {
  getMembersAuthMetadata,
  getOrganizationInvitedMembers,
  getOrganizationMembers,
} from '~/lib/organizations/database/queries';

import configuration from '~/configuration';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import type MembershipRole from '~/lib/organizations/types/membership-role';
import type UserData from '~/core/session/types/user-data';

import requireSession from '~/lib/user/require-session';
import SettingsTile from '../../components/SettingsTile';
import OrganizationMembersList from '../components/OrganizationMembersList';
import OrganizationInvitedMembersList from '../components/OrganizationInvitedMembersList';
import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';
import { withI18n } from '~/i18n/with-i18n';

export const metadata = {
  title: 'Members',
};

const OrganizationMembersPage: React.FC<{
  params: {
    organization: string;
  };
}> = ({ params }) => {
  const data = use(loadMembers(params.organization));

  return (
    <>
      <div className="flex flex-1 flex-col space-y-6">
        <SettingsTile
          heading={<Trans i18nKey={'organization:membersTabLabel'} />}
          subHeading={<Trans i18nKey={'organization:membersTabSubheading'} />}
        >
          <OrganizationMembersList members={data.members} />
        </SettingsTile>

        <SettingsTile
          heading={<Trans i18nKey={'organization:pendingInvitesHeading'} />}
          subHeading={
            <Trans i18nKey={'organization:pendingInvitesSubheading'} />
          }
        >
          <OrganizationInvitedMembersList
            invitedMembers={data.invitedMembers || []}
          />
        </SettingsTile>
      </div>
    </>
  );
};

export default withI18n(OrganizationMembersPage);

function getMembersPayload<
  Payload extends {
    data: UserData;
    role: MembershipRole;
  },
>(members: Array<Payload | null>, users: User[]) {
  type NonNullMembers = Exclude<Payload, null>;

  return members
    .filter((value): value is NonNullMembers => !!value)
    .sort((prev, next) => {
      return next.role > prev.role ? 1 : -1;
    })
    .reduce<
      Array<
        Payload & {
          auth: User;
        }
      >
    >((acc, member) => {
      const authInfo = users.find((user) => {
        return user.id === member.data.id;
      });

      if (authInfo) {
        const user = {
          ...member,
          auth: authInfo,
        };

        return [...acc, user];
      }

      return acc;
    }, []);
}

async function fetchOrganizationMembers({
  client,
  adminClient,
  organizationId,
}: {
  client: SupabaseClient;
  adminClient: SupabaseClient;
  organizationId: number;
}) {
  const organizationMembersResponse = await getOrganizationMembers(
    client,
    organizationId,
  );

  const onError = (error: unknown) => {
    console.error(
      {
        organizationId,
      },
      `Error fetching organization members: ${error}`,
    );

    return [];
  };

  if (organizationMembersResponse.error) {
    return onError(organizationMembersResponse.error);
  }

  try {
    const members = organizationMembersResponse.data;
    const userIds = members.map((member) => member.data.id).filter(Boolean);
    const users = await getMembersAuthMetadata(adminClient, userIds);

    return getMembersPayload(members, users);
  } catch (error) {
    return onError(error);
  }
}

async function loadMembers(organizationUid: string) {
  const client = getSupabaseServerComponentClient();

  const adminClient = getSupabaseServerComponentClient({
    admin: true,
  });

  const session = await requireSession(client);
  const userId = session.user.id;

  const organizationResponse = await getCurrentOrganization({
    organizationUid,
    userId,
  });

  const organizationId = organizationResponse.organization?.id;

  if (!organizationId) {
    return redirect(configuration.paths.appHome);
  }

  const [members, invitedMembers] = await Promise.all([
    fetchOrganizationMembers({ adminClient, client, organizationId }).catch(
      (error) => {
        console.error(`Error fetching organization members: ${error}`);

        return [];
      },
    ),
    getOrganizationInvitedMembers(client, organizationId).then(
      (result) => result.data,
    ),
  ]);

  return {
    members,
    invitedMembers,
  };
}
