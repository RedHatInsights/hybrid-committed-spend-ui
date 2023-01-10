import type { FilterPathsType, FilterType } from 'api/filters/filter';

export const filterStateKey = 'filter';

export function getFetchId(filterPathsType: FilterPathsType, filterType: FilterType, filterQueryString: string) {
  return `${filterPathsType}--${filterType}--${filterQueryString}`;
}
