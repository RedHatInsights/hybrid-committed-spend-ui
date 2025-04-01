import { Button, ButtonVariant, Popover } from '@patternfly/react-core';
import { InfoCircleIcon } from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';

import { styles } from './ExcessSpend.styles';

interface ExcessSpendOwnProps {
  excessSpend?: string | React.ReactNode;
  isExcluded?: boolean;
}

type ExcessSpendProps = ExcessSpendOwnProps;

const ExcessSpend: React.FC<ExcessSpendProps> = ({ excessSpend, isExcluded }) => {
  const intl = useIntl();

  if (!excessSpend) {
    return null;
  }
  return (
    <span style={styles.infoIcon}>
      <Popover
        aria-label={intl.formatMessage(messages.excessSpendAriaLabel)}
        enableFlip
        bodyContent={
          <>
            <p style={styles.infoTitle}>
              {intl.formatMessage(isExcluded ? messages.excessSpendExcluded : messages.excessSpendIncluded)}
            </p>
            <br />
            <p>
              {intl.formatMessage(isExcluded ? messages.excessSpendExcludedDesc : messages.excessSpendIncludedDesc, {
                value: <b>{excessSpend}</b>,
              })}
            </p>
          </>
        }
      >
        <Button
          icon={
            <span style={styles.infoContainer}>
              <InfoCircleIcon />
              <span style={styles.infoLabel}>
                {intl.formatMessage(isExcluded ? messages.excessSpendExcluded : messages.excessSpendIncluded)}
              </span>
            </span>
          }
          aria-label={intl.formatMessage(messages.excessSpendButtonAriaLabel)}
          variant={ButtonVariant.plain}
        />
      </Popover>
    </span>
  );
};

export default ExcessSpend;
