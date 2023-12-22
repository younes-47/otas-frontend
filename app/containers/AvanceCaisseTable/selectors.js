import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the avanceCaisseTable state domain
 */

const selectAvanceCaisseTableDomain = (state) =>
  state.avanceCaisseTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AvanceCaisseTable
 */

const makeSelectAvanceCaisseTable = () =>
  createSelector(selectAvanceCaisseTableDomain, (substate) => substate);

const makeSelectLoadingAvanceCaisses = () =>
  createSelector(
    selectAvanceCaisseTableDomain,
    (substate) => substate.loadingAvanceCaisses,
  );

const makeSelectErrorLoadingAvanceCaisses = () =>
  createSelector(
    selectAvanceCaisseTableDomain,
    (substate) => substate.errorLoadingAvanceCaisses,
  );

const makeSelectAvanceCaisses = () =>
  createSelector(
    selectAvanceCaisseTableDomain,
    (substate) => substate.avanceCaisses,
  );

export default makeSelectAvanceCaisseTable;
export {
  selectAvanceCaisseTableDomain,
  makeSelectLoadingAvanceCaisses,
  makeSelectErrorLoadingAvanceCaisses,
  makeSelectAvanceCaisses,
};
