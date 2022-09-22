import { getQuery, parseQuery, Query } from 'api/queries/query';
import { Report } from 'api/reports/report';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import messages from 'locales/messages';
import React, { useMemo, useState } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BreakdownChart } from 'routes/components/charts/breakdown-chart';
import {
  ChartDatum,
  ComputedReportItemType,
  ComputedReportItemValueType,
  createReportDatum,
} from 'routes/components/charts/common/chart-datum-utils';
import { Perspective } from 'routes/overview/components/perspective';
import { ReportSummary } from 'routes/overview/components/report-summary';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { dashboardSelectors, DashboardWidget } from 'store/dashboard';
import { reportActions, reportSelectors } from 'store/reports';
import { getToday, getYear } from 'utils/dateRange';
import { ComputedReportItem, getUnsortedComputedReportItems } from 'utils/getComputedReportItems';

import { styles } from './ActualSpendBreakdown.styles';
import { chartStyles } from './ActualSpendBreakdown.styles';
import { currentData } from './data/currentData';

interface ActualSpendBreakdownOwnProps {
  widgetId: number;
}

interface ActualSpendBreakdownStateProps {
  query: Query;
  queryString: string;
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  widget: DashboardWidget;
}

interface ActualSpendBreakdownDispatchProps {
  fetchReport: typeof reportActions.fetchReport;
}

export type ActualSpendBreakdownProps = ActualSpendBreakdownStateProps &
  ActualSpendBreakdownOwnProps &
  ActualSpendBreakdownDispatchProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const perspectiveOptions = [
  { label: messages.actualSpendBreakdownPerspectiveValues, value: 'sources' },
  { label: messages.actualSpendBreakdownPerspectiveValues, value: 'affiliates' },
  { label: messages.actualSpendBreakdownPerspectiveValues, value: 'products' },
];

const ActualSpendBreakdownBase: React.FC<ActualSpendBreakdownProps> = ({
  fetchReport,
  intl,
  queryString,
  report,
  reportFetchStatus,
  widget,
}) => {
  useMemo(() => {
    fetchReport(widget.reportPathsType, widget.reportType, queryString);
  }, [queryString]);

  const [perspectiveItem, setPerspectiveItem] = useState('previous_over_actual');

  const getDetailsLink = () => {
    if (widget.viewAllPath) {
      const href = `${widget.viewAllPath}?${getQuery({
        // TBD...
      })}`;
      return <Link to={href}>{intl.formatMessage(messages.exploreMore)}</Link>;
    }
    return null;
  };

  const getChart = () => {
    const datums = getChartDatums(getComputedItems());

    return (
      <BreakdownChart
        adjustContainerHeight
        containerHeight={chartStyles.chartContainerHeight}
        height={chartStyles.chartHeight}
        name={widget.chartName}
        top1stData={datums.length > 0 ? datums[0] : []}
        top2ndData={datums.length > 1 ? datums[1] : []}
        top3rdData={datums.length > 2 ? datums[2] : []}
        top4thData={datums.length > 3 ? datums[3] : []}
        top5thData={datums.length > 4 ? datums[4] : []}
        top6thData={datums.length > 5 ? datums[5] : []}
      />
    );
  };

  const getChartDatums = (computedItems: ComputedReportItem[]) => {
    const reportItem = ComputedReportItemType.cost;
    const reportItemValue = ComputedReportItemValueType.total;
    const chartDatums = [];

    computedItems.map(computedItem => {
      const datums = [];

      if (computedItem instanceof Map) {
        const items = Array.from(computedItem.values());
        items.map(i => {
          const value = i[reportItem][reportItemValue] ? i[reportItem][reportItemValue].value : i[reportItem].value;
          datums.push(createReportDatum({ value, computedItem: i, reportItem, reportItemValue }));
        });
      }
      chartDatums.push(datums);
    });
    return padChartDatums(chartDatums);
  };

  const getComputedItems = () => {
    return getUnsortedComputedReportItems({
      idKey: 'project', // Todo: this.getGroupBy(),
      isDateMap: true,
      report,
    } as any);
  };

  // This pads chart datums with null datum objects, representing missing data at the beginning and end of the
  // data series. The remaining data is left as is to allow for extrapolation. This allows us to display a "no data"
  // message in the tooltip, which helps distinguish between zero values and when there is no data available.
  const padChartDatums = (items: any[]): ChartDatum[] => {
    const endDate = getToday();
    const result = [];

    items.map(datums => {
      const newItems = [];

      for (let padDate = getYear(1); padDate <= endDate; padDate.setMonth(padDate.getMonth() + 1)) {
        const date = format(padDate, 'yyyy-MM');
        const chartDatum = datums.find(val => val.key === date);
        if (chartDatum) {
          newItems.push(chartDatum);
        } else {
          newItems.push(
            createReportDatum({
              computedItem: { date, id: datums[0].name },
              isForceNoData: true,
              reportItemValue: null,
              value: null,
            })
          );
        }
      }
      result.push(newItems);
    });
    return result;
  };

  const handleOnPerspectiveSelected = value => {
    setPerspectiveItem(value);
  };

  return (
    <ReportSummary detailsLink={getDetailsLink()} fetchStatus={reportFetchStatus} title={widget.title}>
      <Perspective
        currentItem={perspectiveItem}
        onSelected={handleOnPerspectiveSelected}
        options={perspectiveOptions}
      />
      <div style={styles.chartContainer}>{getChart()}</div>
    </ReportSummary>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<ActualSpendBreakdownOwnProps, ActualSpendBreakdownStateProps>(
  (state, { widgetId }) => {
    const widget = dashboardSelectors.selectWidget(state, widgetId);
    // const queries = dashboardSelectors.selectWidgetQueries(state, widgetId);

    // TBD...
    const queryFromRoute = parseQuery<Query>(location.search);
    const query = {
      filter: {
        ...queryFromRoute.filter,
      },
    };

    const queryString = getQuery(query);
    // const currentReport = reportSelectors.selectReport(
    //   state,
    //   widget.reportPathsType,
    //   widget.reportType,
    //   currentQueryString
    // );
    const report = currentData as any;
    const reportError = reportSelectors.selectReportError(
      state,
      widget.reportPathsType,
      widget.reportType,
      queryString
    );
    const currentReportFetchStatus = reportSelectors.selectReportFetchStatus(
      state,
      widget.reportPathsType,
      widget.reportType,
      queryString
    );

    return {
      queryString,
      report,
      reportError,
      currentReportFetchStatus,
      query,
      widget,
    };
  }
);

const mapDispatchToProps: ActualSpendBreakdownDispatchProps = {
  fetchReport: reportActions.fetchReport,
};

const ActualSpendBreakdown = withRouter(ActualSpendBreakdownBase);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ActualSpendBreakdown));
