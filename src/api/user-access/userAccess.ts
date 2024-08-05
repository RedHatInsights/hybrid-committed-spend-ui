import { axiosInstance } from 'api';

export interface UserAccess {
  hcsDataVisibility?: number;
  hcsDeal?: boolean;
  hcsViewer?: boolean;
}

export const enum UserAccessType {
  all = 'all',
  dataVisibility = 'dataVisibility',
  deal = 'deal',
  viewer = 'viewer',
}

// If the user-access API is called without a query parameter, all types are returned in the response
export function fetchUserAccess(query: string) {
  const queryString = query ? `?${query}` : '';
  return axiosInstance.get<UserAccess>(`authorization/hcsEnrollment${queryString}`);
}
