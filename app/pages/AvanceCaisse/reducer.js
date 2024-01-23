/*
 *
 * AvanceCaisse reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_AVANCE_CAISSE_DETAILS,
  LOAD_AVANCE_CAISSE_DETAILS_ERROR,
  LOAD_AVANCE_CAISSE_DETAILS_SUCCESS,
} from './constants';

export const initialState = {
  loadingaAvanceCaisseDetails: false,
  errorLoadingaAvanceCaisseDetails: null,
  avanceCaisseDetails: null,
  pageContent: 'TABLE',
};
/* eslint-disable default-case, no-param-reassign */
const avanceCaisseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_CAISSE_DETAILS:
        draft.loadingaAvanceCaisseDetails = true;
        draft.errorLoadingaAvanceCaisseDetails = null;
        break;
      case LOAD_AVANCE_CAISSE_DETAILS_SUCCESS:
        draft.loadingaAvanceCaisseDetails = false;
        draft.errorLoadingaAvanceCaisseDetails = false;
        draft.avanceCaisseDetails = action.data;
        break;
      case LOAD_AVANCE_CAISSE_DETAILS_ERROR:
        draft.loadingaAvanceCaisseDetails = false;
        draft.errorLoadingaAvanceCaisseDetails = true;
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingaAvanceCaisseDetails = false;
        draft.errorLoadingaAvanceCaisseDetails = null;
        draft.avanceCaisseDetails = null;
        draft.pageContent = 'TABLE';
        break;
    }
  });

export default avanceCaisseReducer;
