import React from 'react';
import { routes } from 'Routes';
import { Loading, NotAuthorized, NotAvailable, NotViewable } from 'routes/state';
import { FetchStatus } from 'store/common';
import { useFormatPath, usePathname } from 'utils/paths';
import { hasHcsDataVisibility, hasHcsDeal, hasHcsViewer, useUserAccessMapToProps } from 'utils/userAccess';
interface PermissionsOwnProps {
  children?: React.ReactNode;
}

type PermissionsProps = PermissionsOwnProps;

const Permissions: React.FC<PermissionsProps> = ({ children = null }) => {
  const { userAccess, userAccessError, userAccessFetchStatus } = useUserAccessMapToProps();
  const formatPath = useFormatPath;
  const pathname = usePathname();

  const hasPermissions = () => {
    if (userAccessFetchStatus !== FetchStatus.complete) {
      return false;
    }
    const hasDeal = hasHcsDeal(userAccess);
    const hasViewer = hasHcsViewer(userAccess);
    const hasDataVisibility = hasHcsDataVisibility(userAccess);

    switch (pathname) {
      case formatPath(routes.details.path):
        return hasDeal && hasDataVisibility && hasViewer;
      case formatPath(routes.overview.path):
        return hasDeal && hasDataVisibility && hasViewer;
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

export default Permissions;
