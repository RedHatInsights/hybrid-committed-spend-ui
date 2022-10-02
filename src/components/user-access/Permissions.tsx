import { useFlag } from '@unleash/proxy-client-react';
import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import { UserAccess, UserAccessType } from 'api/user-access';
import { AxiosError } from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { paths, routes } from 'Routes';
import { Loading } from 'routes/state';
import { NotAuthorized, NotAvailable } from 'routes/state';
import { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { userAccessQuery, userAccessSelectors } from 'store/user-access';
import { hasAllAccess } from 'utils/userAccess';

import { FeatureToggle } from '../feature-flags';
interface PermissionsOwnProps extends RouteComponentProps<void> {
  children?: React.ReactNode;
}

interface PermissionsStateProps {
  userAccess: UserAccess;
  userAccessError: AxiosError;
  userAccessFetchStatus: FetchStatus;
  userAccessQueryString: string;
}

type PermissionsProps = PermissionsOwnProps;

const PermissionsBase: React.FC<PermissionsProps> = ({ children = null, location }) => {
  const { userAccess, userAccessError, userAccessFetchStatus } = mapToProps();

  const getRoutePath = () => {
    const currRoute = routes.find(({ path }) => path === location.pathname);
    return currRoute ? currRoute.path : undefined;
  };

  const hasPermissions = () => {
    if (userAccessFetchStatus !== FetchStatus.complete) {
      return false;
    }

    const hasAccess = hasAllAccess(userAccess);
    const details = hasAccess && useFlag(FeatureToggle.details);
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

const mapToProps = (): PermissionsStateProps => {
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

const Permissions = withRouter(PermissionsBase);

export default Permissions;
