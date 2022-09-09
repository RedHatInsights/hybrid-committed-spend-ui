import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import { UserAccess, UserAccessType } from 'api/userAccess';
import { AxiosError } from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { paths, routes } from 'Routes';
import { Loading } from 'routes/state/Loading';
import { NotAuthorized } from 'routes/state/NotAuthorized';
import { NotAvailable } from 'routes/state/NotAvailable';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { featureFlagsSelectors } from 'store/featureFlags';
import { userAccessQuery, userAccessSelectors } from 'store/userAccess';
import { hasAllAccess } from 'utils/userAccess';

interface PermissionsOwnProps extends RouteComponentProps<void> {
  children?: React.ReactNode;
}

interface PermissionsStateProps {
  isExplorerFeatureEnabled?: boolean;
  userAccess: UserAccess;
  userAccessError: AxiosError;
  userAccessFetchStatus: FetchStatus;
  userAccessQueryString: string;
}

type PermissionsProps = PermissionsOwnProps & PermissionsStateProps;

const PermissionsBase: React.FC<PermissionsProps> = ({
  children = null,
  isExplorerFeatureEnabled,
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
    const explorer = hasAccess && isExplorerFeatureEnabled;
    const overview = hasAccess;

    switch (getRoutePath()) {
      case paths.explorer:
        return explorer;
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
  const isExplorerFeatureEnabled = featureFlagsSelectors.selectIsExplorerFeatureEnabled(state);

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
    isExplorerFeatureEnabled,
    userAccess,
    userAccessError,
    userAccessFetchStatus,
    userAccessQueryString,
  };
});

const Permissions = withRouter(connect(mapStateToProps, undefined)(PermissionsBase));

export default Permissions;
