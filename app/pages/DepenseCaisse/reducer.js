/*
 *
 * DepenseCaisse reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LLOAD_DEPENSE_CAISSE_DETAILS_ERROR,
  LOAD_DEPENSE_CAISSE_DETAILS,
  LOAD_DEPENSE_CAISSE_DETAILS_SUCCESS,
} from './constants';

export const initialState = {
  pageContent: 'TABLE',
  loadingDepenseCaisseDetails: false,
  errorLoadingDepenseCaisseDetails: null,
  depenseCaisseDetails: null,
};
/* eslint-disable default-case, no-param-reassign */
const depenseCaisseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_DEPENSE_CAISSE_DETAILS:
        draft.loadingDepenseCaisseDetails = true;
        draft.errorLoadingDepenseCaisseDetails = null;
        break;
      case LOAD_DEPENSE_CAISSE_DETAILS_SUCCESS:
        draft.loadingDepenseCaisseDetails = false;
        draft.errorLoadingDepenseCaisseDetails = false;
        draft.depenseCaisseDetails = action.data;
        break;
      case LLOAD_DEPENSE_CAISSE_DETAILS_ERROR:
        draft.loadingDepenseCaisseDetails = false;
        draft.errorLoadingDepenseCaisseDetails = true;
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingDepenseCaisseDetails = false;
        draft.errorLoadingDepenseCaisseDetails = null;
        draft.depenseCaisseDetails = null;
        draft.pageContent = 'TABLE';
        break;
    }
  });

export default depenseCaisseReducer;
