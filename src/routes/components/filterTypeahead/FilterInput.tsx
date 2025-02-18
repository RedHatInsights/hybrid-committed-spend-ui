import type { ToolbarLabelGroup } from '@patternfly/react-core';
import {
  Button,
  Divider,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  Popper,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon';
import type { Filter } from 'api/filters/filter';
import type { FilterPathsType, FilterType } from 'api/filters/filter';
import type { Query } from 'api/queries/query';
import { getQuery } from 'api/queries/query';
import messages from 'locales/messages';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { filterActions, filterSelectors } from 'store/filters';
import { formatDate } from 'utils/dates';
import { useStateCallback } from 'utils/hooks';
import { noop } from 'utils/noop';

import { styles } from './FilterTypeahead.styles';

interface FilterInputOwnProps {
  ariaLabel?: string;
  category?: string;
  endDate?: Date;
  filterPathsType: FilterPathsType;
  filterType: FilterType;
  isDisabled?: boolean;
  onClear?: () => void;
  onSearchChanged?: (evt: FormEvent, value: string) => void;
  onSelect?: (value: string) => void;
  placeholder?: string;
  search?: string;
  startDate?: Date;
}

interface FilterInputStateProps {
  filter?: Filter;
  filterFetchStatus?: FetchStatus;
}

interface FilterInputDispatchProps {
  fetchFilter?: typeof filterActions.fetchFilter;
}

type FilterInputProps = FilterInputOwnProps & FilterInputStateProps & FilterInputDispatchProps;

const FilterInput: React.FC<FilterInputProps> = ({
  ariaLabel,
  category,
  endDate,
  filterPathsType,
  filterType,
  isDisabled,
  onClear,
  onSearchChanged,
  onSelect,
  search,
  placeholder,
  startDate,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useStateCallback(false);
  const intl = useIntl();

  const menuRef = React.createRef<HTMLDivElement>();
  const textInputGroupRef = React.createRef<HTMLDivElement>();

  const { filter, filterFetchStatus } = useMapToProps({
    category,
    endDate,
    filterPathsType,
    filterType,
    search,
    startDate,
  });

  // apply focus to the text input
  const focusTextInput = () => {
    textInputGroupRef?.current?.querySelector('input').focus();
  };

  const getInputGroup = () => {
    return (
      <div ref={textInputGroupRef}>
        <div style={styles.container}>
          <TextInputGroup isDisabled={isDisabled}>
            <TextInputGroupMain
              aria-label={ariaLabel}
              icon={<SearchIcon />}
              value={search}
              onChange={onSearchChanged}
              onFocus={openMenu}
              onKeyDown={handleOnTextInputKeyDown}
              placeholder={placeholder}
            />
            {search?.length && (
              <TextInputGroupUtilities>
                <Button
                  icon={<TimesIcon />}
                  variant="plain"
                  onClick={handleOnClear}
                  aria-label="Clear button and input"
                />
              </TextInputGroupUtilities>
            )}
          </TextInputGroup>
        </div>
      </div>
    );
  };

  const getMenu = () => {
    return (
      <div ref={menuRef}>
        <Menu onSelect={handleOnMenuSelect} onKeyDown={handleOnMenuKeyDown}>
          <MenuContent>
            <MenuList>{getMenuItems()}</MenuList>
          </MenuContent>
        </Menu>
      </div>
    );
  };

  const getMenuItems = () => {
    const menuItems = getOptions().map(option => (
      <MenuItem key={option.key} itemId={option.key}>
        {option.key}
      </MenuItem>
    ));

    // add a heading to the menu
    const headingItem = (
      <MenuItem isDisabled key="heading">
        {menuItems.length ? intl.formatMessage(messages.suggestions) : intl.formatMessage(messages.noResultsFound)}
      </MenuItem>
    );

    if (menuItems.length) {
      menuItems.unshift(<Divider key="divider" />);
    }
    menuItems.unshift(headingItem);

    return menuItems;
  };

  const getOptions = (): ToolbarLabelGroup[] => {
    const options = [];
    if (filter?.data?.length > 0 && filterFetchStatus !== FetchStatus.inProgress) {
      filter.data.map(item => {
        if (item.value && item.value !== null) {
          options.push({
            key: item.value,
            name: item.value,
          });
        }
      });
    }
    return options;
  };

  // Enable keyboard only usage while focused on the menu
  const handleOnMenuKeyDown = event => {
    if (event.key === 'Escape' || event.key === 'Tab') {
      event.preventDefault();
      focusTextInput();
      setMenuIsOpen(false);
    }
  };

  // Add the text of the selected item
  const handleOnMenuSelect = event => {
    event.stopPropagation();

    const value = event.target.innerText || search;
    if (value.trim() === '') {
      return;
    }
    setMenuIsOpen(false, () => {
      if (onSelect) {
        onSelect(value);
      }
    });
  };

  // Close menu when a click occurs outside the menu or text input group
  const handleOnPopperClick = event => {
    if (
      menuRef?.current &&
      textInputGroupRef?.current &&
      !menuRef?.current.contains(event.target) &&
      !textInputGroupRef?.current.contains(event.target)
    ) {
      setMenuIsOpen(false);
    }
  };

  // Enable keyboard only usage while focused on the text input
  const handleOnTextInputKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        handleOnMenuSelect(event);
        break;
      case 'Escape':
      case 'Tab':
        focusTextInput();
        setMenuIsOpen(false);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        // Allow focus on the menu and navigate using the arrow keys
        if (menuRef?.current) {
          const firstElement = menuRef.current.querySelector('li > button:not(:disabled)');
          (firstElement as any)?.focus();
        }
        break;
      default:
        // Open menu upon any un-designated keys
        openMenu();
    }
  };

  const handleOnClear = () => {
    setMenuIsOpen(false);
    if (onClear) {
      onClear();
    }
  };

  const openMenu = () => {
    if (!menuIsOpen) {
      setMenuIsOpen(true);
    }
  };

  return (
    <Popper trigger={getInputGroup()} popper={getMenu()} isVisible={menuIsOpen} onDocumentClick={handleOnPopperClick} />
  );
};

const useMapToProps = ({
  category,
  endDate,
  filterPathsType,
  filterType,
  search,
  startDate,
}: FilterInputOwnProps): FilterInputStateProps => {
  const [searchTimeout, setSearchTimeout] = useState<any>(noop);

  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query: Query = {
    filter: {
      [category]: search,
      limit: 15, // API is paginated by default
    },
    ...(startDate && endDate && { ...formatDate({ startDate, endDate }) }),
  } as any;
  const filterQueryString = getQuery(query);

  const filter = useSelector((state: RootState) =>
    filterSelectors.selectFilter(state, filterPathsType, filterType, filterQueryString)
  );
  const filterFetchStatus = useSelector((state: RootState) =>
    filterSelectors.selectFilterFetchStatus(state, filterPathsType, filterType, filterQueryString)
  );
  const filterError = useSelector((state: RootState) =>
    filterSelectors.selectFilterError(state, filterPathsType, filterType, filterQueryString)
  );

  useEffect(() => {
    if (!filterError && filterFetchStatus !== FetchStatus.inProgress && search) {
      clearTimeout(searchTimeout);

      // Delay was 750ms, but reduced -- https://issues.redhat.com/browse/COST-1742
      setSearchTimeout(
        setTimeout(() => {
          dispatch(filterActions.fetchFilter(filterPathsType, filterType, filterQueryString));
        }, 625)
      );
    }
  }, [filterQueryString]);

  return {
    filter,
    filterFetchStatus,
  };
};

export { FilterInput };
