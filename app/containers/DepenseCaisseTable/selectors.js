import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the depenseCaisseTable state domain
 */

const selectDepenseCaisseTableDomain = (state) =>
  state.depenseCaisseTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DepenseCaisseTable
 */

const makeSelectDepenseCaisseTable = () =>
  createSelector(selectDepenseCaisseTableDomain, (substate) => substate);

export default makeSelectDepenseCaisseTable;
export { selectDepenseCaisseTableDomain };
