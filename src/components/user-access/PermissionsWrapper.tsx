import { Bullseye, Spinner } from '@patternfly/react-core';
import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import type { UserAccess } from 'api/user-access';
import { UserAccessType } from 'api/user-access';
import type { AxiosError } from 'axios';
import { PageTitle } from 'components/page-title';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { uiActions } from 'store/ui';
import { userAccessActions, userAccessQuery, userAccessSelectors } from 'store/user-access';
const Permissions = lazy(() => import('./Permissions'));

import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

interface PermissionsWrapperOwnProps {
  children?: React.ReactNode;
}

interface PermissionsWrapperStateProps {
  userAccess: UserAccess;
  userAccessError: AxiosError;
  userAccessFetchStatus: FetchStatus;
  userAccessQueryString: string;
}

type PermissionsWrapperProps = PermissionsWrapperOwnProps;

const PermissionsWrapperBase: React.FC<PermissionsWrapperProps> = ({ children }) => {
  const { userAccessFetchStatus } = useMapToProps();

  return (
    <PageTitle>
      {userAccessFetchStatus === FetchStatus.complete && (
        <Suspense
          fallback={
            <Bullseye>
              <Spinner size="lg" />
            </Bullseye>
          }
        >
          <Permissions>{children}</Permissions>
        </Suspense>
      )}
    </PageTitle>
  );
};

const useMapToProps = (): PermissionsWrapperStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

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

  useEffect(() => {
    // Clear cached API responses
    dispatch(uiActions.resetState());

    if (userAccessFetchStatus !== FetchStatus.inProgress) {
      dispatch(userAccessActions.fetchUserAccess(UserAccessType.all, userAccessQueryString));
    }
  }, []);

  return {
    userAccess,
    userAccessError,
    userAccessFetchStatus,
    userAccessQueryString,
  };
};

const PermissionsWrapper = PermissionsWrapperBase;

export default PermissionsWrapper;
