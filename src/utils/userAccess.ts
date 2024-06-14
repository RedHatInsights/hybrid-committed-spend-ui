import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import type { UserAccess } from 'api/user-access';
import { UserAccessType } from 'api/user-access';
import type { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import type { FetchStatus } from 'store/common';
import { userAccessQuery, userAccessSelectors } from 'store/user-access';

interface UserAccessStateProps {
  userAccess: UserAccess;
  userAccessError: AxiosError;
  userAccessFetchStatus: FetchStatus;
  userAccessQueryString: string;
}

/**
 * Data Visibility
 *
 * https://docs.google.com/spreadsheets/d/1-XAYjxR2d6FMlavG5ukY9fRN06NcWtBiNLMSuJxw8dk/edit#gid=123032251
 *
 * 10 N/A (not viewable)
 * 20 RH Viewing only (not viewable)
 * 30 Summary only (alert shown for limited data)
 * 50 Full (all data)
 */
const hasAccess = (userAccess: UserAccess, userAccessType) => {
  if (!userAccess) {
    return false;
  }
  switch (userAccessType) {
    case UserAccessType.dataVisibility:
      return userAccess.hcsDataVisibility >= 30;
    case UserAccessType.deal:
      return userAccess.hcsDeal;
    case UserAccessType.viewer:
      return userAccess.hcsViewer;
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

// Returns true if user has the HCS viewer role
export const hasHcsViewer = (userAccess: UserAccess) => {
  return hasAccess(userAccess, UserAccessType.viewer);
};

// Returns true if HCS data visibility is summary only
export const isHcsDataVisibilitySummaryOnly = (userAccess: UserAccess) => {
  return userAccess.hcsDataVisibility >= 30 && userAccess.hcsDataVisibility < 50;
};

export const useUserAccessMapToProps = (): UserAccessStateProps => {
  const userAccessQueryString = getUserAccessQuery(userAccessQuery);
  const userAccess = useSelector((state: RootState) =>
    userAccessSelectors.selectUserAccess(state, UserAccessType.all, userAccessQueryString)
  );
  const userAccessError = useSelector((state: RootState) =>
    userAccessSelectors.selectUserAccessError(state, UserAccessType.all, userAccessQueryString)
  );
  const userAccessFetchStatus = useSelector((state: RootState) =>
    userAccessSelectors.selectUserAccessFetchStatus(state, UserAccessType.all, userAccessQueryString)
  );

  return {
    userAccess,
    userAccessError,
    userAccessFetchStatus,
    userAccessQueryString,
  };
};
