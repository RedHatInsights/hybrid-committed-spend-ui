import { UserAccessQuery } from 'api/queries/userAccessQuery';
import { UserAccessType } from 'api/user-access';

export const stateKey = 'userAccess';
export const userAccessKey = 'user-access';

export const billingUserAccessQuery: UserAccessQuery = {
  type: 'any',
};

// Omitting the type param returns all user access
export const userAccessQuery: UserAccessQuery = {};

export function getReportId(type: UserAccessType, query: string) {
  return `${type}--${query}`;
}
