import type { PagedMetaData, PagedResponseAlt } from 'api/api';

export interface OptionValue {
  code?: string;
  name?: string;
}

export interface OptionData {
  group_by?: OptionValue[];
  source_of_spend?: OptionValue[];
}

export interface OptionMeta extends PagedMetaData {
  // TBD...
}

export interface Option extends PagedResponseAlt<OptionData, OptionMeta> {}

// eslint-disable-next-line no-shadow
export const enum OptionType {
  all = 'all', // group_by and source_of_spend options
}

// eslint-disable-next-line no-shadow
export const enum OptionPathsType {
  detailsOption = 'detailsOption',
}
