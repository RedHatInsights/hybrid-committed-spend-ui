import type { MessageDescriptor } from '@formatjs/intl/src/types';
import { EmptyState, EmptyStateBody } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons/dist/esm/icons/search-icon';
import type { Query } from 'api/queries/query';
import { parseQuery } from 'api/queries/query';
import messages from 'locales/messages';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

import { styles } from './EmptyFilterState.styles';

interface EmptyFilterStateProps {
  filter?: string;
  icon?: any;
  showMargin?: boolean;
  subTitle?: MessageDescriptor;
  title?: MessageDescriptor;
}

const EmptyFilterState: React.FC<EmptyFilterStateProps> = ({
  filter,
  icon = SearchIcon,
  showMargin = true,

  // destructure last
  subTitle = messages.emptyFilterStateSubtitle,
  title = messages.emptyFilterStateTitle,
}) => {
  const location = useLocation();
  const intl = useIntl();

  const ImgScroll = () => {
    const imgs = [styles.icon2, styles.icon3, styles.icon4, styles.icon5, styles.icon6];
    const [index, setIndex] = useState(imgs.length - 1);

    useEffect(() => {
      if (index > 0) {
        setTimeout(() => {
          setIndex(index - 1);
        }, 1000);
      }
    });
    return <img style={imgs[index]} />;
  };

  const getItem = () => {
    const trim = (val: string) => val.replace(/\s+/g, '').toLowerCase();
    const filterTest1 = (val: string) => trim(val) === atob('cmVkaGF0');
    const filterTest2 = (val: string) => trim(val) === atob('a29rdQ==');
    let showAltIcon1 = false;
    let showAltIcon2 = false;

    if (filter && filter.length && !Array.isArray(filter)) {
      for (const val of filter.split(',')) {
        if (filterTest1(val)) {
          showAltIcon1 = true;
          break;
        }
        if (filterTest2(val)) {
          showAltIcon2 = true;
          break;
        }
      }
    } else {
      const queryFromRoute = parseQuery<Query>(location.search);
      if (queryFromRoute && queryFromRoute.groupBy) {
        for (const values of Object.values(queryFromRoute.groupBy)) {
          if (Array.isArray(values)) {
            for (const val of values) {
              if (filterTest1(val)) {
                showAltIcon1 = true;
                break;
              }
              if (filterTest2(val)) {
                showAltIcon2 = true;
                break;
              }
            }
          } else {
            if (filterTest1(values as string)) {
              showAltIcon1 = true;
              break;
            }
            if (filterTest2(values as string)) {
              showAltIcon2 = true;
              break;
            }
          }
        }
      }
    }
    if (showAltIcon1) {
      return <img style={styles.icon1} />;
    } else if (showAltIcon2) {
      return <ImgScroll />;
    } else {
      return null;
    }
  };

  const item = getItem();

  return (
    <div
      style={{
        ...styles.container,
        ...(showMargin ? styles.containerMargin : {}),
      }}
    >
      <EmptyState headingLevel="h2" icon={!item ? icon : undefined} titleText={intl.formatMessage(title)}>
        {item}
        <EmptyStateBody>{intl.formatMessage(subTitle)}</EmptyStateBody>
      </EmptyState>
    </div>
  );
};

export default EmptyFilterState;
