import { Bullseye, Spinner } from '@patternfly/react-core';
import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import { UserAccess, UserAccessType } from 'api/user-access';
import { AxiosError } from 'axios';
import { PageTitle } from 'components/page-title';
import React, { lazy, Suspense, useEffect } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { uiActions } from 'store/ui';
import { userAccessActions, userAccessQuery, userAccessSelectors } from 'store/user-access';
const Permissions = lazy(() => import('./Permissions'));

interface PermissionsWrapperOwnProps {
  children?: React.ReactNode;
}

interface PermissionsWrapperStateProps {
  userAccess: UserAccess;
  userAccessError: AxiosError;
  userAccessFetchStatus: FetchStatus;
  userAccessQueryString: string;
}

type PermissionsWrapperProps = PermissionsWrapperOwnProps & WrappedComponentProps;

const PermissionsWrapperBase: React.FC<PermissionsWrapperProps> = ({ children }) => {
  const { userAccessFetchStatus } = mapToProps();

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

const mapToProps = (): PermissionsWrapperStateProps => {
  const dispatch = useDispatch();

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

const PermissionsWrapper = injectIntl(PermissionsWrapperBase);

export default PermissionsWrapper;
