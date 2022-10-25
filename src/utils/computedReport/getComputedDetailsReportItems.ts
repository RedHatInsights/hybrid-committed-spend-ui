import type { Query } from 'api/queries/query';
import type { DetailsReportItem } from 'api/reports/detailsReports';
import type { Report } from 'api/reports/report';

import type { ComputedReportItemsParams } from './getComputedReportItems';

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
