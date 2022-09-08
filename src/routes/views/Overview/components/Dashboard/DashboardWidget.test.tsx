jest.mock('date-fns').mock('date-fns/format');

import { MessageDescriptor } from '@formatjs/intl/src/types';
import { render } from '@testing-library/react';
import { intl } from 'components/i18n';
import { format, getDate, getMonth, startOfMonth } from 'date-fns';
import React from 'react';
import { defineMessages } from 'react-intl';
import { DashboardWidgetBase, DashboardWidgetProps } from 'routes/views/Overview/components/Dashboard';
import { mockDate } from 'utils/tests';

const tmessages = defineMessages({
  testTitle: {
    id: 'TestTitle',
    description: 'test title',
    defaultMessage: 'test title',
  },
});

const props: DashboardWidgetProps = {
  widgetId: 1,
  id: 1,
  intl,
  current: { data: [] },
  previous: { data: [] },
  fetchReports: jest.fn(),
  title: tmessages.testTitle,
} as any;

const getDateMock = getDate as jest.Mock;
const formatMock = format as jest.Mock;
const startOfMonthMock = startOfMonth as jest.Mock;
const getMonthMock = getMonth as jest.Mock;

beforeEach(() => {
  mockDate();
  getDateMock.mockReturnValue(1);
  formatMock.mockReturnValue('formatted date');
  startOfMonthMock.mockReturnValue(1);
  getMonthMock.mockReturnValue(1);
});

test('reports are fetched on mount', () => {
  render(<DashboardWidgetBase {...props} />);
  expect(props.fetchReports).toBeCalledWith(props.widgetId);
});

test('title is translated', () => {
  render(<DashboardWidgetBase {...props} />);
  expect(getTranslateCallForKey(props.title)).toMatchSnapshot();
});

function getTranslateCallForKey(key: MessageDescriptor) {
  return intl.formatMessage(key);
}
