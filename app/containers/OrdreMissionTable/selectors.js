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
const makeSelectDeletingOrdreMission = () =>
  createSelector(
    selectOrdreMissionTableDomain,
    (substate) => substate.deletingOrdreMission,
  );

const makeSelectErrorDeletingOrdreMission = () =>
  createSelector(
    selectOrdreMissionTableDomain,
    (substate) => substate.errorDeletingOrdreMission,
  );

const makeSelectOrdreMissions = () =>
  createSelector(
    selectOrdreMissionTableDomain,
    (substate) => substate.ordreMissions,
  );

const makeSelectOrdreMissionTable = () =>
  createSelector(selectOrdreMissionTableDomain, (substate) => substate);

const makeSelectStatusOrdreMission = () =>
  createSelector(
    selectOrdreMissionTableDomain,
    (substate) => substate.statusOrdreMission,
  );

export default makeSelectOrdreMissionTable;
export {
  makeSelectStatusOrdreMission,
  selectOrdreMissionTableDomain,
  makeSelectOrdreMissions,
  makeSelectLoadingOrdreMissions,
  makeSelectErrorLoadingOrdreMissions,
  makeSelectErrorDeletingOrdreMission,
  makeSelectDeletingOrdreMission,
};
