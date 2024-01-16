import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnOrdreMissionTable state domain
 */

const selectDecideOnOrdreMissionTableDomain = (state) =>
  state.decideOnOrdreMissionTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnOrdreMissionTable
 */

const makeSelectDecideOnOrdreMissionTable = () =>
  createSelector(selectDecideOnOrdreMissionTableDomain, (substate) => substate);

const makeSelectLoadingOrdreMissions = () =>
  createSelector(
    selectDecideOnOrdreMissionTableDomain,
    (substate) => substate.loadingOrdreMissions,
  );

const makeSelectErrorLoadingOrdreMissions = () =>
  createSelector(
    selectDecideOnOrdreMissionTableDomain,
    (substate) => substate.errorLoadingOrdreMissions,
  );

const makeSelectOrdreMissions = () =>
  createSelector(
    selectDecideOnOrdreMissionTableDomain,
    (substate) => substate.ordreMissions,
  );

export default makeSelectDecideOnOrdreMissionTable;
export {
  makeSelectOrdreMissions,
  makeSelectErrorLoadingOrdreMissions,
  makeSelectLoadingOrdreMissions,
  selectDecideOnOrdreMissionTableDomain,
};
