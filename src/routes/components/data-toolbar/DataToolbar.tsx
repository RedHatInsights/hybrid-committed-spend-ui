import './dataToolbar.scss';

import {
  Button,
  ButtonVariant,
  InputGroup,
  TextInput,
  Toolbar,
  ToolbarChipGroup,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import { ExportIcon } from '@patternfly/react-icons/dist/esm/icons/export-icon';
import { FilterIcon } from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { SearchIcon } from '@patternfly/react-icons/dist/esm/icons/search-icon';
import { Query } from 'api/queries/query';
import messages from 'locales/messages';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { Filter } from 'routes/utils/filter';
import { createMapStateToProps } from 'store/common';
import { isEqual } from 'utils/equal';

import { styles } from './DataToolbar.styles';

interface Filters {
  [key: string]: Filter[] | { [key: string]: Filter[] };
}

interface DataToolbarOwnProps {
  categoryOptions?: ToolbarChipGroup[]; // Options for category menu
  groupBy?: string; // Sync category selection with groupBy value
  isDisabled?: boolean;
  isExportDisabled?: boolean; // Show export icon as disabled
  onClearAll?: (type: string) => void;
  onExportClicked?: () => void;
  onFilterAdded?: (filter: Filter) => void;
  onFilterRemoved?: (filterType: Filter) => void;
  pagination?: React.ReactNode; // Optional pagination controls to display in toolbar
  query?: Query; // Query containing filter_by params used to restore state upon page refresh
}

interface DataToolbarState {
  categoryInput?: string;
  currentCategory?: string;
  filters: Filters;
}

interface DataToolbarStateProps {
  // TBD...
}

type DataToolbarProps = DataToolbarOwnProps & DataToolbarStateProps & WrappedComponentProps;

export class DataToolbarBase extends React.Component<DataToolbarProps> {
  protected defaultState: DataToolbarState = {
    categoryInput: '',
    filters: {},
  };
  public state: DataToolbarState = { ...this.defaultState };

  public componentDidMount() {
    this.setState({
      currentCategory: this.getDefaultCategory(),
    });
  }

  public componentDidUpdate(prevProps: DataToolbarProps) {
    const { categoryOptions, groupBy, query } = this.props;

    if (
      groupBy !== prevProps.groupBy ||
      (categoryOptions && !isEqual(categoryOptions, prevProps.categoryOptions)) ||
      (query && !isEqual(query, prevProps.query))
    ) {
      this.setState(() => {
        const filters = this.getActiveFilters(query);
        return categoryOptions !== prevProps.categoryOptions || prevProps.groupBy !== groupBy
          ? {
              categoryInput: '',
              currentCategory: this.getDefaultCategory(),
              filters,
            }
          : {
              filters,
            };
      });
    }
  }

  // Initialize

  private getDefaultCategory = () => {
    const { categoryOptions, groupBy } = this.props;

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

  private getFilter = (filterType: string, filterValue: string): Filter => {
    return { type: filterType, value: filterValue };
  };

  private getFilters = (filterType: string, filterValues: string[]): Filter[] => {
    return filterValues.map(value => this.getFilter(filterType, value));
  };

  private getActiveFilters = query => {
    const filters = {};

    const parseFilters = (key, values) => {
      if (filters[key]) {
        filters[key] = [...filters[key], ...this.getFilters(key, values)];
      } else {
        filters[key] = this.getFilters(key, values);
      }
    };

    if (query && query.filter_by) {
      Object.keys(query.filter_by).forEach(key => {
        const values = Array.isArray(query.filter_by[key]) ? [...query.filter_by[key]] : [query.filter_by[key]];
        parseFilters(key, values);
      });
    }
    return filters;
  };

  private getChips = (filters: Filter[]): string[] => {
    const chips = [];
    if (filters) {
      filters.forEach(item => {
        chips.push({
          key: item.value,
          node: item.value,
        });
      });
    }
    return chips;
  };

  private onDelete = (type: any, chip: any) => {
    const { filters } = this.state;

    // Todo: workaround for https://github.com/patternfly/patternfly-react/issues/3552
    // This prevents us from using a localized string, if necessary
    const _type = type && type.key ? type.key : type;
    if (_type) {
      const id = chip && chip.key ? chip.key : chip;
      let filter;
      if (filters[_type]) {
        filter = (filters[_type] as Filter[]).find(item => item.value === id);
      }

      this.setState(
        (prevState: any) => {
          if (prevState.filters[_type]) {
            prevState.filters[_type] = prevState.filters[_type].filter(item => item.value !== id);
          }
          return {
            filters: prevState.filters,
          };
        },
        () => {
          this.props.onFilterRemoved(filter);
        }
      );
    } else {
      this.setState(
        {
          filters: {},
        },
        () => {
          this.props.onFilterRemoved(null); // Clear all
        }
      );
    }
  };

  // Category input
  public getCategoryInput = (categoryOption: ToolbarChipGroup) => {
    const { intl, isDisabled } = this.props;
    const { currentCategory, filters, categoryInput } = this.state;

    return (
      <ToolbarFilter
        categoryName={categoryOption}
        chips={this.getChips(filters[categoryOption.key] as Filter[])}
        deleteChip={this.onDelete}
        key={categoryOption.key}
        showToolbarItem={currentCategory === categoryOption.key}
      >
        <InputGroup style={styles.categoryInput}>
          <TextInput
            isDisabled={isDisabled}
            name={`category-input-${categoryOption.key}`}
            id={`category-input-${categoryOption.key}`}
            type="search"
            aria-label={intl.formatMessage(messages.filterByInputAriaLabel, { value: categoryOption.key })}
            onChange={this.handleOnCategoryInputChange}
            value={categoryInput}
            placeholder={intl.formatMessage(messages.filterByPlaceholder, { value: categoryOption.key })}
            onKeyDown={evt => this.onCategoryInput(evt, categoryOption.key)}
          />
          <Button
            isDisabled={isDisabled}
            variant={ButtonVariant.control}
            aria-label={intl.formatMessage(messages.filterByButtonAriaLabel, { value: categoryOption.key })}
            onClick={evt => this.onCategoryInput(evt, categoryOption.key)}
          >
            <SearchIcon />
          </Button>
        </InputGroup>
      </ToolbarFilter>
    );
  };

  private getDefaultCategoryOptions = (): ToolbarChipGroup[] => {
    const { intl } = this.props;

    return [{ name: intl.formatMessage(messages.names, { count: 1 }), key: 'name' }];
  };

  private handleOnCategoryInputChange = (value: string) => {
    this.setState({ categoryInput: value });
  };

  private onCategoryInput = (event, key) => {
    const { categoryInput, currentCategory } = this.state;

    if ((event && event.key && event.key !== 'Enter') || categoryInput.trim() === '') {
      return;
    }

    const filter = this.getFilter(currentCategory, categoryInput);
    this.setState(
      (prevState: any) => {
        const prevItems = prevState.filters[key] ? prevState.filters[key] : [];
        return {
          filters: {
            ...prevState.filters,
            [currentCategory]:
              prevItems && prevItems.find(item => item.value === categoryInput)
                ? prevItems
                : prevItems
                ? [...prevItems, filter]
                : [filter],
          },
          categoryInput: '',
        };
      },
      () => {
        this.props.onFilterAdded(filter);
      }
    );
  };

  // Export button

  public getExportButton = () => {
    const { isDisabled, isExportDisabled } = this.props;

    return (
      <ToolbarItem
        spacer={{
          default: 'spacerNone',
        }}
      >
        <Button
          aria-label="Export data"
          isDisabled={isDisabled || isExportDisabled}
          onClick={this.handleExportClicked}
          variant={ButtonVariant.plain}
        >
          <ExportIcon />
        </Button>
      </ToolbarItem>
    );
  };

  private handleExportClicked = () => {
    this.props.onExportClicked();
  };

  public render() {
    const { categoryOptions, pagination } = this.props;
    const options = categoryOptions ? categoryOptions : this.getDefaultCategoryOptions();

    return (
      <Toolbar clearAllFilters={this.onDelete as any} collapseListedFiltersBreakpoint="xl">
        <ToolbarContent>
          <ToolbarToggleGroup breakpoint="xl" toggleIcon={<FilterIcon />}>
            <ToolbarGroup variant="filter-group">
              {options && options.map(option => this.getCategoryInput(option))}
            </ToolbarGroup>
          </ToolbarToggleGroup>
          <ToolbarGroup>{this.getExportButton()}</ToolbarGroup>
          <ToolbarItem alignment={{ default: 'alignRight' }} variant="pagination">
            {pagination}
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    );
  }
}

const mapStateToProps = createMapStateToProps<DataToolbarOwnProps, DataToolbarStateProps>(() => {
  return {
    // TBD...
  };
});

const DataToolbar = injectIntl(connect(mapStateToProps, {})(DataToolbarBase));

export default DataToolbar;
