/*
 *
 * DecideOnAvanceCaisseForm reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  CONFIRM_FUNDS_DELIVERY,
  CONFIRM_FUNDS_DELIVERY_ERROR,
  CONFIRM_FUNDS_DELIVERY_SUCCESS,
  DECIDE_ON_AVANCE_CAISSE,
  DECIDE_ON_AVANCE_CAISSE_ERROR,
  DECIDE_ON_AVANCE_CAISSE_SUCCESS,
  DEFAULT_ACTION,
  LOAD_AVANCE_CAISSE_DETAILS,
  LOAD_AVANCE_CAISSE_DETAILS_ERROR,
  LOAD_AVANCE_CAISSE_DETAILS_SUCCESS,
  MARK_FUNDS_AS_PREPARED,
  MARK_FUNDS_AS_PREPARED_ERROR,
  MARK_FUNDS_AS_PREPARED_SUCCESS,
} from './constants';

export const initialState = {
  loadingAvanceCaisseDetails: false,
  errorLoadingAvanceCaisseDetails: null,
  avanceCaisseDetails: null,
  decidingOnAvanceCaisse: false,
  errorDecidingOnAvanceCaisse: null,
  markingAvanceCaisseFundsAsPrepared: false,
  errorMarkingAvanceCaisseFundsAsPrepared: null,
  confirmingAvanceCaisseFundsDelivery: false,
  errorConfirmingAvanceCaisseFundsDelivery: null,
};

/* eslint-disable default-case, no-param-reassign */
const decideOnAvanceCaisseFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_CAISSE_DETAILS:
        draft.loadingAvanceCaisseDetails = true;
        draft.errorLoadingAvanceCaisseDetails = null;
        break;
      case LOAD_AVANCE_CAISSE_DETAILS_SUCCESS:
        draft.loadingAvanceCaisseDetails = false;
        draft.errorLoadingAvanceCaisseDetails = false;
        draft.avanceCaisseDetails = action.data;
        break;
      case LOAD_AVANCE_CAISSE_DETAILS_ERROR:
        draft.loadingAvanceCaisseDetails = false;
        draft.errorLoadingAvanceCaisseDetails = true;
        break;
      case DECIDE_ON_AVANCE_CAISSE:
        draft.decidingOnAvanceCaisse = true;
        draft.errorDecidingOnAvanceCaisse = null;
        break;
      case DECIDE_ON_AVANCE_CAISSE_SUCCESS:
        draft.decidingOnAvanceCaisse = false;
        draft.errorDecidingOnAvanceCaisse = false;
        break;
      case DECIDE_ON_AVANCE_CAISSE_ERROR:
        draft.decidingOnAvanceCaisse = false;
        draft.errorDecidingOnAvanceCaisse = true;
        break;
      case MARK_FUNDS_AS_PREPARED:
        draft.markingAvanceCaisseFundsAsPrepared = true;
        draft.errorMarkingAvanceCaisseFundsAsPrepared = null;
        break;
      case MARK_FUNDS_AS_PREPARED_SUCCESS:
        draft.markingAvanceCaisseFundsAsPrepared = false;
        draft.errorMarkingAvanceCaisseFundsAsPrepared = false;
        break;
      case MARK_FUNDS_AS_PREPARED_ERROR:
        draft.markingAvanceCaisseFundsAsPrepared = false;
        draft.errorMarkingAvanceCaisseFundsAsPrepared = true;
        break;
      case CONFIRM_FUNDS_DELIVERY:
        draft.confirmingAvanceCaisseFundsDelivery = true;
        draft.errorConfirmingAvanceCaisseFundsDelivery = null;
        break;
      case CONFIRM_FUNDS_DELIVERY_SUCCESS:
        draft.confirmingAvanceCaisseFundsDelivery = false;
        draft.errorConfirmingAvanceCaisseFundsDelivery = false;
        break;
      case CONFIRM_FUNDS_DELIVERY_ERROR:
        draft.confirmingAvanceCaisseFundsDelivery = false;
        draft.errorConfirmingAvanceCaisseFundsDelivery = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceCaisseDetails = false;
        draft.errorLoadingAvanceCaisseDetails = null;
        draft.avanceCaisseDetails = null;
        draft.decidingOnAvanceCaisse = false;
        draft.errorDecidingOnAvanceCaisse = null;
        draft.markingAvanceCaisseFundsAsPrepared = false;
        draft.errorMarkingAvanceCaisseFundsAsPrepared = null;
        draft.confirmingAvanceCaisseFundsDelivery = false;
        draft.errorConfirmingAvanceCaisseFundsDelivery = null;

        break;
    }
  });

export default decideOnAvanceCaisseFormReducer;
