import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnAvanceCaisseForm state domain
 */

const selectDecideOnAvanceCaisseFormDomain = (state) =>
  state.decideOnAvanceCaisseForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnAvanceCaisseForm
 */

const makeSelectDecideOnAvanceCaisseForm = () =>
  createSelector(selectDecideOnAvanceCaisseFormDomain, (substate) => substate);

export default makeSelectDecideOnAvanceCaisseForm;
export { selectDecideOnAvanceCaisseFormDomain };
