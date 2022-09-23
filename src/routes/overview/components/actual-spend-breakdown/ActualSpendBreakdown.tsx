import { getQuery, parseQuery, Query } from 'api/queries/query';
import { Report } from 'api/reports/report';
import { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useMemo, useState } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Perspective } from 'routes/overview/components/perspective';
import { ReportSummary } from 'routes/overview/components/report-summary';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { dashboardSelectors, DashboardWidget } from 'store/dashboard';
import { reportActions, reportSelectors } from 'store/reports';

import ActualSpendBreakdownChart from './ActualSpendBreakdownChart';

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

// eslint-disable-next-line no-shadow
export enum DataType {
  cumulative = 'cumulative',
  monthly = 'monthly',
}

// eslint-disable-next-line no-shadow
export enum PerspectiveType {
  affiliates = 'affiliates',
  products = 'products',
  sources = 'sources',
}

const dataTypeOptions = [
  { label: messages.actualSpendBreakdownDataValues, value: DataType.monthly },
  { label: messages.actualSpendBreakdownDataValues, value: DataType.cumulative },
];

const perspectiveOptions = [
  { label: messages.actualSpendBreakdownPerspectiveValues, value: PerspectiveType.sources },
  { label: messages.actualSpendBreakdownPerspectiveValues, value: PerspectiveType.affiliates },
  { label: messages.actualSpendBreakdownPerspectiveValues, value: PerspectiveType.products },
];

const ActualSpendBreakdownBase: React.FC<ActualSpendBreakdownProps> = ({
  intl,
  fetchReport,
  queryString,
  reportFetchStatus,
  widget,
  widgetId,
}) => {
  useMemo(() => {
    fetchReport(widget.reportPathsType, widget.reportType, queryString);
  }, [queryString]);

  const [dataType, setDataType] = useState(DataType.monthly);
  const [perspectiveType, setPerspectiveType] = useState(PerspectiveType.sources);

  const getDetailsLink = () => {
    if (widget.viewAllPath) {
      const href = `${widget.viewAllPath}?${getQuery({
        // TBD...
      })}`;
      return <Link to={href}>{intl.formatMessage(messages.exploreMore)}</Link>;
    }
    return null;
  };

  const handleOnDataTypeSelected = value => {
    setDataType(value);
  };

  const handleOnPerspectiveSelected = value => {
    setPerspectiveType(value);
  };

  return (
    <ReportSummary detailsLink={getDetailsLink()} fetchStatus={reportFetchStatus} title={widget.title}>
      <Perspective
        currentItem={perspectiveType}
        onSelected={handleOnPerspectiveSelected}
        options={perspectiveOptions}
      />
      <Perspective currentItem={dataType} onSelected={handleOnDataTypeSelected} options={dataTypeOptions} />
      <ActualSpendBreakdownChart
        isCumulative={dataType === DataType.cumulative}
        perspective={perspectiveType}
        widgetId={widgetId}
      />
    </ReportSummary>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<ActualSpendBreakdownOwnProps, ActualSpendBreakdownStateProps>(
  (state, { widgetId }) => {
    const widget = dashboardSelectors.selectWidget(state, widgetId);

    // TBD...
    const queryFromRoute = parseQuery<Query>(location.search);
    const query = {
      filter: {
        ...queryFromRoute.filter,
      },
    };

    const queryString = getQuery(query);
    const reportFetchStatus = reportSelectors.selectReportFetchStatus(
      state,
      widget.reportPathsType,
      widget.reportType,
      queryString
    );

    return {
      queryString,
      query,
      reportFetchStatus,
      widget,
    };
  }
);

const mapDispatchToProps: ActualSpendBreakdownDispatchProps = {
  fetchReport: reportActions.fetchReport,
};

const ActualSpendBreakdown = withRouter(ActualSpendBreakdownBase);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ActualSpendBreakdown));
