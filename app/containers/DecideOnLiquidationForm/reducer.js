/*
 *
 * DecideOnLiquidationForm reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DECIDE_ON_LIQUIDATION,
  DECIDE_ON_LIQUIDATION_ERROR,
  DECIDE_ON_LIQUIDATION_SUCCESS,
  DEFAULT_ACTION,
  LOAD_LIQUIDATION_DETAILS,
  LOAD_LIQUIDATION_DETAILS_ERROR,
  LOAD_LIQUIDATION_DETAILS_SUCCESS,
} from './constants';

export const initialState = {
  loadingLiquidationDetails: false,
  errorLoadingLiquidationDetails: null,
  liquidationDetails: null,
  decidingOnLiquidation: false,
  errorDecidingOnLiquidation: null,
};

/* eslint-disable default-case, no-param-reassign */
const decideOnLiquidationFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
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
      case DECIDE_ON_LIQUIDATION:
        draft.decidingOnLiquidation = true;
        draft.errorDecidingOnLiquidation = null;
        break;
      case DECIDE_ON_LIQUIDATION_SUCCESS:
        draft.decidingOnLiquidation = false;
        draft.errorDecidingOnLiquidation = false;
        break;
      case DECIDE_ON_LIQUIDATION_ERROR:
        draft.decidingOnLiquidation = false;
        draft.errorDecidingOnLiquidation = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingLiquidationDetails = false;
        draft.errorLoadingLiquidationDetails = null;
        draft.liquidationDetails = null;
        draft.decidingOnLiquidation = false;
        draft.errorDecidingOnLiquidation = null;
        break;
    }
  });

export default decideOnLiquidationFormReducer;
