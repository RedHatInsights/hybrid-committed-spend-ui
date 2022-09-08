import './CommittedSpend.scss';

import { Report } from 'api/reports/report';
import messages from 'locales/messages';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { EmptyValueState } from 'routes/components/state';
import { formatCurrency, FormatOptions } from 'utils/format';

interface CommittedSpendOwnProps {
  formatOptions?: FormatOptions;
  report: Report;
}

type CommittedSpendProps = CommittedSpendOwnProps & WrappedComponentProps;

const CommittedSpendBase: React.SFC<CommittedSpendProps> = ({ formatOptions = {}, intl, report }) => {
  let balance: string | React.ReactNode = <EmptyValueState />;
  let committed: string | React.ReactNode = <EmptyValueState />;

  const hasTotal = report && report.meta && report.meta.total;
  const hasCost = hasTotal && report.meta.total.cost && report.meta.total.cost.total;

  if (hasTotal) {
    balance = formatCurrency(
      hasCost ? report.meta.total.cost.total.value : 0,
      hasCost ? report.meta.total.cost.total.units : 'USD',
      formatOptions
    );
    committed = formatCurrency(
      hasCost ? report.meta.total.cost.total.value : 0,
      hasCost ? report.meta.total.cost.total.units : 'USD',
      formatOptions
    );
  }

  return (
    <>
      <div>March 2023 - July 31, 2023</div>
      <div className="valueContainer">
        <div className={`value`}>{balance}</div>
        <div>{intl.formatMessage(messages.outOf, { value: committed })}</div>
      </div>
    </>
  );
};

const CommittedSpend = injectIntl(CommittedSpendBase);

export default CommittedSpend;
