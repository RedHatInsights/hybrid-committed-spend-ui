import { runFilter as runDetailsFilter } from './detailsFilter';
import { FilterPathsType, FilterType } from './filter';

// Temporary check until typeahead is implemented for all filters
export function isFilterTypeValid(filterPathsType: FilterPathsType, filterType: FilterType) {
  let result = false;

  if (filterPathsType === FilterPathsType.detailsFilter) {
    switch (filterType) {
      case FilterType.affiliate:
      case FilterType.product:
      case FilterType.sourceOfSpend:
        result = true;
        break;
    }
  }
  return result;
}

export function runFilter(filterPathsType: FilterPathsType, filterType: FilterType, query: string) {
  let result;
  switch (filterPathsType) {
    case FilterPathsType.detailsFilter:
      result = runDetailsFilter(filterType, query);
      break;
  }
  return result;
}
