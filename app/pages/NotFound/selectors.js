import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notFound state domain
 */

const selectNotFoundDomain = (state) => state.notFound || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotFound
 */

const makeSelectNotFound = () =>
  createSelector(selectNotFoundDomain, (substate) => substate);

export default makeSelectNotFound;
export { selectNotFoundDomain };
