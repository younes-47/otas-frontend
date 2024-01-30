/*
 *
 * AvanceVoyage reducer
 *
 */
import produce from 'immer';
import {
  AVANCE_VOYAGE_IDENTITY,
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
} from './constants';

export const initialState = {
  loadingAvanceVoyages: false,
  errorLoadingAvanceVoyages: null,
  avanceVoyages: [],
  pageContent: 'TABLE',
  avanceVoyageIdentity: null,
};

/* eslint-disable default-case, no-param-reassign */
const avanceVoyageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case AVANCE_VOYAGE_IDENTITY:
        draft.avanceVoyageIdentity = action.data;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceVoyages = false;
        draft.errorLoadingAvanceVoyages = null;
        draft.avanceVoyages = [];
        draft.pageContent = 'TABLE';
        draft.avanceVoyageIdentity = null;
    }
  });

export default avanceVoyageReducer;
