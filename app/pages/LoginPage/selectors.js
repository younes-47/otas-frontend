import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = (state) => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, (substate) => substate);
const makeSelectToken = () =>
  createSelector(selectLoginPageDomain, (substate) => substate.token);
const makeSelectRole = () =>
  createSelector(selectLoginPageDomain, (substate) => substate.role);
const makeSelectUsername = () =>
  createSelector(selectLoginPageDomain, (substate) => substate.username);
const makeSelectPassword = () =>
  createSelector(selectLoginPageDomain, (substate) => substate.password);
const makeSelectLoading = () =>
  createSelector(selectLoginPageDomain, (substate) => substate.loading);
const makeSelectError = () =>
  createSelector(selectLoginPageDomain, (substate) => substate.error);

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  makeSelectToken,
  makeSelectRole,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectLoading,
  makeSelectError,
};
