import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordreMissionTable state domain
 */

const selectOrdreMissionTableDomain = (state) =>
  state.ordreMissionTable || initialState;

const makeSelectLoadingOrdreMissions = () =>
  createSelector(
    selectOrdreMissionTableDomain,
    (substate) => substate.loadingOrdreMissions,
  );

const makeSelectErrorLoadingOrdreMissions = () =>
  createSelector(
    selectOrdreMissionTableDomain,
    (substate) => substate.errorLoadingOrdreMissions,
  );

const makeSelectOrdreMissions = () =>
  createSelector(
    selectOrdreMissionTableDomain,
    (substate) => substate.ordreMissions,
  );

const makeSelectOrdreMissionTable = () =>
  createSelector(selectOrdreMissionTableDomain, (substate) => substate);

export default makeSelectOrdreMissionTable;
export {
  selectOrdreMissionTableDomain,
  makeSelectOrdreMissions,
  makeSelectLoadingOrdreMissions,
  makeSelectErrorLoadingOrdreMissions,
};
