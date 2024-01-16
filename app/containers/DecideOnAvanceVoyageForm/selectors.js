import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnAvanceVoyageForm state domain
 */

const selectDecideOnAvanceVoyageFormDomain = (state) =>
  state.decideOnAvanceVoyageForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnAvanceVoyageForm
 */

const makeSelectDecideOnAvanceVoyageForm = () =>
  createSelector(selectDecideOnAvanceVoyageFormDomain, (substate) => substate);

export default makeSelectDecideOnAvanceVoyageForm;
export { selectDecideOnAvanceVoyageFormDomain };
