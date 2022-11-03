import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import type { UserAccess } from 'api/user-access';
import { UserAccessType } from 'api/user-access';
import type { AxiosError } from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { paths, routes } from 'Routes';
import { Loading, NotAuthorized, NotAvailable } from 'routes/state';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { featureFlagsSelectors } from 'store/feature-flags';
import { userAccessQuery, userAccessSelectors } from 'store/user-access';
import { hasAllAccess } from 'utils/userAccess';
interface PermissionsOwnProps extends RouteComponentProps<void> {
  children?: React.ReactNode;
}

interface PermissionsStateProps {
  isDetailsFeatureEnabled?: boolean;
  userAccess: UserAccess;
  userAccessError: AxiosError;
  userAccessFetchStatus: FetchStatus;
  userAccessQueryString: string;
}

type PermissionsProps = PermissionsOwnProps;

const PermissionsBase: React.FC<PermissionsProps> = ({ children = null, location }) => {
  const { isDetailsFeatureEnabled, userAccess, userAccessError, userAccessFetchStatus } = useMapToProps();

  const getRoutePath = () => {
    const currRoute = routes.find(({ path }) => path === location.pathname);
    return currRoute ? currRoute.path : undefined;
  };

  const hasPermissions = () => {
    if (userAccessFetchStatus !== FetchStatus.complete) {
      return false;
    }

    const hasAccess = hasAllAccess(userAccess);
    const details = hasAccess && isDetailsFeatureEnabled;
    const overview = hasAccess;

    switch (getRoutePath()) {
      case paths.details:
        return details;
      case paths.overview:
        return overview;
      default:
        return false;
    }
  };

  // Page access denied because user doesn't have RBAC permissions and is not an org admin
  let result = <NotAuthorized pathname={location.pathname} />;

  if (userAccessFetchStatus === FetchStatus.inProgress) {
    result = <Loading />;
  } else if (userAccessError) {
    result = <NotAvailable />;
  } else if (hasPermissions()) {
    result = <>{children}</>;
  }
  return result;
};

const useMapToProps = (): PermissionsStateProps => {
  const isDetailsFeatureEnabled = useSelector((state: RootState) =>
    featureFlagsSelectors.selectIsDetailsFeatureEnabled(state)
  );

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
    isDetailsFeatureEnabled,
    userAccess,
    userAccessError,
    userAccessFetchStatus,
    userAccessQueryString,
  };
};

const Permissions = withRouter(PermissionsBase);

export default Permissions;
