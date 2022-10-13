import messages from 'locales/messages';
import React, { useState } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Perspective } from 'routes/components/perspective';

interface DetailsToolbarOwnProps {
  onDateRangeSelected(value: string);
  onGroupBySelected(value: string);
  onSecondaryGroupBySelected(value: string);
  onSourcesOfSpendSelected(value: string);
}

export type DetailsToolbarProps = DetailsToolbarOwnProps & RouteComponentProps<void> & WrappedComponentProps;

// eslint-disable-next-line no-shadow
export enum DateRangeType {
  contractedYtd = 'contracted_ytd',
  contractedLastYear = 'contracted_last_year',
  date = 'date',
  lastNineMonths = 'last_nine_months',
  lastSixMonths = 'last_six_months',
  lastThreeMonths = 'last_three_months',
}

// eslint-disable-next-line no-shadow
export enum GroupByType {
  accounts = 'accounts',
  affiliates = 'affiliates',
  products = 'products',
  sourceOfSpend = 'source_of_spend',
}

// eslint-disable-next-line no-shadow
export enum SourcesOfSpendType {
  all = 'all',
  aws = 'aws',
  azure = 'azure',
  consulting = 'consulting',
  gcp = 'gcp',
  marketplace = 'marketplace',
  reseller = 'reseller',
  subs_ondemand = 'subs_ondemand',
  subs_yearly = 'subs_yearly',
}

const dateRangeOptions = [
  { label: messages.dateRange, value: DateRangeType.contractedYtd },
  { label: messages.dateRange, value: DateRangeType.lastThreeMonths },
  { label: messages.dateRange, value: DateRangeType.lastSixMonths },
  { label: messages.dateRange, value: DateRangeType.lastNineMonths },
  { label: messages.dateRange, value: DateRangeType.contractedLastYear },
  { label: messages.dateRange, value: DateRangeType.date },
];

const groupByOptions = [
  { label: messages.groupBy, value: GroupByType.affiliates },
  { label: messages.groupBy, value: GroupByType.products },
  { label: messages.groupBy, value: GroupByType.accounts },
  { label: messages.groupBy, value: GroupByType.sourceOfSpend },
];

const sourcesOfSpendOptions = [
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.all },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.subs_yearly },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.subs_ondemand },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.reseller },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.marketplace },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.aws },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.azure },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.gcp },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.consulting },
];

const DetailsToolbar: React.FC<DetailsToolbarProps> = ({
  onDateRangeSelected,
  onGroupBySelected,
  onSecondaryGroupBySelected,
  onSourcesOfSpendSelected,
}) => {
  const [dateRangeSelection, setDateRangeSelection] = useState(DateRangeType.contractedYtd);
  const [groupBySelection, setGroupBySelection] = useState(GroupByType.affiliates);
  const [secondaryGroupBySelection, setSecondaryGroupBySelection] = useState(GroupByType.products);
  const [sourcesOfSpendSelection, setSourcesOfSpendSelection] = useState(SourcesOfSpendType.all);

  const handleOnDateRangeSelected = value => {
    if (onDateRangeSelected) {
      onDateRangeSelected(value);
    }
    setDateRangeSelection(value);
  };

  const handleOnGroupBySelected = value => {
    if (onGroupBySelected) {
      onGroupBySelected(value);
    }
    setGroupBySelection(value);
  };

  const handleOnSecondaryGroupBySelected = value => {
    if (onSecondaryGroupBySelected) {
      onSecondaryGroupBySelected(value);
    }
    setSecondaryGroupBySelection(value);
  };

  const handleOnSourcesOfSpendSelected = value => {
    if (onSourcesOfSpendSelected) {
      onSourcesOfSpendSelected(value);
    }
    setSourcesOfSpendSelection(value);
  };

  return (
    <div>
      <Perspective
        currentItem={sourcesOfSpendSelection}
        id="sourcesOfSpend"
        label={messages.sourcesOfSpendLabel}
        minWidth={200}
        onSelected={handleOnSourcesOfSpendSelected}
        options={sourcesOfSpendOptions}
      />
      <Perspective
        currentItem={groupBySelection}
        id="groupBy"
        label={messages.groupByLabel}
        minWidth={200}
        onSelected={handleOnGroupBySelected}
        options={groupByOptions}
      />
      <Perspective
        currentItem={secondaryGroupBySelection}
        id="secondaryGroupBy"
        label={messages.secondaryGroupByLabel}
        minWidth={200}
        onSelected={handleOnSecondaryGroupBySelected}
        options={groupByOptions}
      />
      <Perspective
        currentItem={dateRangeSelection}
        id="dateRange"
        label={messages.dateRangeLabel}
        minWidth={200}
        onSelected={handleOnDateRangeSelected}
        options={dateRangeOptions}
      />
    </div>
  );
};

export default injectIntl(withRouter(DetailsToolbar));
