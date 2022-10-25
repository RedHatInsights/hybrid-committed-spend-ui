import type { ToolbarChipGroup } from '@patternfly/react-core';
import type { Query } from 'api/queries';
import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DataToolbar } from 'routes/components/data-toolbar';
import type { Filter } from 'routes/utils/filter';

interface FilterToolbarOwnProps {
  groupBy: string; // Options for category menu
  isExportDisabled?: boolean; // Sync category selection with groupBy value
  onExportClicked();
  onFilterAdded(filter: Filter);
  onFilterRemoved(filter: Filter);
  pagination?: React.ReactNode; // Optional pagination controls to display in toolbar
  query?: Query; // Query containing filter_by params used to restore state upon page refresh
}

type FilterToolbarProps = FilterToolbarOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const FilterToolbarBase: React.FC<FilterToolbarProps> = ({
  groupBy,
  intl,
  isExportDisabled,
  onExportClicked,
  onFilterAdded,
  onFilterRemoved,
  pagination,
  query,
}) => {
  const getCategoryOptions = (): ToolbarChipGroup[] => {
    return [
      { name: intl.formatMessage(messages.filterByValues, { value: 'account' }), key: 'account' },
      { name: intl.formatMessage(messages.filterByValues, { value: 'affiliate' }), key: 'affiliate' },
      { name: intl.formatMessage(messages.filterByValues, { value: 'source_of_spend' }), key: 'source_of_spend' },
      { name: intl.formatMessage(messages.filterByValues, { value: 'product' }), key: 'product' },
    ];
  };

  return (
    <DataToolbar
      categoryOptions={getCategoryOptions()}
      groupBy={groupBy}
      isExportDisabled={isExportDisabled}
      onExportClicked={onExportClicked}
      onFilterAdded={onFilterAdded}
      onFilterRemoved={onFilterRemoved}
      pagination={pagination}
      query={query}
    />
  );
};

const FilterToolbar = injectIntl(withRouter(FilterToolbarBase));

export { FilterToolbar };
