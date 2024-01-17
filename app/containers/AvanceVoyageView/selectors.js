import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the avanceVoyageView state domain
 */

const selectAvanceVoyageViewDomain = (state) =>
  state.avanceVoyageView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AvanceVoyageView
 */

const makeSelectAvanceVoyageView = () =>
  createSelector(selectAvanceVoyageViewDomain, (substate) => substate);

const makeSelectLoadingAvanceVoyage = () =>
  createSelector(
    selectAvanceVoyageViewDomain,
    (substate) => substate.loadingAvanceVoyage,
  );

const makeSelectErrorLoadingAvanceVoyage = () =>
  createSelector(
    selectAvanceVoyageViewDomain,
    (substate) => substate.errorLoadingAvanceVoyage,
  );

const makeSelectAvanceVoyageIdentity = () =>
  createSelector(
    selectAvanceVoyageViewDomain,
    (substate) => substate.avanceVoyageIdentity,
  );

const makeSelectAvanceVoyageDetails = () =>
  createSelector(
    selectAvanceVoyageViewDomain,
    (substate) => substate.avanceVoyageDetails,
  );

export default makeSelectAvanceVoyageView;
export {
  makeSelectAvanceVoyageDetails,
  selectAvanceVoyageViewDomain,
  makeSelectLoadingAvanceVoyage,
  makeSelectErrorLoadingAvanceVoyage,
  makeSelectAvanceVoyageIdentity,
};
