import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the avanceCaisse state domain
 */

const selectAvanceCaisseDomain = (state) => state.avanceCaisse || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AvanceCaisse
 */

const makeSelectAvanceCaisse = () =>
  createSelector(selectAvanceCaisseDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(selectAvanceCaisseDomain, (substate) => substate.pageContent);

const makeSelectCleanupStore = () =>
  createSelector(selectAvanceCaisseDomain, (substate) => substate.storeCleanup);

const makeSelectAvanceCaisseDetails = () =>
  createSelector(
    selectAvanceCaisseDomain,
    (substate) => substate.avanceCaisseDetails,
  );

const makeSelectErrorLoadingAvanceCaisseDetails = () =>
  createSelector(
    selectAvanceCaisseDomain,
    (substate) => substate.errorLoadingAvanceCaisseDetails,
  );
export default makeSelectAvanceCaisse;
export {
  makeSelectAvanceCaisseDetails,
  makeSelectErrorLoadingAvanceCaisseDetails,
  selectAvanceCaisseDomain,
  makeSelectChangePageContent,
  makeSelectCleanupStore,
};
