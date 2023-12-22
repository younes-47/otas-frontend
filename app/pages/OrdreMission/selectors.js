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

const makeSelectLoadingOrdreMissions = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.loadingOrdreMissions,
  );

const makeSelectErrorLoadingOrdreMissions = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.errorLoadingOrdreMissions,
  );

const makeSelectOrdreMissions = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.ordreMissions,
  );

const makeSelectAddOrdreMission = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.AddOrdreMission,
  );

const makeSelectUpdateOrdreMission = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.UpdateOrdreMission,
  );

const makeSelectViewOrdreMission = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.ViewOrdreMission,
  );

const makeSelectPageContent = () =>
  createSelector(selectOrdreMissionDomain, (substate) => substate.pageContent);

const makeSelectOnBehalf = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.onBehalfSelection,
  );

const makeSelectAbroad = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.abroadSelection,
  );

const makeSelectTransportationMethodSelector = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.transportationMethodSelector,
  );

const makeSelectCleanupStore = () =>
  createSelector(selectOrdreMissionDomain, (substate) => substate.storeCleanup);

export default makeSelectOrdreMission;
export {
  selectOrdreMissionDomain,
  makeSelectLoadingOrdreMissions,
  makeSelectErrorLoadingOrdreMissions,
  makeSelectOrdreMissions,
  makeSelectAddOrdreMission,
  makeSelectUpdateOrdreMission,
  makeSelectViewOrdreMission,
  makeSelectPageContent,
  makeSelectOnBehalf,
  makeSelectAbroad,
  makeSelectTransportationMethodSelector,
  makeSelectCleanupStore,
};
