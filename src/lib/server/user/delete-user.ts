import type { SupabaseClient } from '@supabase/supabase-js';

import configuration from '~/configuration';
import getLogger from '~/core/logger';

import { MEMBERSHIPS_TABLE, USERS_TABLE } from '~/lib/db-tables';
import MembershipRole from '~/lib/organizations/types/membership-role';
import type { Database } from '~/database.types';
import getSupabaseServerActionClient from '~/core/supabase/action-client';
import deleteOrganization from '~/lib/server/organizations/delete-organization';
import sendEmail from '~/core/email/send-email';
import renderAccountDeleteEmail from '~/lib/emails/account-delete';

type Params = {
  client: SupabaseClient<Database>;
  userId: string;
};

type SendEmailParams =
  | {
      email: string | undefined;
      sendEmail: true;
    }
  | {
      sendEmail?: false;
    };

type DeleteUserParams = Params & SendEmailParams;

export async function deleteUser(params: DeleteUserParams) {
  const { client, userId } = params;
  const logger = getLogger();

  const adminClient = getSupabaseServerActionClient({ admin: true });
  const organizations = await getUserOwnedOrganizations(client, userId);

  logger.info(
    { userId, organizations },
    `Deleting organizations user is Owner of...`,
  );

  const requests = organizations.map((organizationId) => {
    return deleteOrganization(client, { organizationId });
  });

  await Promise.all(requests);

  logger.info(
    { userId, organizations },
    `Deleted organizations user is Owner of.`,
  );

  logger.info({ userId }, `Deleting user record and auth record...`);

  const displayName = await getDisplayName(adminClient, userId);
  const deleteUserResponse = await adminClient.auth.admin.deleteUser(userId);

  if (deleteUserResponse.error) {
    const ctx = { userId, error: deleteUserResponse.error };

    logger.error(ctx, `Error deleting user record or auth record.`);

    throw new Error();
  }

  logger.info({ userId }, `Deleted user record and auth record.`);

  if (params.sendEmail && params.email) {
    logger.info({ userId }, `Sending account deletion email...`);

    const userDisplayName = displayName || params.email;

    await sendAccountDeleteEmail({
      userDisplayName,
      email: params.email,
    }).catch((error) => {
      logger.error(
        {
          userId,
          error,
        },
        `Error sending account deletion email`,
      );
    });

    logger.info({ userId }, `Successfully sent account deletion email.`);
  }

  logger.info(
    {
      userId,
    },
    `Successfully deleted all user data`,
  );
}

async function getUserOwnedOrganizations(
  client: SupabaseClient<Database>,
  userId: string,
) {
  const { data: organizations, error } = await client
    .from(MEMBERSHIPS_TABLE)
    .select(
      `
      organization_id,
      role
      `,
    )
    .eq('user_id', userId)
    .eq('role', MembershipRole.Owner);

  if (error) {
    throw error;
  }

  return organizations
    .filter(({ role }) => role === MembershipRole.Owner)
    .map(({ organization_id }) => organization_id);
}

function getDisplayName(client: SupabaseClient<Database>, userId: string) {
  return client
    .from(USERS_TABLE)
    .select(
      `
      display_name
    `,
    )
    .eq('id', userId)
    .single()
    .then(({ data }) => data?.display_name);
}

async function sendAccountDeleteEmail(params: {
  userDisplayName: string;
  email: string;
}) {
  const productName = configuration.site.siteName;

  const accountDeleteEmail = renderAccountDeleteEmail({
    productName,
    userDisplayName: params.userDisplayName,
  });

  const subject = `Confirmation of Account Deletion on ${productName}`;
  const from = process.env.EMAIL_SENDER;

  if (!from) {
    throw new Error(`Missing EMAIL_SENDER env variable.`);
  }

  return sendEmail({
    to: params.email,
    subject,
    html: accountDeleteEmail,
    from,
  });
}
