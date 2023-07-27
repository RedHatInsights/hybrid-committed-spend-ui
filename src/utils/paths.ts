import { useLocation } from 'react-router-dom';
import { routes } from 'Routes';

// eslint-disable-next-line no-restricted-imports
import pkg from '../../package.json';

// Note the basename does not include a release prefix (/beta, /preview, etc.), unlike the getBaseName function from
// @redhat-cloud-services/frontend-components-utilities/helpers
export const getBasename = pathname => {
  const index = pathname ? pathname.indexOf(pkg.insights.appname) + pkg.insights.appname.length : 0;
  return index <= pathname.length ? pathname.substring(0, index) : ''; // '/business-services/hybrid-committed-spend'
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

// Prefixes the given path with a basename
export const useFormatPath = path => {
  const pathname = usePathname();
  const basename = getBasename(pathname);
  return path === routes.overview.path ? basename : `${basename}${path}`;
};

export const usePathname = () => {
  const location = useLocation();

  return location.pathname.replace(/\/$/, '');
};
