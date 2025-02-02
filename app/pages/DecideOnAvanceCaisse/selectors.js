import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnAvanceCaisse state domain
 */

const selectDecideOnAvanceCaisseDomain = (state) =>
  state.decideOnAvanceCaisse || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnAvanceCaisse
 */

const makeSelectDecideOnAvanceCaisse = () =>
  createSelector(selectDecideOnAvanceCaisseDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(
    selectDecideOnAvanceCaisseDomain,
    (substate) => substate.pageContent,
  );

const makeSelectAvanceCaisseIdentity = () =>
  createSelector(
    selectDecideOnAvanceCaisseDomain,
    (substate) => substate.avanceCaisseIdentity,
  );

export default makeSelectDecideOnAvanceCaisse;
export {
  selectDecideOnAvanceCaisseDomain,
  makeSelectChangePageContent,
  makeSelectAvanceCaisseIdentity,
};
