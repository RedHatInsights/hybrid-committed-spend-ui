import './detailsHeaderToolbar.scss';

import { Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import type { DetailsOption } from 'api/options/detailsOption';
import { OptionPathsType, OptionType } from 'api/options/option';
import { getQuery } from 'api/queries';
import type { AxiosError } from 'axios/index';
import messages from 'locales/messages';
import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { Perspective } from 'routes/components/perspective';
import type { PerspectiveOption } from 'routes/components/perspective/Perspective';
import { GroupByType, SourceOfSpendType } from 'routes/details/types';
import { DateRangeType, getDateRange } from 'routes/utils/dateRange';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { optionActions, optionSelectors } from 'store/options';
import { formatDate } from 'utils/dates';

interface DetailsHeaderToolbarOwnProps {
  consumptionDate?: Date;
  contractLineStartDate?: Date;
  dateRange?: string;
  endDate?: Date;
  previousContractLineEndDate?: Date;
  previousContractLineStartDate?: Date;
  groupBy?: string;
  hasPreviousData?: boolean;
  isExportDisabled?: boolean;
  onDateRangeSelected(value: string);
  onGroupBySelected(value: string);
  onSecondaryGroupBySelected(value: string);
  onSourceOfSpendSelected(value: string);
  secondaryGroupBy?: string;
  sourceOfSpend?: string;
  startDate?: Date;
}

interface DetailsHeaderToolbarStateProps {
  options?: DetailsOption;
  optionsError?: AxiosError;
  optionsFetchStatus?: FetchStatus;
  optionsQueryString?: string;
}

export type DetailsToolbarProps = DetailsHeaderToolbarOwnProps;

const dateRangeOptions: PerspectiveOption[] = [
  { label: messages.dateRange, value: DateRangeType.contractedYtd },
  // The team decided to omit the 3, 6, and 9 month views in favor of customer feedback
  // { label: messages.dateRange, value: DateRangeType.lastThreeMonths },
  // { label: messages.dateRange, value: DateRangeType.lastSixMonths },
  // { label: messages.dateRange, value: DateRangeType.lastNineMonths },
  { label: messages.dateRange, value: DateRangeType.contractedLastYear },
];

const groupByOptions: PerspectiveOption[] = [{ label: messages.groupBy, value: GroupByType.none }];

const sourceOfSpendOptions: PerspectiveOption[] = [
  { label: messages.sourceOfSpendValues, value: SourceOfSpendType.all },
];

const DetailsHeaderToolbar: React.FC<DetailsToolbarProps> = ({
  consumptionDate,
  contractLineStartDate,
  dateRange,
  endDate,
  groupBy,
  onDateRangeSelected,
  onGroupBySelected,
  onSecondaryGroupBySelected,
  onSourceOfSpendSelected,
  previousContractLineEndDate,
  previousContractLineStartDate,
  secondaryGroupBy,
  sourceOfSpend,
  startDate,
}) => {
  const { options } = useMapToProps({ endDate, startDate });
  const intl = useIntl();

  const formatDateRange = (start, end) => {
    if (start === undefined || end === undefined) {
      return undefined;
    }
    return intl.formatDateTimeRange(start, end, {
      month: 'long',
      year: 'numeric',
    });
  };

  const getContractedLastYearDateRange = () => {
    const { endDate: end, startDate: start } = getDateRange({
      dateRange: DateRangeType.contractedLastYear,
      previousContractLineEndDate,
      previousContractLineStartDate,
    });
    return formatDateRange(start, end);
  };

  const getContractedYtdDateRange = () => {
    const { endDate: end, startDate: start } = getDateRange({
      dateRange: DateRangeType.contractedYtd,
      consumptionDate,
      contractLineStartDate,
    });
    return formatDateRange(start, end);
  };

  const getLastNineMonthsDateRange = () => {
    const { endDate: end, startDate: start } = getDateRange({
      dateRange: DateRangeType.lastNineMonths,
      consumptionDate,
    });
    return formatDateRange(start, end);
  };

  const getLastSixMonthsDateRange = () => {
    const { endDate: end, startDate: start } = getDateRange({
      dateRange: DateRangeType.lastSixMonths,
      consumptionDate,
    });
    return formatDateRange(start, end);
  };

  const getLastThreeMonthsDateRange = () => {
    const { endDate: end, startDate: start } = getDateRange({
      dateRange: DateRangeType.lastThreeMonths,
      consumptionDate,
    });
    return formatDateRange(start, end);
  };

  const getDateRangeOptions = () => {
    const newOptions = cloneDeep(dateRangeOptions);

    newOptions.map(option => {
      switch (option.value) {
        case DateRangeType.contractedLastYear:
          option.description = getContractedLastYearDateRange();
          option.isDisabled = !(previousContractLineEndDate && previousContractLineStartDate);
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
    return newOptions;
  };

  const getGroupByOptions = (includeNoneOption = true) => {
    const newOptions = includeNoneOption ? cloneDeep(groupByOptions) : [];

    if (options && options.data && options.data.group_by) {
      options.data.group_by.forEach(item => {
        switch (item.code) {
          case GroupByType.affiliate:
            newOptions.push({ label: messages.groupBy, value: GroupByType.affiliate });
            break;
          case GroupByType.product:
            newOptions.push({ label: messages.groupBy, value: GroupByType.product });
            break;
          case GroupByType.sourceOfSpend:
            newOptions.push({ label: messages.groupBy, value: GroupByType.sourceOfSpend });
            break;
          default:
            break;
        }
      });
    }
    return newOptions;
  };

  const getSourceOfSpendOptions = () => {
    const newOptions = cloneDeep(sourceOfSpendOptions);

    if (options && options.data && options.data.source_of_spend) {
      options.data.source_of_spend.forEach(item => {
        switch (item.code) {
          case SourceOfSpendType.aws:
            newOptions.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.aws });
            break;
          case SourceOfSpendType.azure:
            newOptions.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.azure });
            break;
          case SourceOfSpendType.ccsp:
            newOptions.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.ccsp });
            break;
          case SourceOfSpendType.consulting:
            newOptions.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.consulting });
            break;
          case SourceOfSpendType.gcp:
            newOptions.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.gcp });
            break;
          case SourceOfSpendType.miscellaneous:
            newOptions.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.miscellaneous });
            break;
          case SourceOfSpendType.on_demand:
            newOptions.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.on_demand });
            break;
          case SourceOfSpendType.oci:
            newOptions.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.oci });
            break;
          case SourceOfSpendType.training:
            newOptions.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.training });
            break;
          case SourceOfSpendType.yearlySubscriptions:
            newOptions.push({ label: messages.sourceOfSpendValues, value: SourceOfSpendType.yearlySubscriptions });
            break;
          default:
            break;
        }
      });
    }
    return newOptions.sort((a: any, b: any) => {
      if (a.value > b.value) {
        return 1;
      } else if (a.value < b.value) {
        return -1;
      } else {
        return 0;
      }
    });
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
    <Toolbar className="detailsHeaderToolbarOverride">
      <ToolbarContent>
        <ToolbarItem>
          <Perspective
            currentItem={sourceOfSpend}
            id="sourceOfSpendType"
            label={intl.formatMessage(messages.sourceOfSpendLabel)}
            minWidth={200}
            onSelected={handleOnSourceOfSpendSelected}
            options={getSourceOfSpendOptions()}
          />
        </ToolbarItem>
        <ToolbarItem>
          <Perspective
            currentItem={groupBy}
            id="groupBy"
            label={intl.formatMessage(messages.groupByLabel)}
            minWidth={200}
            onSelected={handleOnGroupBySelected}
            options={getGroupByOptions(false)}
          />
        </ToolbarItem>
        <ToolbarItem>
          <Perspective
            currentItem={secondaryGroupBy}
            id="secondaryGroupBy"
            label={intl.formatMessage(messages.secondaryGroupByLabel)}
            minWidth={200}
            onSelected={handleOnSecondaryGroupBySelected}
            options={getGroupByOptions().filter(option => option.value !== groupBy)}
          />
        </ToolbarItem>
        <ToolbarItem>
          <Perspective
            currentItem={dateRange}
            id="dateRange"
            label={intl.formatMessage(messages.dateRangeLabel)}
            minWidth={225}
            onSelected={handleOnDateRangeSelected}
            options={getDateRangeOptions()}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};

const useMapToProps = ({ endDate, startDate }): DetailsHeaderToolbarStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query = {
    ...(startDate && endDate && { ...formatDate({ startDate, endDate }) }),
  };

  const optionsQueryString = getQuery(query);
  const optionsPathsType = OptionPathsType.detailsOption;
  const optionsType = OptionType.all;
  const options = useSelector((state: RootState) =>
    optionSelectors.selectOption(state, optionsPathsType, optionsType, optionsQueryString)
  );
  const optionsFetchStatus = useSelector((state: RootState) =>
    optionSelectors.selectOptionFetchStatus(state, optionsPathsType, optionsType, optionsQueryString)
  );

  useEffect(() => {
    if (optionsFetchStatus !== FetchStatus.inProgress && endDate && startDate) {
      dispatch(optionActions.fetchOption(optionsPathsType, optionsType, optionsQueryString));
    }
  }, [optionsQueryString, endDate, startDate]);

  return {
    options,
    optionsFetchStatus,
    optionsQueryString,
  };
};

export { DetailsHeaderToolbar };
