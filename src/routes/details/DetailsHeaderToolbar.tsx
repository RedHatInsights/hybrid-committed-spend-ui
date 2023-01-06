import messages from 'locales/messages';
import { cloneDeep } from 'lodash';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { Perspective } from 'routes/components/perspective';
import type { PerspectiveOption } from 'routes/components/perspective/Perspective';
import { DateRangeType, getDateRange } from 'routes/utils/dateRange';

import { GroupByType, SourceOfSpendType } from './types';

interface DetailsToolbarOwnProps {
  contractLineStartDate?: Date;
  contractStartDate?: Date;
  dateRange?: string;
  endDate?: Date;
  groupBy?: string;
  onDateRangeSelected(value: string);
  onGroupBySelected(value: string);
  onSecondaryGroupBySelected(value: string);
  onSourceOfSpendSelected(value: string);
  secondaryGroupBy?: string;
  sourceOfSpendType?: string;
  startDate?: Date;
}

export type DetailsToolbarProps = DetailsToolbarOwnProps & WrappedComponentProps;

const dateRangeOptions: PerspectiveOption[] = [
  { label: messages.dateRange, value: DateRangeType.contractedYtd },
  { label: messages.dateRange, value: DateRangeType.lastThreeMonths },
  { label: messages.dateRange, value: DateRangeType.lastSixMonths },
  { label: messages.dateRange, value: DateRangeType.lastNineMonths },
  { label: messages.dateRange, value: DateRangeType.contractedLastYear },
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

const sourceOfSpendTypeOptions: PerspectiveOption[] = [
  { label: messages.sourceOfSpendTypeValues, value: SourceOfSpendType.all },
  { label: messages.sourceOfSpendTypeValues, value: SourceOfSpendType.subs_yearly },
  { label: messages.sourceOfSpendTypeValues, value: SourceOfSpendType.subs_on_demand, isDisabled: true },
  { label: messages.sourceOfSpendTypeValues, value: SourceOfSpendType.reseller, isDisabled: true },
  { label: messages.sourceOfSpendTypeValues, value: SourceOfSpendType.marketplace },
  { label: messages.sourceOfSpendTypeValues, value: SourceOfSpendType.aws },
  { label: messages.sourceOfSpendTypeValues, value: SourceOfSpendType.azure },
  { label: messages.sourceOfSpendTypeValues, value: SourceOfSpendType.gcp },
  { label: messages.sourceOfSpendTypeValues, value: SourceOfSpendType.consulting, isDisabled: true },
];

const DetailsHeaderToolbarBase: React.FC<DetailsToolbarProps> = ({
  contractLineStartDate = new Date(),
  contractStartDate = new Date(),
  dateRange,
  groupBy,
  intl,
  onDateRangeSelected,
  onGroupBySelected,
  onSecondaryGroupBySelected,
  onSourceOfSpendSelected,
  secondaryGroupBy,
  sourceOfSpendType,
}) => {
  const formatDateRange = (startDate, endDate) => {
    return intl.formatDateTimeRange(startDate, endDate, {
      month: 'long',
      year: 'numeric',
    });
  };

  const isContractedLastYearDateRangeDisabled = () => {
    const { startDate } = getDateRange(DateRangeType.contractedLastYear, contractLineStartDate);
    return startDate < contractStartDate;
  };

  const getContractedLastYearDateRangeDesc = () => {
    const { endDate, startDate } = getDateRange(DateRangeType.contractedLastYear, contractLineStartDate);
    return formatDateRange(startDate, endDate);
  };

  const getContractedYtdDateRange = () => {
    const { endDate, startDate } = getDateRange(DateRangeType.contractedYtd, contractLineStartDate);
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
          option.description = getContractedLastYearDateRangeDesc();
          option.isDisabled = isContractedLastYearDateRangeDisabled();
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

  const handleOnSourceOfSpendSelected = value => {
    if (onSourceOfSpendSelected) {
      onSourceOfSpendSelected(value);
    }
  };

  return (
    <div>
      <Perspective
        currentItem={sourceOfSpendType}
        id="sourceOfSpendType"
        label={intl.formatMessage(messages.sourceOfSpendTypeLabel)}
        minWidth={200}
        onSelected={handleOnSourceOfSpendSelected}
        options={sourceOfSpendTypeOptions}
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

const DetailsHeaderToolbar = injectIntl(DetailsHeaderToolbarBase);

export { DetailsHeaderToolbar };
