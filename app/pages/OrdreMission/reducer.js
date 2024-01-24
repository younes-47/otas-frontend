/*
 *
 * OrdreMission reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  ORDRE_MISSION_IDENTITY,
} from './constants';

export const initialState = {
  pageContent: 'TABLE',

  ordreMissionIdentity: null,
};

/* eslint-disable default-case, no-param-reassign */
const ordreMissionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case ORDRE_MISSION_IDENTITY:
        draft.ordreMissionIdentity = action.id;
        break;
      case CLEANUP_STORE_ACTION:
        draft.pageContent = 'TABLE';
        draft.ordreMissionIdentity = null;
        break;
    }
  });

export default ordreMissionReducer;
