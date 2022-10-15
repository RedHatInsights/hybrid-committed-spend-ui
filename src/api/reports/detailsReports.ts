import { ReportItem } from './report';

export interface DetailsReportItem extends ReportItem {
  account?: string;
  affiliate?: string;
  product?: string;
  source_of_spend?: string;
}
