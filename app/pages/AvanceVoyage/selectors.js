import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the avanceVoyage state domain
 */

const selectAvanceVoyageDomain = (state) => state.avanceVoyage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AvanceVoyage
 */

const makeSelectAvanceVoyage = () =>
  createSelector(selectAvanceVoyageDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(selectAvanceVoyageDomain, (substate) => substate.pageContent);

const makeSelectCleanupStore = () =>
  createSelector(selectAvanceVoyageDomain, (substate) => substate.storeCleanup);

export default makeSelectAvanceVoyage;
export {
  selectAvanceVoyageDomain,
  makeSelectChangePageContent,
  makeSelectCleanupStore,
};
