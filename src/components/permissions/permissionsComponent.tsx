import { Spinner } from '@patternfly/react-core';
import React, { lazy, Suspense } from 'react';

const PermissionsWrapper = lazy(() => import('components/permissions/permissionsWrapper'));

interface State {
  // TBD...
}

// Permissions component wrapper for AsyncComponent
export function permissionsComponent<Props>(AysncComponent) {
  class PermissionsComponent extends React.Component<Props, State> {
    public render() {
      return (
        <Suspense fallback={<Spinner />}>
          <PermissionsWrapper>
            <AysncComponent {...this.props} />
          </PermissionsWrapper>
        </Suspense>
      );
    }
  }
  return PermissionsComponent;
}
