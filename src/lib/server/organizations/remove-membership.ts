import getSupabaseServerActionClient from '~/core/supabase/action-client';
import { MEMBERSHIPS_TABLE } from '~/lib/db-tables';
import MembershipRole from '~/lib/organizations/types/membership-role';
import getLogger from '~/core/logger';

export default async function removeMembership(params: {
  organizationId: number;
  userId: string;
}) {
  const logger = getLogger();
  const { organizationId, userId } = params;

  logger.info(params, `User leaving organization...`);

  const adminClient = getSupabaseServerActionClient({ admin: true });

  const response = await adminClient
    .from(MEMBERSHIPS_TABLE)
    .delete()
    .eq('organization_id', organizationId)
    .eq('user_id', userId)
    .neq('role', MembershipRole.Owner);

  if (response.error) {
    logger.info(params, `Error leaving organization`);

    throw new Error(`Error leaving organization`);
  }
}
