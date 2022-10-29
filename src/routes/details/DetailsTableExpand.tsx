import { Bullseye, Spinner } from '@patternfly/react-core';
import { Td, Th, Tr } from '@patternfly/react-table';
import type { Query } from 'api/queries';
import { getQuery, parseQuery } from 'api/queries';
import type { Report } from 'api/reports/report';
import { ReportPathsType, ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import { cloneDeep } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { getDateRange, getDateRangeDefault } from 'routes/utils/dateRange';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { formatCurrency } from 'utils/format';

import { accountData } from './data/accountData';
import { affiliateData } from './data/affiliateData';
import { productData } from './data/productData';
import { sourceData } from './data/sourceData';
import type { DetailsTableCell } from './DetailsTable';
import { reportItem, reportItemValue } from './DetailsTable';
import { GroupByType } from './utils';

interface DetailsTableExpandOwnProps {
  columns?: any[];
  dateRange?: string;
  groupBy?: string;
  groupByValue?: string;
  isExpanded?: boolean;
  isHidden?: boolean;
  rowIndex?: number;
  secondaryGroupBy?: string;
  setRowIndex?: (rowIndex: number, callback) => any;
}

interface DetailsTableExpandStateProps {
  end_date?: string;
  query: Query;
  queryString: string;
  report: Report;
  reportError: AxiosError;
  reportFetchStatus: FetchStatus;
  start_date?: string;
}

type DetailsTableExpandProps = DetailsTableExpandOwnProps & RouteComponentProps<void> & WrappedComponentProps;

export const baseQuery: Query = {
  filter: {
    limit: 10,
    offset: 0,
  },
  filter_by: {},
  group_by: {
    product: '*',
  },
  order_by: {
    cost: 'desc',
  },
};

const reportPathsType = ReportPathsType.details; // Todo: temporary placeholder for upcoming API
const reportType = ReportType.cost;

const DetailsTableExpandBase: React.FC<DetailsTableExpandProps> = ({
  columns,
  dateRange,
  groupBy,
  groupByValue,
  intl,
  isExpanded,
  secondaryGroupBy,
}) => {
  const [rows, setRows] = useState([]);
  const { report, reportFetchStatus } = mapToProps({ dateRange, groupBy, groupByValue, secondaryGroupBy });

  const initDatum = () => {
    if (!report) {
      return;
    }

    const computedItems = getUnsortedComputedReportItems({
      report,
      idKey: secondaryGroupBy,
      isDateMap: true,
    });

    // Sort by date and fill in missing row cells
    const newRows = [];
    computedItems.map(rowItem => {
      const cells: DetailsTableCell[] = [];
      let value; // For first column resource name

      const items: any = Array.from(rowItem.values()).sort((a: any, b: any) => {
        if (new Date(a.date) > new Date(b.date)) {
          return 1;
        } else if (new Date(a.date) < new Date(b.date)) {
          return -1;
        } else {
          return 0;
        }
      });

      items.map(item => {
        if (!value) {
          value = item && item.label && item.label !== null ? item.label : null;
        }

        // Add row cells
        cells.push({
          value:
            item[reportItem] && item[reportItem][reportItemValue]
              ? formatCurrency(item[reportItem][reportItemValue].value, item[reportItem][reportItemValue].units)
              : intl.formatMessage(messages.chartNoData),
        });
      });

      // Add first row cell (i.e., name)
      cells.unshift({ value });
      newRows.push(cells);
    });

    setRows(newRows);
  };

  useEffect(() => {
    initDatum();
  }, [report]);

  return (
    <React.Fragment>
      {reportFetchStatus === FetchStatus.inProgress && isExpanded ? (
        <Tr>
          <Td colSpan={100}>
            <Bullseye>
              <div style={{ textAlign: 'center' }}>
                <Spinner size="xl" />
              </div>
            </Bullseye>
          </Td>
        </Tr>
      ) : (
        rows.map((cells, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <Tr isExpanded={isExpanded}>
              {cells.map((item, cellIndex) =>
                cellIndex === 0 ? (
                  <Th
                    dataLabel={columns[cellIndex]}
                    key={`expanded-cell-${cellIndex}-${rowIndex}`}
                    hasRightBorder
                    isStickyColumn
                  >
                    <span className="expandedCol">{item.value}</span>
                  </Th>
                ) : (
                  <Td dataLabel={columns[cellIndex]} key={`cell-${rowIndex}-${cellIndex}`}>
                    {item.value}
                  </Td>
                )
              )}
            </Tr>
          </React.Fragment>
        ))
      )}
    </React.Fragment>
  );
};

const mapToProps = ({
  dateRange,
  groupBy,
  groupByValue,
  secondaryGroupBy,
}: DetailsTableExpandOwnProps): DetailsTableExpandStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const queryFromRoute = parseQuery<Query>(location.search);
  const _dateRange = dateRange || getDateRangeDefault(queryFromRoute);
  const { end_date, start_date } = getDateRange(_dateRange);

  const query = {
    filter: {
      [groupBy]: groupByValue,
    },
    filter_by: queryFromRoute.filter_by || baseQuery.filter_by,
    group_by: secondaryGroupBy,
    order_by: queryFromRoute.order_by,
  };
  const queryString = getQuery({
    ...query,
    dateRange: undefined,
    end_date,
    start_date,
  });

  const report = useSelector((/* state: RootState */) => {
    // reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, queryString)

    let result;
    switch (secondaryGroupBy) {
      case GroupByType.affiliate:
        result = cloneDeep(affiliateData);
        break;
      case GroupByType.account:
        result = cloneDeep(accountData);
        break;
      case GroupByType.sourceOfSpend:
        result = cloneDeep(sourceData);
        break;
      case GroupByType.product:
      default:
        result = cloneDeep(productData);
        break;
    }

    const startDate = new Date(start_date + 'T23:59:59z');
    const endDate = new Date(end_date + 'T23:59:59z');
    endDate.setMonth(endDate.getMonth() + 1);

    result.data = result.data.filter(item => {
      const currentDate = new Date(item.date + 'T23:59:59z');
      if (currentDate >= startDate && currentDate <= endDate) {
        return item;
      }
    });

    return result;
  });
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, reportPathsType, reportType, queryString)
  );
  const reportError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, reportPathsType, reportType, queryString)
  );

  useMemo(() => {
    if (reportFetchStatus !== FetchStatus.inProgress) {
      // Todo: simulate time to fetch
      dispatch(reportActions.fetchReport(reportPathsType, reportType, queryString));
    }
  }, [queryString]);

  return {
    end_date,
    query,
    queryString,
    report,
    reportFetchStatus,
    reportError,
    start_date,
  };
};

const DetailsTableExpand = injectIntl(withRouter(DetailsTableExpandBase));

export { DetailsTableExpand };
