import { parse, stringify } from 'qs';

export const logicalOrPrefix = 'or:'; // logical OR prefix for groupBy
export const logicalAndPrefix = 'and:'; // logical AND prefix for groupBy

export interface Filters {
  limit?: number;
  offset?: number;
  resolution?: 'daily' | 'monthly';
  service?: string;
  service_name?: string;
  time_scope_units?: 'month' | 'day';
  time_scope_value?: number;
}

export interface Query {
  account?: any;
  affiliate?: any;
  consumptionDate?: any;
  dateRange?: any;
  endDate?: any;
  product?: any;
  filter?: any;
  filter_by?: any;
  groupBy?: any;
  limit?: number;
  orderBy?: any;
  secondaryGroupBy?: any;
  sourceOfSpend?: any;
  startDate?: any;
}

// Converts filter_by props to filter props
export function convertFilterBy(query: Query) {
  if (!query?.filter_by) {
    return query;
  }
  const newQuery = {
    ...JSON.parse(JSON.stringify(query)),
    filter_by: undefined,
  };
  for (const key of Object.keys(query.filter_by)) {
    if (!newQuery.filter) {
      newQuery.filter = {};
    }
    if (newQuery.filter[key]) {
      if (!Array.isArray(newQuery.filter[key])) {
        newQuery.filter[key] = newQuery.filter[key] !== '*' ? [newQuery.filter[key]] : [];
      }
      newQuery.filter[key].push(query.filter_by[key]);
    } else {
      newQuery.filter[key] = query.filter_by[key];
    }
  }
  return newQuery;
}

function alphabeticalSort(a, b) {
  return a.localeCompare(b);
}

// filter_by props are converted
export function getQuery(query: Query) {
  return stringify(convertFilterBy(query), { encode: false, indices: false, sort: alphabeticalSort });
}

// filter_by props are not converted
export function getQueryRoute(query: Query) {
  return stringify(query, { encode: false, indices: false, sort: alphabeticalSort });
}

// Returns given key without logical OR/AND prefix
function parseKey(val: string) {
  let key = val;
  let index = val.indexOf(logicalOrPrefix);
  if (index !== -1) {
    key = val.substring(index + logicalOrPrefix.length);
  } else {
    index = val.indexOf(logicalAndPrefix);
    if (index !== -1) {
      key = val.substring(index + logicalAndPrefix.length);
    }
  }
  return key;
}

// Returns query without filter_by prefix
export function parseFilterByPrefix(query: Query) {
  if (!query?.filter_by) {
    return query;
  }
  const newQuery = {
    ...JSON.parse(JSON.stringify(query)),
    filter_by: {},
  };
  for (const key of Object.keys(query.filter_by)) {
    const filterByKey = parseKey(key);
    newQuery.filter_by[filterByKey] = query.filter_by[key];
  }
  return newQuery;
}

export function parseGroupByPrefix(query: Query) {
  if (!query?.groupBy) {
    return query;
  }
  const newQuery = {
    ...JSON.parse(JSON.stringify(query)),
    groupBy: {},
  };
  for (const key of Object.keys(query.groupBy)) {
    const groupByKey = parseKey(key);
    newQuery.groupBy[groupByKey] = query.groupBy[key];
  }
  return newQuery;
}

export function parseQuery<T = any>(query: string): T {
  const newQuery: any = parse(query, { ignoreQueryPrefix: true });
  return parseFilterByPrefix(parseGroupByPrefix(newQuery));
}
