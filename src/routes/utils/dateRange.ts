import {
  getContractedLastYear,
  getContractedYear,
  getContractedYtd,
  getLastNineMonthsDate,
  getLastSixMonthsDate,
  getLastThreeMonthsDate,
  getUndefinedDates,
} from 'utils/dates';

// The date range drop down has the options below (if today is Jan 18th…)
// eslint-disable-next-line no-shadow
export const enum DateRangeType {
  contractedYear = 'contracted_year', // Current year for tables
  contractedYtd = 'contracted_ytd', // Current month (Jan 1 - Dec 31)
  contractedLastYear = 'contracted_last_year', // Previous and current month (Dec 1 - Jan 18)
  lastNineMonths = 'last_nine_months', // Last 90 days
  lastSixMonths = 'last_six_months', // Last 60 days (Nov 18 - Jan 17)
  lastThreeMonths = 'last_three_months', // Last 30 days (Dec 18 - Jan 17)
}

interface DateRangeProps {
  dateRange: string;
  consumptionDate?: Date;
  contractLineEndDate?: Date;
  contractLineStartDate?: Date;
  isFormatted?: boolean;
  previousContractLineStartDate?: Date;
  previousContractLineEndDate?: Date;
}

export const getDateRange = ({
  dateRange,
  consumptionDate,
  contractLineEndDate,
  contractLineStartDate,
  isFormatted = false,
  previousContractLineStartDate,
  previousContractLineEndDate,
}: DateRangeProps) => {
  switch (dateRange) {
    case DateRangeType.contractedLastYear:
      return getContractedLastYear(previousContractLineStartDate, previousContractLineEndDate, isFormatted);
    case DateRangeType.contractedYear:
      return getContractedYear(contractLineStartDate, contractLineEndDate, isFormatted);
    case DateRangeType.contractedYtd:
      return getContractedYtd(contractLineStartDate, consumptionDate, isFormatted);
    case DateRangeType.lastNineMonths:
      return getLastNineMonthsDate(consumptionDate, isFormatted);
    case DateRangeType.lastSixMonths:
      return getLastSixMonthsDate(consumptionDate, isFormatted);
    case DateRangeType.lastThreeMonths:
      return getLastThreeMonthsDate(consumptionDate, isFormatted);
    default:
      return getUndefinedDates();
  }
};
