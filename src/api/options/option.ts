import type { PagedMetaData, PagedResponseAlt } from 'api/api';

export interface OptionValue {
  code?: string;
  name?: string;
}

export interface OptionData {
  group_by?: OptionValue[];
  source_of_spend?: OptionValue[];
}

export type OptionMeta = PagedMetaData;

export type Option = PagedResponseAlt<OptionData, OptionMeta>;

export const enum OptionType {
  all = 'all', // group_by and source_of_spend options
}

export const enum OptionPathsType {
  detailsOption = 'detailsOption',
}
