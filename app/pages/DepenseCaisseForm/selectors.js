import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the depenseCaisseForm state domain
 */

const selectDepenseCaisseFormDomain = (state) =>
  state.depenseCaisseForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DepenseCaisseForm
 */

const makeSelectDepenseCaisseForm = () =>
  createSelector(selectDepenseCaisseFormDomain, (substate) => substate);

export default makeSelectDepenseCaisseForm;
export { selectDepenseCaisseFormDomain };
