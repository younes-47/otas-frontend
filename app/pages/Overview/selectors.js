import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the overview state domain
 */

const selectOverviewDomain = (state) => state.overview || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Overview
 */

const makeSelectOverview = () =>
  createSelector(selectOverviewDomain, (substate) => substate);
const makeSelectLoadingFullName = () =>
  createSelector(selectOverviewDomain, (substate) => substate.loadingFullName);
const makeSelectErrorFullName = () =>
  createSelector(selectOverviewDomain, (substate) => substate.errorFullName);
const makeSelectFirstName = () =>
  createSelector(selectOverviewDomain, (substate) => substate.firstName);
const makeSelectLastName = () =>
  createSelector(selectOverviewDomain, (substate) => substate.lastName);

export default makeSelectOverview;
export {
  selectOverviewDomain,
  makeSelectLoadingFullName,
  makeSelectErrorFullName,
  makeSelectFirstName,
  makeSelectLastName,
};
