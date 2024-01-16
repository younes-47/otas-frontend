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

export default makeSelectDecideOnLiquidationTable;
export {
  makeSelectLiquidations,
  makeSelectErrorLoadingLiquidations,
  selectDecideOnLiquidationTableDomain,
  makeSelectLoadingLiquidations,
};
