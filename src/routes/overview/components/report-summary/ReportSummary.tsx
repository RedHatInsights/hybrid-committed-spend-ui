import './ReportSummary.scss';

import { MessageDescriptor } from '@formatjs/intl/src/types';
import { Card, CardBody, CardFooter, CardTitle, Skeleton, Title, TitleSizes } from '@patternfly/react-core';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { FetchStatus } from 'store/common';
import { skeletonWidth } from 'utils/skeleton';

import { styles } from './ReportSummary.styles';

interface ReportSummaryOwnProps {
  bodyStyle?: React.CSSProperties;
  children?: React.ReactNode;
  detailsLink?: React.ReactNode;
  fetchStatus: number;
  subTitle?: MessageDescriptor;
  title: MessageDescriptor;
}

type ReportSummaryProps = ReportSummaryOwnProps & WrappedComponentProps;

const ReportSummaryBase: React.FC<ReportSummaryProps> = ({
  bodyStyle,
  children,
  detailsLink,
  fetchStatus,
  intl,
  title,
  subTitle,
}) => (
  <Card className="reportSummary">
    <CardTitle>
      <Title headingLevel="h2" size={TitleSizes.lg}>
        {intl.formatMessage(title)}
      </Title>
      {Boolean(subTitle) && <p className="subtitle">{intl.formatMessage(subTitle)}</p>}
    </CardTitle>
    <CardBody style={bodyStyle}>
      {fetchStatus === FetchStatus.inProgress ? (
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
    {Boolean(detailsLink) && <CardFooter style={styles.cardFooter}>{detailsLink}</CardFooter>}
  </Card>
);

const ReportSummary = injectIntl(ReportSummaryBase);

export default ReportSummary;
