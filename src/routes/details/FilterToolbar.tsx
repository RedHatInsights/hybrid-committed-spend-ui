import { ToolbarChipGroup } from '@patternfly/react-core';
import messages from 'locales/messages';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { DataToolbar } from 'routes/components/data-toolbar';
import { Filter } from 'routes/utils/filter';

import { GroupByType } from './utils';

interface FilterToolbarOwnProps {
  groupBy: string;
  isExportDisabled?: boolean;
  onExportClicked();
  onFilterAdded(filter: Filter);
  onFilterRemoved(filter: Filter);
  pagination?: React.ReactNode;
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
}) => {
  const getCategoryOptions = (): ToolbarChipGroup[] => {
    const options = [];

    switch (groupBy) {
      case GroupByType.account:
        options.push({ name: intl.formatMessage(messages.filterByValues, { value: 'account' }), key: 'account' });
        break;
      case GroupByType.affiliate:
        options.push({ name: intl.formatMessage(messages.filterByValues, { value: 'affiliate' }), key: 'affiliate' });
        break;
      case GroupByType.sourceOfSpend:
        options.push({
          name: intl.formatMessage(messages.filterByValues, { value: 'source_of_spend' }),
          key: 'source_of_spend',
        });
        break;
      case GroupByType.product:
      default:
        options.push({ name: intl.formatMessage(messages.filterByValues, { value: 'product' }), key: 'product' });
        break;
    }
    return options;
  };

  return (
    <DataToolbar
      categoryOptions={getCategoryOptions()}
      isExportDisabled={isExportDisabled}
      onExportClicked={onExportClicked}
      onFilterAdded={onFilterAdded}
      onFilterRemoved={onFilterRemoved}
      pagination={pagination}
    />
  );
};

const FilterToolbar = injectIntl(withRouter(FilterToolbarBase));

export { FilterToolbar };
