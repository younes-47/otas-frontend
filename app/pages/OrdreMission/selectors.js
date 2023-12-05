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

const makeSelectLoadingOrdreMissions =  () => 
  createSelector(selectOrdreMissionDomain, (substate) => substate.loadingOrdreMissions);

  const makeSelectErrorLoadingOrdreMissions =  () => 
  createSelector(selectOrdreMissionDomain, (substate) => substate.errorLoadingOrdreMissions);

  const makeSelectOrdreMissions =  () => 
  createSelector(selectOrdreMissionDomain, (substate) => substate.ordreMissions);



export default makeSelectOrdreMission;
export { selectOrdreMissionDomain, makeSelectLoadingOrdreMissions, makeSelectErrorLoadingOrdreMissions, makeSelectOrdreMissions };
