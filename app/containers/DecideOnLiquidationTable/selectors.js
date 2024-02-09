import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnLiquidationTable state domain
 */

const selectDecideOnLiquidationTableDomain = (state) =>
  state.decideOnLiquidationTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnLiquidationTable
 */

const makeSelectDecideOnLiquidationTable = () =>
  createSelector(selectDecideOnLiquidationTableDomain, (substate) => substate);

const makeSelectLoadingLiquidations = () =>
  createSelector(
    selectDecideOnLiquidationTableDomain,
    (substate) => substate.loadingLiquidations,
  );

const makeSelectErrorLoadingLiquidations = () =>
  createSelector(
    selectDecideOnLiquidationTableDomain,
    (substate) => substate.errorLoadingLiquidations,
  );

const makeSelectLiquidations = () =>
  createSelector(
    selectDecideOnLiquidationTableDomain,
    (substate) => substate.liquidations,
  );

const makeSelectErrorDownloadingLiquidationReceiptsFile = () =>
  createSelector(
    selectDecideOnLiquidationTableDomain,
    (substate) => substate.errorDownloadingLiquidationReceiptsFile,
  );

const makeSelectLiquidationReceiptsFileDownloadResponse = () =>
  createSelector(
    selectDecideOnLiquidationTableDomain,
    (substate) => substate.downloadLiquidationReceiptsFileResponse,
  );

const makeSelectStatusLiquidation = () =>
  createSelector(
    selectDecideOnLiquidationTableDomain,
    (substate) => substate.statusLiquidation,
  );
export default makeSelectDecideOnLiquidationTable;
export {
  makeSelectStatusLiquidation,
  makeSelectLiquidationReceiptsFileDownloadResponse,
  makeSelectErrorDownloadingLiquidationReceiptsFile,
  makeSelectLiquidations,
  makeSelectErrorLoadingLiquidations,
  selectDecideOnLiquidationTableDomain,
  makeSelectLoadingLiquidations,
};
