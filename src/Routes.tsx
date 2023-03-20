import { Bullseye, Spinner } from '@patternfly/react-core';
import { UserAccess } from 'components/user-access';
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

const Details = lazy(() => import(/* webpackChunkName: "Details" */ 'routes/details'));
const Overview = lazy(() => import(/* webpackChunkName: "Overview" */ 'routes/overview'));

// For syncing with permissions
const routes = {
  details: {
    element: UserAccess(Details),
    path: '/details',
  },
  overview: {
    element: UserAccess(Overview),
    path: '/',
  },
};

const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner size="lg" />
      </Bullseye>
    }
  >
    <RouterRoutes>
      {Object.keys(routes).map(key => {
        const route = routes[key];
        return <Route key={route.path} path={route.path} element={<route.element />} />;
      })}
      {/* Finally, catch all unmatched routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  </Suspense>
);

export { routes, Routes };
