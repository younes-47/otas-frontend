import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the decideOnAvanceCaisseForm state domain
 */

const selectDecideOnAvanceCaisseFormDomain = (state) =>
  state.decideOnAvanceCaisseForm || initialState;

/**
 * Other specific selectors
 */
const makeSelectAvanceCaisseDetails = () =>
  createSelector(
    selectDecideOnAvanceCaisseFormDomain,
    (substate) => substate.avanceCaisseDetails,
  );

const makeSelectErrorLoadingAvanceCaisseDetails = () =>
  createSelector(
    selectDecideOnAvanceCaisseFormDomain,
    (substate) => substate.errorLoadingAvanceCaisseDetails,
  );

const makeSelectErrorDecidingOnAvanceCaisse = () =>
  createSelector(
    selectDecideOnAvanceCaisseFormDomain,
    (substate) => substate.errorDecidingOnAvanceCaisse,
  );

const makeSelectErrorMarkingAvanceCaisseFundsAsPrepared = () =>
  createSelector(
    selectDecideOnAvanceCaisseFormDomain,
    (substate) => substate.errorMarkingAvanceCaisseFundsAsPrepared,
  );

const makeSelectErrorConfirmingAvanceCaisseFundsDelivery = () =>
  createSelector(
    selectDecideOnAvanceCaisseFormDomain,
    (substate) => substate.errorConfirmingAvanceCaisseFundsDelivery,
  );

const makeSelectConfirmingAvanceCaisseFundsDelivery = () =>
  createSelector(
    selectDecideOnAvanceCaisseFormDomain,
    (substate) => substate.confirmingAvanceCaisseFundsDelivery,
  );
/**
 * Default selector used by DecideOnAvanceCaisseForm
 */

const makeSelectDecideOnAvanceCaisseForm = () =>
  createSelector(selectDecideOnAvanceCaisseFormDomain, (substate) => substate);

export default makeSelectDecideOnAvanceCaisseForm;
export {
  makeSelectConfirmingAvanceCaisseFundsDelivery,
  makeSelectErrorConfirmingAvanceCaisseFundsDelivery,
  makeSelectErrorMarkingAvanceCaisseFundsAsPrepared,
  selectDecideOnAvanceCaisseFormDomain,
  makeSelectErrorDecidingOnAvanceCaisse,
  makeSelectErrorLoadingAvanceCaisseDetails,
  makeSelectAvanceCaisseDetails,
};
