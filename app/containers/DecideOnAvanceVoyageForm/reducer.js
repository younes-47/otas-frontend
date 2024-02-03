/*
 *
 * DecideOnAvanceVoyageForm reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  CONFIRM_FUNDS_DELIVERY,
  CONFIRM_FUNDS_DELIVERY_ERROR,
  CONFIRM_FUNDS_DELIVERY_SUCCESS,
  DECIDE_ON_AVANCE_VOYAGE,
  DECIDE_ON_AVANCE_VOYAGE_ERROR,
  DECIDE_ON_AVANCE_VOYAGE_SUCCESS,
  DEFAULT_ACTION,
  LOAD_AVANCE_VOYAGE_DETAILS,
  LOAD_AVANCE_VOYAGE_DETAILS_ERROR,
  LOAD_AVANCE_VOYAGE_DETAILS_SUCCESS,
  MARK_FUNDS_AS_PREPARED,
  MARK_FUNDS_AS_PREPARED_ERROR,
  MARK_FUNDS_AS_PREPARED_SUCCESS,
} from './constants';

export const initialState = {
  loadingAvanceVoyageDetails: false,
  errorLoadingAvanceVoyageDetails: null,
  avanceVoyageDetails: null,
  decidingOnAvanceVoyage: false,
  errorDecidingOnAvanceVoyage: null,
  markingAvanceVoyageFundsAsPrepared: false,
  errorMarkingAvanceVoyageFundsAsPrepared: null,
  confirmingAvanceVoyageFundsDelivery: false,
  errorConfirmingAvanceVoyageFundsDelivery: null,
};

/* eslint-disable default-case, no-param-reassign */
const decideOnAvanceVoyageFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_VOYAGE_DETAILS:
        draft.loadingAvanceVoyageDetails = true;
        draft.errorLoadingAvanceVoyageDetails = null;
        break;
      case LOAD_AVANCE_VOYAGE_DETAILS_SUCCESS:
        draft.loadingAvanceVoyageDetails = false;
        draft.errorLoadingAvanceVoyageDetails = false;
        draft.avanceVoyageDetails = action.data;
        break;
      case LOAD_AVANCE_VOYAGE_DETAILS_ERROR:
        draft.loadingAvanceVoyageDetails = false;
        draft.errorLoadingAvanceVoyageDetails = true;
        break;
      case DECIDE_ON_AVANCE_VOYAGE:
        draft.decidingOnAvanceVoyage = true;
        draft.errorDecidingOnAvanceVoyage = null;
        break;
      case DECIDE_ON_AVANCE_VOYAGE_SUCCESS:
        draft.decidingOnAvanceVoyage = false;
        draft.errorDecidingOnAvanceVoyage = false;
        break;
      case DECIDE_ON_AVANCE_VOYAGE_ERROR:
        draft.decidingOnAvanceVoyage = false;
        draft.errorDecidingOnAvanceVoyage = true;
        break;
      case MARK_FUNDS_AS_PREPARED:
        draft.markingAvanceVoyageFundsAsPrepared = true;
        draft.errorMarkingAvanceVoyageFundsAsPrepared = null;
        break;
      case MARK_FUNDS_AS_PREPARED_SUCCESS:
        draft.markingAvanceVoyageFundsAsPrepared = false;
        draft.errorMarkingAvanceVoyageFundsAsPrepared = false;
        break;
      case MARK_FUNDS_AS_PREPARED_ERROR:
        draft.markingAvanceVoyageFundsAsPrepared = false;
        draft.errorMarkingAvanceVoyageFundsAsPrepared = true;
        break;
      case CONFIRM_FUNDS_DELIVERY:
        draft.confirmingAvanceVoyageFundsDelivery = true;
        draft.errorConfirmingAvanceVoyageFundsDelivery = null;
        break;
      case CONFIRM_FUNDS_DELIVERY_SUCCESS:
        draft.confirmingAvanceVoyageFundsDelivery = false;
        draft.errorConfirmingAvanceVoyageFundsDelivery = false;
        break;
      case CONFIRM_FUNDS_DELIVERY_ERROR:
        draft.confirmingAvanceVoyageFundsDelivery = false;
        draft.errorConfirmingAvanceVoyageFundsDelivery = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceVoyageDetails = false;
        draft.errorLoadingAvanceVoyageDetails = null;
        draft.avanceVoyageDetails = null;
        draft.decidingOnAvanceVoyage = false;
        draft.errorDecidingOnAvanceVoyage = null;
        draft.markingAvanceVoyageFundsAsPrepared = false;
        draft.errorMarkingAvanceVoyageFundsAsPrepared = null;
        draft.confirmingAvanceVoyageFundsDelivery = false;
        draft.errorConfirmingAvanceVoyageFundsDelivery = null;
        break;
    }
  });

export default decideOnAvanceVoyageFormReducer;
