import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the avanceCaisseForm state domain
 */

const selectAvanceCaisseFormDomain = (state) =>
  state.avanceCaisseForm || initialState;

const makeSelectOnBehalf = () =>
  createSelector(
    selectAvanceCaisseFormDomain,
    (substate) => substate.onBehalfSelection,
  );
const makeSelectAvanceCaisseForm = () =>
  createSelector(selectAvanceCaisseFormDomain, (substate) => substate);

const makeSelectAddAvanceCaisse = () =>
  createSelector(
    selectAvanceCaisseFormDomain,
    (substate) => substate.errorAddingAvanceCaisse,
  );

const makeSelectErrorLoadingStaticData = () =>
  createSelector(
    selectAvanceCaisseFormDomain,
    (substate) => substate.errorLoadingStaticData,
  );

const makeSelectStaticData = () =>
  createSelector(
    selectAvanceCaisseFormDomain,
    (substate) => substate.staticData,
  );

const makeSelectErrorAddingAvanceCaisse = () =>
  createSelector(
    selectAvanceCaisseFormDomain,
    (substate) => substate.errorAddingAvanceCaisse,
  );
const makeSelectErrorUpdatingAvanceCaisse = () =>
  createSelector(
    selectAvanceCaisseFormDomain,
    (substate) => substate.errorUpdatingAvanceCaisse,
  );

const makeSelectErrorSubmittingAvanceCaisse = () =>
  createSelector(
    selectAvanceCaisseFormDomain,
    (substate) => substate.errorSubmittingAvanceCaisse,
  );

const makeSelectAvanceCaisseDetails = () =>
  createSelector(
    selectAvanceCaisseFormDomain,
    (substate) => substate.avanceCaisseDetails,
  );

const makeSelectErrorLoadingAvanceCaisseDetails = () =>
  createSelector(
    selectAvanceCaisseFormDomain,
    (substate) => substate.errorLoadingAvanceCaisseDetails,
  );

export default makeSelectAvanceCaisseForm;
export {
  makeSelectErrorLoadingAvanceCaisseDetails,
  makeSelectAvanceCaisseDetails,
  makeSelectErrorAddingAvanceCaisse,
  makeSelectErrorUpdatingAvanceCaisse,
  makeSelectErrorSubmittingAvanceCaisse,
  makeSelectStaticData,
  makeSelectErrorLoadingStaticData,
  selectAvanceCaisseFormDomain,
  makeSelectOnBehalf,
  makeSelectAddAvanceCaisse,
};
