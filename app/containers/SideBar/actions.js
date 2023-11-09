/*
 *
 * SideBar actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_SELECTED_MENU_ACTION,
  CHANGE_SIDEBAR_VISIBILITY_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changeSelectedMenuAction(selectedMenu) {
  return {
    type: CHANGE_SELECTED_MENU_ACTION,
    selectedMenu,
  };
}
export function changeIsSideBarVisibleAction(isSideBarVisible) {
  return {
    type: CHANGE_SIDEBAR_VISIBILITY_ACTION,
    isSideBarVisible,
  };
}
