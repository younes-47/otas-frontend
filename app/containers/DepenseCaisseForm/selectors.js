import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the depenseCaisseForm state domain
 */

const selectDepenseCaisseFormDomain = (state) =>
  state.depenseCaisseForm || initialState;

const makeSelectOnBehalf = () =>
  createSelector(
    selectDepenseCaisseFormDomain,
    (substate) => substate.onBehalfSelection,
  );

const makeSelectDepenseCaisseForm = () =>
  createSelector(selectDepenseCaisseFormDomain, (substate) => substate);

export default makeSelectDepenseCaisseForm;
export { selectDepenseCaisseFormDomain, makeSelectOnBehalf };
