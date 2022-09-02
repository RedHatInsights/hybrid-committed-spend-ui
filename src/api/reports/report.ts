import { PagedMetaData, PagedResponse } from 'api/api';

export interface ReportValue {
  units?: string;
  value?: number;
}

export interface ReportItemValue {
  markup?: ReportValue;
  raw?: ReportValue;
  total?: ReportValue;
  usage: ReportValue;
}

export interface ReportItem {
  cost?: ReportItemValue;
  date?: string;
  delta_percent?: number;
  delta_value?: number;
  infrastructure?: ReportItemValue;
  source_uuid?: string;
  supplementary?: ReportItemValue;
}

export interface ReportSampleItem extends ReportItem {
  account?: string;
  account_alias?: string;
  region?: string;
  service?: string;
}

export interface ReportData {
  date?: string;
  values?: ReportSampleItem[];
}

export interface ReportMeta extends PagedMetaData {
  count: number;
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
  cost = 'cost',
}

// eslint-disable-next-line no-shadow
export const enum ReportPathsType {
  billing = 'billing',
}
