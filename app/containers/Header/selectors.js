import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the header state domain
 */

const selectHeaderDomain = (state) => state.header || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const makeSelectHeader = () =>
  createSelector(selectHeaderDomain, (substate) => substate);

const makeSelectPreferredLanguage = () =>
  createSelector(selectHeaderDomain, (substate) => substate.preferredLanguage);
const makeSelectChangingPreferredLanguage = () =>
  createSelector(
    selectHeaderDomain,
    (substate) => substate.changingPreferredLanguage,
  );
const makeSelectErrorPreferredLanguage = () =>
  createSelector(
    selectHeaderDomain,
    (substate) => substate.errorPreferredLanguage,
  );

const makeSelectErrorMessage = () =>
  createSelector(selectHeaderDomain, (substate) => substate.errorMessage);

export default makeSelectHeader;
export {
  makeSelectErrorMessage,
  selectHeaderDomain,
  makeSelectPreferredLanguage,
  makeSelectChangingPreferredLanguage,
  makeSelectErrorPreferredLanguage,
};
