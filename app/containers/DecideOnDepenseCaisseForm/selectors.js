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

const makeSelectDepenseCaisseDetails = () =>
  createSelector(
    selectDecideOnDepenseCaisseFormDomain,
    (substate) => substate.depenseCaisseDetails,
  );

const makeSelectErrorLoadingDepenseCaisseDetails = () =>
  createSelector(
    selectDecideOnDepenseCaisseFormDomain,
    (substate) => substate.errorLoadingDepenseCaisseDetails,
  );

const makeSelectErrorDecidingOnDepenseCaisse = () =>
  createSelector(
    selectDecideOnDepenseCaisseFormDomain,
    (substate) => substate.errorDecidingOnDepenseCaisse,
  );

/**
 * Default selector used by DecideOnDepenseCaisseForm
 */

const makeSelectDecideOnDepenseCaisseForm = () =>
  createSelector(selectDecideOnDepenseCaisseFormDomain, (substate) => substate);

export default makeSelectDecideOnDepenseCaisseForm;
export {
  selectDecideOnDepenseCaisseFormDomain,
  makeSelectErrorDecidingOnDepenseCaisse,
  makeSelectErrorLoadingDepenseCaisseDetails,
  makeSelectDepenseCaisseDetails,
};
