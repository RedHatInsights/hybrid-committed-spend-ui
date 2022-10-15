import { Query } from 'api/queries/query';

export const getGroupById = (query: Query) => {
  const groupBys = query && query.group_by ? Object.keys(query.group_by) : [];
  return groupBys.find(key => key !== ''); // was checking for org unit keys
};

export const getGroupByValue = (query: Query) => {
  const groupById = getGroupById(query);
  return groupById ? query.group_by[groupById] : undefined;
};
