import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnDepenseCaisseTable state domain
 */

const selectDecideOnDepenseCaisseTableDomain = (state) =>
  state.decideOnDepenseCaisseTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnDepenseCaisseTable
 */

const makeSelectDecideOnDepenseCaisseTable = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate,
  );

const makeSelectLoadingDepenseCaisses = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate.loadingDepenseCaisses,
  );

const makeSelectErrorLoadingDepenseCaisses = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate.errorLoadingDepenseCaisses,
  );

const makeSelectDepenseCaisses = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate.depenseCaisses,
  );

export default makeSelectDecideOnDepenseCaisseTable;
export {
  makeSelectDepenseCaisses,
  makeSelectErrorLoadingDepenseCaisses,
  makeSelectLoadingDepenseCaisses,
  selectDecideOnDepenseCaisseTableDomain,
};
