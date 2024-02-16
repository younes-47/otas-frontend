/*
 *
 * SideBar actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_SELECTED_MENU_ACTION,
  CHANGE_SIDEBAR_VISIBILITY_ACTION,
  LOAD_DECIDER_LEVELS,
  LOAD_DECIDER_LEVELS_ERROR,
  LOAD_DECIDER_LEVELS_SUCCESS,
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

export function loadDeciderLevelsAction() {
  return {
    type: LOAD_DECIDER_LEVELS,
  };
}

export function loadDeciderLevelsSuccessAction(data) {
  return {
    type: LOAD_DECIDER_LEVELS_SUCCESS,
    data,
  };
}

export function loadDeciderLevelsErrorAction(error) {
  return {
    type: LOAD_DECIDER_LEVELS_ERROR,
    error,
  };
}
