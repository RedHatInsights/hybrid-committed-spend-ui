import { getQueryRoute, Query } from 'api/queries/query';

import { addFilterToQuery, Filter, removeFilterFromQuery } from './filter';

export const getRouteForQuery = (history, query: Query, reset: boolean = false) => {
  // Reset pagination
  if (reset) {
    query.filter = {
      ...query.filter,
      offset: 0,
    };
  }
  return `${history.location.pathname}?${getQueryRoute(query)}`;
};

export const handleOnFilterAdded = (history, query: Query, filter: Filter) => {
  const filteredQuery = addFilterToQuery(query, filter);
  history.replace(getRouteForQuery(history, filteredQuery, true));
};

export const handleOnFilterRemoved = (history, query: Query, filter: Filter) => {
  const filteredQuery = removeFilterFromQuery(query, filter);
  history.replace(getRouteForQuery(history, filteredQuery, true));
};

export const handleOnPerPageSelect = (history, query: Query, perPage: number) => {
  const newQuery = { ...JSON.parse(JSON.stringify(query)) };
  newQuery.filter = {
    ...query.filter,
    limit: perPage,
  };
  const filteredQuery = getRouteForQuery(history, newQuery, true);
  history.replace(filteredQuery);
};

export const handleOnSetPage = (history, query: Query, report, pageNumber) => {
  const limit = report && report.meta && report.meta.filter && report.meta.filter.limit ? report.meta.filter.limit : 10;
  const offset = pageNumber * limit - limit;

  const newQuery = { ...JSON.parse(JSON.stringify(query)) };
  newQuery.filter = {
    ...query.filter,
    offset,
  };
  const filteredQuery = getRouteForQuery(history, newQuery);
  history.replace(filteredQuery);
};

export const handleOnSort = (
  history,
  query: Query,
  sortType: string,
  isSortAscending: boolean,
  date: string = undefined
) => {
  const newQuery = { ...JSON.parse(JSON.stringify(query)) };
  newQuery.order_by = {};
  newQuery.order_by[sortType] = isSortAscending ? 'asc' : 'desc';

  if (date) {
    newQuery.order_by.date = date;
  }
  const filteredQuery = getRouteForQuery(history, newQuery);
  history.replace(filteredQuery);
};
