import type { UserAccess } from 'api/user-access';
import { UserAccessType } from 'api/user-access';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasAccess = (userAccess: UserAccess, userAccessType) => {
  if (!userAccess) {
    return false;
  }
  switch (userAccessType) {
    case UserAccessType.dataVisibility:
      return userAccess.hcsDataVisibility;
    case UserAccessType.deal:
      return userAccess.hcsDeal;
    default:
      return false;
  }
};

// Returns true if user has HCS data visibility
export const hasHcsDataVisibility = (userAccess: UserAccess) => {
  return hasAccess(userAccess, UserAccessType.dataVisibility);
};

// Returns true if user has HCS enrollment
export const hasHcsDeal = (userAccess: UserAccess) => {
  return hasAccess(userAccess, UserAccessType.deal);
};
