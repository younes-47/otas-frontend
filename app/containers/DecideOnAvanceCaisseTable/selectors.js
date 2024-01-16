import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnAvanceCaisseTable state domain
 */

const selectDecideOnAvanceCaisseTableDomain = (state) =>
  state.decideOnAvanceCaisseTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnAvanceCaisseTable
 */

const makeSelectDecideOnAvanceCaisseTable = () =>
  createSelector(selectDecideOnAvanceCaisseTableDomain, (substate) => substate);

const makeSelectLoadingAvanceCaisses = () =>
  createSelector(
    selectDecideOnAvanceCaisseTableDomain,
    (substate) => substate.loadingAvanceCaisses,
  );

const makeSelectErrorLoadingAvanceCaisses = () =>
  createSelector(
    selectDecideOnAvanceCaisseTableDomain,
    (substate) => substate.errorLoadingAvanceCaisses,
  );

const makeSelectAvanceCaisses = () =>
  createSelector(
    selectDecideOnAvanceCaisseTableDomain,
    (substate) => substate.avanceCaisses,
  );

export default makeSelectDecideOnAvanceCaisseTable;
export {
  selectDecideOnAvanceCaisseTableDomain,
  makeSelectAvanceCaisses,
  makeSelectErrorLoadingAvanceCaisses,
  makeSelectLoadingAvanceCaisses,
};
