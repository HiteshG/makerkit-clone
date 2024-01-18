import type { SupabaseClient } from '@supabase/supabase-js';
import { join } from 'path';

import type MembershipRole from '~/lib/organizations/types/membership-role';
import { canInviteUser } from '~/lib/organizations/permissions';

import sendEmail from '~/core/email/send-email';

import getLogger from '~/core/logger';
import configuration from '~/configuration';

import { getUserById } from '~/lib/user/database/queries';
import { getOrganizationByUid } from '~/lib/organizations/database/queries';

import {
  getMembershipByEmail,
  getUserMembershipByOrganization,
} from '~/lib/memberships/queries';

import {
  createOrganizationMembership,
  updateMembershipById,
} from '~/lib/memberships/mutations';

import type Membership from '~/lib/organizations/types/membership';
import { Database } from '~/database.types';

type Client = SupabaseClient<Database>;

interface Invite {
  email: string;
  role: MembershipRole;
}

interface Params {
  client: Client;
  adminClient: Client;
  organizationUid: string;
  inviterId: string;
  invites: Invite[];
}

export default async function inviteMembers(params: Params) {
  const { organizationUid, invites, inviterId, adminClient, client } = params;
  const logger = getLogger();

  const [{ data: inviter }, { data: organization }] = await Promise.all([
    getUserById(client, params.inviterId),
    getOrganizationByUid(client, organizationUid),
  ]);

  if (!inviter) {
    return Promise.reject(`Inviter record was not found`);
  }

  if (!organization) {
    return Promise.reject(`Organization record was not found`);
  }

  const organizationName = organization.name;
  const organizationId = organization.id;

  const { role: inviterRole } = await getUserMembershipByOrganization(client, {
    organizationUid,
    userId: params.inviterId,
  });

  if (inviterRole === undefined) {
    throw new Error(
      `Invitee with ID ${inviterId} does not belong to the organization`,
    );
  }

  const requests: Array<Promise<unknown>> = [];

  for (const invite of invites) {
    if (!canInviteUser(inviterRole, invite.role)) {
      continue;
    }

    let inviterDisplayName = inviter?.displayName || '';

    if (!inviterDisplayName) {
      const { data: inviterEmail, error } =
        await adminClient.auth.admin.getUserById(inviter.id);

      if (!error && inviterEmail.user.email) {
        inviterDisplayName = inviterEmail.user.email;
      }
    }

    const organizationLogo = organization?.logoURL ?? undefined;

    const sendEmailRequest = (code: string) =>
      sendInviteEmail({
        code,
        invitedUserEmail: invite.email,
        organizationName,
        organizationLogo,
        inviter: inviterDisplayName,
      });

    const { data: existingInvite } = await getMembershipByEmail(client, {
      organizationId,
      email: invite.email,
    });

    const inviteExists = Boolean(existingInvite);

    const catchCallback = (error: unknown, inviteId?: number) => {
      logger.error(
        {
          inviter: inviter.id,
          inviteId,
          organizationId,
          error,
        },
        `Error while sending invite to member`,
      );

      return Promise.reject(error);
    };

    if (inviteExists) {
      const request = async () => {
        const membershipId = existingInvite?.id as number;
        const code = existingInvite?.code;

        if (!code) {
          return Promise.reject(`Code not found on membership`);
        }

        try {
          const params = {
            id: membershipId,
            role: invite.role,
          };

          await updateMembershipById(adminClient, params);
        } catch (error) {
          return catchCallback(error, membershipId);
        }

        try {
          await sendEmailRequest(code);
        } catch (error) {
          return catchCallback(error, membershipId);
        }
      };

      requests.push(request());
    } else {
      const request = async () => {
        const membership: Partial<Membership> = {
          invitedEmail: invite.email,
          role: invite.role,
          organizationId,
        };

        try {
          const { data, error } = await createOrganizationMembership(
            adminClient,
            membership,
          );

          if (error) {
            return catchCallback(error);
          }

          const membershipId = data.id;
          const code = data.code;

          logger.info(
            {
              organizationId,
              membershipId,
              code,
            },
            `Membership successfully created`,
          );

          await sendEmailRequest(code);

          logger.info(
            {
              organizationId,
              membershipId,
            },
            `Membership invite successfully sent`,
          );
        } catch (e) {
          return catchCallback(e);
        }
      };

      requests.push(request());
    }
  }

  return Promise.all(requests);
}

async function sendInviteEmail(props: {
  invitedUserEmail: string;
  code: string;
  organizationName: string;
  organizationLogo: Maybe<string>;
  inviter: Maybe<string>;
}) {
  const {
    invitedUserEmail,
    code,
    organizationName,
    organizationLogo,
    inviter,
  } = props;

  const { default: renderInviteEmail } = await import('~/lib/emails/invite');

  const sender = process.env.EMAIL_SENDER;
  const productName = configuration.site.siteName;

  if (!sender) {
    return Promise.reject(
      `Missing email configuration. Please add the following environment variables:
      EMAIL_SENDER
      `,
    );
  }

  const subject = 'You have been invited to join an organization!';
  const link = getInvitePageFullUrl(code);

  const html = renderInviteEmail({
    productName,
    link,
    organizationName,
    organizationLogo,
    invitedUserEmail,
    inviter,
  });

  return sendEmail({
    to: invitedUserEmail,
    from: sender,
    subject,
    html,
  });
}

function getInvitePageFullUrl(code: string) {
  const siteUrl = configuration.site.siteUrl;

  assertSiteUrl(siteUrl);

  const path = join('/invite', code);

  return new URL(path, siteUrl).href;
}

function assertSiteUrl(siteUrl: Maybe<string>): asserts siteUrl is string {
  if (!siteUrl && configuration.production) {
    throw new Error(
      `Please configure the "siteUrl" property in the configuration file ~/configuration.ts`,
    );
  }
}
