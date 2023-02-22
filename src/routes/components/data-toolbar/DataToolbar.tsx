import './DataToolbar.scss';

import type { ToolbarChipGroup } from '@patternfly/react-core';
import {
  Button,
  ButtonVariant,
  InputGroup,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import { ExportIcon } from '@patternfly/react-icons/dist/esm/icons/export-icon';
import { FilterIcon } from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { SearchIcon } from '@patternfly/react-icons/dist/esm/icons/search-icon';
import type { FilterPathsType } from 'api/filters/filter';
import type { FilterType } from 'api/filters/filter';
import { isFilterTypeValid } from 'api/filters/filterUtils';
import type { Query } from 'api/queries/query';
import messages from 'locales/messages';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { FilterTypeahead } from 'routes/components/filterTypeahead';
import type { Filter } from 'routes/utils/filter';
import { usePrevious, useStateCallback } from 'utils/hooks';

interface Filters {
  [key: string]: Filter[] | { [key: string]: Filter[] };
}

interface DataToolbarOwnProps {
  categoryOptions?: ToolbarChipGroup[]; // Options for category menu
  filterPathsType?: FilterPathsType;
  groupBy?: string; // Sync category selection with groupBy value
  isDisabled?: boolean;
  isExportDisabled?: boolean; // Show export icon as disabled
  onExportClicked?: () => void;
  onFilterAdded?: (filter: Filter) => void;
  onFilterRemoved?: (filterType: Filter) => void;
  pagination?: React.ReactNode; // Optional pagination controls to display in toolbar
  query?: Query; // Query containing filter_by params used to restore state upon page refresh
}

type DataToolbarProps = DataToolbarOwnProps & WrappedComponentProps;

const DataToolbar: React.FC<DataToolbarProps> = ({
  categoryOptions,
  filterPathsType,
  groupBy,
  intl,
  isDisabled,
  isExportDisabled,
  onExportClicked,
  onFilterAdded,
  onFilterRemoved,
  pagination,
  query,
}) => {
  const [categoryInput, setCategoryInput] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [filters, setFilters] = useStateCallback({});

  const prevCategoryOptions = usePrevious(categoryOptions);
  const prevGroupBy = usePrevious(groupBy);

  // Initialize

  const getFilter = (filterType: string, filterValue: string): Filter => {
    return { type: filterType, value: filterValue };
  };

  const getFilters = (filterType: string, filterValues: string[]): Filter[] => {
    return filterValues.map(value => getFilter(filterType, value));
  };

  const getActiveFilters = (): Filters => {
    const result = {};

    const parseFilters = (key, values) => {
      if (result[key]) {
        result[key] = [...result[key], ...getFilters(key, values)];
      } else {
        result[key] = getFilters(key, values);
      }
    };

    if (query && query.filter_by) {
      Object.keys(query.filter_by).forEach(key => {
        const values = Array.isArray(query.filter_by[key]) ? [...query.filter_by[key]] : [query.filter_by[key]];
        parseFilters(key, values);
      });
    }
    return result;
  };

  const getDefaultCategory = () => {
    if (!categoryOptions) {
      return 'date';
    }
    for (const option of categoryOptions) {
      if (groupBy === option.key) {
        return option.key;
      }
    }
    return categoryOptions[0].key;
  };

  const getChips = (_filters: Filter[]): string[] => {
    const chips = [];
    if (_filters) {
      _filters.forEach(item => {
        chips.push({
          key: item.value,
          node: item.value,
        });
      });
    }
    return chips;
  };

  const onDelete = (type: any, chip: any) => {
    // Todo: workaround for https://github.com/patternfly/patternfly-react/issues/3552
    // This prevents us from using a localized string, if necessary
    const _type = type && type.key ? type.key : type;
    if (_type) {
      const id = chip && chip.key ? chip.key : chip;
      let filter;
      if (filters[_type]) {
        const newFilters = cloneDeep(filters);
        filter = (newFilters[_type] as Filter[]).find(item => item.value === id);
        newFilters[_type] = (newFilters[_type] as Filter[]).filter(item => item.value !== id);
        setFilters(newFilters, () => {
          onFilterRemoved(filter);
        });
      }
    } else {
      setFilters({}, () => {
        onFilterRemoved(null); // Clear all
      });
    }
  };

  // Category input
  const getCategoryInput = (categoryOption: ToolbarChipGroup) => {
    return (
      <ToolbarFilter
        categoryName={categoryOption}
        chips={getChips(filters[categoryOption.key] as Filter[])}
        deleteChip={onDelete}
        key={categoryOption.key}
        showToolbarItem={currentCategory === categoryOption.key}
      >
        <InputGroup>
          {isFilterTypeValid(filterPathsType, categoryOption.key as FilterType) ? (
            <FilterTypeahead
              aria-label={intl.formatMessage(messages.filterByInputAriaLabel, { value: categoryOption.key })}
              category={currentCategory}
              filterPathsType={filterPathsType}
              filterType={categoryOption.key as FilterType}
              isDisabled={isDisabled}
              onSelect={value => onCategoryInputSelect(value, categoryOption.key)}
              placeholder={intl.formatMessage(messages.filterByPlaceholder, { value: categoryOption.key })}
            />
          ) : (
            <>
              <TextInput
                aria-label={intl.formatMessage(messages.filterByInputAriaLabel, { value: categoryOption.key })}
                name={`category-input-${categoryOption.key}`}
                id={`category-input-${categoryOption.key}`}
                isDisabled={isDisabled}
                onChange={handleOnCategoryInputChange}
                onKeyDown={evt => onCategoryInput(evt, categoryOption.key)}
                placeholder={intl.formatMessage(messages.filterByPlaceholder, { value: categoryOption.key })}
                type="search"
                value={categoryInput}
              />
              <Button
                isDisabled={isDisabled}
                variant={ButtonVariant.control}
                aria-label={intl.formatMessage(messages.filterByButtonAriaLabel, { value: categoryOption.key })}
                onClick={evt => onCategoryInput(evt, categoryOption.key)}
              >
                <SearchIcon />
              </Button>
            </>
          )}
        </InputGroup>
      </ToolbarFilter>
    );
  };

  const getDefaultCategoryOptions = (): ToolbarChipGroup[] => {
    return [{ name: intl.formatMessage(messages.names, { count: 1 }), key: 'name' }];
  };

  const getCategoryOptions = (): ToolbarChipGroup[] => {
    return categoryOptions ? categoryOptions : getDefaultCategoryOptions();
  };

  const handleOnCategoryInputChange = (value: string) => {
    setCategoryInput(value);
  };

  const onCategoryInput = (event, key) => {
    if ((event && event.key && event.key !== 'Enter') || categoryInput.trim() === '') {
      return;
    }

    const filter = getFilter(currentCategory, categoryInput);
    const prevItems = filters[key] ? filters[key] : [];
    const newFilters = {
      ...filters,
      [currentCategory]:
        prevItems && (prevItems as Filter[]).find(item => item.value === categoryInput)
          ? prevItems
          : prevItems
          ? [...(prevItems as Filter[]), filter]
          : [filter],
    };

    setCategoryInput('');
    setFilters(newFilters, () => {
      onFilterAdded(filter);
    });
  };

  const onCategoryInputSelect = (value, key) => {
    const filter = getFilter(currentCategory, value);
    const prevItems = filters[key] ? filters[key] : [];
    const newFilters = {
      ...filters,
      [currentCategory]:
        prevItems && (prevItems as Filter[]).find(item => item.value === value)
          ? prevItems
          : prevItems
          ? [...(prevItems as Filter[]), filter]
          : [filter],
    };

    setCategoryInput('');
    setFilters(newFilters, () => {
      onFilterAdded(filter);
    });
  };

  // Export button

  const getExportButton = () => {
    return (
      <ToolbarItem
        spacer={{
          default: 'spacerNone',
        }}
      >
        <Button
          aria-label="Export data"
          isDisabled={isDisabled || isExportDisabled}
          onClick={handleExportClicked}
          variant={ButtonVariant.plain}
        >
          <ExportIcon />
        </Button>
      </ToolbarItem>
    );
  };

  const handleExportClicked = () => {
    if (onExportClicked) {
      onExportClicked();
    }
  };

  useEffect(() => {
    if (prevCategoryOptions !== categoryOptions || prevGroupBy !== groupBy) {
      setCurrentCategory(getDefaultCategory());
      setCategoryInput('');
      setFilters(getActiveFilters());
    } else {
      setFilters(getActiveFilters());
    }
  }, [groupBy]);

  return (
    <Toolbar clearAllFilters={onDelete as any} collapseListedFiltersBreakpoint="xl">
      <ToolbarContent>
        <ToolbarToggleGroup breakpoint="xl" toggleIcon={<FilterIcon />}>
          <ToolbarGroup variant="filter-group">
            {getCategoryOptions().map(option => getCategoryInput(option))}
          </ToolbarGroup>
        </ToolbarToggleGroup>
        <ToolbarGroup>{getExportButton()}</ToolbarGroup>
        <ToolbarItem alignment={{ default: 'alignRight' }} variant="pagination">
          {pagination}
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};

export default injectIntl(DataToolbar);
