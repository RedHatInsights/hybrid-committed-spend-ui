import { useLocation } from 'react-router-dom';
import { routes } from 'Routes';

// Prefixes the given path with a basename
//
// Note the basename does not include a release prefix (/beta, /preview, etc.), unlike the getBaseName function from
// @redhat-cloud-services/frontend-components-utilities/helpers
export const formatPath = path => {
  const basename = '/business-services/hybrid-committed-spend';
  return path === routes.overview.path ? basename : `${basename}${path}`;
};

export const getReleasePath = () => {
  const pathName = window.location.pathname.split('/');
  pathName.shift();

  let release = '';
  if (pathName[0] === 'beta') {
    release = `/beta`;
  }
  if (pathName[0] === 'preview') {
    release = `/preview`;
  }
  return release;
};

export const usePathname = () => {
  const location = useLocation();

  return location.pathname.replace(/\/$/, '');
};
