import { ThunkAction } from 'store/common';
import { reportActions } from 'store/reports';
import { createAction } from 'typesafe-actions';

import { selectWidget, selectWidgetQueries } from './billingDashboardSelectors';

// export const fetchWidgetForecasts = (id: number): ThunkAction => {
//   return (dispatch, getState) => {
//     const state = getState();
//     const widget = selectWidget(state, id);
//
//     if (widget.forecastPathsType && widget.forecastType) {
//       const { forecast } = selectWidgetQueries(state, id);
//       dispatch(forecastActions.fetchForecast(widget.forecastPathsType, widget.forecastType, forecast));
//     }
//   };
// };

export const fetchWidgetReports = (id: number): ThunkAction => {
  return (dispatch, getState) => {
    const state = getState();
    const widget = selectWidget(state, id);
    const { /* previous, */ current } = selectWidgetQueries(state, id);
    dispatch(reportActions.fetchReport(widget.reportPathsType, widget.reportType, current));
    // dispatch(reportActions.fetchReport(widget.reportPathsType, widget.reportType, previous));
  };
};

export const setWidgetTab = createAction('ocpDashboard/widget/tab')<{
  id: number;
}>();
