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

const makeSelectLoadingAvanceCaisses = () =>
  createSelector(selectAvanceCaisseDomain, (substate) => substate.loadingAvanceCaisses);

const makeSelectErrorLoadingAvanceCaisses = () =>
  createSelector(selectAvanceCaisseDomain, (substate) => substate.errorLoadingAvanceCaisses);

const makeSelectAvanceCaisses = () =>
  createSelector(selectAvanceCaisseDomain, (substate) => substate.avanceCaisses);

export default makeSelectAvanceCaisse;
export { selectAvanceCaisseDomain, makeSelectLoadingAvanceCaisses, makeSelectErrorLoadingAvanceCaisses, makeSelectAvanceCaisses };