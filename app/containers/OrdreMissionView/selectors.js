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

const makeSelectOrdreMissionDetails = () =>
  createSelector(
    selectOrdreMissionViewDomain,
    (substate) => substate.ordreMissionDetails,
  );

const makeSelectErrorLoadingOrdreMissionDetails = () =>
  createSelector(
    selectOrdreMissionViewDomain,
    (substate) => substate.errorLoadingOrdreMissionDetails,
  );

export default makeSelectOrdreMissionView;
export {
  selectOrdreMissionViewDomain,
  makeSelectOrdreMissionDetails,
  makeSelectErrorLoadingOrdreMissionDetails,
};
