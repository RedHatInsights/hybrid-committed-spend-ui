import { Bullseye, Spinner } from '@patternfly/react-core';
import { Td, Th, Tr } from '@patternfly/react-table';
import type { Query } from 'api/queries';
import type { Report } from 'api/reports/report';
import type { AxiosError } from 'axios';
import { format } from 'date-fns';
import messages from 'locales/messages';
import React, { useEffect, useRef, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { FetchStatus } from 'store/common';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { compareDateYearAndMonth } from 'utils/dates';
import { formatCurrency } from 'utils/format';

import type { DetailsTableCell } from './DetailsTable';
import { reportItem } from './DetailsTable';
import { useDetailsMapToProps } from './utils';

interface DetailsTableExpandOwnProps {
  columns?: any[];
  endDate?: Date;
  groupBy?: string;
  groupByValue?: string;
  isExpanded?: boolean;
  secondaryGroupBy?: string;
  sourceOfSpendType?: string;
  startDate?: Date;
}

interface DetailsTableExpandStateProps {
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
}

type DetailsTableExpandProps = DetailsTableExpandOwnProps & WrappedComponentProps;

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

const DetailsTableExpandBase: React.FC<DetailsTableExpandProps> = ({
  columns,
  endDate,
  groupBy,
  groupByValue,
  intl,
  isExpanded,
  secondaryGroupBy,
  startDate,
}) => {
  const [rows, setRows] = useState([]);
  const { report, reportFetchStatus } = useMapToProps({
    endDate,
    groupBy,
    groupByValue,
    isExpanded,
    secondaryGroupBy,
    startDate,
  });

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const initDatum = () => {
    if (!report || !startDate || !endDate) {
      return;
    }

    const computedItems = getUnsortedComputedReportItems({
      report,
      idKey: secondaryGroupBy,
      isDateMap: true,
    });

    // Fill in missing columns
    const currentDate = new Date(startDate.getTime());
    currentDate.setDate(1); // Workaround to compare month properly
    for (; compareDateYearAndMonth(currentDate, endDate) <= 0; currentDate.setMonth(currentDate.getMonth() + 1)) {
      const mapId = format(currentDate, 'yyyy-MM');
      computedItems.map(rowItem => {
        const item = rowItem.get(mapId);
        if (!item) {
          rowItem.set(mapId, {
            date: mapId,
          });
        }
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
          value: item[reportItem]
            ? formatCurrency(item[reportItem].value, item[reportItem].units)
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
    if (isMounted.current) {
      initDatum();
    }
  }, [JSON.stringify(report)]);

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
          <Tr key={`row-${rowIndex}`} isExpanded={isExpanded}>
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
        ))
      )}
    </React.Fragment>
  );
};

const useMapToProps = ({
  endDate,
  groupBy,
  groupByValue,
  isExpanded,
  secondaryGroupBy,
  startDate,
}: DetailsTableExpandOwnProps): DetailsTableExpandStateProps => {
  const { report, reportFetchStatus } = useDetailsMapToProps({
    endDate,
    groupBy,
    groupByValue,
    isExpanded,
    secondaryGroupBy,
    startDate,
  });

  return {
    report,
    reportFetchStatus,
  };
};

const DetailsTableExpand = injectIntl(DetailsTableExpandBase);

export { DetailsTableExpand };
