import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnOrdreMission state domain
 */

const selectDecideOnOrdreMissionDomain = (state) =>
  state.decideOnOrdreMission || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnOrdreMission
 */

const makeSelectDecideOnOrdreMission = () =>
  createSelector(selectDecideOnOrdreMissionDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(
    selectDecideOnOrdreMissionDomain,
    (substate) => substate.pageContent,
  );

const makeSelectCleanupStore = () =>
  createSelector(
    selectDecideOnOrdreMissionDomain,
    (substate) => substate.storeCleanup,
  );

export default makeSelectDecideOnOrdreMission;
export {
  selectDecideOnOrdreMissionDomain,
  makeSelectChangePageContent,
  makeSelectCleanupStore,
};
