/*
 *
 * DepenseCaisse reducer
 *
 */
import produce from 'immer';
import { ORDRE_MISSION_IDENTITY } from 'pages/OrdreMission/constants';
import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DEPENSE_CAISSE_IDENTITY,
} from './constants';

export const initialState = {
  pageContent: 'TABLE',
  depenseCaisseIdentity: null,
};
/* eslint-disable default-case, no-param-reassign */
const depenseCaisseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case DEPENSE_CAISSE_IDENTITY:
        draft.depenseCaisseIdentity = action.id;
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case CLEANUP_STORE_ACTION:
        draft.pageContent = 'TABLE';
        break;
    }
  });

export default depenseCaisseReducer;
