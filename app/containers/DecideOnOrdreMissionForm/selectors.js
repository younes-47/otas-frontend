import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnOrdreMissionForm state domain
 */

const selectDecideOnOrdreMissionFormDomain = (state) =>
  state.decideOnOrdreMissionForm || initialState;

/**
 * Other specific selectors
 */

const makeSelectOrdreMissionDetails = () =>
  createSelector(
    selectDecideOnOrdreMissionFormDomain,
    (substate) => substate.ordreMissionDetails,
  );

const makeSelectErrorLoadingOrdreMissionDetails = () =>
  createSelector(
    selectDecideOnOrdreMissionFormDomain,
    (substate) => substate.errorLoadingOrdreMissionDetails,
  );

const makeSelectErrorDecidingOnOrdreMission = () =>
  createSelector(
    selectDecideOnOrdreMissionFormDomain,
    (substate) => substate.errorDecidingOnOrdreMission,
  );

/**
 * Default selector used by DecideOnOrdreMissionForm
 */

const makeSelectDecideOnOrdreMissionForm = () =>
  createSelector(selectDecideOnOrdreMissionFormDomain, (substate) => substate);

export default makeSelectDecideOnOrdreMissionForm;
export {
  makeSelectErrorDecidingOnOrdreMission,
  selectDecideOnOrdreMissionFormDomain,
  makeSelectErrorLoadingOrdreMissionDetails,
  makeSelectOrdreMissionDetails,
};
