import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the avanceVoyageTable state domain
 */

const selectAvanceVoyageTableDomain = (state) =>
  state.avanceVoyageTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AvanceVoyageTable
 */

const makeSelectAvanceVoyageTable = () =>
  createSelector(selectAvanceVoyageTableDomain, (substate) => substate);

const makeSelectLoadingAvanceVoyages = () =>
  createSelector(
    selectAvanceVoyageTableDomain,
    (substate) => substate.loadingAvanceVoyages,
  );

const makeSelectErrorLoadingAvanceVoyages = () =>
  createSelector(
    selectAvanceVoyageTableDomain,
    (substate) => substate.errorLoadingAvanceVoyages,
  );

const makeSelectAvanceVoyages = () =>
  createSelector(
    selectAvanceVoyageTableDomain,
    (substate) => substate.avanceVoyages,
  );

export default makeSelectAvanceVoyageTable;
export {
  selectAvanceVoyageTableDomain,
  makeSelectAvanceVoyages,
  makeSelectLoadingAvanceVoyages,
  makeSelectErrorLoadingAvanceVoyages,
};
