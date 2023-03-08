import { format } from 'date-fns';

export const compareDateYearAndMonth = (a: Date, b: Date) => {
  if (a.getFullYear() > b.getFullYear()) {
    return 1;
  } else if (a.getFullYear() < b.getFullYear()) {
    return -1;
  } else {
    if (a.getMonth() > b.getMonth()) {
      return 1;
    } else if (a.getMonth() < b.getMonth()) {
      return -1;
    } else {
      return 0;
    }
  }
};

export const getDate = () => {
  const today = format(new Date(), 'yyyy-MM');
  return new Date(`${today}T00:00:00`);
};

export const getToday = (hrs: number = 0, min: number = 0, sec: number = 0) => {
  const today = new Date();

  today.setHours(hrs);
  today.setMinutes(min);
  today.setSeconds(sec);

  return today;
};

export const getYear = offset => {
  const today = getToday();

  today.setMonth(today.getMonth() + 1); // Adjust to include this month
  today.setFullYear(today.getFullYear() - offset);

  return today;
};

export const formatDate = (startDate, endDate, isFormatted = true) => {
  return isFormatted
    ? {
        endDate: endDate ? format(endDate, 'yyyy-MM') : undefined,
        startDate: startDate ? format(startDate, 'yyyy-MM') : undefined,
      }
    : {
        endDate,
        startDate,
      };
};

export const getContractedLastYear = (contractLineStartDate: Date, isFormatted) => {
  if (contractLineStartDate === undefined) {
    return getUndefinedDates();
  }
  const endDate = new Date(contractLineStartDate.getTime());
  endDate.setDate(1); // Workaround to compare month properly
  // endDate.setMonth(endDate.getMonth() - 1); // Todo: do we include month of contractLineStartDate?

  const startDate = new Date(contractLineStartDate.getTime());
  startDate.setFullYear(startDate.getFullYear() - 1);

  return formatDate(startDate, endDate, isFormatted);
};

export const getContractedYtd = (contractLineStartDate, consumptionDate, isFormatted) => {
  if (contractLineStartDate === undefined || consumptionDate === undefined) {
    return getUndefinedDates();
  }
  const endDate = consumptionDate;
  const startDate = new Date(contractLineStartDate.getTime());

  // Workaround to compare month properly
  endDate.setDate(1);
  startDate.setDate(1);

  if (!consumptionDate) {
    endDate.setMonth(endDate.getMonth() - 1);
  }
  return formatDate(startDate, endDate, isFormatted);
};

// Returns 9 months, including today's date
export const getLastNineMonthsDate = (consumptionDate, isFormatted) => {
  return getLastMonthsDate(consumptionDate, 8, isFormatted);
};

// Returns 6 months, including today's date
export const getLastSixMonthsDate = (consumptionDate, isFormatted) => {
  return getLastMonthsDate(consumptionDate, 5, isFormatted);
};

// Returns 3 months, including today's date
export const getLastThreeMonthsDate = (consumptionDate, isFormatted) => {
  return getLastMonthsDate(consumptionDate, 2, isFormatted);
};

// Returns today's month - offset
export const getLastMonthsDate = (consumptionDate: Date, offset: number, isFormatted) => {
  if (consumptionDate === undefined) {
    return getUndefinedDates();
  }
  const endDate = consumptionDate;
  const startDate = new Date();

  // Workaround to compare month properly
  endDate.setDate(1);
  startDate.setDate(1);

  if (!consumptionDate) {
    endDate.setMonth(endDate.getMonth() - 1);
  }
  startDate.setMonth(endDate.getMonth() - offset);
  return formatDate(startDate, endDate, isFormatted);
};

export const getUndefinedDates = () => {
  return { startDate: undefined, endDate: undefined };
};
