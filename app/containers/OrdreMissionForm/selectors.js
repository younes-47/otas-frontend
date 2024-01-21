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

const makeSelectAddOrdreMissionError = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.errorAddingOrdreMission,
  );
const makeSelectUpdateOrdreMissionError = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.errorUpdatingOrdreMission,
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

const makeSelectOrdreMissionIdentity = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.ordreMissionIdentity,
  );

export default makeSelectOrdreMissionForm;
export {
  makeSelectUpdateOrdreMissionError,
  makeSelectOrdreMissionIdentity,
  makeSelectAddOrdreMissionError,
  selectOrdreMissionFormDomain,
  makeSelectOnBehalf,
  makeSelectAbroad,
  makeSelectCleanupStore,
  makeSelectTransportationMethodSelector,
};
