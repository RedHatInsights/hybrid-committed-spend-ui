import { Button, ButtonVariant, Popover } from '@patternfly/react-core';
import { InfoCircleIcon } from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';

import { styles } from './ExcessActualSpend.styles';

interface ExcessActualSpendOwnProps {
  excessActualSpend?: string | React.ReactNode;
  excessActualSpendBreakdown?: string | React.ReactNode;
}

type ExcessActualSpendProps = ExcessActualSpendOwnProps & WrappedComponentProps;

const ExcessActualSpend: React.FC<ExcessActualSpendProps> = ({
  excessActualSpend,
  excessActualSpendBreakdown,
  intl,
}) => {
  if (!excessActualSpend && !excessActualSpendBreakdown) {
    return null;
  }
  const showExcessActualSpendBreakdown = excessActualSpendBreakdown && !excessActualSpend;
  return (
    <span style={styles.infoIcon}>
      <Popover
        aria-label={intl.formatMessage(messages.excessActualSpendPopoverAriaLabel)}
        enableFlip
        bodyContent={
          <>
            <p style={styles.infoTitle}>
              {intl.formatMessage(
                showExcessActualSpendBreakdown ? messages.excessActualSpendExcluded : messages.excessActualSpendIncluded
              )}
            </p>
            <br />
            {showExcessActualSpendBreakdown ? (
              <p>
                {intl.formatMessage(messages.excessActualSpendBreakdownDesc, {
                  value: <b>{excessActualSpendBreakdown}</b>,
                })}
              </p>
            ) : (
              <p>
                {intl.formatMessage(messages.excessActualSpendDesc, {
                  value: <b>{excessActualSpend}</b>,
                })}
              </p>
            )}
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
                showExcessActualSpendBreakdown ? messages.excessActualSpendExcluded : messages.excessActualSpendIncluded
              )}
            </span>
          </span>
        </Button>
      </Popover>
    </span>
  );
};

export default injectIntl(ExcessActualSpend);
