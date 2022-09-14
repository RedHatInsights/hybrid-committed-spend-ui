import { UserAccessType } from 'api/user-access';
import { RootState } from 'store/rootReducer';

import { getReportId, stateKey } from './userAccessCommon';

export const selectUserAccessState = (state: RootState) => state[stateKey];

// Fetch userAccess

export const selectUserAccess = (state: RootState, providerType: UserAccessType, query: string) =>
  selectUserAccessState(state).byId.get(getReportId(providerType, query));

export const selectUserAccessFetchStatus = (state: RootState, providerType: UserAccessType, query: string) =>
  selectUserAccessState(state).fetchStatus.get(getReportId(providerType, query));

export const selectUserAccessError = (state: RootState, providerType: UserAccessType, query: string) =>
  selectUserAccessState(state).errors.get(getReportId(providerType, query));
