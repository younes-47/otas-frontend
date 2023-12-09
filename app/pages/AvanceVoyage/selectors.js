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

const makeSelectLoadingAvanceVoyages = () =>
  createSelector(selectAvanceVoyageDomain, (substate) => substate.loadingAvanceVoyages);

const makeSelectErrorLoadingAvanceVoyages = () =>
  createSelector(selectAvanceVoyageDomain, (substate) => substate.errorLoadingAvanceVoyages);

const makeSelectAvanceVoyages = () =>
  createSelector(selectAvanceVoyageDomain, (substate) => substate.avanceVoyages);


export default makeSelectAvanceVoyage;
export { selectAvanceVoyageDomain, makeSelectLoadingAvanceVoyages, makeSelectErrorLoadingAvanceVoyages, makeSelectAvanceVoyages };
