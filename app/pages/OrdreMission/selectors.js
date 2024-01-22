import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordreMission state domain
 */

const selectOrdreMissionDomain = (state) => state.ordreMission || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrdreMission
 */

const makeSelectOrdreMission = () =>
  createSelector(selectOrdreMissionDomain, (substate) => substate);

const makeSelectPageContent = () =>
  createSelector(selectOrdreMissionDomain, (substate) => substate.pageContent);

const makeSelectCleanupStore = () =>
  createSelector(selectOrdreMissionDomain, (substate) => substate.storeCleanup);

const makeSelectOrdreMissionDetails = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.ordreMissionDetails,
  );

const makeSelectErrorLoadingOrdreMissionDetails = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.errorLoadingOrdreMissionDetails,
  );
export default makeSelectOrdreMission;
export {
  makeSelectOrdreMissionDetails,
  makeSelectErrorLoadingOrdreMissionDetails,
  selectOrdreMissionDomain,
  makeSelectPageContent,
  makeSelectCleanupStore,
};
