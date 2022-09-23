import { getQuery, parseQuery, Query } from 'api/queries/query';
import { Report } from 'api/reports/report';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BreakdownChart } from 'routes/components/charts/breakdown-chart';
import {
  ChartDatum,
  ComputedReportItemType,
  ComputedReportItemValueType,
  createReportDatum,
} from 'routes/components/charts/common/chart-datum-utils';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { dashboardSelectors, DashboardWidget } from 'store/dashboard';
import { reportSelectors } from 'store/reports';
import { ComputedReportItem, getUnsortedComputedReportItems } from 'utils/getComputedReportItems';

import { PerspectiveType } from './ActualSpendBreakdown';
import { chartStyles, styles } from './ActualSpendBreakdownChart.styles';
import { affiliatesData } from './data/affiliatesData';
import { productsData } from './data/productsData';
import { sourcesData } from './data/sourcesData';

interface ActualSpendBreakdownChartOwnProps {
  isCumulative?: boolean;
  perspective?: PerspectiveType;
  widgetId: number;
}

interface ActualSpendBreakdownChartStateProps {
  query: Query;
  queryString: string;
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  widget: DashboardWidget;
}

interface ActualSpendBreakdownChartDispatchProps {
  // fetchReport: typeof reportActions.fetchReport;
}

export type ActualSpendBreakdownChartProps = ActualSpendBreakdownChartStateProps &
  ActualSpendBreakdownChartOwnProps &
  ActualSpendBreakdownChartDispatchProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const ActualSpendBreakdownChartBase: React.FC<ActualSpendBreakdownChartProps> = ({ isCumulative, report, widget }) => {
  const getChart = () => {
    const startDate = new Date('2021-12-01T23:59:59z');
    const endDate = new Date('2022-12-01T23:59:59z');
    const datums = getChartDatums(getComputedItems(), startDate, endDate);

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

  const getChartDatums = (computedItems: ComputedReportItem[], startDate, endDate) => {
    const reportItem = ComputedReportItemType.cost;
    const reportItemValue = ComputedReportItemValueType.total;
    const chartDatums = [];

    computedItems.map(computedItem => {
      let datums = [];

      if (computedItem instanceof Map) {
        const items = Array.from(computedItem.values());

        // Show cumulative
        if (isCumulative) {
          datums = items.reduce<ChartDatum[]>((acc, d) => {
            const prevValue = acc.length ? acc[acc.length - 1].y : 0;
            const val = d[reportItem][reportItemValue] ? d[reportItem][reportItemValue].value : d[reportItem].value;
            return [
              ...acc,
              createReportDatum({ value: prevValue + val, computedItem: d, reportItem, reportItemValue }),
            ];
          }, []);
        } else {
          items.map(i => {
            const value = i[reportItem][reportItemValue] ? i[reportItem][reportItemValue].value : i[reportItem].value;
            datums.push(createReportDatum({ value, computedItem: i, reportItem, reportItemValue }));
          });
        }
      }
      chartDatums.push(datums);
    });
    return padChartDatums(chartDatums, startDate, endDate);
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
  const padChartDatums = (items: any[], startDate, endDate): ChartDatum[] => {
    const result = [];

    items.map(datums => {
      const newItems = [];

      for (let padDate = new Date(startDate.getTime()); padDate < endDate; padDate.setMonth(padDate.getMonth() + 1)) {
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

  return <div style={styles.chartContainer}>{getChart()}</div>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<ActualSpendBreakdownChartOwnProps, ActualSpendBreakdownChartStateProps>(
  (state, { perspective, widgetId }) => {
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
    // const report = reportSelectors.selectReport(
    //   state,
    //   widget.reportPathsType,
    //   widget.reportType,
    //   currentQueryString
    // );
    const reportError = reportSelectors.selectReportError(
      state,
      widget.reportPathsType,
      widget.reportType,
      queryString
    );
    const reportFetchStatus = reportSelectors.selectReportFetchStatus(
      state,
      widget.reportPathsType,
      widget.reportType,
      queryString
    );

    // Todo: Replace when API is available
    let report;
    switch (perspective) {
      case PerspectiveType.sources: // sources
        report = sourcesData;
        break;
      case PerspectiveType.affiliates: // affiliates
        report = affiliatesData;
        break;
      case PerspectiveType.products: // product
      default:
        report = productsData as any;
        break;
    }

    return {
      queryString,
      report,
      reportError,
      reportFetchStatus,
      query,
      widget,
    };
  }
);

const mapDispatchToProps: ActualSpendBreakdownChartDispatchProps = {
  // fetchReport: reportActions.fetchReport,
};

const ActualSpendBreakdownChart = withRouter(ActualSpendBreakdownChartBase);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ActualSpendBreakdownChart));
