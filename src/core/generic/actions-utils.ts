import { notFound } from 'next/navigation';

import requireSession from '~/lib/user/require-session';
import getSupabaseServerActionClient from '~/core/supabase/action-client';
import isUserSuperAdmin from '~/app/admin/utils/is-user-super-admin';

export function withSession<Args extends any[], Response>(
  fn: (...params: Args) => Response,
) {
  return async (...params: Args) => {
    const client = getSupabaseServerActionClient();

    await requireSession(client);

    return fn(...params);
  };
}

export function withAdminSession<Args extends any[], Response>(
  fn: (...params: Args) => Response,
) {
  return async (...params: Args) => {
    const isAdmin = await isUserSuperAdmin({
      client: getSupabaseServerActionClient(),
    });

    if (!isAdmin) {
      notFound();
    }

    return fn(...params);
  };
}
