import { format } from 'date-fns';

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

export function getContractedYtd(startDate: Date = new Date()) {
  const endDate = new Date();
  endDate.setDate(1); // Workaround to set month properly
  endDate.setMonth(endDate.getMonth() - 1);

  return {
    end_date: format(endDate, 'yyyy-MM'),
    start_date: format(startDate, 'yyyy-MM'),
  };
}

export function getContractedLastYear(startDate: Date = new Date(), isFormatted = true) {
  const endDate = new Date(startDate.getTime());
  endDate.setDate(1); // Workaround to set month properly
  endDate.setMonth(endDate.getMonth() - 1);

  startDate.setFullYear(startDate.getFullYear() - 1);

  return isFormatted
    ? {
        end_date: format(endDate, 'yyyy-MM'),
        start_date: format(startDate, 'yyyy-MM'),
      }
    : {
        end_date: endDate,
        start_date: startDate,
      };
}

// Returns 9 months, including today's date
export function getLastNineMonthsDate() {
  return getLastMonthsDate(9);
}

// Returns 6 months, including today's date
export function getLastSixMonthsDate() {
  return getLastMonthsDate(6);
}

// Returns 3 months, including today's date
export function getLastThreeMonthsDate() {
  return getLastMonthsDate(3);
}

// Returns today's month - offset
export function getLastMonthsDate(offset: number) {
  const endDate = new Date();
  const startDate = new Date();

  // Workaround to set month properly
  endDate.setDate(1);
  startDate.setDate(1);

  startDate.setMonth(startDate.getMonth() - offset);
  endDate.setMonth(endDate.getMonth() - 1);

  return {
    end_date: format(endDate, 'yyyy-MM'),
    start_date: format(startDate, 'yyyy-MM'),
  };
}
