import type { PagedMetaData, PagedResponse } from 'api/api';

export interface ReportValue {
  units?: string;
  value?: number;
}

export interface ReportItem {
  affiliate?: string;
  date?: string;
  committedSpend?: ReportValue;
  product?: string;
  sourceOfSpend?: string;
}

export interface ReportData {
  date?: string;
  values?: any[];
}

export interface ReportMeta extends PagedMetaData {
  excess_actual_spend: ReportValue;
  count?: number;
  delta?: {
    percent: number;
    value: number;
  };
  filter?: {
    [filter: string]: any;
  };
  groupBy?: {
    [group: string]: string[];
  };
  orderBy?: {
    [order: string]: string;
  };
  others?: number;
}

export interface Report extends PagedResponse<ReportData, ReportMeta> {}

// eslint-disable-next-line no-shadow
export const enum ReportType {
  actualSpend = 'actualSpend',
  committedSpend = 'committedSpend',
  details = 'details',
}

// eslint-disable-next-line no-shadow
export const enum ReportPathsType {
  accountSummary = 'accountSummary',
  details = 'details',
}
