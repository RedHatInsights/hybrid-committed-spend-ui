import type { FilterPathsType, FilterType } from 'api/filters/filter';
import type { FormEvent } from 'react';
import React, { useState } from 'react';
import { cleanInput } from 'routes/utils/common';

import { FilterInput } from './FilterInput';

interface FilterTypeaheadOwnProps {
  ariaLabel?: string;
  category?: string;
  endDate?: Date;
  filterPathsType: FilterPathsType;
  filterType: FilterType;
  isDisabled?: boolean;
  onSelect?: (value: string) => void;
  placeholder?: string;
  startDate?: Date;
}

type FilterTypeaheadProps = FilterTypeaheadOwnProps;

// This wrapper provides text input value as the search prop for FilterInput.
// This is used to create a query param to retrieve cached API requests.
const FilterTypeahead: React.FC<FilterTypeaheadProps> = ({
  ariaLabel,
  category,
  endDate,
  filterPathsType,
  filterType,
  isDisabled,
  onSelect,
  placeholder,
  startDate,
}) => {
  const [search, setSearch] = useState<string>(undefined);

  const handleOnClear = () => {
    setSearch(undefined);
  };

  const handleOnSearch = (evt: FormEvent, value: string) => {
    const val = cleanInput(value);
    setSearch(val);
  };

  const handleOnSelect = (value: string) => {
    setSearch(undefined);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <FilterInput
      endDate={endDate}
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
      startDate={startDate}
    />
  );
};

export default FilterTypeahead;
