import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnOrdreMissionForm state domain
 */

const selectDecideOnOrdreMissionFormDomain = (state) =>
  state.decideOnOrdreMissionForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnOrdreMissionForm
 */

const makeSelectDecideOnOrdreMissionForm = () =>
  createSelector(selectDecideOnOrdreMissionFormDomain, (substate) => substate);

export default makeSelectDecideOnOrdreMissionForm;
export { selectDecideOnOrdreMissionFormDomain };
