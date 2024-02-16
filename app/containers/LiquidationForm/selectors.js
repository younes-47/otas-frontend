import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the liquidationForm state domain
 */

const selectLiquidationFormDomain = (state) =>
  state.liquidationForm || initialState;

/**
 * Other specific selectors
 */

const makeSelectAddLiquidation = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.errorAddingLiquidation,
  );

const makeSelectErrorUpdatingLiquidation = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.errorUpdatingLiquidation,
  );

const makeSelectErrorSubmittingLiquidation = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.errorSubmittingLiquidation,
  );

const makeSelectLiquidationDetails = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.liquidationDetails,
  );

const makeSelectErrorLoadingLiquidationDetails = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.errorLoadingLiquidationDetails,
  );

const makeSelectErrorLoadingRequestsToLiquidate = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.errorLoadingRequestsToLiquidate,
  );

const makeSelectRequestsToLiquidate = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.requestsToLiquidate,
  );

const makeSelectErrorLoadingRequestToLiquidatedetails = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.errorLoadingRequestToLiquidateDetails,
  );

const makeSelectRequestToLiquidateDetails = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.requestToLiquidateDetails,
  );

const makeSelectRequestTypeToLiquidate = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.requestTypeToLiquidate,
  );

const makeSelectErrorDownloadingLiquidationDocumentFile = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.errorDownloadingLiquidationDocumentFile,
  );

const makeSelectLiquidationDocumentFile = () =>
  createSelector(
    selectLiquidationFormDomain,
    (substate) => substate.liquidationDocumentFile,
  );

/**
 * Default selector used by LiquidationForm
 */

const makeSelectLiquidationForm = () =>
  createSelector(selectLiquidationFormDomain, (substate) => substate);

export default makeSelectLiquidationForm;
export {
  makeSelectLiquidationDocumentFile,
  makeSelectErrorDownloadingLiquidationDocumentFile,
  makeSelectRequestTypeToLiquidate,
  makeSelectErrorLoadingRequestToLiquidatedetails,
  makeSelectRequestsToLiquidate,
  makeSelectRequestToLiquidateDetails,
  makeSelectErrorLoadingRequestsToLiquidate,
  selectLiquidationFormDomain,
  makeSelectErrorUpdatingLiquidation,
  makeSelectErrorSubmittingLiquidation,
  makeSelectLiquidationDetails,
  makeSelectAddLiquidation,
  makeSelectErrorLoadingLiquidationDetails,
};
