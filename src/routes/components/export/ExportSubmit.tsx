import { Button, ButtonVariant } from '@patternfly/react-core';
import type { Export } from 'api/export/export';
import type { Query } from 'api/queries/query';
import { getQuery, parseQuery } from 'api/queries/query';
import type { ReportPathsType } from 'api/reports/report';
import { ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import fileDownload from 'js-file-download';
import messages from 'locales/messages';
import React, { useEffect } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
  reportPathsType?: ReportPathsType;
  reportQueryString: string;
  startDate?: string;
}

interface ExportSubmitStateProps {
  exportReport: Export;
  exportError: AxiosError;
  exportFetchStatus?: FetchStatus;
  exportQueryString: string;
}

type ExportSubmitProps = ExportSubmitOwnProps & WrappedComponentProps;

const reportType = ReportType.details;

const ExportSubmitBase: React.FC<ExportSubmitProps> = ({
  disabled,
  dataType,
  endDate,
  groupBy,
  intl,
  onClose,
  onError,
  reportPathsType,
  reportQueryString,
  startDate,
}) => {
  const { exportReport, exportFetchStatus, exportQueryString } = useMapToProps({
    dataType,
    onError,
    reportPathsType,
    reportQueryString,
  });
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const getExport = () => {
    if (exportReport && exportFetchStatus === FetchStatus.complete) {
      fileDownload(exportReport.data, getFileName(), 'text/csv');
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
    dispatch(exportActions.exportReport(reportPathsType, reportType, exportQueryString));
  };

  useEffect(() => {
    getExport();
  }, [exportReport]);

  return (
    <Button
      isDisabled={disabled || exportFetchStatus === FetchStatus.inProgress}
      key="confirm"
      onClick={handleFetchReport}
      variant={ButtonVariant.primary}
    >
      {intl.formatMessage(messages.exportGenerate)}
    </Button>
  );
};

const useMapToProps = ({
  onError,
  reportPathsType,
  reportQueryString,
}: ExportSubmitOwnProps): ExportSubmitStateProps => {
  const location = useLocation();
  const queryFromRoute = parseQuery<Query>(location.search);

  const getQueryString = () => {
    const reportQuery = parseQuery(reportQueryString);
    const newQuery: Query = {
      ...reportQuery,
      filter: {
        limit: undefined, // Don't want paginated data
        offset: undefined, // Don't want a page
      },
      filter_by: {}, // Don't want page filter, selected items will be filtered below
      limit: 0, // No limit to number of items returned
      orderBy: undefined, // Don't want items sorted by cost
    };

    // Store filter_by as an array, so we can add to it below
    if (queryFromRoute.filter_by) {
      for (const key of Object.keys(queryFromRoute.filter_by)) {
        if (newQuery.filter_by[key] === undefined) {
          newQuery.filter_by[key] = [];
        }
        newQuery.filter_by[key].push(queryFromRoute.filter_by[key]);
      }
    }
    return getQuery(newQuery);
  };

  const exportQueryString = getQueryString();
  const exportReport = useSelector((state: RootState) =>
    exportSelectors.selectExport(state, reportPathsType, reportType, exportQueryString)
  );
  const exportError = useSelector((state: RootState) =>
    exportSelectors.selectExportError(state, reportPathsType, reportType, exportQueryString)
  );
  const exportFetchStatus = useSelector((state: RootState) =>
    exportSelectors.selectExportFetchStatus(state, reportPathsType, reportType, exportQueryString)
  );

  useEffect(() => {
    if (onError) {
      onError(exportError);
    }
  }, [exportError]);

  return {
    exportReport,
    exportError,
    exportFetchStatus,
    exportQueryString,
  };
};

const ExportSubmit = injectIntl(ExportSubmitBase);

export { ExportSubmit };
