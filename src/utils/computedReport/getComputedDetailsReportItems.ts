import { Query } from 'api/queries/query';
import { DetailsReportItem } from 'api/reports/detailsReports';
import { Report } from 'api/reports/report';

import { ComputedReportItemsParams } from './getComputedReportItems';

export interface ComputedExplorerReportItemsParams extends ComputedReportItemsParams<Report, DetailsReportItem> {}

export function getIdKeyForGroupBy(groupBy: Query['group_by'] = {}): ComputedExplorerReportItemsParams['idKey'] {
  if (groupBy.account) {
    return 'account';
  }
  if (groupBy.affiliate) {
    return 'affiliate';
  }
  if (groupBy.product) {
    return 'product';
  }
  if (groupBy.source_of_spend) {
    return 'source_of_spend';
  }
  return 'date';
}
