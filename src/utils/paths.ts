import { routes } from 'Routes';

export const getPath = location => {
  const currRoute = location ? routes.find(({ path }) => path === location.pathname) : undefined;
  return currRoute ? currRoute.path : undefined;
};
