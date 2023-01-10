import type { ToolbarChipGroup } from '@patternfly/react-core';
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
import React, { useEffect, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { filterActions, filterSelectors } from 'store/filters';
import { useStateCallback } from 'utils/hooks';
import { noop } from 'utils/noop';

interface FilterInputOwnProps {
  category?: string;
  isDisabled?: boolean;
  onClear?: () => void;
  onSearchChanged?: (value: string) => void;
  onSelect?: (value: string) => void;
  filterPathsType: FilterPathsType;
  filterType: FilterType;
  search?: string;
}

interface FilterInputStateProps {
  filter?: Filter;
  filterFetchStatus?: FetchStatus;
}

interface FilterInputDispatchProps {
  fetchFilter?: typeof filterActions.fetchFilter;
}

type FilterInputProps = FilterInputOwnProps & FilterInputStateProps & FilterInputDispatchProps & WrappedComponentProps;

const FilterInputBase: React.FC<FilterInputProps> = ({
  category,
  filterPathsType,
  filterType,
  isDisabled,
  intl,
  onClear,
  onSearchChanged,
  onSelect,
  search,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useStateCallback(false);

  const menuRef = React.createRef<HTMLDivElement>();
  const textInputGroupRef = React.createRef<HTMLDivElement>();

  const { filter, filterFetchStatus } = useMapToProps({
    category,
    filterPathsType,
    filterType,
    search,
  });

  // apply focus to the text input
  const focusTextInput = () => {
    textInputGroupRef && textInputGroupRef.current.querySelector('input').focus();
  };

  const getInputGroup = () => {
    return (
      <div ref={textInputGroupRef}>
        <TextInputGroup isDisabled={isDisabled}>
          <TextInputGroupMain
            icon={<SearchIcon />}
            value={search}
            onChange={onSearchChanged}
            onFocus={openMenu}
            onKeyDown={handleTextInputKeyDown}
          />
          {search && search.length && (
            <TextInputGroupUtilities>
              <Button variant="plain" onClick={handleClearSearch} aria-label="Clear button and input">
                <TimesIcon />
              </Button>
            </TextInputGroupUtilities>
          )}
        </TextInputGroup>
      </div>
    );
  };

  const getMenu = () => {
    return (
      <div ref={menuRef}>
        {search && search.length && (
          <Menu onSelect={handleMenuSelect} onKeyDown={handleMenuKeyDown}>
            <MenuContent>
              <MenuList>{getMenuItems()}</MenuList>
            </MenuContent>
          </Menu>
        )}
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

  const getOptions = (): ToolbarChipGroup[] => {
    const options = [];
    if (filter && filter.data && filter.data.length > 0 && filterFetchStatus !== FetchStatus.inProgress) {
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

  // Close menu when a click occurs outside the menu or text input group
  const handleMenuClick = event => {
    if (
      menuRef.current &&
      textInputGroupRef.current &&
      !menuRef.current.contains(event.target) &&
      !textInputGroupRef.current.contains(event.target)
    ) {
      setMenuIsOpen(false);
    }
  };

  // Enable keyboard only usage while focused on the menu
  const handleMenuKeyDown = event => {
    if (event.key === 'Escape' || event.key === 'Tab') {
      event.preventDefault();
      focusTextInput();
      setMenuIsOpen(false);
    }
  };

  // Add the text of the selected item
  const handleMenuSelect = event => {
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

  // Enable keyboard only usage while focused on the text input
  const handleTextInputKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        handleMenuSelect(event);
        break;
      case 'Escape':
      case 'Tab':
        focusTextInput();
        setMenuIsOpen(false);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        // Allow focus on the menu and navigate using the arrow keys
        if (menuRef && menuRef.current) {
          const firstElement = menuRef.current.querySelector('li > button:not(:disabled)');
          firstElement && (firstElement as any).focus();
        }
        break;
      default:
        // Open menu upon any un-designated keys
        openMenu();
    }
  };

  const handleClearSearch = () => {
    setMenuIsOpen(false, () => {
      if (onClear) {
        onClear();
      }
    });
  };

  const openMenu = () => {
    if (!menuIsOpen) {
      setMenuIsOpen(true);
    }
  };

  return (
    <Popper trigger={getInputGroup()} popper={getMenu()} isVisible={menuIsOpen} onDocumentClick={handleMenuClick} />
  );
};

const useMapToProps = ({
  category,
  filterPathsType,
  filterType,
  search,
}: FilterInputOwnProps): FilterInputStateProps => {
  const [searchTimeout, setSearchTimeout] = useState(noop);

  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query: Query = {
    filter: {
      [category]: search,
    },
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

const FilterInput = injectIntl(FilterInputBase);

export { FilterInput };
