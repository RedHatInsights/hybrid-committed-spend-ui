import { Bullseye, Spinner } from '@patternfly/react-core';
import React, { lazy, Suspense } from 'react';

const PermissionsWrapper = lazy(() => import('components/user-access/PermissionsWrapper'));

// Permissions component wrapper
export function UserAccess<Props>(Component) {
  const PermissionsComponent: React.FC<Props> = props => {
    return (
      <Suspense
        fallback={
          <Bullseye>
            <Spinner size="lg" />
          </Bullseye>
        }
      >
        <PermissionsWrapper>
          <Component {...props} />
        </PermissionsWrapper>
      </Suspense>
    );
  };
  return PermissionsComponent;
}
