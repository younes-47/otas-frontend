import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the depenseCaisse state domain
 */

const selectDepenseCaisseDomain = (state) =>
  state.depenseCaisse || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DepenseCaisse
 */

const makeSelectDepenseCaisse = () =>
  createSelector(selectDepenseCaisseDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(selectDepenseCaisseDomain, (substate) => substate.pageContent);

const makeSelectCleanupStore = () =>
  createSelector(
    selectDepenseCaisseDomain,
    (substate) => substate.storeCleanup,
  );
const makeSelectDepenseCaisseDetails = () =>
  createSelector(
    selectDepenseCaisseDomain,
    (substate) => substate.depenseCaisseDetails,
  );

const makeSelectErrorLoadingDepenseCaisseDetails = () =>
  createSelector(
    selectDepenseCaisseDomain,
    (substate) => substate.errorLoadingDepenseCaisseDetails,
  );
export default makeSelectDepenseCaisse;
export {
  makeSelectErrorLoadingDepenseCaisseDetails,
  makeSelectDepenseCaisseDetails,
  selectDepenseCaisseDomain,
  makeSelectChangePageContent,
  makeSelectCleanupStore,
};
