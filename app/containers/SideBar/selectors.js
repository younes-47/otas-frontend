import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sideBar state domain
 */

const selectSideBarDomain = (state) => state.sideBar || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SideBar
 */

const makeSelectSideBar = () =>
  createSelector(selectSideBarDomain, (substate) => substate);
const makeSelectSelectedMenu = () =>
  createSelector(selectSideBarDomain, (substate) => substate.selectedMenu);
const makeSelectIsSideBarVisible = () =>
  createSelector(selectSideBarDomain, (substate) => substate.isSideBarVisible);

export default makeSelectSideBar;
export {
  selectSideBarDomain,
  makeSelectSelectedMenu,
  makeSelectIsSideBarVisible,
};
