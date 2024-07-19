import { GraphQLError } from 'graphql';

export enum GqlApiErrorCode {
  NotFound = 'NOT_FOUND',
  InternalError = 'INTERNAL_ERROR',
}

export class GqlApiError extends GraphQLError {
  constructor(
    public readonly code: GqlApiErrorCode,
    public readonly message: string,
  ) {
    const name = GqlApiError.name;
    const extensions = { code, name };

    super(message, {
      extensions,
    });
  }
}
