import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the overview state domain
 */

const selectMyRequestsDomain = (state) => state.myRequests || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Overview
 */

const makeSelectOverview = () =>
  createSelector(selectMyRequestsDomain, (substate) => substate);
const makeSelectLoadingFullName = () =>
  createSelector(
    selectMyRequestsDomain,
    (substate) => substate.loadingFullName,
  );
const makeSelectErrorFullName = () =>
  createSelector(selectMyRequestsDomain, (substate) => substate.errorFullName);
const makeSelectUserInfo = () =>
  createSelector(selectMyRequestsDomain, (substate) => substate.userInfo);

export default makeSelectOverview;
export {
  selectMyRequestsDomain,
  makeSelectLoadingFullName,
  makeSelectErrorFullName,
  makeSelectUserInfo,
};
