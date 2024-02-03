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

const makeSelectErrorMarkingAvanceVoyageFundsAsPrepared = () =>
  createSelector(
    selectDecideOnAvanceVoyageFormDomain,
    (substate) => substate.errorMarkingAvanceVoyageFundsAsPrepared,
  );

const makeSelectErrorConfirmingAvanceVoyageFundsDelivery = () =>
  createSelector(
    selectDecideOnAvanceVoyageFormDomain,
    (substate) => substate.errorConfirmingAvanceVoyageFundsDelivery,
  );

const makeSelectConfirmingAvanceVoyageFundsDelivery = () =>
  createSelector(
    selectDecideOnAvanceVoyageFormDomain,
    (substate) => substate.confirmingAvanceVoyageFundsDelivery,
  );

/**
 * Default selector used by DecideOnAvanceVoyageForm
 */

const makeSelectDecideOnAvanceVoyageForm = () =>
  createSelector(selectDecideOnAvanceVoyageFormDomain, (substate) => substate);

export default makeSelectDecideOnAvanceVoyageForm;
export {
  makeSelectConfirmingAvanceVoyageFundsDelivery,
  makeSelectErrorConfirmingAvanceVoyageFundsDelivery,
  makeSelectErrorMarkingAvanceVoyageFundsAsPrepared,
  selectDecideOnAvanceVoyageFormDomain,
  makeSelectErrorDecidingOnAvanceVoyage,
  makeSelectErrorLoadingAvanceVoyageDetails,
  makeSelectAvanceVoyageDetails,
};
