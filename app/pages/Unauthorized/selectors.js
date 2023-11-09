import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the unauthorized state domain
 */

const selectUnauthorizedDomain = (state) => state.unauthorized || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Unauthorized
 */

const makeSelectUnauthorized = () =>
  createSelector(selectUnauthorizedDomain, (substate) => substate);

export default makeSelectUnauthorized;
export { selectUnauthorizedDomain };
