import { UserAccess, UserAccessType } from 'api/user-access';

const hasAccess = (userAccess: UserAccess, userAccessType: UserAccessType) => {
  let result = false;

  if (userAccess && Array.isArray(userAccess.data)) {
    // Used with multiple types (e.g., type=)
    const data = (userAccess.data as any).find(d => d.type === userAccessType);
    result = data && data.access;
  } else {
    // result = userAccess && userAccess.data === true;
    result = true; // Todo: Remove when API is available
  }
  return result;
};

// Returns true if user has access to all billing
export const hasAllAccess = (userAccess: UserAccess) => {
  return hasAccess(userAccess, UserAccessType.all);
};

// Returns true if user has access to AWS and at least one source provider
export const isAwsAvailable = (userAccess: UserAccess) => {
  return hasAllAccess(userAccess);
};
