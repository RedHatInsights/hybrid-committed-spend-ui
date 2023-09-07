import type { MessageDescriptor } from '@formatjs/intl/src/types';
import { Alert, Card, CardBody, CardFooter, CardTitle, Skeleton, Title, TitleSizes } from '@patternfly/react-core';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';
import { ExcessSpend } from 'routes/overview/components/excess-spend';
import { FetchStatus } from 'store/common';
import { skeletonWidth } from 'utils/skeleton';

import { styles } from './ReportSummary.styles';

interface ReportSummaryOwnProps {
  bodyStyle?: React.CSSProperties;
  children?: React.ReactNode;
  detailsLink?: React.ReactNode;
  excessSpend?: string | React.ReactNode;
  fetchStatus: number | number[];
  isDataVisibilitySummaryOnly?: boolean;
  isExcluded?: boolean;
  subTitle?: MessageDescriptor;
  title: MessageDescriptor;
}

type ReportSummaryProps = ReportSummaryOwnProps;

const ReportSummary: React.FC<ReportSummaryProps> = ({
  bodyStyle,
  children,
  detailsLink,
  fetchStatus,
  excessSpend,
  isDataVisibilitySummaryOnly,
  isExcluded,
  title,
  subTitle,
}) => {
  const intl = useIntl();
  const isLoading = () => {
    let result = false;
    if (Array.isArray(fetchStatus)) {
      fetchStatus.forEach(status => {
        if (status === FetchStatus.inProgress) {
          result = true;
        }
      });
    } else {
      result = fetchStatus === FetchStatus.inProgress;
    }
    return result;
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
          {excessSpend && (
            <div>
              <ExcessSpend excessSpend={excessSpend} isExcluded={isExcluded} />
            </div>
          )}
        </div>
      </CardTitle>
      <CardBody style={bodyStyle}>
        {isDataVisibilitySummaryOnly && (
          <div style={styles.alertContainer}>
            <Alert isInline variant="info" title={intl.formatMessage(messages.breakdownAlertTitle)}>
              <p>{intl.formatMessage(messages.breakdownAlertDesc)}</p>
            </Alert>
          </div>
        )}
        {isLoading() ? (
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

export default ReportSummary;
