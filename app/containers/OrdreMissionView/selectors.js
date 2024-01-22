import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordreMissionView state domain
 */

const selectOrdreMissionViewDomain = (state) =>
  state.ordreMissionView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrdreMissionView
 */

const makeSelectOrdreMissionView = () =>
  createSelector(selectOrdreMissionViewDomain, (substate) => substate);

const makeSelectErrorSubmittingOrdreMission = () =>
  createSelector(
    selectOrdreMissionViewDomain,
    (substate) => substate.errorSubmittingOrdreMission,
  );

export default makeSelectOrdreMissionView;
export { selectOrdreMissionViewDomain, makeSelectErrorSubmittingOrdreMission };
