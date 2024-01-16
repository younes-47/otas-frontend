import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnLiquidation state domain
 */

const selectDecideOnLiquidationDomain = (state) =>
  state.decideOnLiquidation || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnLiquidation
 */

const makeSelectDecideOnLiquidation = () =>
  createSelector(selectDecideOnLiquidationDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(
    selectDecideOnLiquidationDomain,
    (substate) => substate.pageContent,
  );

const makeSelectCleanupStore = () =>
  createSelector(
    selectDecideOnLiquidationDomain,
    (substate) => substate.storeCleanup,
  );
export default makeSelectDecideOnLiquidation;
export {
  selectDecideOnLiquidationDomain,
  makeSelectCleanupStore,
  makeSelectChangePageContent,
};
