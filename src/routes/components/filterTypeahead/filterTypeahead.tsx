import type { FilterPathsType, FilterType } from 'api/filters/filter';
import React, { useState } from 'react';

import { FilterInput } from './filterInput';

interface FilterTypeaheadOwnProps {
  category?: string;
  filterPathsType: FilterPathsType;
  filterType: FilterType;
  isDisabled?: boolean;
  onSelect?: (value: string) => void;
}

type FilterTypeaheadProps = FilterTypeaheadOwnProps;

// This wrapper provides text input value as the search prop for FilterInput.
// This is used to create a query param to retrieve cached API requests.
const FilterTypeahead: React.FC<FilterTypeaheadProps> = ({
  category,
  filterPathsType,
  filterType,
  isDisabled,
  onSelect,
}) => {
  const [search, setSearch] = useState(undefined);

  const handleOnClear = () => {
    setSearch(undefined);
  };

  const handleOnSearch = (value: string) => {
    setSearch(value);
  };

  const handleOnSelect = (value: string) => {
    setSearch(undefined);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <FilterInput
      category={category}
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
