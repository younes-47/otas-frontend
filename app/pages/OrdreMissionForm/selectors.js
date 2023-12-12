import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordreMissionForm state domain
 */

const selectOrdreMissionFormDomain = (state) =>
  state.ordreMissionForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrdreMissionForm
 */

const makeSelectOrdreMissionForm = () =>
  createSelector(selectOrdreMissionFormDomain, (substate) => substate);

const makeSelectAddOrdreMission = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.AddOrdreMission,
  );

const makeSelectUpdateOrdreMission = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.UpdateOrdreMission,
  );

const makeSelectViewOrdreMission = () =>
  createSelector(
    selectOrdreMissionFormDomain,
    (substate) => substate.ViewOrdreMission,
  );

export default makeSelectOrdreMissionForm;
export {
  selectOrdreMissionFormDomain,
  makeSelectAddOrdreMission,
  makeSelectUpdateOrdreMission,
  makeSelectViewOrdreMission,
};
