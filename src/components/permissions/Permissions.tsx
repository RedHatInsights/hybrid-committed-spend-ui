import React from 'react';
import { routes } from 'Routes';
import { Loading, NotAuthorized, NotAvailable, NotDeal, NotViewer, NotVisible } from 'routes/state';
import { FetchStatus } from 'store/common';
import { useFormatPath, usePathname } from 'utils/paths';
import { hasHcsDataVisibility, hasHcsDeal, hasHcsViewer, useUserAccessMapToProps } from 'utils/userAccess';

import { useIsOverridePermissionsToggleEnabled } from '../feature-toggle';
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
    switch (pathname) {
      case formatPath(routes.details.path):
      case formatPath(routes.overview.path):
        return true;
      default:
        return false;
    }
  };

  // Page access denied because user doesn't have RBAC permissions and is not an org admin
  let result = <NotAuthorized pathname={pathname} />;

  const isOverridePermissionsToggleEnabled = useIsOverridePermissionsToggleEnabled();

  if (userAccessFetchStatus === FetchStatus.inProgress) {
    result = <Loading />;
  } else if (userAccessError?.response?.request?.status === 401 && !isOverridePermissionsToggleEnabled) {
    result = <NotAuthorized pathname={pathname} />;
  } else if (userAccessError) {
    result = <NotAvailable />;
  } else if (
    userAccessFetchStatus === FetchStatus.complete &&
    !hasHcsDeal(userAccess) &&
    !isOverridePermissionsToggleEnabled
  ) {
    result = <NotDeal pathname={pathname} />;
  } else if (
    userAccessFetchStatus === FetchStatus.complete &&
    !hasHcsDataVisibility(userAccess) &&
    !isOverridePermissionsToggleEnabled
  ) {
    result = <NotVisible pathname={pathname} />;
  } else if (
    userAccessFetchStatus === FetchStatus.complete &&
    !hasHcsViewer(userAccess) &&
    !isOverridePermissionsToggleEnabled
  ) {
    result = <NotViewer pathname={pathname} />;
  } else if (hasPermissions()) {
    result = <>{children}</>;
  }
  return result;
};

export default Permissions;
