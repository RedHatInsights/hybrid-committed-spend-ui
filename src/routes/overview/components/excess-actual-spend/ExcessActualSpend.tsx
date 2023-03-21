import { Button, ButtonVariant, Popover } from '@patternfly/react-core';
import { InfoCircleIcon } from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';

import { styles } from './ExcessActualSpend.styles';

interface ExcessActualSpendOwnProps {
  excessActualSpend?: string | React.ReactNode;
  showBreakdown?: boolean;
}

type ExcessActualSpendProps = ExcessActualSpendOwnProps;

const ExcessActualSpend: React.FC<ExcessActualSpendProps> = ({ excessActualSpend, showBreakdown }) => {
  const intl = useIntl();

  if (!excessActualSpend) {
    return null;
  }
  return (
    <span style={styles.infoIcon}>
      <Popover
        aria-label={intl.formatMessage(messages.excessActualSpendPopoverAriaLabel)}
        enableFlip
        bodyContent={
          <>
            <p style={styles.infoTitle}>
              {intl.formatMessage(
                showBreakdown ? messages.excessActualSpendExcluded : messages.excessActualSpendIncluded
              )}
            </p>
            <br />
            <p>
              {intl.formatMessage(
                showBreakdown ? messages.excessActualSpendBreakdownDesc : messages.excessActualSpendDesc,
                {
                  value: <b>{excessActualSpend}</b>,
                }
              )}
            </p>
          </>
        }
      >
        <Button
          aria-label={intl.formatMessage(messages.excessActualSpendButtonAriaLabel)}
          variant={ButtonVariant.plain}
        >
          <span style={styles.infoContainer}>
            <InfoCircleIcon />
            <span style={styles.infoLabel}>
              {intl.formatMessage(
                showBreakdown ? messages.excessActualSpendExcluded : messages.excessActualSpendIncluded
              )}
            </span>
          </span>
        </Button>
      </Popover>
    </span>
  );
};

export default ExcessActualSpend;
