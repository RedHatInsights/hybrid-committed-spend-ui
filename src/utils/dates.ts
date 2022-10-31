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
  return new Date(`${today}T23:59:59z`);
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
        endDate: format(endDate, 'yyyy-MM'),
        startDate: format(startDate, 'yyyy-MM'),
      }
    : {
        endDate,
        startDate,
      };
};

export const getContractedLastYear = (startDate: Date = new Date(), isFormatted) => {
  const endDate = new Date(startDate.getTime());
  endDate.setDate(1); // Workaround to compare month properly
  endDate.setMonth(endDate.getMonth() - 1);

  const _startDate = new Date(startDate.getTime());
  _startDate.setFullYear(_startDate.getFullYear() - 1);

  return formatDate(_startDate, endDate, isFormatted);
};

export const getContractedYear = (startDate, isFormatted) => {
  const endDate = new Date(startDate.getTime());
  endDate.setDate(1); // Workaround to compare month properly
  endDate.setMonth(endDate.getMonth() + 11);

  return formatDate(startDate, endDate, isFormatted);
};

export const getContractedYtd = (startDate, isFormatted) => {
  const endDate = new Date();
  endDate.setDate(1); // Workaround to compare month properly
  endDate.setMonth(endDate.getMonth() - 1);

  return formatDate(startDate, endDate, isFormatted);
};

// Returns 9 months, including today's date
export const getLastNineMonthsDate = isFormatted => {
  return getLastMonthsDate(9, isFormatted);
};

// Returns 6 months, including today's date
export const getLastSixMonthsDate = isFormatted => {
  return getLastMonthsDate(6, isFormatted);
};

// Returns 3 months, including today's date
export const getLastThreeMonthsDate = isFormatted => {
  return getLastMonthsDate(3, isFormatted);
};

// Returns today's month - offset
export const getLastMonthsDate = (offset: number, isFormatted) => {
  const endDate = getDate();
  const startDate = getDate();

  // Workaround to compare month properly
  endDate.setDate(1);
  startDate.setDate(1);

  startDate.setMonth(startDate.getMonth() - offset);
  endDate.setMonth(endDate.getMonth() - 1);

  return formatDate(startDate, endDate, isFormatted);
};
