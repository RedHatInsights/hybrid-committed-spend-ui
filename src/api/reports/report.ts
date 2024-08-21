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

export type Report = PagedResponse<ReportData, ReportMeta>;

export const enum ReportType {
  actualSpend = 'actualSpend',
  committedSpend = 'committedSpend',
  details = 'details',
}

export const enum ReportPathsType {
  accountSummary = 'accountSummary',
  details = 'details',
}
