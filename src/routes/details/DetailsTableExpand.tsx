import { Bullseye, Spinner } from '@patternfly/react-core';
import { Td, Th, Tr } from '@patternfly/react-table';
import type { Query } from 'api/queries';
import messages from 'locales/messages';
import React, { useEffect, useRef, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { FetchStatus } from 'store/common';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { formatCurrency } from 'utils/format';

import { detailsMapToProps } from './api';
import type { DetailsTableCell } from './DetailsTable';
import { reportItem, reportItemValue } from './DetailsTable';

interface DetailsTableExpandOwnProps {
  columns?: any[];
  dateRange?: string;
  groupBy?: string;
  groupByValue?: string;
  isExpanded?: boolean;
  secondaryGroupBy?: string;
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
  const { report, reportFetchStatus } = detailsMapToProps({
    dateRange,
    groupBy,
    groupByValue,
    isExpanded,
    secondaryGroupBy,
  });

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

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
    if (isMounted.current) {
      initDatum();
    }
  }, [dateRange, secondaryGroupBy]);

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

const DetailsTableExpand = injectIntl(withRouter(DetailsTableExpandBase));

export { DetailsTableExpand };
