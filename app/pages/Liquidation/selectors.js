import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the liquidation state domain
 */

const selectLiquidationDomain = (state) => state.liquidation || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Liquidation
 */

const makeSelectLiquidation = () =>
  createSelector(selectLiquidationDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(selectLiquidationDomain, (substate) => substate.pageContent);

const makeSelectLiquidationIdentity = () =>
  createSelector(
    selectLiquidationDomain,
    (substate) => substate.liquidationIdentity,
  );

export default makeSelectLiquidation;
export {
  selectLiquidationDomain,
  makeSelectChangePageContent,
  makeSelectLiquidationIdentity,
};
