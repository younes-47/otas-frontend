import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnAvanceVoyageForm state domain
 */

const selectDecideOnAvanceVoyageFormDomain = (state) =>
  state.decideOnAvanceVoyageForm || initialState;

/**
 * Other specific selectors
 */
const makeSelectAvanceVoyageDetails = () =>
  createSelector(
    selectDecideOnAvanceVoyageFormDomain,
    (substate) => substate.avanceVoyageDetails,
  );

const makeSelectErrorLoadingAvanceVoyageDetails = () =>
  createSelector(
    selectDecideOnAvanceVoyageFormDomain,
    (substate) => substate.errorLoadingAvanceVoyageDetails,
  );

const makeSelectErrorDecidingOnAvanceVoyage = () =>
  createSelector(
    selectDecideOnAvanceVoyageFormDomain,
    (substate) => substate.errorDecidingOnAvanceVoyage,
  );

/**
 * Default selector used by DecideOnAvanceVoyageForm
 */

const makeSelectDecideOnAvanceVoyageForm = () =>
  createSelector(selectDecideOnAvanceVoyageFormDomain, (substate) => substate);

export default makeSelectDecideOnAvanceVoyageForm;
export {
  selectDecideOnAvanceVoyageFormDomain,
  makeSelectErrorDecidingOnAvanceVoyage,
  makeSelectErrorLoadingAvanceVoyageDetails,
  makeSelectAvanceVoyageDetails,
};
