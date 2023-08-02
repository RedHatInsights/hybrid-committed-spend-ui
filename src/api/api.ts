import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export interface PagedMetaData {
  count?: number;
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
 * API environments:
 *
 * billing.api.redhat.com (prod)
 * billing.qa.api.redhat.com (default)
 * billing.stage.api.redhat.com (UAT testing)
 * billing.dev.api.redhat.com
 *
 * ConsoleDot proxies:
 *
 * console.redhat.com/api/billing -> billing.api.redhat.com
 * console.stage.redhat.com/api/billing -> billing.qa.api.redhat.com
 */
export function initApi({
  isBillingStageFeatureEnabled = false,
  version,
}: {
  isBillingStageFeatureEnabled: boolean;
  version: string;
}) {
  const insights = (window as any).insights;
  const isStageAPI = isBillingStageFeatureEnabled && !insights.chrome.isProd();

  // Use proxy for billing.api.redhat.com and billing.qa.api.redhat.com -- see https://issues.redhat.com/browse/HCS-222
  const baseURL = isStageAPI ? 'https://billing.stage.api.redhat.com' : '/api/billing';

  axios.defaults.baseURL = `${baseURL}/${version}/`;
  axios.interceptors.request.use(authInterceptor);
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
