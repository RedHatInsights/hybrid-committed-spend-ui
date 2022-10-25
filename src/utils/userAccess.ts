import type { UserAccess } from 'api/user-access';
import { UserAccessType } from 'api/user-access';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasAccess = (userAccess: UserAccess, userAccessType = UserAccessType.all) => {
  return userAccess ? userAccess.hcsDeal : false;
};

// Returns true if user has HCS enrollment
export const hasAllAccess = (userAccess: UserAccess) => {
  return hasAccess(userAccess, UserAccessType.all);
};
