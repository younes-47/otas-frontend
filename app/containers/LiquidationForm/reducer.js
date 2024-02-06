/*
 *
 * LiquidationForm reducer
 *
 */
import produce from 'immer';
import {
  ADD_LIQUIDATION,
  ADD_LIQUIDATION_ERROR,
  ADD_LIQUIDATION_SUCCESS,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_LIQUIDATION_DETAILS,
  LOAD_LIQUIDATION_DETAILS_ERROR,
  LOAD_LIQUIDATION_DETAILS_SUCCESS,
  LOAD_REQUESTS_TO_LIQUIDATE,
  LOAD_REQUESTS_TO_LIQUIDATE_ERROR,
  LOAD_REQUESTS_TO_LIQUIDATE_SUCCESS,
  LOAD_REQUEST_TO_LIQUIDATE_DETAILS,
  LOAD_REQUEST_TO_LIQUIDATE_DETAILS_ERROR,
  LOAD_REQUEST_TO_LIQUIDATE_DETAILS_SUCCESS,
  NULLIFY_REQUEST_TO_LIQUIDATE_DETAILS,
  SELECT_REQUEST_TYPE_TO_LIQUIDATE,
  SUBMIT_LIQUIDATION,
  SUBMIT_LIQUIDATION_ERROR,
  SUBMIT_LIQUIDATION_SUCCESS,
  UPDATE_LIQUIDATION,
  UPDATE_LIQUIDATION_ERROR,
  UPDATE_LIQUIDATION_SUCCESS,
} from './constants';

export const initialState = {
  addingLiquidation: false,
  errorAddingLiquidation: null,
  updatingLiquidation: false,
  errorUpdatingLiquidation: null,
  submittingLiquidation: false,
  errorSubmittingLiquidation: null,
  loadingLiquidationDetails: false,
  errorLoadingLiquidationDetails: null,
  liquidationDetails: null,
  loadingRequestsToLiquidate: false,
  errorLoadingRequestsToLiquidate: null,
  requestsToLiquidate: null,
  loadingRequestToLiquidateDetails: false,
  errorLoadingRequestToLiquidateDetails: null,
  requestToLiquidateDetails: null,
  requestTypeToLiquidate: null,
};

/* eslint-disable default-case, no-param-reassign */
const liquidationFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SELECT_REQUEST_TYPE_TO_LIQUIDATE:
        draft.requestTypeToLiquidate = action.selection;
        break;
      case LOAD_LIQUIDATION_DETAILS:
        draft.loadingLiquidationDetails = true;
        draft.errorLoadingLiquidationDetails = null;
        break;
      case LOAD_LIQUIDATION_DETAILS_SUCCESS:
        draft.loadingLiquidationDetails = false;
        draft.errorLoadingLiquidationDetails = false;
        draft.liquidationDetails = action.data;
        break;
      case LOAD_LIQUIDATION_DETAILS_ERROR:
        draft.loadingLiquidationDetails = false;
        draft.errorLoadingLiquidationDetails = true;
        break;
      case ADD_LIQUIDATION:
        draft.addingLiquidation = true;
        draft.errorAddingLiquidation = null;
        break;
      case ADD_LIQUIDATION_SUCCESS:
        draft.addingLiquidation = false;
        draft.errorAddingLiquidation = false;
        break;
      case ADD_LIQUIDATION_ERROR:
        draft.addingLiquidation = false;
        draft.errorAddingLiquidation = true;
        break;
      case SUBMIT_LIQUIDATION:
        draft.submittingLiquidation = true;
        draft.errorSubmittingLiquidation = null;
        break;
      case SUBMIT_LIQUIDATION_SUCCESS:
        draft.submittingLiquidation = false;
        draft.errorSubmittingLiquidation = false;
        break;
      case SUBMIT_LIQUIDATION_ERROR:
        draft.submittingLiquidation = false;
        draft.errorSubmittingLiquidation = true;
        break;
      case UPDATE_LIQUIDATION:
        draft.updatingLiquidation = true;
        draft.errorUpdatingLiquidation = null;
        break;
      case UPDATE_LIQUIDATION_SUCCESS:
        draft.updatingLiquidation = false;
        draft.errorUpdatingLiquidation = false;
        break;
      case UPDATE_LIQUIDATION_ERROR:
        draft.updatingLiquidation = false;
        draft.errorUpdatingLiquidation = true;
        break;
      case LOAD_REQUESTS_TO_LIQUIDATE:
        draft.loadingRequestsToLiquidate = true;
        draft.errorLoadingRequestsToLiquidate = null;
        break;
      case LOAD_REQUESTS_TO_LIQUIDATE_SUCCESS:
        draft.loadingRequestsToLiquidate = false;
        draft.errorLoadingRequestsToLiquidate = false;
        draft.requestsToLiquidate = action.data;
        break;
      case LOAD_REQUESTS_TO_LIQUIDATE_ERROR:
        draft.loadingRequestsToLiquidate = false;
        draft.errorLoadingRequestsToLiquidate = true;
        break;
      case LOAD_REQUEST_TO_LIQUIDATE_DETAILS:
        draft.loadingRequestToLiquidateDetails = true;
        draft.errorLoadingRequestsToLiquidate = null;
        break;
      case LOAD_REQUEST_TO_LIQUIDATE_DETAILS_SUCCESS:
        draft.loadingRequestToLiquidateDetails = false;
        draft.errorLoadingRequestsToLiquidate = false;
        draft.requestToLiquidateDetails = action.data;
        break;
      case LOAD_REQUEST_TO_LIQUIDATE_DETAILS_ERROR:
        draft.loadingRequestToLiquidateDetails = true;
        draft.errorLoadingRequestsToLiquidate = null;
        break;
      case NULLIFY_REQUEST_TO_LIQUIDATE_DETAILS:
        draft.requestToLiquidateDetails = null;
        break;
      case CLEANUP_STORE_ACTION:
        draft.addingLiquidation = false;
        draft.errorAddingLiquidation = null;
        draft.updatingLiquidation = false;
        draft.errorUpdatingLiquidation = null;
        draft.submittingLiquidation = false;
        draft.errorSubmittingLiquidation = null;
        draft.loadingLiquidationDetails = false;
        draft.errorLoadingLiquidationDetails = null;
        draft.liquidationDetails = null;
        draft.loadingRequestsToLiquidate = false;
        draft.errorLoadingRequestsToLiquidate = null;
        draft.requestsToLiquidate = null;
        draft.loadingRequestToLiquidateDetails = false;
        draft.errorLoadingRequestToLiquidateDetails = null;
        draft.requestToLiquidateDetails = null;
        draft.requestTypeToLiquidate = null;
        break;
    }
  });

export default liquidationFormReducer;
