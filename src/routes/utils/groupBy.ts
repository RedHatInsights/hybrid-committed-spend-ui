import type { Query } from 'api/queries/query';

export const getGroupById = (query: Query) => {
  const groupBys = query?.groupBy ? Object.keys(query.groupBy) : [];
  return groupBys.find(key => key !== ''); // was checking for org unit keys
};

export const getGroupByValue = (query: Query) => {
  const groupById = getGroupById(query);
  return groupById ? query.groupBy[groupById] : undefined;
};
