import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the depenseCaisse state domain
 */

const selectDepenseCaisseTableDomain = (state) =>
  state.depenseCaisse || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DepenseCaisseTable
 */

const makeSelectDepenseCaisseTable = () =>
  createSelector(selectDepenseCaisseTableDomain, (substate) => substate);

const makeSelectLoadingDepenseCaisses = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.loadingDepenseCaisses,
  );

const makeSelectErrorLoadingDepenseCaisses = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.errorLoadingDepenseCaisses,
  );

const makeSelectDepenseCaisses = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.depenseCaisses,
  );

export default makeSelectDepenseCaisseTable;
export {
  selectDepenseCaisseTableDomain,
  makeSelectLoadingDepenseCaisses,
  makeSelectErrorLoadingDepenseCaisses,
  makeSelectDepenseCaisses,
};
