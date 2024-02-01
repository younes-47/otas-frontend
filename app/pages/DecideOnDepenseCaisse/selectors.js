import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnDepenseCaisse state domain
 */

const selectDecideOnDepenseCaisseDomain = (state) =>
  state.decideOnDepenseCaisse || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnDepenseCaisse
 */

const makeSelectDecideOnDepenseCaisse = () =>
  createSelector(selectDecideOnDepenseCaisseDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(
    selectDecideOnDepenseCaisseDomain,
    (substate) => substate.pageContent,
  );

const makeSelectDepenseCaisseIdentity = () =>
  createSelector(
    selectDecideOnDepenseCaisseDomain,
    (substate) => substate.depenseCaisseIdentity,
  );

export default makeSelectDecideOnDepenseCaisse;
export {
  selectDecideOnDepenseCaisseDomain,
  makeSelectChangePageContent,
  makeSelectDepenseCaisseIdentity,
};
