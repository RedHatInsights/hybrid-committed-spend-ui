import type { PagedMetaData, PagedResponse } from 'api/api';

export interface ReportValue {
  units?: string;
  value?: string | number; // Todo: supports test data
}

// Todo: supports test data
export interface ReportItemValue {
  markup?: ReportValue;
  raw?: ReportValue;
  total?: ReportValue;
  usage: ReportValue;
}

// Todo: supports test data
export interface ReportItem {
  cost?: ReportItemValue;
  date?: string;
  delta_percent?: number;
  delta_value?: number;
  infrastructure?: ReportItemValue;
  source_uuid?: string;
  supplementary?: ReportItemValue;
}

export interface ReportData {
  date?: string;
  values?: any[];
}

export interface ReportMeta extends PagedMetaData {
  count?: string | number; // Todo: supports test data
  delta?: {
    percent: number;
    value: number;
  };
  filter?: {
    [filter: string]: any;
  };
  group_by?: {
    [group: string]: string[];
  };
  order_by?: {
    [order: string]: string;
  };
  others?: number;
  total?: {
    capacity?: ReportValue;
    cost?: ReportItemValue;
    count?: ReportValue;
    infrastructure?: ReportItemValue;
    limit?: ReportValue;
    request?: ReportValue;
    supplementary?: ReportItemValue;
    usage?: ReportValue;
  };
}

export interface Report extends PagedResponse<ReportData, ReportMeta> {}

// eslint-disable-next-line no-shadow
export const enum ReportType {
  billing = 'billing',
  cost = 'cost', // Todo: supports test data
}

// eslint-disable-next-line no-shadow
export const enum ReportPathsType {
  accountSummary = 'accountSummary',
  details = 'details', // Todo: placeholder for upcoming API
  detailsFilter = 'detailsFilter',

  // Todo: for testing
  actualSpend = 'actualSpend',
  actualSpendBreakdown = 'actualSpendBreakdown',
  committedSpend = 'committedSpend',
  committedSpendTrend = 'committedSpendTrend',
}
