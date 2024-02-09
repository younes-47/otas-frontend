import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnRequests state domain
 */

const selectDecideOnRequestsDomain = (state) =>
  state.decideOnRequests || initialState;

/**
 * Other specific selectors
 */

const makeSelectDeciderLevels = () =>
  createSelector(
    selectDecideOnRequestsDomain,
    (substate) => substate.deciderLevels,
  );

const makeSelectErrorLoadingDeciderLevels = () =>
  createSelector(
    selectDecideOnRequestsDomain,
    (substate) => substate.errorLoadingDeciderLevels,
  );

const makeSelectErrorLoadingDeciderStats = () =>
  createSelector(
    selectDecideOnRequestsDomain,
    (substate) => substate.errorLoadingDeciderStats,
  );
const makeSelectDeciderStats = () =>
  createSelector(
    selectDecideOnRequestsDomain,
    (substate) => substate.deciderStats,
  );

/**
 * Default selector used by DecideOnRequests
 */

const makeSelectDecideOnRequests = () =>
  createSelector(selectDecideOnRequestsDomain, (substate) => substate);

export default makeSelectDecideOnRequests;
export {
  makeSelectDeciderStats,
  makeSelectErrorLoadingDeciderStats,
  selectDecideOnRequestsDomain,
  makeSelectDeciderLevels,
  makeSelectErrorLoadingDeciderLevels,
};
