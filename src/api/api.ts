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
 * Potential API environments
 *
 * billing.dev.api.redhat.com
 * billing.qa.api.redhat.com
 * billing.stage.api.redhat.com
 * billing.api.redhat.com
 */
export function initApi({
  isBillingStageFeatureEnabled = false,
  version,
}: {
  isBillingStageFeatureEnabled: boolean;
  version: string;
}) {
  // Use Consoledot proxy for billing.api.redhat.com and billing.qa.api.redhat.com
  let baseURL = '/api/billing';

  if (isBillingStageFeatureEnabled) {
    // baseURL = 'https://billing.stage.api.redhat.com';
    baseURL = '/api/billing'; // TEST
  }

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
