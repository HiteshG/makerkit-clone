export async function captureApiException(
  exception: unknown,
  requestContext: UnknownObject,
) {
  const { initializeNodeSentry } = await import(
    '~/core/sentry/initialize-node-sentry'
  );

  const { captureException } = await import('@sentry/node');

  await initializeNodeSentry();

  return captureException(exception, { extra: requestContext });
}
