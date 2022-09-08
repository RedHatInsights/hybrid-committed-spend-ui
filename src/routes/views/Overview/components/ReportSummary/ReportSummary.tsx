import './ReportSummary.scss';

import { MessageDescriptor } from '@formatjs/intl/src/types';
import { Card, CardBody, CardTitle, Skeleton, Title, TitleSizes } from '@patternfly/react-core';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { FetchStatus } from 'store/common';
import { skeletonWidth } from 'utils/skeleton';

interface ReportSummaryProps extends WrappedComponentProps {
  children?: React.ReactNode;
  status: number;
  subTitle?: MessageDescriptor;
  title: MessageDescriptor;
}

const ReportSummaryBase: React.SFC<ReportSummaryProps> = ({ children, intl, title, subTitle, status }) => (
  <Card className="reportSummary">
    <CardTitle>
      <Title headingLevel="h2" size={TitleSizes.lg}>
        {intl.formatMessage(title)}
      </Title>
      {Boolean(subTitle) && <p className="subtitle">{intl.formatMessage(subTitle)}</p>}
    </CardTitle>
    <CardBody>
      {status === FetchStatus.inProgress ? (
        <>
          <Skeleton width="16%" />
          <Skeleton className="chartSkeleton" width={skeletonWidth.md} />
          <Skeleton width="33%" />
          <Skeleton className="legendSkeleton" width={skeletonWidth.xs} />
        </>
      ) : (
        children
      )}
    </CardBody>
  </Card>
);

const ReportSummary = injectIntl(ReportSummaryBase);

export default ReportSummary;
