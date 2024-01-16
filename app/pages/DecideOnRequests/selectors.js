import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnRequests state domain
 */

const selectDecideOnRequestsDomain = (state) =>
  state.decideOnRequests || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnRequests
 */

const makeSelectDecideOnRequests = () =>
  createSelector(selectDecideOnRequestsDomain, (substate) => substate);

const makeSelectUserInfo = () =>
  createSelector(selectDecideOnRequestsDomain, (substate) => substate.userInfo);

export default makeSelectDecideOnRequests;
export { selectDecideOnRequestsDomain, makeSelectUserInfo };
