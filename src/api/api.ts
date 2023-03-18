import { authInterceptor as insightsAuthInterceptor } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export interface PagedMetaData {
  count?: number | string; // Todo: supports test data
}

export interface PagedLinks {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface PagedResponse<D = any, M = any> {
  meta: M;
  links?: PagedLinks;
  data: D[];
}

export interface PagedResponseAlt<D = any, M = any> {
  meta: M;
  links?: PagedLinks;
  data: D;
}

/*
 * Potential API environments
 *
 * billing.dev.api.redhat.com
 * billing.qa.api.redhat.com
 * billing.stage.api.redhat.com
 * billing.api.redhat.com
 */
export function initApi({ version }: { version: string }) {
  const insights = (window as any).insights;
  const env = insights.chrome.isProd() ? '' : '.dev';

  axios.defaults.baseURL = `https://billing${env}.api.redhat.com/${version}/`;
  axios.interceptors.request.use(authInterceptor);
  axios.interceptors.request.use(insightsAuthInterceptor);
}

export function authInterceptor(reqConfig: AxiosRequestConfig) {
  const insights = (window as any).insights;
  return insights.chrome.auth.getToken().then(token => {
    if (!token) {
      return reqConfig;
    }
    return {
      ...reqConfig,
      headers: {
        Accept: 'application/json', // Allow to be overridden
        Authorization: `Bearer ${token}`,
        ...reqConfig.headers,
      } as any,
    };
  });
}
