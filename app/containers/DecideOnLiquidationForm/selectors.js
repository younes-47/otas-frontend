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

/**
 * Default selector used by DecideOnLiquidationForm
 */

const makeSelectDecideOnLiquidationForm = () =>
  createSelector(selectDecideOnLiquidationFormDomain, (substate) => substate);

export default makeSelectDecideOnLiquidationForm;
export { selectDecideOnLiquidationFormDomain };
