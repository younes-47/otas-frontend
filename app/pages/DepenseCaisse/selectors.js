import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the depenseCaisse state domain
 */

const selectDepenseCaisseDomain = (state) =>
  state.depenseCaisse || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DepenseCaisse
 */

const makeSelectDepenseCaisse = () =>
  createSelector(selectDepenseCaisseDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(selectDepenseCaisseDomain, (substate) => substate.pageContent);

const makeSelectDepenseCaisseIdentity = () =>
  createSelector(
    selectDepenseCaisseDomain,
    (substate) => substate.depenseCaisseIdentity,
  );

export default makeSelectDepenseCaisse;
export {
  makeSelectDepenseCaisseIdentity,
  selectDepenseCaisseDomain,
  makeSelectChangePageContent,
};
