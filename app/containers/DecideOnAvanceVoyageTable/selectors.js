import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnAvanceVoyageTable state domain
 */

const selectDecideOnAvanceVoyageTableDomain = (state) =>
  state.decideOnAvanceVoyageTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DecideOnAvanceVoyageTable
 */

const makeSelectDecideOnAvanceVoyageTable = () =>
  createSelector(selectDecideOnAvanceVoyageTableDomain, (substate) => substate);

const makeSelectLoadingAvanceVoyages = () =>
  createSelector(
    selectDecideOnAvanceVoyageTableDomain,
    (substate) => substate.loadingAvanceVoyages,
  );

const makeSelectErrorLoadingAvanceVoyages = () =>
  createSelector(
    selectDecideOnAvanceVoyageTableDomain,
    (substate) => substate.errorLoadingAvanceVoyages,
  );

const makeSelectAvanceVoyages = () =>
  createSelector(
    selectDecideOnAvanceVoyageTableDomain,
    (substate) => substate.avanceVoyages,
  );

export default makeSelectDecideOnAvanceVoyageTable;
export {
  selectDecideOnAvanceVoyageTableDomain,
  makeSelectAvanceVoyages,
  makeSelectErrorLoadingAvanceVoyages,
  makeSelectLoadingAvanceVoyages,
};
