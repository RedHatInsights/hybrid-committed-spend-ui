import type { MessageDescriptor } from '@formatjs/intl/src/types';
import type { SelectOptionObject } from '@patternfly/react-core';
import { Select, SelectOption, SelectVariant, Title } from '@patternfly/react-core';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';

import { styles } from './Perspective.styles';

export interface PerspectiveOption {
  dateRange?: string;
  isDisabled?: boolean;
  label: MessageDescriptor;
  value: string;
}

interface PerspectiveOptionExt extends SelectOptionObject {
  isDisabled?: boolean;
  toString(): string; // label
  value?: string;
}

interface PerspectiveOwnProps {
  currentItem: string;
  id?: string;
  isDisabled?: boolean;
  label?: string;
  minWidth?: number | string;
  onSelected(value: string);
  options?: PerspectiveOption[];
}

interface PerspectiveState {
  isSelectOpen: boolean;
}

type PerspectiveProps = PerspectiveOwnProps & WrappedComponentProps;

class Perspective extends React.Component<PerspectiveProps> {
  protected defaultState: PerspectiveState = {
    isSelectOpen: false,
  };
  public state: PerspectiveState = { ...this.defaultState };

  private getSelectOptions = (): PerspectiveOptionExt[] => {
    const { intl, options } = this.props;

    const selections: PerspectiveOptionExt[] = [];

    options.map(option => {
      selections.push({
        isDisabled: option.isDisabled,
        toString: () => intl.formatMessage(option.label, { value: option.value, dateRange: option.dateRange }),
        value: option.value,
      });
    });
    return selections;
  };

  private getSelect = () => {
    const { currentItem, id, isDisabled } = this.props;
    const { isSelectOpen } = this.state;

    const selectOptions = this.getSelectOptions();
    const selection = selectOptions.find((option: PerspectiveOption) => option.value === currentItem);

    return (
      <Select
        id={id}
        isDisabled={isDisabled}
        isOpen={isSelectOpen}
        onSelect={this.handleSelect}
        onToggle={this.handleToggle}
        selections={selection}
        variant={SelectVariant.single}
      >
        {selectOptions.map(option => (
          <SelectOption key={option.value} value={option} isDisabled={option.isDisabled} />
        ))}
      </Select>
    );
  };

  private handleSelect = (event, selection: PerspectiveOption) => {
    const { onSelected } = this.props;

    if (onSelected) {
      onSelected(selection.value);
    }
    this.setState({
      isSelectOpen: false,
    });
  };

  private handleToggle = isSelectOpen => {
    this.setState({ isSelectOpen });
  };

  public render() {
    const { label, minWidth } = this.props;

    return (
      <div style={styles.perspectiveContainer}>
        <div style={{ minWidth }}>
          {label && (
            <Title headingLevel="h3" size="md">
              {label}
            </Title>
          )}
          <div style={styles.perspective}>{this.getSelect()}</div>
        </div>
      </div>
    );
  }
}

export default injectIntl(Perspective);
