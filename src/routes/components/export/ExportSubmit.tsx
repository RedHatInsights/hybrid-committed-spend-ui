import { Button, ButtonVariant } from '@patternfly/react-core';
import type { Export } from 'api/export/export';
import type { Query } from 'api/queries/query';
import { getQuery } from 'api/queries/query';
import type { ReportPathsType } from 'api/reports/report';
import { ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import fileDownload from 'js-file-download';
import messages from 'locales/messages';
import React, { useEffect } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { exportActions, exportSelectors } from 'store/export';

export interface ExportSubmitOwnProps {
  disabled?: boolean;
  dataType?: 'json' | 'raw';
  endDate?: string;
  groupBy?: string;
  onClose?: (isOpen: boolean) => void;
  onError?: (error: AxiosError) => void;
  name?: string;
  query?: Query;
  reportPathsType?: ReportPathsType;
  startDate?: string;
}

interface ExportSubmitStateProps {
  queryString: string;
  report: Export;
  reportError: AxiosError;
  reportFetchStatus?: FetchStatus;
}

type ExportSubmitProps = ExportSubmitOwnProps & WrappedComponentProps;

const reportType = ReportType.billing;

const ExportSubmitBase: React.FC<ExportSubmitProps> = ({
  disabled,
  dataType,
  endDate,
  groupBy,
  intl,
  onClose,
  onError,
  query,
  reportPathsType,
  startDate,
}) => {
  const { queryString, report, reportFetchStatus } = mapToProps({ dataType, onError, query, reportPathsType });
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const getExport = () => {
    if (report && reportFetchStatus === FetchStatus.complete) {
      fileDownload(report.data, getFileName(), 'text/csv');
      handleClose();
    }
  };

  const getFileName = () => {
    // defaultMessage: '<provider>_<groupBy>_<resolution>_<start-date>_<end-date>',
    const fileName = intl.formatMessage(messages.exportFileName, {
      endDate,
      provider: reportPathsType,
      groupBy,
      startDate,
    });

    return `${fileName}.csv`;
  };

  const handleClose = () => {
    if (onClose) {
      onClose(false);
    }
  };

  const handleFetchReport = () => {
    dispatch(exportActions.exportReport(reportPathsType, reportType, queryString));
  };

  useEffect(() => {
    getExport();
  }, [report]);

  return (
    <Button
      isDisabled={disabled || reportFetchStatus === FetchStatus.inProgress}
      key="confirm"
      onClick={handleFetchReport}
      variant={ButtonVariant.primary}
    >
      {intl.formatMessage(messages.exportGenerate)}
    </Button>
  );
};

const mapToProps = ({ onError, query, reportPathsType }: ExportSubmitOwnProps): ExportSubmitStateProps => {
  const getQueryString = () => {
    // Todo: Add start and end dates below
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

    // Store filter_by as an array, so we can add to it below
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
  const report = useSelector((state: RootState) =>
    exportSelectors.selectExport(state, reportPathsType, reportType, queryString)
  );
  const reportError = useSelector((state: RootState) =>
    exportSelectors.selectExportError(state, reportPathsType, reportType, queryString)
  );
  const reportFetchStatus = useSelector((state: RootState) =>
    exportSelectors.selectExportFetchStatus(state, reportPathsType, reportType, queryString)
  );

  useEffect(() => {
    if (onError) {
      onError(reportError);
    }
  }, [reportError]);

  return {
    queryString,
    report,
    reportError,
    reportFetchStatus,
  };
};

const ExportSubmit = injectIntl(ExportSubmitBase);

export { ExportSubmit };
