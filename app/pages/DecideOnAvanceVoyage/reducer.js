/*
 *
 * DecideOnAvanceVoyage reducer
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
  avanceVoyageIdentity: null,
  pageContent: 'TABLE',
};

/* eslint-disable default-case, no-param-reassign */
const decideOnAvanceVoyageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case AVANCE_VOYAGE_IDENTITY:
        draft.avanceVoyageIdentity = action.id;
        break;
      case CLEANUP_STORE_ACTION:
        draft.pageContent = 'TABLE';
        draft.avanceVoyageIdentity = null;
    }
  });

export default decideOnAvanceVoyageReducer;
