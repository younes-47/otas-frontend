import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordreMissionForm state domain
 */

const selectOrdreMissionFormDomain = (state) =>
  state.ordreMissionForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrdreMissionForm
 */

const makeSelectOrdreMissionForm = () =>
  createSelector(selectOrdreMissionFormDomain, (substate) => substate);

export default makeSelectOrdreMissionForm;
export { selectOrdreMissionFormDomain };
