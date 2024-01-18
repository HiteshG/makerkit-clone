'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import getLogger from '~/core/logger';

import getSupabaseServerActionClient from '~/core/supabase/action-client';
import { withAdminSession } from '~/core/generic/actions-utils';
import deleteOrganization from '~/lib/server/organizations/delete-organization';

const getClient = () => getSupabaseServerActionClient({ admin: true });

export const deleteOrganizationAction = withAdminSession(
  async ({ id }: { id: number; csrfToken: string }) => {
    const logger = getLogger();
    const client = getClient();

    logger.info({ id }, `Admin requested to delete Organization`);

    await deleteOrganization(client, {
      organizationId: id,
    });

    revalidatePath('/admin/organizations', 'page');

    logger.info({ id }, `Organization account deleted`);

    redirect('/admin/organizations');
  },
);
