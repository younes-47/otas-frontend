import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordreMissionForm state domain
 */

const selectOrdreMissionFormDomain = (state) =>
  state.ordreMissionForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrdreMissionForm
 */

const makeSelectOrdreMissionForm = () =>
  createSelector(selectOrdreMissionFormDomain, (substate) => substate);

const makeSelectAddOrdreMission = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.AddOrdreMission,
  );

const makeSelectAddOrdreMissionSuccess = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.addOrdreMissionSuccess,
  );
const makeSelectAddOrdreMissionError = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.errorAddingOrdreMission,
  );

const makeSelectUpdateOrdreMission = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.UpdateOrdreMission,
  );

const makeSelectViewOrdreMission = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.ViewOrdreMission,
  );
const makeSelectOnBehalf = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.onBehalfSelection,
  );

const makeSelectAbroad = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.abroadSelection,
  );

const makeSelectTransportationMethodSelector = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.transportationMethodSelector,
  );

const makeSelectCleanupStore = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.storeCleanup,
  );

export default makeSelectOrdreMissionForm;
export {
  makeSelectAddOrdreMissionError,
  makeSelectAddOrdreMissionSuccess,
  selectOrdreMissionFormDomain,
  makeSelectAddOrdreMission,
  makeSelectUpdateOrdreMission,
  makeSelectViewOrdreMission,
  makeSelectOnBehalf,
  makeSelectAbroad,
  makeSelectCleanupStore,
  makeSelectTransportationMethodSelector,
};
