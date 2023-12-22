import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the avanceCaisseForm state domain
 */

const selectAvanceCaisseFormDomain = (state) =>
  state.avanceCaisseForm || initialState;

const makeSelectOnBehalf = () =>
  createSelector(
    selectAvanceCaisseFormDomain,
    (substate) => substate.onBehalfSelection,
  );
const makeSelectAvanceCaisseForm = () =>
  createSelector(selectAvanceCaisseFormDomain, (substate) => substate);

export default makeSelectAvanceCaisseForm;
export { selectAvanceCaisseFormDomain, makeSelectOnBehalf };
