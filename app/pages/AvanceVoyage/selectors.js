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

const makeSelectAvanceVoyageIdentity = () =>
  createSelector(
    selectAvanceVoyageDomain,
    (substate) => substate.avanceVoyageIdentity,
  );

export default makeSelectAvanceVoyage;
export {
  makeSelectAvanceVoyageIdentity,
  selectAvanceVoyageDomain,
  makeSelectChangePageContent,
  makeSelectCleanupStore,
};
