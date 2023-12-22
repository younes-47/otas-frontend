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

export default makeSelectDepenseCaisse;
export {
  selectDepenseCaisseDomain,
  makeSelectChangePageContent,
  makeSelectCleanupStore,
};
