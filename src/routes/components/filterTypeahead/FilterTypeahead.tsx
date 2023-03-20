import type { FilterPathsType, FilterType } from 'api/filters/filter';
import type { FormEvent } from 'react';
import React, { useState } from 'react';

import { FilterInput } from './FilterInput';

interface FilterTypeaheadOwnProps {
  ariaLabel?: string;
  category?: string;
  filterPathsType: FilterPathsType;
  filterType: FilterType;
  isDisabled?: boolean;
  onSelect?: (value: string) => void;
  placeholder?: string;
}

type FilterTypeaheadProps = FilterTypeaheadOwnProps;

// This wrapper provides text input value as the search prop for FilterInput.
// This is used to create a query param to retrieve cached API requests.
const FilterTypeahead: React.FC<FilterTypeaheadProps> = ({
  ariaLabel,
  category,
  filterPathsType,
  filterType,
  isDisabled,
  onSelect,
  placeholder,
}) => {
  const [search, setSearch] = useState<string>(undefined);

  const handleOnClear = () => {
    setSearch(undefined);
  };

  const handleOnSearch = (evt: FormEvent, value: string) => {
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
      ariaLabel={ariaLabel}
      category={category}
      isDisabled={isDisabled}
      onClear={handleOnClear}
      onSearchChanged={handleOnSearch}
      onSelect={handleOnSelect}
      filterPathsType={filterPathsType}
      filterType={filterType}
      placeholder={placeholder}
      search={search}
    />
  );
};

export default FilterTypeahead;
