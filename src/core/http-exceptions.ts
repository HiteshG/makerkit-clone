import { NextResponse } from 'next/server';
import HttpStatusCode from '~/core/generic/http-status-code.enum';

export const throwInternalServerErrorException = buildException(
  HttpStatusCode.InternalServerError
);

export const throwBadRequestException = buildException(
  HttpStatusCode.BadRequest
);

export const throwNotFoundException = buildException(HttpStatusCode.NotFound);

export const throwMethodNotAllowedException = function methodNotAllowed(
  allowedMethodsList: string[],
  methodNotAllowed?: string | undefined
) {
  const message = `Method ${
    methodNotAllowed ?? '[unknown]'
  } is not allowed. Please use one of the following methods: ${allowedMethodsList.join(
    ', '
  )}`;

  return NextResponse.json(
    {},
    {
      status: HttpStatusCode.MethodNotAllowed,
      statusText: message,
    }
  );
};

export const throwUnauthorizedException = buildException(
  HttpStatusCode.Unauthorized
);

export const throwForbiddenException = buildException(HttpStatusCode.Forbidden);

function buildException(status: HttpStatusCode) {
  return (message?: string) => {
    return NextResponse.json(
      {},
      {
        status,
        statusText: message ?? `Unknown Error`,
      }
    );
  };
}
