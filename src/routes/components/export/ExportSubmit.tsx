import { Button, ButtonVariant } from '@patternfly/react-core';
import type { Export } from 'api/export/export';
import type { Query } from 'api/queries/query';
import { getQuery, parseQuery } from 'api/queries/query';
import type { ReportPathsType } from 'api/reports/report';
import { ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import fileDownload from 'js-file-download';
import messages from 'locales/messages';
import React, { useEffect, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { exportActions, exportSelectors } from 'store/export';
import { formatDate } from 'utils/dates';

export interface ExportSubmitOwnProps {
  disabled?: boolean;
  dataType?: 'json' | 'raw';
  endDate?: Date;
  groupBy?: string;
  onClose?: (isOpen: boolean) => void;
  onError?: (error: AxiosError) => void;
  name?: string;
  reportPathsType?: ReportPathsType;
  reportQueryString: string;
  secondaryGroupBy?: string;
  startDate?: Date;
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
  secondaryGroupBy,
  startDate,
}) => {
  const [fetchExportClicked, setFetchExportClicked] = useState(false);
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
    const { endDate: endDateStr, startDate: startDateStr } = formatDate(startDate, endDate, true);

    // File name format: '<groupBy>_<secondaryGroupBy>_<start-date>_<end-date>',
    const fileName = intl.formatMessage(messages.exportFileName, {
      endDate: endDateStr,
      groupBy,
      secondaryGroupBy,
      startDate: startDateStr,
    });

    return `${fileName}.csv`;
  };

  const handleClose = () => {
    if (onClose) {
      onClose(false);
    }
  };

  const handleFetchReport = () => {
    setFetchExportClicked(true);
    dispatch(exportActions.exportReport(reportPathsType, reportType, exportQueryString));
  };

  useEffect(() => {
    if (fetchExportClicked) {
      getExport();
    }
  }, [exportReport, fetchExportClicked]);

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
  const getQueryString = () => {
    const reportQuery = parseQuery(reportQueryString);
    const newQuery: Query = {
      ...reportQuery,
      filter: {
        ...reportQuery.filter,
        limit: undefined, // Don't want paginated data
        offset: undefined, // Don't want a page
      },
      orderBy: undefined, // Don't want items sorted by actual_spend
    };
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
