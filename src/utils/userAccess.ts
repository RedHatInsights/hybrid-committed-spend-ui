import { UserAccess, UserAccessType } from 'api/user-access';

const hasAccess = (userAccess: UserAccess, userAccessType = UserAccessType.all) => {
  return userAccess ? userAccess.hcsDeal : false;
};

// Returns true if user has HCS enrollment
export const hasAllAccess = (userAccess: UserAccess) => {
  return hasAccess(userAccess, UserAccessType.all);
};
