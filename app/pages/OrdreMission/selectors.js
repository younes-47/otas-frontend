import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordreMission state domain
 */

const selectOrdreMissionDomain = (state) => state.ordreMission || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrdreMission
 */

const makeSelectOrdreMission = () =>
  createSelector(selectOrdreMissionDomain, (substate) => substate);

const makeSelectPageContent = () =>
  createSelector(selectOrdreMissionDomain, (substate) => substate.pageContent);

const makeSelectOrdreMissionIdentity = () =>
  createSelector(
    selectOrdreMissionDomain,
    (substate) => substate.ordreMissionIdentity,
  );

export default makeSelectOrdreMission;
export {
  selectOrdreMissionDomain,
  makeSelectPageContent,
  makeSelectOrdreMissionIdentity,
};
