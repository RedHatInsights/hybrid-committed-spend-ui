import type { MessageDescriptor } from '@formatjs/intl/src/types';
import { Card, CardBody, CardFooter, CardTitle, Skeleton, Title, TitleSizes } from '@patternfly/react-core';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { ExcessActualSpend } from 'routes/overview/components/excess-actual-spend';
import { FetchStatus } from 'store/common';
import { skeletonWidth } from 'utils/skeleton';

import { styles } from './ReportSummary.styles';

interface ReportSummaryOwnProps {
  bodyStyle?: React.CSSProperties;
  children?: React.ReactNode;
  detailsLink?: React.ReactNode;
  excessActualSpend?: number;
  excessActualSpendBreakdown?: number;
  fetchStatus: number | number[];
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
  excessActualSpend,
  excessActualSpendBreakdown,
  title,
  subTitle,
}) => {
  const isSkeleton = () => {
    if (Array.isArray(fetchStatus)) {
      fetchStatus.forEach(status => {
        if (status === FetchStatus.inProgress) {
          return true;
        }
      });
    }
    return fetchStatus === FetchStatus.inProgress;
  };
  return (
    <Card style={styles.reportSummary}>
      <CardTitle>
        <div style={styles.titleContainer}>
          <div>
            <Title headingLevel="h2" size={TitleSizes.lg}>
              {intl.formatMessage(title)}
            </Title>
            {Boolean(subTitle) && <p style={styles.subtitle}>{intl.formatMessage(subTitle)}</p>}
          </div>
          {(excessActualSpend !== undefined || excessActualSpendBreakdown !== undefined) && (
            <div>
              <ExcessActualSpend
                excessActualSpend={excessActualSpend}
                excessActualSpendBreakdown={excessActualSpendBreakdown}
              />
            </div>
          )}
        </div>
      </CardTitle>
      <CardBody style={bodyStyle}>
        {isSkeleton() ? (
          <>
            <Skeleton width="16%" />
            <Skeleton style={styles.chartSkeleton} width={skeletonWidth.md} />
            <Skeleton width="33%" />
            <Skeleton style={styles.legendSkeleton} width={skeletonWidth.xs} />
          </>
        ) : (
          children
        )}
      </CardBody>
      {Boolean(detailsLink) && <CardFooter style={styles.cardFooter}>{detailsLink}</CardFooter>}
    </Card>
  );
};

const ReportSummary = injectIntl(ReportSummaryBase);

export default ReportSummary;
