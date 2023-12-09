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

const makeSelectLoadingDepenseCaisses = () =>
  createSelector(selectDepenseCaisseDomain, (substate) => substate.loadingDepenseCaisses);

const makeSelectErrorLoadingDepenseCaisses = () =>
  createSelector(selectDepenseCaisseDomain, (substate) => substate.errorLoadingDepenseCaisses);

const makeSelectDepenseCaisses = () =>
  createSelector(selectDepenseCaisseDomain, (substate) => substate.depenseCaisses);

export default makeSelectDepenseCaisse;
export { selectDepenseCaisseDomain, makeSelectLoadingDepenseCaisses, makeSelectErrorLoadingDepenseCaisses, makeSelectDepenseCaisses };
