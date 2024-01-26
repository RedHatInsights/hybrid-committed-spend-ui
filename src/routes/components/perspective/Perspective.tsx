import type { MessageDescriptor } from '@formatjs/intl/src/types';
import { Title } from '@patternfly/react-core';
import React from 'react';
import { useIntl } from 'react-intl';
import type { SelectWrapperOption } from 'routes/components/selectWrapper';
import { SelectWrapper } from 'routes/components/selectWrapper';

import { styles } from './Perspective.styles';

export interface PerspectiveOption {
  description?: string;
  isDisabled?: boolean;
  label: MessageDescriptor;
  value: string;
}

interface PerspectiveOwnProps {
  currentItem?: string;
  id?: string;
  isDisabled?: boolean;
  label?: string;
  minWidth?: number | string;
  onSelect(event, selection: SelectWrapperOption);
  options?: PerspectiveOption[];
}

type PerspectiveProps = PerspectiveOwnProps;

const Perspective: React.FC<PerspectiveProps> = ({
  currentItem,
  id,
  isDisabled,
  label,
  minWidth,
  onSelect,
  options,
}) => {
  const intl = useIntl();

  const getSelectOptions = (): SelectWrapperOption[] => {
    const selectOptions: SelectWrapperOption[] = [];

    options.map(option => {
      selectOptions.push({
        description: option.description,
        isDisabled: option.isDisabled,
        toString: () => intl.formatMessage(option.label, { value: option.value }),
        value: option.value,
      });
    });
    return selectOptions;
  };

  const getSelect = () => {
    const selectOptions = getSelectOptions();
    const selection = selectOptions.find(option => option.value === currentItem);

    return (
      <SelectWrapper
        id={id}
        isDisabled={isDisabled}
        onSelect={onSelect}
        options={selectOptions}
        selection={selection}
      />
    );
  };

  return (
    <div style={styles.perspectiveContainer}>
      <div style={{ minWidth }}>
        {label && (
          <Title headingLevel="h3" size="md">
            {label}
          </Title>
        )}
        <div style={styles.perspective}>{getSelect()}</div>
      </div>
    </div>
  );
};

export default Perspective;
