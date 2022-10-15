import messages from 'locales/messages';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Perspective } from 'routes/components/perspective';

import { DateRangeType, GroupByType, SourcesOfSpendType } from './utils';

interface DetailsToolbarOwnProps {
  dateRange?: string;
  groupBy?: string;
  onDateRangeSelected(value: string);
  onGroupBySelected(value: string);
  onSecondaryGroupBySelected(value: string);
  onSourcesOfSpendSelected(value: string);
  secondaryGroupBy?: string;
  sourcesOfSpend?: string;
}

export type DetailsToolbarProps = DetailsToolbarOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const dateRangeOptions = [
  { label: messages.dateRange, value: DateRangeType.contractedYtd },
  { label: messages.dateRange, value: DateRangeType.lastThreeMonths },
  { label: messages.dateRange, value: DateRangeType.lastSixMonths },
  { label: messages.dateRange, value: DateRangeType.lastNineMonths },
  { label: messages.dateRange, value: DateRangeType.contractedLastYear },
  { label: messages.dateRange, value: DateRangeType.date },
];

const groupByOptions = [
  { label: messages.groupBy, value: GroupByType.affiliate },
  { label: messages.groupBy, value: GroupByType.product },
  { label: messages.groupBy, value: GroupByType.account },
  { label: messages.groupBy, value: GroupByType.sourceOfSpend },
];

const secondaryGroupByOptions = [
  { label: messages.groupBy, value: GroupByType.none },
  { label: messages.groupBy, value: GroupByType.affiliate },
  { label: messages.groupBy, value: GroupByType.product },
  { label: messages.groupBy, value: GroupByType.account },
  { label: messages.groupBy, value: GroupByType.sourceOfSpend },
];

const sourcesOfSpendOptions = [
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.all },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.subs_yearly },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.subs_on_demand },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.reseller },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.marketplace },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.aws },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.azure },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.gcp },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.consulting },
];

const DetailsHeaderToolbarBase: React.FC<DetailsToolbarProps> = ({
  dateRange,
  groupBy,
  intl,
  onDateRangeSelected,
  onGroupBySelected,
  onSecondaryGroupBySelected,
  onSourcesOfSpendSelected,
  secondaryGroupBy,
  sourcesOfSpend,
}) => {
  const handleOnDateRangeSelected = value => {
    if (onDateRangeSelected) {
      onDateRangeSelected(value);
    }
  };

  const handleOnGroupBySelected = value => {
    if (onGroupBySelected) {
      onGroupBySelected(value);
    }
  };

  const handleOnSecondaryGroupBySelected = value => {
    if (onSecondaryGroupBySelected) {
      onSecondaryGroupBySelected(value);
    }
  };

  const handleOnSourcesOfSpendSelected = value => {
    if (onSourcesOfSpendSelected) {
      onSourcesOfSpendSelected(value);
    }
  };

  return (
    <div>
      <Perspective
        currentItem={sourcesOfSpend}
        id="sourcesOfSpend"
        label={intl.formatMessage(messages.sourcesOfSpendLabel)}
        minWidth={200}
        onSelected={handleOnSourcesOfSpendSelected}
        options={sourcesOfSpendOptions}
      />
      <Perspective
        currentItem={groupBy}
        id="groupBy"
        label={intl.formatMessage(messages.groupByLabel)}
        minWidth={200}
        onSelected={handleOnGroupBySelected}
        options={groupByOptions}
      />
      <Perspective
        currentItem={secondaryGroupBy}
        id="secondaryGroupBy"
        label={intl.formatMessage(messages.secondaryGroupByLabel)}
        minWidth={200}
        onSelected={handleOnSecondaryGroupBySelected}
        options={secondaryGroupByOptions}
      />
      <Perspective
        currentItem={dateRange}
        id="dateRange"
        label={intl.formatMessage(messages.dateRangeLabel)}
        minWidth={200}
        onSelected={handleOnDateRangeSelected}
        options={dateRangeOptions}
      />
    </div>
  );
};

const DetailsHeaderToolbar = injectIntl(withRouter(DetailsHeaderToolbarBase));

export { DetailsHeaderToolbar };
