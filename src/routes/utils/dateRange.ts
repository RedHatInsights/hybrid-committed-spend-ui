import {
  getContractedLastYear,
  getContractedYtd,
  getLastNineMonthsDate,
  getLastSixMonthsDate,
  getLastThreeMonthsDate,
} from 'utils/dates';

// The date range drop down has the options below (if today is Jan 18th…)
// eslint-disable-next-line no-shadow
export const enum DateRangeType {
  contractedYtd = 'contracted_ytd', // Current month (Jan 1 - Dec 31)
  contractedLastYear = 'contracted_last_year', // Previous and current month (Dec 1 - Jan 18)
  lastNineMonths = 'last_nine_months', // Last 90 days
  lastSixMonths = 'last_six_months', // Last 60 days (Nov 18 - Jan 17)
  lastThreeMonths = 'last_three_months', // Last 30 days (Dec 18 - Jan 17)
}

export const getDateRange = (
  dateRangeType: string,
  contractStartDate: Date = undefined,
  consumptionDate: Date = undefined,
  isFormatted = false
) => {
  let dateRange;

  switch (dateRangeType) {
    case DateRangeType.contractedLastYear:
      dateRange = getContractedLastYear(contractStartDate, isFormatted);
      break;
    case DateRangeType.contractedYtd:
      dateRange = getContractedYtd(contractStartDate, consumptionDate, isFormatted);
      break;
    case DateRangeType.lastNineMonths:
      dateRange = getLastNineMonthsDate(consumptionDate, isFormatted);
      break;
    case DateRangeType.lastSixMonths:
      dateRange = getLastSixMonthsDate(consumptionDate, isFormatted);
      break;
    case DateRangeType.lastThreeMonths:
      dateRange = getLastThreeMonthsDate(consumptionDate, isFormatted);
      break;
    default:
      dateRange = undefined;
      break;
  }
  return dateRange;
};
