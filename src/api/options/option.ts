import type { PagedMetaData, PagedResponse } from 'api/api';

export interface OptionValue {
  code?: string;
  name?: string;
}

export interface OptionGroupBy {
  group_by?: OptionValue[];
}

export interface OptionSourceOfSpend {
  source_of_spend?: OptionValue[];
}

export type OptionData = OptionGroupBy | OptionSourceOfSpend;

export interface OptionMeta extends PagedMetaData {
  // TBD...
}

export interface Option extends PagedResponse<OptionData, OptionMeta> {}

// eslint-disable-next-line no-shadow
export const enum OptionType {
  all = 'all', // group_by and source_of_spend options
}

// eslint-disable-next-line no-shadow
export const enum OptionPathsType {
  detailsOption = 'detailsOption',
}
