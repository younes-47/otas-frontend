import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the azerty state domain
 */

const selectAzertyDomain = (state) => state.azerty || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Azerty
 */

const makeSelectAzerty = () =>
  createSelector(selectAzertyDomain, (substate) => substate);

export default makeSelectAzerty;
export { selectAzertyDomain };
