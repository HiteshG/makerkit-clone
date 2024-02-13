'use server';

import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import getSupabaseServerActionClient from '~/core/supabase/action-client';
import getLogger from '~/core/logger';
import { withSession } from '~/core/generic/actions-utils';

import { createOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import requireSession from '~/lib/user/require-session';
import { getUserDataById } from '~/lib/server/queries';
import { transferOwnership } from '~/lib/memberships/mutations';
import inviteMembers from '~/lib/server/organizations/invite-members';
import MembershipRole from '~/lib/organizations/types/membership-role';
import { getOrganizationByUid } from '~/lib/organizations/database/queries';

import configuration from '~/configuration';
import removeMembership from '~/lib/server/organizations/remove-membership';
import deleteOrganization from '~/lib/server/organizations/delete-organization';
import { MEMBERSHIPS_TABLE } from '~/lib/db-tables';

export const createNewOrganizationAction = withSession(
  async (formData: FormData) => {
    const logger = getLogger();

    const organization = await z
      .string()
      .min(1)
      .max(50)
      .parseAsync(formData.get('organization'));

    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);

    const userId = session.user.id;

    logger.info(
      {
        userId,
        organization,
      },
      `Creating organization...`,
    );

    const { data: organizationUid, error } = await client
      .rpc('create_new_organization', {
        org_name: organization,
        user_id: userId,
        create_user: false,
        ref_src: ''
      })
      .throwOnError()
      .single();

    if (error) {
      return handleError(error, `Error creating organization`);
    }

    logger.info(
      {
        userId,
        organization,
      },
      `Organization successfully created`,
    );

    cookies().set(
      createOrganizationIdCookie({
        userId,
        organizationUid,
      }),
    );

    const redirectPath = [configuration.paths.appHome, organizationUid].join(
      '/',
    );

    redirect(redirectPath);
  },
);

export const transferOrganizationOwnershipAction = withSession(
  async (
    params: z.infer<
      ReturnType<typeof getTransferOrganizationOwnershipBodySchema>
    >,
  ) => {
    const result =
      await getTransferOrganizationOwnershipBodySchema().safeParseAsync(params);

    if (!result.success) {
      throw new Error(`Invalid form data`);
    }

    const logger = getLogger();
    const client = getSupabaseServerActionClient();

    const targetUserMembershipId = result.data.membershipId;
    const organizationUid = result.data.organizationUid;
    const session = await requireSession(client);

    const currentUserId = session.user.id;
    const currentUser = await getUserDataById(client, currentUserId);

    logger.info(
      {
        organizationUid,
        currentUserId,
        targetUserMembershipId,
      },
      `Transferring organization ownership...`,
    );

    if (!currentUser) {
      throw new Error(`User is not logged in or does not exist`);
    }

    const { error, data: organization } = await getOrganizationByUid(
      client,
      organizationUid,
    );

    if (error || !organization) {
      logger.error(
        {
          organizationUid,
          currentUserId,
          targetUserMembershipId,
        },
        `Error retrieving organization`,
      );

      throw new Error(`Error retrieving organization`);
    }

    const transferOwnershipResponse = await transferOwnership(client, {
      organizationId: organization.id,
      targetUserMembershipId,
    });

    if (transferOwnershipResponse.error) {
      logger.error(
        {
          error,
          organizationUid,
          currentUserId,
          targetUserMembershipId,
        },
        `Error transferring organization ownership`,
      );

      throw new Error(`Error transferring ownership`);
    }

    logger.info(
      {
        organizationUid,
        currentUserId,
        targetUserMembershipId,
      },
      `Ownership successfully transferred to target user`,
    );

    revalidatePath('/', 'layout');

    return {
      success: true,
    };
  },
);

export const inviteMembersToOrganizationAction = withSession(
  async (payload: z.infer<ReturnType<typeof getInviteMembersBodySchema>>) => {
    const { invites, organizationUid } =
      await getInviteMembersBodySchema().parseAsync(payload);

    if (!organizationUid) {
      throw new Error(`Organization not found`);
    }

    const logger = getLogger();
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const inviterId = session.user.id;

    if (!inviterId) {
      throw new Error(`User is not logged in or does not exist`);
    }

    const adminClient = getSupabaseServerActionClient({ admin: true });

    const params = {
      client,
      adminClient,
      invites,
      organizationUid,
      inviterId,
    };

    try {
      // send requests to invite members
      await inviteMembers(params);

      logger.info(
        {
          organizationUid,
        },
        `Successfully invited members to organization`,
      );
    } catch (e) {
      const message = `Error when inviting user to organization`;

      logger.error(`${message}: ${JSON.stringify(e)}`);

      throw new Error(message);
    }

    const appHome = configuration.paths.appHome;
    const path = `settings/organization/members`;
    const redirectPath = [appHome, organizationUid, path].join('/');

    revalidatePath(redirectPath, 'page');

    redirect(redirectPath);
  },
);

export async function leaveOrganizationAction(data: FormData) {
  const logger = getLogger();
  const client = getSupabaseServerActionClient();
  const { user } = await requireSession(client);

  const id = z.coerce.number().parse(data.get('id'));

  const params = {
    organizationId: id,
    userId: user.id,
  };

  await removeMembership(params);

  logger.info(params, `User successfully left organization`);

  const redirectPath = configuration.paths.appHome;

  revalidatePath('/', 'layout');

  return redirect(redirectPath, RedirectType.replace);
}

export async function deleteOrganizationAction(data: FormData) {
  const client = getSupabaseServerActionClient();
  const { user } = await requireSession(client);
  const logger = getLogger();

  const id = z.coerce.number().parse(data.get('id'));

  const userId = user.id;
  const params = { organizationId: id, userId };

  logger.info(params, `User deleting organization...`);

  const membershipResponse = await client
    .from(MEMBERSHIPS_TABLE)
    .select('id, role')
    .eq('organization_id', id)
    .eq('user_id', userId)
    .single();

  if (membershipResponse.error) {
    logger.info(
      { ...params, error: membershipResponse.error },
      `Error deleting organization. The user is not a member of the organization`,
    );

    throw new Error(`Error deleting organization`);
  }

  const role = membershipResponse.data.role;
  const isOwner = role === MembershipRole.Owner;

  if (!isOwner) {
    logger.info(
      params,
      `Error deleting organization. The user is not the owner of the organization`,
    );

    throw new Error(`Error deleting organization`);
  }

  await deleteOrganization(client, {
    organizationId: id,
  });

  revalidatePath('/', 'layout');

  return redirect(configuration.paths.appHome, RedirectType.replace);
}

function getInviteMembersBodySchema() {
  return z.object({
    organizationUid: z.string().uuid(),
    invites: z.array(
      z.object({
        role: z.nativeEnum(MembershipRole),
        email: z.string().email(),
      }),
    ),
  });
}

function getTransferOrganizationOwnershipBodySchema() {
  return z.object({
    membershipId: z.coerce.number(),
    organizationUid: z.string().uuid(),
  });
}

function handleError<Error = unknown>(
  error: Error,
  message: string,
  organizationId?: string,
) {
  const exception = error instanceof Error ? error.message : undefined;

  getLogger().error(
    {
      exception,
      organizationId,
    },
    message,
  );

  throw new Error(message);
}
