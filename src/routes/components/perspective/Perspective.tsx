import type { MessageDescriptor } from '@formatjs/intl/src/types';
import { Title } from '@patternfly/react-core';
import type { SelectOptionObject } from '@patternfly/react-core/deprecated';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core/deprecated';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { styles } from './Perspective.styles';

export interface PerspectiveOption {
  description?: string;
  isDisabled?: boolean;
  label: MessageDescriptor;
  value: string;
}

interface PerspectiveOptionExt extends SelectOptionObject {
  description?: string;
  isDisabled?: boolean;
  toString(): string; // label
  value?: string;
}

interface PerspectiveOwnProps {
  currentItem?: string;
  id?: string;
  isDisabled?: boolean;
  label?: string;
  minWidth?: number | string;
  onSelected(value: string);
  options?: PerspectiveOption[];
}

type PerspectiveProps = PerspectiveOwnProps;

const Perspective: React.FC<PerspectiveProps> = ({
  currentItem,
  id,
  isDisabled,
  label,
  minWidth,
  onSelected,
  options,
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const intl = useIntl();

  const getSelectOptions = (): PerspectiveOptionExt[] => {
    const selectOptions: PerspectiveOptionExt[] = [];

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
    const selection = selectOptions.find((option: PerspectiveOptionExt) => option.value === currentItem);

    return (
      <Select
        id={id}
        isDisabled={isDisabled}
        isOpen={isSelectOpen}
        onSelect={handleSelect}
        onToggle={handleToggle}
        selections={selection}
        variant={SelectVariant.single}
      >
        {selectOptions.map((option, index) => (
          <SelectOption
            key={`${id}-${index}-${option.value}`}
            description={option.description}
            value={option}
            isDisabled={option.isDisabled}
          />
        ))}
      </Select>
    );
  };

  const handleSelect = (event: React.MouseEvent | React.ChangeEvent, selection: SelectOptionObject) => {
    if (onSelected) {
      onSelected((selection as PerspectiveOption).value);
    }
    setIsSelectOpen(false);
  };

  const handleToggle = isOpen => {
    setIsSelectOpen(isOpen);
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
