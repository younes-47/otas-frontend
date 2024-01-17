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

const makeSelectAddDepenseCaisse = () =>
  createSelector(
    selectDepenseCaisseFormDomain,
    (substate) => substate.errorAddingDepenseCaisse,
  );

export default makeSelectDepenseCaisseForm;
export {
  selectDepenseCaisseFormDomain,
  makeSelectOnBehalf,
  makeSelectAddDepenseCaisse,
};
