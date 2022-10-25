import { Button, ButtonVariant, Popover } from '@patternfly/react-core';
import { InfoCircleIcon } from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { formatCurrency } from 'utils/format';

import { styles } from './ExcessActualSpend.styles';

interface ExcessActualSpendOwnProps {
  excessActualSpend?: number;
  excessActualSpendBreakdown?: number;
  units?: string;
}

type ExcessActualSpendProps = ExcessActualSpendOwnProps & WrappedComponentProps;

const ExcessActualSpend: React.FC<ExcessActualSpendProps> = ({
  excessActualSpend,
  excessActualSpendBreakdown,
  intl,
  units = 'USD',
}) => {
  return (
    <span style={styles.infoIcon}>
      <Popover
        aria-label={intl.formatMessage(messages.excessActualSpendPopoverAriaLabel)}
        enableFlip
        bodyContent={
          <>
            <p style={styles.infoTitle}>{intl.formatMessage(messages.excessSpendTitle)}</p>
            <br />
            {excessActualSpend !== undefined && (
              <p>
                {intl.formatMessage(messages.excessActualSpendDesc, {
                  value: <b>{formatCurrency(excessActualSpend, units)}</b>,
                })}
              </p>
            )}
            {excessActualSpendBreakdown !== undefined && (
              <p>
                {intl.formatMessage(messages.excessActualSpendBreakdownDesc, {
                  value: <b>{formatCurrency(excessActualSpendBreakdown, units)}</b>,
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
            <span style={styles.infoLabel}>{intl.formatMessage(messages.excessActualSpendLabel)}</span>
          </span>
        </Button>
      </Popover>
    </span>
  );
};

export default injectIntl(ExcessActualSpend);
