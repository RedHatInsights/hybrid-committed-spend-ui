import './DetailsTable.scss';

import { Bullseye, EmptyState, EmptyStateBody, EmptyStateIcon, Spinner } from '@patternfly/react-core';
import { CalculatorIcon } from '@patternfly/react-icons/dist/esm/icons/calculator-icon';
import type { ThProps } from '@patternfly/react-table';
import {
  InnerScrollContainer,
  SortByDirection,
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import type { Query } from 'api/queries/query';
import type { Report } from 'api/reports/report';
import { format } from 'date-fns';
import messages from 'locales/messages';
import React, { useEffect, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { ComputedReportItemType, ComputedReportItemValueType } from 'routes/components/charts/common/chart-datum';
import { EmptyFilterState } from 'routes/components/state/empty-filter';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { compareDateYearAndMonth } from 'utils/dates';
import { formatCurrency } from 'utils/format';

import { styles } from './DetailsTable.styles';
import { DetailsTableExpand } from './DetailsTableExpand';
import { GroupByType } from './types';

interface DetailsTableOwnProps {
  endDate?: Date;
  groupBy?: string;
  isLoading?: boolean;
  onSort?: (value: string, isSortAscending: boolean, date: string) => void;
  query?: Query;
  report?: Report;
  secondaryGroupBy?: string;
  sourcesOfSpend?: string;
  startDate?: Date;
}

export interface DetailsTableColumn {
  date?: string;
  isSortable?: boolean;
  name?: string;
  orderBy?: string;
}

export interface DetailsTableCell {
  value?: string;
}

type DetailsTableProps = DetailsTableOwnProps & RouteComponentProps<void> & WrappedComponentProps;

export const reportItem = ComputedReportItemType.cost;
export const reportItemValue = ComputedReportItemValueType.total;

const DetailsTableBase: React.FC<DetailsTableProps> = ({
  endDate,
  groupBy,
  isLoading,
  intl,
  onSort,
  query,
  report,
  secondaryGroupBy,
  sourcesOfSpend,
  startDate,
}) => {
  const [activeSortIndex, setActiveSortIndex] = useState<number | null>(null);
  const [activeSortDirection, setActiveSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [columns, setColumns] = useState([]);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [rows, setRows] = useState([]);

  const isRowExpanded = id => expandedRows.has(id);
  const initExpandedRows = id => {
    const result = new Set(expandedRows);
    if (!result.delete(id)) {
      result.add(id);
    }
    setExpandedRows(result);
  };

  const initDatum = () => {
    if (!report || !startDate || !endDate) {
      return;
    }

    const computedItems = getUnsortedComputedReportItems({
      report,
      idKey: groupBy,
      isDateMap: true,
    });

    const newColumns: DetailsTableColumn[] = [
      {
        isSortable: true,
        name: intl.formatMessage(messages.groupByValueNames, { groupBy }),
        orderBy: groupBy,
      },
    ];

    // Fill in missing columns
    const currentDate = new Date(startDate.getTime());
    currentDate.setDate(1); // Workaround to compare month properly
    for (; compareDateYearAndMonth(currentDate, endDate) <= 0; currentDate.setMonth(currentDate.getMonth() + 1)) {
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
      newColumns.push({
        name: intl.formatDate(currentDate, { month: 'long' }),
        date: mapId,
        isSortable,
        orderBy: 'cost', // Todo: update when APIs are available
      });
    }

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

    setColumns(newColumns);
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

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection,
      defaultDirection: 'asc',
    },
    onSort: handleOnSort,
    columnIndex,
  });

  const handleOnSort = (event, index, direction) => {
    setActiveSortDirection(direction);
    setActiveSortIndex(index);

    if (onSort) {
      const column = columns[index];
      const isSortAscending = direction === SortByDirection.asc;
      onSort(column.orderBy, isSortAscending, column.date);
    }
  };

  useEffect(() => {
    initDatum();
  }, [JSON.stringify(report)]);

  useEffect(() => {
    setExpandedRows(new Set());
  }, [groupBy, secondaryGroupBy, sourcesOfSpend]);

  return (
    <React.Fragment>
      <InnerScrollContainer>
        <TableComposable
          aria-label={intl.formatMessage(messages.detailsTableAriaLabel)}
          className="tableOverride"
          gridBreakPoint=""
        >
          <Thead>
            <Tr>
              {columns.map((col, index) =>
                index === 0 ? (
                  <Th
                    isStickyColumn
                    hasRightBorder
                    key={`col-${index}-${col.name}`}
                    modifier="truncate"
                    sort={col.isSortable ? getSortParams(index) : undefined}
                  >
                    {col.name}
                  </Th>
                ) : (
                  <Th
                    key={`col-${index}-${col.value}`}
                    modifier="nowrap"
                    sort={col.isSortable ? getSortParams(index) : undefined}
                  >
                    {col.name}
                  </Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
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
                  <Tr>
                    {cells.map((item, cellIndex) =>
                      cellIndex === 0 ? (
                        <Th
                          dataLabel={columns[cellIndex]}
                          expand={
                            secondaryGroupBy && secondaryGroupBy !== GroupByType.none
                              ? {
                                  areAllExpanded: !isRowExpanded(`row-${rowIndex}`),
                                  collapseAllAriaLabel: '', // Not using collapse all feature
                                  onToggle: () => initExpandedRows(`row-${rowIndex}`),
                                }
                              : undefined
                          }
                          key={`cell-${cellIndex}-${rowIndex}`}
                          hasRightBorder
                          isStickyColumn
                        >
                          {item.value}
                        </Th>
                      ) : (
                        <Td dataLabel={columns[cellIndex]} key={`cell-${rowIndex}-${cellIndex}`}>
                          {item.value}
                        </Td>
                      )
                    )}
                  </Tr>
                  <DetailsTableExpand
                    columns={columns}
                    endDate={endDate}
                    groupBy={groupBy}
                    groupByValue={cells[0].value}
                    isExpanded={isRowExpanded(`row-${rowIndex}`)}
                    secondaryGroupBy={secondaryGroupBy}
                    startDate={startDate}
                  />
                </React.Fragment>
              ))
            )}
          </Tbody>
        </TableComposable>
      </InnerScrollContainer>
      {Boolean(rows.length === 0) && <div style={styles.emptyState}>{getEmptyState()}</div>}
    </React.Fragment>
  );
};

const DetailsTable = injectIntl(withRouter(DetailsTableBase));

export { DetailsTable };
