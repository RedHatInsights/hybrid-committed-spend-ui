import { Bullseye, Spinner } from '@patternfly/react-core';
import { UserAccess } from 'components/user-access';
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

const Details = lazy(() => import(/* webpackChunkName: "Details" */ 'routes/details/Details'));
const Overview = lazy(() => import(/* webpackChunkName: "Overview" */ 'routes/overview/Overview'));

// For syncing with permissions
const paths = {
  details: '/details',
  overview: '/',
};

const routes = [
  {
    element: UserAccess(Details),
    path: paths.details,
  },
  {
    element: UserAccess(Overview),
    path: paths.overview,
  },
];

const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner size="lg" />
      </Bullseye>
    }
  >
    <Switch>
      {routes.map(route => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      {/* Finally, catch all unmatched routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Switch>
  </Suspense>
);

export { paths, Routes, routes };
