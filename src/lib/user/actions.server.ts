'use server';

import { redirect } from 'next/navigation';

import { deleteUser } from '~/lib/server/user/delete-user';
import getLogger from '~/core/logger';

import requireSession from '~/lib/user/require-session';
import getSupabaseServerActionClient from '~/core/supabase/action-client';

export async function deleteUserAccountAction() {
  const logger = getLogger();
  const client = getSupabaseServerActionClient();
  const { user } = await requireSession(client);

  logger.info({ userId: user.id }, `User requested to delete their account`);

  await deleteUser({
    client,
    userId: user.id,
    email: user.email,
    sendEmail: true,
  });

  await client.auth.signOut();

  redirect('/');
}
