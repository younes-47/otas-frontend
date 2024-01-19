import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnAvanceVoyage state domain
 */

const selectDecideOnAvanceVoyageDomain = (state) =>
  state.decideOnAvanceVoyage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnAvanceVoyage
 */

const makeSelectDecideOnAvanceVoyage = () =>
  createSelector(selectDecideOnAvanceVoyageDomain, (substate) => substate);

const makeSelectChangePageContent = () =>
  createSelector(
    selectDecideOnAvanceVoyageDomain,
    (substate) => substate.pageContent,
  );

const makeSelectCleanupStore = () =>
  createSelector(
    selectDecideOnAvanceVoyageDomain,
    (substate) => substate.storeCleanup,
  );

export default makeSelectDecideOnAvanceVoyage;
export {
  selectDecideOnAvanceVoyageDomain,
  makeSelectCleanupStore,
  makeSelectChangePageContent,
};