import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the avanceCaisseForm state domain
 */

const selectAvanceCaisseFormDomain = (state) =>
  state.avanceCaisseForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AvanceCaisseForm
 */

const makeSelectAvanceCaisseForm = () =>
  createSelector(selectAvanceCaisseFormDomain, (substate) => substate);

export default makeSelectAvanceCaisseForm;
export { selectAvanceCaisseFormDomain };
