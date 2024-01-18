import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { SupabaseClient } from '@supabase/supabase-js';

import If from '~/core/ui/If';
import Heading from '~/core/ui/Heading';

import getLogger from '~/core/logger';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

import { getMembershipByInviteCode } from '~/lib/memberships/queries';
import ExistingUserInviteForm from '~/app/invite/components/ExistingUserInviteForm';
import NewUserInviteForm from '~/app/invite/components/NewUserInviteForm';
import InviteCsrfTokenProvider from '~/app/invite/components/InviteCsrfTokenProvider';
import { Database } from '~/database.types';

interface Context {
  params: {
    code: string;
  };
}

export const metadata = {
  title: `Join Organization`,
};

async function InvitePage({ params }: Context) {
  const code = params.code;
  const data = await loadInviteData(code);

  if (!data.membership) {
    notFound();
  }

  const organization = data.membership.organization;

  return (
    <>
      <Heading type={4}>
        Join {organization.name}
      </Heading>

      <div>
        <p className={'text-center'}>
          You were invited to join <b>{organization.name}</b>
        </p>

        <p className={'text-center'}>
          <If condition={!data.session}>
            Please sign in/up to accept the invite
          </If>
        </p>
      </div>

      <InviteCsrfTokenProvider csrfToken={data.csrfToken}>
        <If
          condition={data.session}
          fallback={<NewUserInviteForm code={code} />}
        >
          {(session) => (
            <ExistingUserInviteForm code={code} session={session} />
          )}
        </If>
      </InviteCsrfTokenProvider>
    </>
  );
}

export default InvitePage;

async function loadInviteData(code: string) {
  const logger = getLogger();
  const client = getSupabaseServerComponentClient();

  // we use an admin client to be able to read the pending membership
  // without having to be logged in
  const adminClient = getSupabaseServerComponentClient({ admin: true });

  const { data: membership, error } = await getInvite(adminClient, code);

  // if the invite wasn't found, it's 404
  if (error) {
    logger.warn(
      {
        code,
        error,
      },
      `User navigated to invite page, but it wasn't found. Redirecting to home page...`,
    );

    notFound();
  }

  const { data: userSession } = await client.auth.getSession();
  const session = userSession?.session;
  const csrfToken = headers().get('x-csrf-token');

  return {
    csrfToken,
    session,
    membership,
    code,
  };
}

async function getInvite(adminClient: SupabaseClient<Database>, code: string) {
  return getMembershipByInviteCode<{
    id: number;
    code: string;
    organization: {
      name: string;
      id: number;
    };
  }>(adminClient, {
    code,
    query: `
      id,
      code,
      organization: organization_id (
        name,
        id
      )
    `,
  });
}
