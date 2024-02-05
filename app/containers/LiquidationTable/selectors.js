import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the liquidationTable state domain
 */

const selectLiquidationTableDomain = (state) =>
  state.liquidationTable || initialState;

const makeSelectLiquidationTable = () =>
  createSelector(selectLiquidationTableDomain, (substate) => substate);

const makeSelectLoadingLiquidations = () =>
  createSelector(
    selectLiquidationTableDomain,
    (substate) => substate.loadingLiquidations,
  );

const makeSelectErrorLoadingLiquidations = () =>
  createSelector(
    selectLiquidationTableDomain,
    (substate) => substate.errorLoadingLiquidations,
  );

const makeSelectLiquidations = () =>
  createSelector(
    selectLiquidationTableDomain,
    (substate) => substate.liquidations,
  );

const makeSelectDeletingLiquidation = () =>
  createSelector(
    selectLiquidationTableDomain,
    (substate) => substate.deletingLiquidation,
  );

const makeSelectErrorDeletingLiquidation = () =>
  createSelector(
    selectLiquidationTableDomain,
    (substate) => substate.errorDeletingLiquidation,
  );

const makeSelectErrorDownloadingLiquidationReceiptsFile = () =>
  createSelector(
    selectLiquidationTableDomain,
    (substate) => substate.errorDownloadingLiquidationReceiptsFile,
  );

const makeSelectLiquidationReceiptsFileDownloadResponse = () =>
  createSelector(
    selectLiquidationTableDomain,
    (substate) => substate.downloadLiquidationReceiptsFileResponse,
  );

const makeSelectStatusLiquidation = () =>
  createSelector(
    selectLiquidationTableDomain,
    (substate) => substate.statusLiquidation,
  );

export default makeSelectLiquidationTable;
export {
  makeSelectStatusLiquidation,
  makeSelectErrorDeletingLiquidation,
  makeSelectErrorDownloadingLiquidationReceiptsFile,
  makeSelectLiquidationReceiptsFileDownloadResponse,
  makeSelectDeletingLiquidation,
  selectLiquidationTableDomain,
  makeSelectLiquidations,
  makeSelectLoadingLiquidations,
  makeSelectErrorLoadingLiquidations,
};
