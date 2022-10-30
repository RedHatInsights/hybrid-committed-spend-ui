import { Bullseye, Spinner } from '@patternfly/react-core';
import { UserAccess } from 'components/user-access';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Details = lazy(() => import(/* webpackChunkName: "Details" */ 'routes/details/Details'));
const Overview = lazy(() => import(/* webpackChunkName: "Overview" */ 'routes/overview/Overview'));

// For syncing with permissions
export const paths = {
  details: '/details',
  overview: '/',
};

export const routes = [
  {
    component: UserAccess(Details),
    exact: true,
    path: paths.details,
  },
  {
    component: UserAccess(Overview),
    exact: true,
    path: paths.overview,
  },
];

/**
 * the Switch component changes routes depending on the path.
 *
 * Route properties:
 *      exact - path must match exactly,
 *      path - https://prod.foo.redhat.com:1337/insights/advisor/rules
 *      component - component to be rendered when a route has been chosen.
 */
export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner size="lg" />
      </Bullseye>
    }
  >
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
      {/* Finally, catch all unmatched routes */}
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  </Suspense>
);
