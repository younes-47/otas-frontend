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

const makeSelectErrorLoadingStaticData = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.errorLoadingStaticData,
  );

const makeSelectStaticData = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.staticData,
  );

const makeSelectOrdreMissionDetails = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.ordreMissionDetails,
  );

const makeSelectErrorLoadingOrdreMissionDetails = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.errorLoadingOrdreMissionDetails,
  );

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

const makeSelectErrorSubmittingOrdreMission = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.errorSubmittingOrdreMission,
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

const makeSelectErrorDownloadingOrdreMissionDocumentFile = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.errorDownloadingOrdreMissionDocumentFile,
  );

const makeSelectOrdreMissionDocumentFile = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.ordreMissionDocumentFile,
  );

export default makeSelectOrdreMissionForm;
export {
  makeSelectOrdreMissionDocumentFile,
  makeSelectErrorDownloadingOrdreMissionDocumentFile,
  makeSelectOrdreMissionDetails,
  makeSelectErrorLoadingOrdreMissionDetails,
  makeSelectStaticData,
  makeSelectErrorLoadingStaticData,
  makeSelectErrorSubmittingOrdreMission,
  makeSelectUpdateOrdreMissionError,
  makeSelectAddOrdreMissionError,
  selectOrdreMissionFormDomain,
  makeSelectOnBehalf,
  makeSelectAbroad,
  makeSelectTransportationMethodSelector,
};
