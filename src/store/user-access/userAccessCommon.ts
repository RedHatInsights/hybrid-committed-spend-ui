import type { UserAccessQuery } from 'api/queries/userAccessQuery';
import type { UserAccessType } from 'api/user-access';

export const stateKey = 'userAccess';

export const billingUserAccessQuery: UserAccessQuery = {
  type: 'any',
};

// Omitting the type param returns all user access
export const userAccessQuery: UserAccessQuery = {};

export function getFetchId(ueserAccessType: UserAccessType, ueserAccessQuery: string) {
  return `${ueserAccessType}--${ueserAccessQuery}`;
}
