import { routes } from 'Routes';

// Returns Routes path associated with given window location
export const getPath = location => {
  const currRoute = location ? routes.find(({ path }) => path === location.pathname) : undefined;
  return currRoute ? currRoute.path : undefined;
};
