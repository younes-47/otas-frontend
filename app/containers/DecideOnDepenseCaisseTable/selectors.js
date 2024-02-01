import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnDepenseCaisseTable state domain
 */

const selectDecideOnDepenseCaisseTableDomain = (state) =>
  state.decideOnDepenseCaisseTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnDepenseCaisseTable
 */

const makeSelectDecideOnDepenseCaisseTable = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate,
  );

const makeSelectLoadingDepenseCaisses = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate.loadingDepenseCaisses,
  );

const makeSelectErrorLoadingDepenseCaisses = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate.errorLoadingDepenseCaisses,
  );

const makeSelectDepenseCaisses = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate.depenseCaisses,
  );

const makeSelectStatusDepenseCaisse = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate.statusDepenseCaisse,
  );

const makeSelectErrorDownloadingDepenseCaisseReceiptsFile = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate.errorDownloadingDepenseCaisseReceiptsFile,
  );

const makeSelectDepenseCaisseReceiptsFileDownloadResponse = () =>
  createSelector(
    selectDecideOnDepenseCaisseTableDomain,
    (substate) => substate.downloadDepenseCaisseReceiptsFileResponse,
  );

export default makeSelectDecideOnDepenseCaisseTable;
export {
  makeSelectDepenseCaisseReceiptsFileDownloadResponse,
  makeSelectErrorDownloadingDepenseCaisseReceiptsFile,
  makeSelectStatusDepenseCaisse,
  makeSelectDepenseCaisses,
  makeSelectErrorLoadingDepenseCaisses,
  makeSelectLoadingDepenseCaisses,
  selectDecideOnDepenseCaisseTableDomain,
};
