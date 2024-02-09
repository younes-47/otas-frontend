import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnLiquidationForm state domain
 */

const selectDecideOnLiquidationFormDomain = (state) =>
  state.decideOnLiquidationForm || initialState;

/**
 * Other specific selectors
 */

const makeSelectLiquidationDetails = () =>
  createSelector(
    selectDecideOnLiquidationFormDomain,
    (substate) => substate.liquidationDetails,
  );

const makeSelectErrorLoadingLiquidationDetails = () =>
  createSelector(
    selectDecideOnLiquidationFormDomain,
    (substate) => substate.errorLoadingLiquidationDetails,
  );

const makeSelectErrorDecidingOnLiquidation = () =>
  createSelector(
    selectDecideOnLiquidationFormDomain,
    (substate) => substate.errorDecidingOnLiquidation,
  );

/**
 * Default selector used by DecideOnLiquidationForm
 */

const makeSelectDecideOnLiquidationForm = () =>
  createSelector(selectDecideOnLiquidationFormDomain, (substate) => substate);

export default makeSelectDecideOnLiquidationForm;
export {
  selectDecideOnLiquidationFormDomain,
  makeSelectErrorDecidingOnLiquidation,
  makeSelectErrorLoadingLiquidationDetails,
  makeSelectLiquidationDetails,
};
