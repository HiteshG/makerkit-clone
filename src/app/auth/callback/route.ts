import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

import { acceptInviteToOrganization } from '~/lib/memberships/mutations';
import getLogger from '~/core/logger';
import configuration from '~/configuration';
import getSupabaseRouteHandlerClient from '~/core/supabase/route-handler-client';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const logger = getLogger();
  const searchParams = requestUrl.searchParams;

  const authCode = searchParams.get('code');
  const inviteCode = searchParams.get('inviteCode');
  const error = searchParams.get('error');
  const nextUrl = searchParams.get('next') ?? configuration.paths.appHome;

  let userId: Maybe<string> = undefined;

  if (authCode) {
    const client = getSupabaseRouteHandlerClient();

    try {
      const { error, data } =
        await client.auth.exchangeCodeForSession(authCode);

      // if we have an error, we redirect to the error page
      if (error) {
        return onError({ error: error.message });
      }

      userId = data.user.id;
    } catch (error) {
      logger.error(
        {
          error,
        },
        `An error occurred while exchanging code for session`,
      );

      const message = error instanceof Error ? error.message : error;

      return onError({ error: message as string });
    }

    if (inviteCode && userId) {
      try {
        logger.info(
          {
            userId,
            inviteCode,
          },
          `Attempting to accept user invite...`,
        );

        // if we have an invite code, we accept the invite
        await acceptInviteFromEmailLink({ inviteCode, userId });
      } catch (error) {
        logger.error(
          {
            userId,
            inviteCode,
            error,
          },
          `An error occurred while accepting user invite`,
        );

        const message = error instanceof Error ? error.message : error;

        return onError({ error: message as string });
      }
    }
  }

  if (error) {
    return onError({ error });
  }

  return redirect(nextUrl);
}

async function acceptInviteFromEmailLink(params: {
  inviteCode: string;
  userId: Maybe<string>;
}) {
  const logger = getLogger();

  if (!params.userId) {
    logger.error(params, `Attempted to accept invite, but no user id provided`);

    return;
  }

  logger.info(params, `Found invite code. Accepting invite...`);

  await acceptInviteToOrganization(
    getSupabaseRouteHandlerClient({
      admin: true,
    }),
    {
      code: params.inviteCode,
      userId: params.userId,
    },
  );

  logger.info(params, `Invite successfully accepted`);
}

function onError({ error }: { error: string }) {
  const errorMessage = getAuthErrorMessage(error);

  getLogger().error(
    {
      error,
    },
    `An error occurred while signing user in`,
  );

  const redirectUrl = `/auth/callback/error?error=${errorMessage}`;

  return redirect(redirectUrl);
}

function isVerifierError(error: string) {
  return error.includes('both auth code and code verifier should be non-empty');
}

function getAuthErrorMessage(error: string) {
  return isVerifierError(error)
    ? `auth:errors.codeVerifierMismatch`
    : `auth:authenticationErrorAlertBody`;
}
