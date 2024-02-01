/*
 *
 * DecideOnRequests reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_DECIDER_LEVELS,
  LOAD_DECIDER_LEVELS_ERROR,
  LOAD_DECIDER_LEVELS_SUCCESS,
  STORE_CLEANUP,
} from './constants';

export const initialState = {
  loadingDeciderLevels: false,
  errorLoadingDeciderLevels: null,
  deciderLevels: null,
};

/* eslint-disable default-case, no-param-reassign */
const decideOnRequestsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_DECIDER_LEVELS:
        draft.loadingDeciderLevels = true;
        draft.errorLoadingDeciderLevels = null;
        break;
      case LOAD_DECIDER_LEVELS_SUCCESS:
        draft.loadingDeciderLevels = false;
        draft.errorLoadingDeciderLevels = false;
        draft.deciderLevels = action.data;
        break;
      case LOAD_DECIDER_LEVELS_ERROR:
        draft.loadingDeciderLevels = false;
        draft.errorLoadingDeciderLevels = true;
        // draft.errorUserInfo = action.error;
        break;
      case STORE_CLEANUP:
        draft.loadingDeciderLevels = false;
        draft.errorLoadingDeciderLevels = null;
        draft.deciderLevels = action.data;
        break;
    }
  });

export default decideOnRequestsReducer;
