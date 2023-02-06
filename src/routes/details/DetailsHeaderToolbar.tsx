import type { DetailsOption } from 'api/options/detailsOption';
import { OptionPathsType, OptionType } from 'api/options/option';
import { getQuery } from 'api/queries';
import type { AxiosError } from 'axios/index';
import messages from 'locales/messages';
import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { Perspective } from 'routes/components/perspective';
import type { PerspectiveOption } from 'routes/components/perspective/Perspective';
import { DateRangeType, getDateRange } from 'routes/utils/dateRange';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { optionActions, optionSelectors } from 'store/options';

import { GroupByType, SourceOfSpendType } from './types';

interface DetailsHeaderToolbarOwnProps {
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
  sourceOfSpend?: string;
  startDate?: Date;
}

interface DetailsHeaderToolbarStateProps {
  optionData?: DetailsOption;
  optionError?: AxiosError;
  optionFetchStatus?: FetchStatus;
  optionQueryString?: string;
}

export type DetailsToolbarProps = DetailsHeaderToolbarOwnProps & WrappedComponentProps;

const dateRangeOptions: PerspectiveOption[] = [
  { label: messages.dateRange, value: DateRangeType.contractedYtd },
  { label: messages.dateRange, value: DateRangeType.lastThreeMonths },
  { label: messages.dateRange, value: DateRangeType.lastSixMonths },
  { label: messages.dateRange, value: DateRangeType.lastNineMonths },
  { label: messages.dateRange, value: DateRangeType.contractedLastYear },
];

const groupByOptions: PerspectiveOption[] = [{ label: messages.groupBy, value: GroupByType.none }];

const sourceOfSpendOptions: PerspectiveOption[] = [
  { label: messages.sourceOfSpendValues, value: SourceOfSpendType.all },
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
  sourceOfSpend,
}) => {
  const { optionData } = useMapToProps();

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

  const getGroupByOptions = (includeNoneOption = true) => {
    const options = includeNoneOption ? cloneDeep(groupByOptions) : [];

    if (optionData && optionData.data) {
      const groupByObj: any = optionData.data.find((data: any) => data.group_by);
      if (groupByObj) {
        groupByObj.group_by.forEach(item => {
          switch (item.code) {
            case GroupByType.affiliate:
              options.push({ label: messages.groupBy, value: GroupByType.affiliate });
              break;
            case GroupByType.product:
              options.push({ label: messages.groupBy, value: GroupByType.product });
              break;
            case GroupByType.sourceOfSpend:
              options.push({ label: messages.groupBy, value: GroupByType.sourceOfSpend });
              break;

            // yearly_subscriptions
            // on-demand
            // reseller_distributor
            // red_hat_marketplace
            // aws
            // azure
            // gcp
            // consulting
            default:
              options.push({ label: item.name, value: item.code });
              break;
          }
          options.push();
        });
      }
    }
    return options;
  };

  const getSourceOfSpendOptions = () => {
    const options = cloneDeep(sourceOfSpendOptions);

    if (optionData && optionData.data) {
      const sourceOfSpendObj: any = optionData.data.find((data: any) => data.source_of_spend);
      if (sourceOfSpendObj) {
        sourceOfSpendObj.source_of_spend.forEach(item => {
          switch (item.code) {
            case SourceOfSpendType.aws:
              options.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.aws });
              break;
            case SourceOfSpendType.azure:
              options.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.azure });
              break;
            case SourceOfSpendType.consulting:
              options.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.consulting });
              break;
            case SourceOfSpendType.gcp:
              options.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.gcp });
              break;
            case SourceOfSpendType.on_demand:
              options.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.on_demand });
              break;
            case SourceOfSpendType.redhat:
              options.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.redhat });
              break;
            case SourceOfSpendType.red_hat_marketplace:
              options.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.red_hat_marketplace });
              break;
            case SourceOfSpendType.reseller_distributor:
              options.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.reseller_distributor });
              break;
            case SourceOfSpendType.yearly_subscriptions:
              options.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.yearly_subscriptions });
              break;
            default:
              options.push({ label: item.name, value: item.code });
              break;
          }
          options.push();
        });
      }
    }
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
        currentItem={sourceOfSpend}
        id="sourceOfSpendType"
        label={intl.formatMessage(messages.sourceOfSpendLabel)}
        minWidth={200}
        onSelected={handleOnSourceOfSpendSelected}
        options={getSourceOfSpendOptions()}
      />
      <Perspective
        currentItem={groupBy}
        id="groupBy"
        label={intl.formatMessage(messages.groupByLabel)}
        minWidth={200}
        onSelected={handleOnGroupBySelected}
        options={getGroupByOptions(false)}
      />
      <Perspective
        currentItem={secondaryGroupBy}
        id="secondaryGroupBy"
        label={intl.formatMessage(messages.secondaryGroupByLabel)}
        minWidth={200}
        onSelected={handleOnSecondaryGroupBySelected}
        options={getGroupByOptions().filter(option => option.value !== groupBy)}
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

const useMapToProps = (): DetailsHeaderToolbarStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query = {
    // TBD...
  };

  const optionQueryString = getQuery(query);
  const optionPathsType = OptionPathsType.detailsOption;
  const optionType = OptionType.all;
  const optionData = useSelector((state: RootState) =>
    optionSelectors.selectOption(state, optionPathsType, optionType, optionQueryString)
  );
  const optionFetchStatus = useSelector((state: RootState) =>
    optionSelectors.selectOptionFetchStatus(state, optionPathsType, optionType, optionQueryString)
  );

  useEffect(() => {
    if (optionFetchStatus !== FetchStatus.inProgress) {
      dispatch(optionActions.fetchOption(optionPathsType, optionType, optionQueryString));
    }
  }, [optionQueryString]);

  return {
    optionData,
    optionFetchStatus,
    optionQueryString,
  };
};

const DetailsHeaderToolbar = injectIntl(DetailsHeaderToolbarBase);

export { DetailsHeaderToolbar };
