import { getQuery } from 'api/queries';
import type { AccountSummaryReport } from 'api/reports/accountSummaryReport';
import { ReportPathsType, ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';

interface AccountSummaryDateProps {
  consumptionDate?: Date;
  contractLineEndDate?: Date;
  contractLineStartDate?: Date;
  previousContractLineEndDate?: Date;
  previousContractLineStartDate?: Date;
}

interface AccountSummaryStateProps {
  summary?: AccountSummaryReport;
  summaryError?: AxiosError;
  summaryFetchStatus?: FetchStatus;
  summaryQueryString?: string;
}

export const getAccountSummaryDates = (summary: AccountSummaryReport): AccountSummaryDateProps => {
  const values = summary && summary.data && summary.data.length && summary.data[0];
  const consumptionDate =
    values && values.consumption_date ? new Date(values.consumption_date + 'T00:00:00') : undefined;
  const contractLineEndDate =
    values && values.contract_line_end_date ? new Date(values.contract_line_end_date + 'T00:00:00') : undefined;
  const contractLineStartDate =
    values && values.contract_line_start_date ? new Date(values.contract_line_start_date + 'T00:00:00') : undefined;
  const previousContractLineEndDate =
    values && values.previous_contract_line_end_date
      ? new Date(values.previous_contract_line_end_date + 'T00:00:00')
      : undefined;
  const previousContractLineStartDate =
    values && values.previous_contract_line_start_date
      ? new Date(values.previous_contract_line_start_date + 'T00:00:00')
      : undefined;

  return {
    consumptionDate,
    contractLineEndDate,
    contractLineStartDate,
    previousContractLineEndDate,
    previousContractLineStartDate,
  };
};

export const useAccountSummaryMapToProps = (deps = []): AccountSummaryStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query = {
    // TBD...
  };
  const summaryQueryString = getQuery(query);

  const reportPathsType = ReportPathsType.accountSummary;
  const reportType = ReportType.details;

  const summary: AccountSummaryReport = useSelector((state: RootState) =>
    reportSelectors.selectReport(state, reportPathsType, reportType, summaryQueryString)
  );
  const summaryError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, reportPathsType, reportType, summaryQueryString)
  );
  const summaryFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, reportPathsType, reportType, summaryQueryString)
  );

  useEffect(() => {
    if (!summaryError && summaryFetchStatus !== FetchStatus.inProgress) {
      dispatch(reportActions.fetchReport(reportPathsType, reportType, summaryQueryString));
    }
  }, deps);

  return {
    summary,
    summaryError,
    summaryFetchStatus,
    summaryQueryString,
  };
};
