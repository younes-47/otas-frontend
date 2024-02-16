/*
 *
 * SideBar reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_SELECTED_MENU_ACTION,
  CHANGE_SIDEBAR_VISIBILITY_ACTION,
  LOAD_DECIDER_LEVELS,
  LOAD_DECIDER_LEVELS_ERROR,
  LOAD_DECIDER_LEVELS_SUCCESS,
} from './constants';

export const initialState = {
  selectedMenu: 'myRequests',
  isSideBarVisible: true,
  loadingDeciderLevels: false,
  errorLoadingDeciderLevels: null,
  deciderLevels: null,
};

/* eslint-disable default-case, no-param-reassign */
const sideBarReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_SELECTED_MENU_ACTION:
        draft.selectedMenu = action.selectedMenu;
        break;
      case CHANGE_SIDEBAR_VISIBILITY_ACTION:
        draft.isSideBarVisible = action.isSideBarVisible;
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
    }
  });

export default sideBarReducer;
