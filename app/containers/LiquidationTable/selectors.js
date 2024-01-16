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

export default makeSelectLiquidationTable;
export {
  selectLiquidationTableDomain,
  makeSelectLiquidations,
  makeSelectLoadingLiquidations,
  makeSelectErrorLoadingLiquidations,
};
