import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the depenseCaisse state domain
 */

const selectDepenseCaisseTableDomain = (state) =>
  state.depenseCaisseTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DepenseCaisseTable
 */

const makeSelectDepenseCaisseTable = () =>
  createSelector(selectDepenseCaisseTableDomain, (substate) => substate);

const makeSelectLoadingDepenseCaisses = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.loadingDepenseCaisses,
  );

const makeSelectErrorLoadingDepenseCaisses = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.errorLoadingDepenseCaisses,
  );

const makeSelectDepenseCaisses = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.depenseCaisses,
  );

const makeSelectDeletingDepenseCaisse = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.deletingDepenseCaisse,
  );

const makeSelectErrorDeletingDepenseCaisse = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.errorDeletingDepenseCaisse,
  );

const makeSelectErrorDownloadingDepenseCaisseReceiptsFile = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.errorDownloadingDepenseCaisseReceiptsFile,
  );

const makeSelectDepenseCaisseReceiptsFileDownloadResponse = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.downloadDepenseCaisseReceiptsFileResponse,
  );

const makeSelectCleanupStore = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.storeCleanup,
  );

const makeSelectStatusDepenseCaisse = () =>
  createSelector(
    selectDepenseCaisseTableDomain,
    (substate) => substate.statusDepenseCaisse,
  );

export default makeSelectDepenseCaisseTable;
export {
  makeSelectDepenseCaisseReceiptsFileDownloadResponse,
  makeSelectErrorDownloadingDepenseCaisseReceiptsFile,
  makeSelectStatusDepenseCaisse,
  makeSelectErrorDeletingDepenseCaisse,
  makeSelectDeletingDepenseCaisse,
  makeSelectCleanupStore,
  selectDepenseCaisseTableDomain,
  makeSelectLoadingDepenseCaisses,
  makeSelectErrorLoadingDepenseCaisses,
  makeSelectDepenseCaisses,
};
