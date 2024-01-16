import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnDepenseCaisseForm state domain
 */

const selectDecideOnDepenseCaisseFormDomain = (state) =>
  state.decideOnDepenseCaisseForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnDepenseCaisseForm
 */

const makeSelectDecideOnDepenseCaisseForm = () =>
  createSelector(selectDecideOnDepenseCaisseFormDomain, (substate) => substate);

export default makeSelectDecideOnDepenseCaisseForm;
export { selectDecideOnDepenseCaisseFormDomain };
