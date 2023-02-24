import type { Report, ReportData, ReportItem } from 'api/reports/report';
import { intl } from 'components/i18n';
import messages from 'locales/messages';
import { sort, SortDirection } from 'utils/sort';

export interface ComputedReportValue {
  units?: string;
  value?: number;
}

export interface ComputedReportItem {
  actualSpend?: ComputedReportValue;
  affiliate?: string;
  date?: string;
  committedSpend?: ComputedReportValue;
  id?: string;
  label?: string;
  product?: string;
  sourceOfSpend?: string;
}

export interface ComputedReportItemsParams<R extends Report, T extends ReportItem> {
  idKey: keyof T;
  isDateMap?: boolean;
  report: R;
  sortKey?: keyof ComputedReportItem;
  sortDirection?: SortDirection;
}

export function getComputedReportItems<R extends Report, T extends ReportItem>({
  idKey,
  isDateMap,
  report,
  sortDirection = SortDirection.asc,
  sortKey = 'date',
}: ComputedReportItemsParams<R, T>) {
  return sort(
    getUnsortedComputedReportItems<R, T>({
      idKey,
      isDateMap,
      report,
      sortDirection,
      sortKey,
    }),
    {
      key: sortKey,
      direction: sortDirection,
    }
  );
}

function getCostData(val, key, item?: any) {
  return {
    value: (item && item[key] ? Number(item[key].value) : 0) + (val[key] ? Number(val[key].value) : 0),
    units: val && val[key] ? val[key].units : 'USD',
  };
}

// Details pages typically use this function with filter[resolution]=monthly
export function getUnsortedComputedReportItems<R extends Report, T extends ReportItem>({
  idKey,
  isDateMap = false,
  report,
}: ComputedReportItemsParams<R, T>) {
  if (!report) {
    return [];
  }

  // Map<string | number, ComputedReportItem | Map<string | number, ComputedReportItem>
  const itemMap = new Map();

  const visitDataPoint = (dataPoint: ReportData) => {
    if (dataPoint && dataPoint.values) {
      dataPoint.values.forEach((val: any) => {
        let id = val.id ? val.id : val[idKey];
        if (!id) {
          id = val.date;
        }

        // Ensure unique map IDs
        const mapId = `${id}`;
        const date = val.date;
        const affiliate = val.affiliate;
        const product = val.product;
        const sourceOfSpend = val.source_of_spend;

        let label = val[idKey];
        if (report.meta && report.meta.others && (id === 'Other' || id === 'Others')) {
          // Add count to "Others" label
          label = intl.formatMessage(messages.chartOthers, { count: report.meta.others });
        }

        if (isDateMap) {
          // Map idKey by date
          const data = {
            actualSpend: getCostData(val, 'actual_spend'),
            affiliate,
            date,
            committedSpend: getCostData(val, 'committed_spend'),
            id,
            label,
            product,
            sourceOfSpend,
          };
          const item = itemMap.get(mapId);
          if (item) {
            item.set(date, data);
          } else {
            const dateMap = new Map();
            dateMap.set(date, data);
            itemMap.set(mapId, dateMap);
          }
        } else {
          const item = itemMap.get(mapId);
          if (item) {
            // When applying multiple groupBy params, costs may be split between regions. We need to sum those costs
            itemMap.set(mapId, {
              ...item,
              actualSpend: getCostData(val, 'actual_spend', item),
              affiliate,
              date,
              committedSpend: getCostData(val, 'committed_spend', item),
              id,
              label,
              product,
              sourceOfSpend,
            });
          } else {
            itemMap.set(mapId, {
              actualSpend: getCostData(val, 'actual_spend'),
              affiliate,
              date,
              committedSpend: getCostData(val, 'committed_spend'),
              id,
              label,
              product,
              sourceOfSpend,
            });
          }
        }
      });
    }
    for (const key in dataPoint) {
      if (dataPoint[key] instanceof Array) {
        return dataPoint[key].forEach(visitDataPoint);
      }
    }
  };
  if (report && report.data) {
    report.data.forEach(visitDataPoint);
  }
  return Array.from(itemMap.values());
}
