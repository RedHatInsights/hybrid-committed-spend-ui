import type { Query } from 'api/queries/query';
import { getQueryRoute } from 'api/queries/query';

import type { Filter } from './filter';
import { addFilterToQuery, removeFilterFromQuery } from './filter';

export const getRouteForQuery = (location, query: Query, reset: boolean = false) => {
  // Reset pagination
  if (reset) {
    query.filter = {
      ...query.filter,
      offset: 0,
    };
  }
  return `${location.pathname}?${getQueryRoute(query)}`;
};

export const handleOnFilterAdded = (navigate, location, query: Query, filter: Filter) => {
  const filteredQuery = addFilterToQuery(query, filter);
  navigate(getRouteForQuery(location, filteredQuery, true), { replace: true });
};

export const handleOnFilterRemoved = (navigate, location, query: Query, filter: Filter) => {
  const filteredQuery = removeFilterFromQuery(query, filter);
  navigate(getRouteForQuery(location, filteredQuery, true), { replace: true });
};

export const handleOnPerPageSelect = (navigate, location, query: Query, perPage: number) => {
  const newQuery = { ...JSON.parse(JSON.stringify(query)) };
  newQuery.filter = {
    ...query.filter,
    limit: perPage,
  };
  const filteredQuery = getRouteForQuery(location, newQuery, true);
  navigate(filteredQuery, { replace: true });
};

export const handleOnSetPage = (navigate, location, query: Query, report, pageNumber) => {
  const limit = report && report.meta && report.meta.filter && report.meta.filter.limit ? report.meta.filter.limit : 10;
  const offset = pageNumber * limit - limit;

  const newQuery = { ...JSON.parse(JSON.stringify(query)) };
  newQuery.filter = {
    ...query.filter,
    offset,
  };
  const filteredQuery = getRouteForQuery(location, newQuery);
  navigate(filteredQuery, { replace: true });
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
