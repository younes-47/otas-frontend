/*
 *
 * DepenseCaisse reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_DEPENSE_CAISSES,
  LOAD_DEPENSE_CAISSES_ERROR,
  LOAD_DEPENSE_CAISSES_SUCCESS,
} from './constants';

export const initialState = {
  loadingDepenseCaisses: false,
  errorLoadingDepenseCaisses: null,
  depenseCaisses: [],
};
/* eslint-disable default-case, no-param-reassign */
const depenseCaisseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_DEPENSE_CAISSES:
        draft.loadingDepenseCaisses = true;
        draft.errorLoadingDepenseCaisses = false;
        break;
      case LOAD_DEPENSE_CAISSES_ERROR:
        draft.loadingDepenseCaisses = false;
        draft.errorLoadingDepenseCaisses = action.error;
        break;
      case LOAD_DEPENSE_CAISSES_SUCCESS:
        draft.loadingDepenseCaisses = false;
        draft.errorLoadingDepenseCaisses = false;
        draft.depenseCaisses = action.data;
        break;
    }
  });

export default depenseCaisseReducer;
