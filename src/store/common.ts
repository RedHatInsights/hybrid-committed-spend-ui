import type { MapDispatchToProps, MapStateToProps } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkAction as ReduxThunkAction } from 'redux-thunk';

import type { RootState } from './rootReducer';

export const expirationMS = 30 * 60 * 1000; // 30 minutes

// eslint-disable-next-line no-shadow
export const enum FetchStatus {
  'none',
  'inProgress',
  'complete',
}

export function createMapStateToProps<OwnProps, StateProps>(
  mapStateToProps: MapStateToProps<StateProps, OwnProps, RootState>
) {
  return mapStateToProps;
}

export function createMapDispatchToProps<OwnProps, DispatchProps>(
  mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps>
) {
  return mapDispatchToProps;
}

export type ThunkAction<A extends AnyAction = any, R = any> = ReduxThunkAction<R, RootState, void, A>;
