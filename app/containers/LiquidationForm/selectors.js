import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the liquidationForm state domain
 */

const selectLiquidationFormDomain = (state) =>
  state.liquidationForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LiquidationForm
 */

const makeSelectLiquidationForm = () =>
  createSelector(selectLiquidationFormDomain, (substate) => substate);

export default makeSelectLiquidationForm;
export { selectLiquidationFormDomain };
