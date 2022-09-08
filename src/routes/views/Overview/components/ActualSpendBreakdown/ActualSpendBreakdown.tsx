import './ActualSpendBreakdown.scss';

import { Report } from 'api/reports/report';
import messages from 'locales/messages';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { EmptyValueState } from 'routes/components/state';
import { formatCurrency, FormatOptions } from 'utils/format';

interface ActualSpendBreakdownOwnProps {
  formatOptions?: FormatOptions;
  report: Report;
}

type ActualSpendBreakdownProps = ActualSpendBreakdownOwnProps & WrappedComponentProps;

const ActualSpendBreakdownBase: React.SFC<ActualSpendBreakdownProps> = ({ formatOptions = {}, intl, report }) => {
  let value: string | React.ReactNode = <EmptyValueState />;

  const hasTotal = report && report.meta && report.meta.total;
  const hasCost = hasTotal && report.meta.total.cost && report.meta.total.cost.total;

  if (hasTotal) {
    value = formatCurrency(
      hasCost ? report.meta.total.cost.total.value : 0,
      hasCost ? report.meta.total.cost.total.units : 'USD',
      formatOptions
    );
  }

  return (
    <>
      <div>August 2022 - February 2023</div>
      <div className="valueContainer">
        <div className={`value`}>{value}</div>
        <div>{intl.formatMessage(messages.overLastMonth)}</div>
      </div>
    </>
  );
};

const ActualSpendBreakdown = injectIntl(ActualSpendBreakdownBase);

export default ActualSpendBreakdown;
