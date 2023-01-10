import type { FilterPathsType, FilterType } from 'api/filters/filter';
import React, { useState } from 'react';

import { FilterInput } from './filterInput';

interface FilterTypeaheadOwnProps {
  filterPathsType: FilterPathsType;
  filterType: FilterType;
  isDisabled?: boolean;
  onSelect?: (value: string) => void;
}

type FilterTypeaheadProps = FilterTypeaheadOwnProps;

// This wrapper provides text input value as the search prop for FilterInput.
// This is used to create a query param to retrieve cached API requests.
const FilterTypeahead: React.FC<FilterTypeaheadProps> = ({ filterPathsType, filterType, isDisabled, onSelect }) => {
  const [search, setSearch] = useState(undefined);

  const handleOnClear = () => {
    setSearch(undefined);
  };

  const handleOnSearch = (value: string) => {
    setSearch(value);
  };

  const handleOnSelect = (value: string) => {
    setSearch(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <FilterInput
      isDisabled={isDisabled}
      onClear={handleOnClear}
      onSearchChanged={handleOnSearch}
      onSelect={handleOnSelect}
      filterPathsType={filterPathsType}
      filterType={filterType}
      search={search}
    />
  );
};

export default FilterTypeahead;
