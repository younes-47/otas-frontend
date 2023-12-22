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

export default makeSelectAvanceVoyageTable;
export { selectAvanceVoyageTableDomain };
