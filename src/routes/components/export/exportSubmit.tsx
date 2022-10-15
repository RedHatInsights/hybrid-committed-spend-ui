import { Button, ButtonVariant } from '@patternfly/react-core';
import { Export } from 'api/export/export';
import { getQuery, Query } from 'api/queries/query';
import { ReportPathsType, ReportType } from 'api/reports/report';
import { AxiosError } from 'axios';
import fileDownload from 'js-file-download';
import messages from 'locales/messages';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { exportActions, exportSelectors } from 'store/export';
import { ComputedReportItem } from 'utils/computedReport/getComputedReportItems';

export interface ExportSubmitOwnProps {
  disabled?: boolean;
  dataType: 'json' | 'raw';
  endDate?: string;
  groupBy?: string;
  items?: ComputedReportItem[];
  onClose(isOpen: boolean);
  onError(error: AxiosError);
  name?: string;
  query?: Query;
  reportPathsType: ReportPathsType;
  startDate?: string;
}

interface ExportSubmitDispatchProps {
  exportReport?: typeof exportActions.exportReport;
}

interface ExportSubmitStateProps {
  queryString: string;
  report: Export;
  reportError: AxiosError;
  reportFetchStatus?: FetchStatus;
}

interface ExportSubmitState {
  fetchReportClicked: boolean;
}

type ExportSubmitProps = ExportSubmitOwnProps &
  ExportSubmitDispatchProps &
  ExportSubmitStateProps &
  WrappedComponentProps;

const reportType = ReportType.cost;

export class ExportSubmitBase extends React.Component<ExportSubmitProps> {
  protected defaultState: ExportSubmitState = {
    fetchReportClicked: false,
  };
  public state: ExportSubmitState = { ...this.defaultState };

  constructor(stateProps, dispatchProps) {
    super(stateProps, dispatchProps);
  }

  public componentDidUpdate(prevProps: ExportSubmitProps) {
    const { report, reportError } = this.props;
    const { fetchReportClicked } = this.state;

    if (prevProps.report !== report && fetchReportClicked) {
      this.getExport();
    }
    if (reportError) {
      this.props.onError(reportError);
    }
  }

  private getExport = () => {
    const { report, reportFetchStatus } = this.props;

    if (report && reportFetchStatus === FetchStatus.complete) {
      fileDownload(report.data, this.getFileName(), 'text/csv');
      this.handleClose();
    }
  };

  private getFileName = () => {
    const { endDate, groupBy, intl, reportPathsType, startDate } = this.props;

    // defaultMessage: '<provider>_<groupBy>_<resolution>_<start-date>_<end-date>',
    const fileName = intl.formatMessage(messages.exportFileName, {
      endDate,
      provider: reportPathsType,
      groupBy,
      startDate,
    });

    return `${fileName}.csv`;
  };

  private handleClose = () => {
    const { reportError } = this.props;

    this.setState({ ...this.defaultState }, () => {
      if (!reportError) {
        this.props.onClose(false);
      }
    });
  };

  private handleFetchReport = () => {
    const { exportReport, queryString, reportPathsType } = this.props;

    exportReport(reportPathsType, reportType, queryString);

    this.setState(
      {
        fetchReportClicked: true,
      },
      () => {
        this.getExport();
      }
    );
  };

  public render() {
    const { disabled, intl, reportFetchStatus } = this.props;

    return (
      <Button
        isDisabled={disabled || reportFetchStatus === FetchStatus.inProgress}
        key="confirm"
        onClick={this.handleFetchReport}
        variant={ButtonVariant.primary}
      >
        {intl.formatMessage(messages.exportGenerate)}
      </Button>
    );
  }
}

const mapStateToProps = createMapStateToProps<ExportSubmitOwnProps, ExportSubmitStateProps>((state, props) => {
  const { query, reportPathsType } = props;

  // Todo: Add name and format type for "all exports" feature
  const getQueryString = () => {
    const newQuery: Query = {
      ...JSON.parse(JSON.stringify(query)),
      filter: {
        limit: undefined,
        offset: undefined,
      },
      filter_by: {},
      limit: 0,
      order_by: undefined,
      perspective: undefined,
      dateRange: undefined,
      delta: undefined,
    };

    // Store filter_by as an array so we can add to it below
    if (query.filter_by) {
      for (const key of Object.keys(query.filter_by)) {
        if (newQuery.filter_by[key] === undefined) {
          newQuery.filter_by[key] = [];
        }
        newQuery.filter_by[key].push(query.filter_by[key]);
      }
    }
    return getQuery(newQuery);
  };

  const queryString = getQueryString();
  const report = exportSelectors.selectExport(state, reportPathsType, reportType, queryString);
  const reportError = exportSelectors.selectExportError(state, reportPathsType, reportType, queryString);
  const reportFetchStatus = exportSelectors.selectExportFetchStatus(state, reportPathsType, reportType, queryString);

  return {
    queryString,
    report,
    reportError,
    reportFetchStatus,
  };
});

const mapDispatchToProps: ExportSubmitDispatchProps = {
  exportReport: exportActions.exportReport,
};

const ExportSubmitConnect = connect(mapStateToProps, mapDispatchToProps)(ExportSubmitBase);
const ExportSubmit = injectIntl(ExportSubmitConnect);

export { ExportSubmit, ExportSubmitProps };
