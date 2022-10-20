import './DetailsTable.scss';

import { Bullseye, EmptyState, EmptyStateBody, EmptyStateIcon, Spinner } from '@patternfly/react-core';
import { CalculatorIcon } from '@patternfly/react-icons/dist/esm/icons/calculator-icon';
import { nowrap, sortable, SortByDirection, Table, TableBody, TableHeader } from '@patternfly/react-table';
import { parseQuery, Query } from 'api/queries/query';
import { Report } from 'api/reports/report';
import { format } from 'date-fns';
import messages from 'locales/messages';
import React, { useEffect, useState } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ComputedReportItemType, ComputedReportItemValueType } from 'routes/components/charts/common/chart-datum';
import { EmptyFilterState } from 'routes/components/state/empty-filter';
import { getDateRange, getDateRangeDefault } from 'routes/utils/dateRange';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { formatCurrency } from 'utils/format';

import { styles } from './DetailsTable.styles';

interface DetailsTableOwnProps {
  dateRange?: string;
  groupBy?: string;
  isLoading?: boolean;
  onSort?: (value: string, isSortAscending: boolean, date: string) => void;
  query?: Query;
  report?: Report;
}

interface DetailsTableStateProps {
  end_date?: string;
  start_date?: string;
}

type DetailsTableProps = DetailsTableOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const DetailsTableBase: React.FC<DetailsTableProps> = ({
  dateRange,
  groupBy,
  isLoading,
  intl,
  onSort,
  query,
  report,
}) => {
  const [columns, setColumns] = useState([]);
  const [loadingRows, setLoadingRows] = useState([]);
  const [rows, setRows] = useState([]);

  const { end_date, start_date } = mapToProps({ dateRange });

  const initDatum = () => {
    if (!query || !report) {
      return;
    }

    const newRows = [];
    const computedItems = getUnsortedComputedReportItems({
      report,
      idKey: groupBy,
      isDateMap: true,
    });

    const newColumns = [
      {
        cellTransforms: [nowrap],
        date: undefined,
        orderBy: groupBy,
        title: intl.formatMessage(messages.groupByValueNames, { groupBy }),
        ...(computedItems.length && { transforms: [sortable] }),
      },
    ];

    // Fill in missing columns
    for (
      let currentDate = new Date(start_date + 'T23:59:59z');
      currentDate <= new Date(end_date + 'T23:59:59z');
      currentDate.setMonth(currentDate.getMonth() + 1)
    ) {
      const mapId = format(currentDate, 'yyyy-MM');

      let isSortable = computedItems.length > 0;
      computedItems.map(rowItem => {
        const item = rowItem.get(mapId);
        if (!item) {
          isSortable = false;
          rowItem.set(mapId, {
            date: mapId,
          });
        }
      });

      // Add column headings
      const mapIdDate = new Date(mapId + 'T23:59:59z');
      newColumns.push({
        cellTransforms: [nowrap],
        title: intl.formatDate(mapIdDate, { month: 'long' }),
        ...(isSortable && {
          date: mapId,
          orderBy: 'cost',
          transforms: [sortable],
        }),
      });
    }

    const reportItem = ComputedReportItemType.cost;
    const reportItemValue = ComputedReportItemValueType.total;

    // Sort by date and fill in missing cells
    computedItems.map(rowItem => {
      const cells = [];
      let desc; // First column description (i.e., show ID if different than label)
      let name; // For first column resource name

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
        if (!name) {
          name = item && item.label && item.label !== null ? item.label : null;
        }
        if (!desc) {
          desc = item.id && item.id !== item.label ? <div style={styles.infoDescription}>{item.id}</div> : null;
        }

        // Add row cells
        cells.push({
          title:
            item[reportItem] && item[reportItem][reportItemValue]
              ? formatCurrency(item[reportItem][reportItemValue].value, item[reportItem][reportItemValue].units)
              : intl.formatMessage(messages.chartNoData),
        });
      });

      // Add first row cell (i.e., name)
      cells.unshift({
        title: (
          <div>
            {name}
            {desc}
          </div>
        ),
      });

      newRows.push({
        cells,
      });
    });

    const newLoadingRows = [
      {
        heightAuto: true,
        cells: [
          {
            props: { colSpan: 5 },
            title: (
              <Bullseye>
                <div style={{ textAlign: 'center' }}>
                  <Spinner size="xl" />
                </div>
              </Bullseye>
            ),
          },
        ],
      },
    ];

    setColumns(newColumns);
    setLoadingRows(newLoadingRows);
    setRows(newRows);
  };

  const getEmptyState = () => {
    for (const val of Object.values(query.filter_by)) {
      if (val !== '*') {
        return <EmptyFilterState filter={val as string} showMargin={false} />;
      }
    }
    return (
      <EmptyState>
        <EmptyStateIcon icon={CalculatorIcon} />
        <EmptyStateBody>{intl.formatMessage(messages.detailsEmptyState)}</EmptyStateBody>
      </EmptyState>
    );
  };

  const getSortBy = () => {
    let index = -1;
    let direction: any = SortByDirection.asc;

    if (query && query.order_by) {
      for (const key of Object.keys(query.order_by)) {
        let c = 0;
        for (const column of columns) {
          if (column.orderBy === key && !column.date) {
            direction = query.order_by[key] === 'asc' ? SortByDirection.asc : SortByDirection.desc;
            index = c;
            break;
          } else if (column.date === query.order_by[key]) {
            direction = query.order_by.cost === 'asc' ? SortByDirection.asc : SortByDirection.desc;
            index = c;
            break;
          }
          c++;
        }
      }
    }
    return index > -1 ? { index, direction } : {};
  };

  const handleOnSort = (event, index, direction) => {
    if (onSort) {
      const column = columns[index];
      const isSortAscending = direction === SortByDirection.asc;
      onSort(column.orderBy, isSortAscending, column.date);
    }
  };

  useEffect(() => {
    initDatum();
  }, [dateRange, query, report]);

  return (
    <div style={styles.tableContainer}>
      <Table
        aria-label={intl.formatMessage(messages.detailsTableAriaLabel)}
        canSelectAll={false}
        cells={columns}
        className="DetailsTableOverride"
        rows={isLoading ? loadingRows : rows}
        sortBy={getSortBy()}
        onSort={handleOnSort}
      >
        <TableHeader />
        <TableBody />
      </Table>
      {Boolean(rows.length === 0) && <div style={styles.emptyState}>{getEmptyState()}</div>}
    </div>
  );
};

const mapToProps = ({ dateRange }: DetailsTableOwnProps): DetailsTableStateProps => {
  const queryFromRoute = parseQuery<Query>(location.search);
  const _dateRange = dateRange || getDateRangeDefault(queryFromRoute);
  const { end_date, start_date } = getDateRange(_dateRange);

  return {
    end_date,
    start_date,
  };
};

const DetailsTable = injectIntl(withRouter(DetailsTableBase));

export { DetailsTable };
