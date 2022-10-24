import { Bullseye, EmptyState, EmptyStateBody, EmptyStateIcon, Spinner } from '@patternfly/react-core';
import { CalculatorIcon } from '@patternfly/react-icons/dist/esm/icons/calculator-icon';
import {
  InnerScrollContainer,
  SortByDirection,
  TableComposable,
  Tbody,
  Td,
  TdProps,
  Th,
  Thead,
  ThProps,
  Tr,
  TreeRowWrapper,
} from '@patternfly/react-table';
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

interface DetailsTableColumn {
  date?: string;
  isSortable?: boolean;
  name?: string;
  orderBy?: string;
}

interface DetailsTableCell {
  children?: React.ReactNode;
  value?: string;
}

type DetailsTableProps = DetailsTableOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const reportItem = ComputedReportItemType.cost;
const reportItemValue = ComputedReportItemValueType.total;

const DetailsTableBase: React.FC<DetailsTableProps> = ({
  dateRange,
  groupBy,
  isLoading,
  intl,
  onSort,
  query,
  report,
}) => {
  const [activeSortIndex, setActiveSortIndex] = useState<number | null>(null);
  const [activeSortDirection, setActiveSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [columns, setColumns] = useState([]);
  const [expandedNames, setExpandedNames] = useState<string[]>([]);
  const [rows, setRows] = useState([]);

  const { end_date, start_date } = mapToProps({ dateRange });

  const initDatum = () => {
    if (!query || !report) {
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
        name: intl.formatDate(mapIdDate, { month: 'long' }),
        date: mapId,
        isSortable,
        orderBy: 'cost', // Todo: update when APIs are available
      });
    }

    // Sort by date and fill in missing row cells
    const newComputedItems = [];
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
      cells.unshift({ children: null, value });
      newComputedItems.push(cells);
    });

    setColumns(newColumns);
    setRows(renderRows({ computedItems: newComputedItems }));
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

  const renderRows = ({
    computedItems,
    isHidden = false,
    level = 1,
    posinset = 1,
    rowIndex = 0,
  }): React.ReactNode[] => {
    const [rowItems, ...remainingComputedItems] = computedItems;
    if (!rowItems) {
      return [];
    }

    const firstItem = rowItems[0];
    const isExpanded = expandedNames.includes(firstItem.name);

    const treeRow: TdProps['treeRow'] = {
      onCollapse: () =>
        setExpandedNames(prevExpanded => {
          const otherExpandedNames = prevExpanded.filter(expName => expName !== firstItem.name);
          return isExpanded ? otherExpandedNames : [...otherExpandedNames, firstItem.name];
        }),
      rowIndex,
      props: {
        isExpanded,
        isHidden,
        'aria-level': level,
        'aria-posinset': posinset,
        'aria-setsize': firstItem.children ? firstItem.children.length : 0,
      },
    };

    const childRows =
      firstItem.children && firstItem.children.length
        ? renderRows({
            computedItems: firstItem.children,
            isHidden: !isExpanded || isHidden,
            level: level + 1,
            posinset: 1,
            rowIndex: rowIndex + 1,
          })
        : [];

    return [
      <TreeRowWrapper key={`${rowIndex}-${firstItem.value}`} row={{ props: treeRow.props }}>
        {rowItems.map((item, index) => (
          <Td
            dataLabel={columns[index]}
            key={`${rowIndex}-${index}-${columns[index]}`}
            modifier={index === 0 ? 'truncate' : 'nowrap'}
            treeRow={treeRow}
          >
            {item.value}
          </Td>
        ))}
      </TreeRowWrapper>,
      ...childRows,
      ...renderRows({
        computedItems: remainingComputedItems,
        isHidden,
        level,
        posinset: posinset + 1,
        rowIndex: rowIndex + 1 + childRows.length,
      }),
    ];
  };

  useEffect(() => {
    initDatum();
  }, [dateRange, query, report]);

  return (
    <div>
      <InnerScrollContainer>
        <TableComposable aria-label="Tree table" gridBreakPoint="" isTreeTable>
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
                    stickyMinWidth="350px"
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
              <Bullseye>
                <div style={{ textAlign: 'center' }}>
                  <Spinner size="xl" />
                </div>
              </Bullseye>
            ) : (
              rows.map(row => row)
            )}
          </Tbody>
        </TableComposable>
      </InnerScrollContainer>
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
