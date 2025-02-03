import type { AxiosInstance, AxiosRequestConfig } from 'axios';
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
 * billing.api.redhat.com/v1/ (prod)
 * billing.qa.api.redhat.com/v1/ (UI development)
 * billing.stage.api.redhat.com/v1/ (UAT testing)
 * billing.dev.api.redhat.com/v1/ (Backend development)
 */
export function initApi({ isBillingStageToggleEnabled }: { isBillingStageToggleEnabled: boolean }) {
  if (!axiosInstance) {
    return;
  }

  const insights = (window as any).insights;
  const isProd = insights?.chrome?.isProd();
  const isStageAPI = isBillingStageToggleEnabled && !isProd;

  /**
   * The stage API is used with users created for UAT testing
   *
   * Use proxy for billing.api.redhat.com and billing.qa.api.redhat.com -- see https://issues.redhat.com/browse/HCS-222
   */
  if (isStageAPI) {
    axiosInstance.defaults.baseURL = `https://billing.stage.api.redhat.com/v1/`;
  }
}

export function authInterceptor(reqConfig: AxiosRequestConfig) {
  const insights = (window as any).insights;
  return insights?.chrome?.auth?.getToken().then(token => {
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

/**
 * Create an Axios instance
 *
 * Note: Setting global defaults may affect the base URL in Cost Management, HCS, and OCM, when navigating between apps
 * See https://issues.redhat.com/browse/RHCLOUD-25573
 */
const axiosInstance: AxiosInstance = axios.create({
  /**
   * ConsoleDot proxies:
   *
   * console.stage.redhat.com/api/billing -> billing.qa.redhat.com (billing.qa.api.redhat.com)
   * console.redhat.com/api/billing -> billing.redhat.com (billing.api.redhat.com)
   *
   * See Sources UI: https://github.com/RedHatInsights/sources-ui/pull/1269
   */
  baseURL: `/api/billing/v1/`, // Note: Request URLs coming out of stage.foo should be stage.foo, never console.stage
});

axiosInstance.interceptors.request.use(authInterceptor);

export default axiosInstance;
