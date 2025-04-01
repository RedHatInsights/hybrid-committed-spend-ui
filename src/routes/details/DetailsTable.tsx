import './DetailsTable.scss';

import { Bullseye, EmptyState, EmptyStateBody, Spinner } from '@patternfly/react-core';
import { CalculatorIcon } from '@patternfly/react-icons/dist/esm/icons/calculator-icon';
import type { ThProps } from '@patternfly/react-table';
import {
  InnerScrollContainer,
  SortByDirection,
  Table,
  TableVariant,
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
import { useIntl } from 'react-intl';
import { ComputedReportItemType } from 'routes/components/charts/common/chart-datum';
import { EmptyFilterState } from 'routes/components/state/empty-filter';
import { GroupByType } from 'routes/details/types';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { compareDateYearAndMonth } from 'utils/dates';
import { formatCurrency } from 'utils/format';

import { styles } from './DetailsTable.styles';
import { DetailsTableExpand } from './DetailsTableExpand';

interface DetailsTableOwnProps {
  endDate?: Date;
  groupBy?: string;
  isLoading?: boolean;
  onSort?: (value: string, isSortAscending: boolean, date: string) => void;
  query?: Query;
  report?: Report;
  secondaryGroupBy?: string;
  sourceOfSpend?: string;
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

type DetailsTableProps = DetailsTableOwnProps;

export const reportItem = ComputedReportItemType.actualSpend;

const DetailsTable: React.FC<DetailsTableProps> = ({
  endDate,
  groupBy,
  isLoading,
  onSort,
  query,
  report,
  secondaryGroupBy,
  sourceOfSpend,
  startDate,
}) => {
  const [columns, setColumns] = useState([]);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [rows, setRows] = useState([]);
  const intl = useIntl();

  const isRowExpanded = id => expandedRows.has(id);
  const updateExpandedRows = id => {
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
      idKey: groupBy as any,
      isDateMap: true,
    });

    const newColumns: DetailsTableColumn[] = [
      {
        name: intl.formatMessage(messages.groupByValueNames, { groupBy }),
        orderBy: groupBy,
        ...(computedItems.length && { isSortable: true }),
      },
    ];

    // Fill in missing columns
    const currentDate = new Date(startDate.getTime());
    currentDate.setDate(1); // Workaround to compare month properly
    for (; compareDateYearAndMonth(currentDate, endDate) <= 0; currentDate.setMonth(currentDate.getMonth() + 1)) {
      const mapId = format(currentDate, 'yyyy-MM');

      let isSortable = false;
      computedItems.map(rowItem => {
        const item = rowItem.get(mapId);
        if (!item) {
          rowItem.set(mapId, {
            date: mapId,
          });
        } else {
          isSortable = true; // At least one row must be available
        }
      });

      // Add column headings
      newColumns.push({
        name: intl.formatDate(currentDate, { month: 'long' }),
        date: mapId,
        isSortable,
        orderBy: 'actual_spend',
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
          value = item?.label && item.label !== null ? item.label : null;
        }

        // Add row cells
        cells.push({
          value:
            item[reportItem] && item[reportItem] !== null
              ? formatCurrency(item[reportItem].value, item[reportItem].units)
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
    if (query?.filter_by) {
      for (const val of Object.values(query.filter_by)) {
        if (val !== '*') {
          return <EmptyFilterState filter={val as string} showMargin={false} />;
        }
      }
    }
    return (
      <EmptyState icon={CalculatorIcon} titleText={undefined}>
        <EmptyStateBody>{intl.formatMessage(messages.detailsEmptyState)}</EmptyStateBody>
      </EmptyState>
    );
  };

  const getSortBy = index => {
    let direction;

    const column = columns[index];
    const hasOrderBy = query?.orderBy && query.orderBy[column.orderBy];
    const hasOrderByDate = query?.orderBy?.date;

    if (hasOrderBy && hasOrderByDate) {
      if (query?.orderBy?.date === column.date) {
        direction = query.orderBy[column.orderBy];
      }
    } else if (hasOrderBy) {
      if (column.orderBy && !column.date) {
        direction = query.orderBy[column.orderBy];
      }
    }
    return direction
      ? {
          index,
          direction,
        }
      : {};
  };
  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: getSortBy(columnIndex),
    onSort: handleOnSort,
    columnIndex,
  });

  const handleOnSort = (event, index, direction) => {
    if (onSort) {
      const column = columns[index];
      const isSortAscending = direction === SortByDirection.asc;
      onSort(column.orderBy, isSortAscending, columns[index].date);
    }
  };

  useEffect(() => {
    initDatum();
    setExpandedRows(new Set());
  }, [JSON.stringify(report), groupBy, secondaryGroupBy]);

  return (
    <React.Fragment>
      <InnerScrollContainer>
        <Table
          aria-label={intl.formatMessage(messages.detailsTableAriaLabel)}
          className="tableOverride"
          gridBreakPoint=""
          variant={TableVariant.compact}
          data-codemods="true"
        >
          <Thead>
            <Tr>
              {columns.map((col, index) =>
                index === 0 ? (
                  <Th
                    hasRightBorder
                    isStickyColumn
                    key={`col-${index}-${col.name}`}
                    modifier="nowrap"
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
                          className="stickyColumn"
                          dataLabel={columns[cellIndex]}
                          expand={
                            secondaryGroupBy && secondaryGroupBy !== GroupByType.none
                              ? {
                                  areAllExpanded: !isRowExpanded(`row-${rowIndex}`),
                                  collapseAllAriaLabel: intl.formatMessage(messages.detailsTableSelectAriaLabel) as '', // Todo: Workaround for https://github.com/patternfly/patternfly-react/issues/8330
                                  onToggle: () => updateExpandedRows(`row-${rowIndex}`),
                                }
                              : undefined
                          }
                          hasRightBorder
                          isStickyColumn
                          key={`cell-${rowIndex}-${cellIndex}`}
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
                    sourceOfSpend={sourceOfSpend}
                    startDate={startDate}
                  />
                </React.Fragment>
              ))
            )}
          </Tbody>
        </Table>
      </InnerScrollContainer>
      {Boolean(rows.length === 0) && <div style={styles.emptyState}>{getEmptyState()}</div>}
    </React.Fragment>
  );
};

export { DetailsTable };
