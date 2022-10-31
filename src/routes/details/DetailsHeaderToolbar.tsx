import messages from 'locales/messages';
import { cloneDeep } from 'lodash';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Perspective } from 'routes/components/perspective';
import type { PerspectiveOption } from 'routes/components/perspective/Perspective';
import { DateRangeType, getDateRange } from 'routes/utils/dateRange';

import { GroupByType, SourcesOfSpendType } from './types';

interface DetailsToolbarOwnProps {
  contractStartDate?: Date;
  dateRange?: string;
  endDate?: Date;
  groupBy?: string;
  onDateRangeSelected(value: string);
  onGroupBySelected(value: string);
  onSecondaryGroupBySelected(value: string);
  onSourcesOfSpendSelected(value: string);
  secondaryGroupBy?: string;
  sourcesOfSpend?: string;
  startDate?: Date;
}

export type DetailsToolbarProps = DetailsToolbarOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const dateRangeOptions: PerspectiveOption[] = [
  { label: messages.dateRange, value: DateRangeType.contractedYtd },
  { label: messages.dateRange, value: DateRangeType.lastThreeMonths },
  { label: messages.dateRange, value: DateRangeType.lastSixMonths },
  { label: messages.dateRange, value: DateRangeType.lastNineMonths },
  { label: messages.dateRange, value: DateRangeType.contractedLastYear },
  { label: messages.dateRange, value: DateRangeType.contractedYear, isDisabled: true },
];

const groupByOptions: PerspectiveOption[] = [
  { label: messages.groupBy, value: GroupByType.affiliate },
  { label: messages.groupBy, value: GroupByType.product },
  { label: messages.groupBy, value: GroupByType.account, isDisabled: true },
  { label: messages.groupBy, value: GroupByType.sourceOfSpend },
];

const secondaryGroupByOptions: PerspectiveOption[] = [
  { label: messages.groupBy, value: GroupByType.none },
  { label: messages.groupBy, value: GroupByType.affiliate },
  { label: messages.groupBy, value: GroupByType.product },
  { label: messages.groupBy, value: GroupByType.account, isDisabled: true },
  { label: messages.groupBy, value: GroupByType.sourceOfSpend },
];

const sourcesOfSpendOptions: PerspectiveOption[] = [
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.all },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.subs_yearly },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.subs_on_demand, isDisabled: true },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.reseller, isDisabled: true },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.marketplace },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.aws },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.azure },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.gcp },
  { label: messages.sourcesOfSpendValues, value: SourcesOfSpendType.consulting, isDisabled: true },
];

const DetailsHeaderToolbarBase: React.FC<DetailsToolbarProps> = ({
  contractStartDate,
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
  const formatDateRange = (startDate, endDate) => {
    return intl.formatDateTimeRange(startDate, endDate, {
      month: 'long',
      year: 'numeric',
    });
  };

  const getContractedLastYearDateRange = () => {
    const { endDate, startDate } = getDateRange(DateRangeType.contractedLastYear, contractStartDate);
    return formatDateRange(startDate, endDate);
  };

  const getContractedYtdDateRange = () => {
    const { endDate, startDate } = getDateRange(DateRangeType.contractedYtd, contractStartDate);
    return formatDateRange(startDate, endDate);
  };

  const getLastNineMonthsDateRange = () => {
    const { endDate, startDate } = getDateRange(DateRangeType.lastNineMonths);
    return formatDateRange(startDate, endDate);
  };

  const getLastSixMonthsDateRange = () => {
    const { endDate, startDate } = getDateRange(DateRangeType.lastSixMonths);
    return formatDateRange(startDate, endDate);
  };

  const getLastThreeMonthsDateRange = () => {
    const { endDate, startDate } = getDateRange(DateRangeType.lastThreeMonths);
    return formatDateRange(startDate, endDate);
  };

  const getDateRangeOptions = () => {
    const options = cloneDeep(dateRangeOptions);

    options.map(option => {
      switch (option.value) {
        case DateRangeType.contractedLastYear:
          option.description = getContractedLastYearDateRange();
          break;
        case DateRangeType.contractedYtd:
          option.description = getContractedYtdDateRange();
          break;
        case DateRangeType.lastNineMonths:
          option.description = getLastNineMonthsDateRange();
          break;
        case DateRangeType.lastSixMonths:
          option.description = getLastSixMonthsDateRange();
          break;
        case DateRangeType.lastThreeMonths:
          option.description = getLastThreeMonthsDateRange();
          break;
        default:
          break;
      }
    });

    return options;
  };

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
        options={secondaryGroupByOptions.filter(option => option.value !== groupBy)}
      />
      <Perspective
        currentItem={dateRange}
        id="dateRange"
        label={intl.formatMessage(messages.dateRangeLabel)}
        minWidth={200}
        onSelected={handleOnDateRangeSelected}
        options={getDateRangeOptions()}
      />
    </div>
  );
};

const DetailsHeaderToolbar = injectIntl(withRouter(DetailsHeaderToolbarBase));

export { DetailsHeaderToolbar };
