import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import type { UserAccess } from 'api/user-access';
import { UserAccessType } from 'api/user-access';
import type { AxiosError } from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { routes } from 'Routes';
import { Loading, NotAuthorized, NotAvailable, NotViewable } from 'routes/state';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { userAccessQuery, userAccessSelectors } from 'store/user-access';
import { useFormatPath, usePathname } from 'utils/paths';
import { hasHcsDataVisibility, hasHcsDeal, hasHcsViewer } from 'utils/userAccess';

interface PermissionsOwnProps {
  children?: React.ReactNode;
}

interface PermissionsStateProps {
  userAccess: UserAccess;
  userAccessError: AxiosError;
  userAccessFetchStatus: FetchStatus;
  userAccessQueryString: string;
}

type PermissionsProps = PermissionsOwnProps;

const Permissions: React.FC<PermissionsProps> = ({ children = null }) => {
  const { userAccess, userAccessError, userAccessFetchStatus } = useMapToProps();
  const formatPath = useFormatPath;
  const pathname = usePathname();

  const hasPermissions = () => {
    if (userAccessFetchStatus !== FetchStatus.complete) {
      return false;
    }
    const hasDeal = hasHcsDeal(userAccess);
    const hasViewer = hasHcsViewer(userAccess);

    switch (pathname) {
      case formatPath(routes.details.path):
        return hasDeal && hasViewer;
      case formatPath(routes.overview.path):
        return hasDeal && hasViewer;
      default:
        return false;
    }
  };

  // Page access denied because user doesn't have RBAC permissions and is not an org admin
  let result = <NotAuthorized pathname={pathname} />;

  if (userAccessFetchStatus === FetchStatus.inProgress) {
    result = <Loading />;
  } else if (userAccessError) {
    result = <NotAvailable />;
  } else if (userAccessFetchStatus === FetchStatus.complete && !hasHcsDeal(userAccess)) {
    result = <NotAuthorized pathname={pathname} />;
  } else if (userAccessFetchStatus === FetchStatus.complete && !hasHcsDataVisibility(userAccess)) {
    result = <NotViewable pathname={pathname} />;
  } else if (hasPermissions()) {
    result = <>{children}</>;
  }
  return result;
};

const useMapToProps = (): PermissionsStateProps => {
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

export default Permissions;
