import { format } from 'date-fns';

export interface DateType {
  endDate: Date;
  startDate: Date;
}

export interface FormatDate {
  consumptionDate?: Date;
  startDate?: Date;
  endDate?: Date;
  isFormatted?: boolean;
}

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
  const today = format(new Date(), 'yyyy-MM-dd');
  return new Date(`${today}T00:00:00`);
};

export const getToday = (hrs: number = 0, min: number = 0, sec: number = 0) => {
  const today = new Date();

  today.setHours(hrs);
  today.setMinutes(min);
  today.setSeconds(sec);

  return today;
};

export const getYear = (offset: number) => {
  const today = getToday();

  today.setMonth(today.getMonth() + 1); // Adjust to include this month
  today.setFullYear(today.getFullYear() - offset);

  return today;
};

export const formatDate = ({ consumptionDate, startDate, endDate, isFormatted = true }: FormatDate) => {
  return isFormatted
    ? {
        consumptionDate: consumptionDate ? format(consumptionDate, 'yyyy-MM-dd') : undefined,
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
      }
    : {
        consumptionDate,
        endDate,
        startDate,
      };
};

export const getContractedLastYear = (
  previousContractLineStartDate: Date,
  previousContractLineEndDate: Date,
  isFormatted: boolean
) => {
  if (previousContractLineStartDate === undefined || previousContractLineEndDate === undefined) {
    return getUndefinedDates();
  }
  return formatDate({ startDate: previousContractLineStartDate, endDate: previousContractLineEndDate, isFormatted });
};

export const getContractedYear = (contractLineStartDate: Date, contractLineEndDate: Date, isFormatted: boolean) => {
  if (contractLineStartDate === undefined || contractLineEndDate === undefined) {
    return getUndefinedDates();
  }
  return formatDate({ startDate: contractLineStartDate, endDate: contractLineEndDate, isFormatted });
};

export const getContractedYtd = (contractLineStartDate: Date, consumptionDate: Date, isFormatted: boolean) => {
  if (contractLineStartDate === undefined || consumptionDate === undefined) {
    return getUndefinedDates();
  }
  const endDate = consumptionDate;
  const startDate = new Date(contractLineStartDate.getTime());

  if (!consumptionDate) {
    endDate.setMonth(endDate.getMonth() - 1);
  }
  return formatDate({ startDate, endDate, isFormatted });
};

// Returns 9 months, including today's date
export const getLastNineMonthsDate = (consumptionDate: Date, isFormatted: boolean) => {
  return getLastMonthsDate(consumptionDate, 8, isFormatted);
};

// Returns 6 months, including today's date
export const getLastSixMonthsDate = (consumptionDate: Date, isFormatted: boolean) => {
  return getLastMonthsDate(consumptionDate, 5, isFormatted);
};

// Returns 3 months, including today's date
export const getLastThreeMonthsDate = (consumptionDate: Date, isFormatted: boolean) => {
  return getLastMonthsDate(consumptionDate, 2, isFormatted);
};

// Returns today's month - offset
export const getLastMonthsDate = (consumptionDate: Date, offset: number, isFormatted: boolean) => {
  if (consumptionDate === undefined) {
    return getUndefinedDates();
  }
  const endDate = consumptionDate;
  const startDate = new Date();

  // Workaround to compare month properly
  startDate.setDate(1);

  if (!consumptionDate) {
    endDate.setMonth(endDate.getMonth() - 1);
  }
  startDate.setMonth(endDate.getMonth() - offset);
  return formatDate({ startDate, endDate, isFormatted });
};

export const getUndefinedDates = () => {
  return { startDate: undefined, endDate: undefined };
};
