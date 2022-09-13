import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import { UserAccess, UserAccessType } from 'api/user-access';
import { AxiosError } from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { paths, routes } from 'Routes';
import { Loading } from 'routes/state';
import { NotAuthorized, NotAvailable } from 'routes/state';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { featureFlagsSelectors } from 'store/feature-flags/';
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

type PermissionsProps = PermissionsOwnProps & PermissionsStateProps;

const PermissionsBase: React.FC<PermissionsProps> = ({
  children = null,
  isDetailsFeatureEnabled,
  location,
  userAccess,
  userAccessError,
  userAccessFetchStatus,
}) => {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<PermissionsOwnProps, PermissionsStateProps>((state, props) => {
  const isDetailsFeatureEnabled = featureFlagsSelectors.selectIsDetailsFeatureEnabled(state);

  const userAccessQueryString = getUserAccessQuery(userAccessQuery);
  const userAccess = userAccessSelectors.selectUserAccess(state, UserAccessType.all, userAccessQueryString);
  const userAccessError = userAccessSelectors.selectUserAccessError(state, UserAccessType.all, userAccessQueryString);
  // const userAccessFetchStatus = userAccessSelectors.selectUserAccessFetchStatus(
  //   state,
  //   UserAccessType.all,
  //   userAccessQueryString
  // );
  const userAccessFetchStatus = FetchStatus.complete; // Todo: Remove when API is available

  return {
    isDetailsFeatureEnabled,
    userAccess,
    userAccessError,
    userAccessFetchStatus,
    userAccessQueryString,
  };
});

const Permissions = withRouter(connect(mapStateToProps, undefined)(PermissionsBase));

export default Permissions;
