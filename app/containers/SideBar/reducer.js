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
} from './constants';

export const initialState = {
  selectedMenu: 'myRequests',
  isSideBarVisible: true,
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
    }
  });

export default sideBarReducer;
