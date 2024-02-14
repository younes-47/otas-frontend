import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the avanceVoyageView state domain
 */

const selectAvanceVoyageViewDomain = (state) =>
  state.avanceVoyageView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AvanceVoyageView
 */

const makeSelectAvanceVoyageView = () =>
  createSelector(selectAvanceVoyageViewDomain, (substate) => substate);

const makeSelectLoadingAvanceVoyage = () =>
  createSelector(
    selectAvanceVoyageViewDomain,
    (substate) => substate.loadingAvanceVoyage,
  );

const makeSelectErrorLoadingAvanceVoyage = () =>
  createSelector(
    selectAvanceVoyageViewDomain,
    (substate) => substate.errorLoadingAvanceVoyage,
  );

const makeSelectAvanceVoyageDetails = () =>
  createSelector(
    selectAvanceVoyageViewDomain,
    (substate) => substate.avanceVoyageDetails,
  );

const makeSelectErrorDownloadingAvanceVoyageDocumentFile = () =>
  createSelector(
    selectAvanceVoyageViewDomain,
    (substate) => substate.errorDownloadingAvanceVoyageDocumentFile,
  );

const makeSelectAvanceVoyageDocumentFile = () =>
  createSelector(
    selectAvanceVoyageViewDomain,
    (substate) => substate.avanceVoyageDocumentFile,
  );

export default makeSelectAvanceVoyageView;
export {
  makeSelectAvanceVoyageDocumentFile,
  makeSelectErrorDownloadingAvanceVoyageDocumentFile,
  makeSelectAvanceVoyageDetails,
  selectAvanceVoyageViewDomain,
  makeSelectLoadingAvanceVoyage,
  makeSelectErrorLoadingAvanceVoyage,
};
