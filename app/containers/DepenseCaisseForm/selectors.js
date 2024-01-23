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

const makeSelectErrorLoadingStaticData = () =>
  createSelector(
    selectDepenseCaisseFormDomain,
    (substate) => substate.errorLoadingStaticData,
  );

const makeSelectStaticData = () =>
  createSelector(
    selectDepenseCaisseFormDomain,
    (substate) => substate.staticData,
  );

const makeSelectErrorUpdatingDepenseCaisse = () =>
  createSelector(
    selectDepenseCaisseFormDomain,
    (substate) => substate.errorUpdatingDepenseCaisse,
  );

const makeSelectErrorSubmittingDepenseCaisse = () =>
  createSelector(
    selectDepenseCaisseFormDomain,
    (substate) => substate.errorSubmittingDepenseCaisse,
  );

export default makeSelectDepenseCaisseForm;
export {
  makeSelectErrorSubmittingDepenseCaisse,
  makeSelectErrorLoadingStaticData,
  makeSelectErrorUpdatingDepenseCaisse,
  makeSelectStaticData,
  selectDepenseCaisseFormDomain,
  makeSelectOnBehalf,
  makeSelectAddDepenseCaisse,
};
