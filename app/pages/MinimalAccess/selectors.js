import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the minimalAccess state domain
 */

const selectMinimalAccessDomain = (state) =>
  state.minimalAccess || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MinimalAccess
 */

const makeSelectMinimalAccess = () =>
  createSelector(selectMinimalAccessDomain, (substate) => substate);

export default makeSelectMinimalAccess;
export { selectMinimalAccessDomain };
