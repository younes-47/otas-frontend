import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the avanceCaisse state domain
 */

const selectAvanceCaisseDomain = (state) => state.avanceCaisse || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AvanceCaisse
 */

const makeSelectAvanceCaisse = () =>
  createSelector(selectAvanceCaisseDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(selectAvanceCaisseDomain, (substate) => substate.pageContent);

const makeSelectAvanceCaisseIdentity = () =>
  createSelector(
    selectAvanceCaisseDomain,
    (substate) => substate.avanceCaisseIdentity,
  );

export default makeSelectAvanceCaisse;
export {
  selectAvanceCaisseDomain,
  makeSelectChangePageContent,
  makeSelectAvanceCaisseIdentity,
};
