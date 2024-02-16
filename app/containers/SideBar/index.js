/**
 *
 * SideBar
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { getAccessiblePages } from 'utils/Custom/checkLogin';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import SideBarButton from 'components/SideBarButton';
import { kebabToCamel } from 'utils/Custom/stringManipulation';
import { accessControlRules } from 'utils/Custom/accessControlRules';
import { useIntl } from 'react-intl';
import PageTitle from 'components/PageTitle';
// import ActivityTimer from 'components/ActivityTimer';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectIsSideBarVisible,
  makeSelectSelectedMenu,
  makeSelectErrorLoadingDeciderLevels,
} from './selectors';
import { changeSelectedMenuAction, loadDeciderLevelsAction } from './actions';
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
import logo from '/app/images/logo-512x512.png';
import messages from './messages';

const mapStateToProps = createStructuredSelector({
  selectedMenu: makeSelectSelectedMenu(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  errorLoadingDeciderLevels: makeSelectErrorLoadingDeciderLevels(),
});

export function SideBar() {
  useInjectReducer({ key: 'sideBar', reducer });
  useInjectSaga({ key: 'sideBar', saga });
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { selectedMenu, isSideBarVisible, errorLoadingDeciderLevels } =
    useSelector(mapStateToProps);

  // Load Decider Levels
  useEffect(() => {
    if (
      errorLoadingDeciderLevels === null &&
      localStorage.getItem('role') === 'decider'
    ) {
      dispatch(loadDeciderLevelsAction());
    }
  }, [errorLoadingDeciderLevels]);
  // Load Decider Levels
  function getSelectedMenu(url) {
    const segments = url.split('/');
    if (segments.length === 2) {
      return kebabToCamel(segments[1]);
    }
    if (segments.length === 3) {
      return kebabToCamel(segments[2]);
    }
    return null;
  }
  const getButtonName = (key) => intl.formatMessage({ id: messages[key].id });

  // console.log(camelToKebab('/Database/ToolChange'));
  // const onSideBarButtonClick = (buttoName, parentName = '') => {
  //   let camelpath;
  //   if (parentName === '') {
  //     camelpath = `/${camelToKebab(buttoName)}`;
  //   } else {
  //     camelpath = `/${camelToKebab(parentName)}/${camelToKebab(buttoName)}`;
  //   }
  //   history.push(camelpath);
  //   dispatch(changeSelectedMenuAction(buttoName));
  // };

  const onSideBarButtonClickTest = (key, subkey = -1) => {
    if (subkey === -1) {
      history.push(accessControlRules[key].path);
      dispatch(changeSelectedMenuAction(key));
    } else {
      history.push(accessControlRules[key][subkey].path);
      dispatch(changeSelectedMenuAction(subkey));
    }
  };

  useEffect(() => {
    // Changes selected Menu based on the location.pathname
    if (selectedMenu !== getSelectedMenu(location.pathname)) {
      dispatch(changeSelectedMenuAction(getSelectedMenu(location.pathname)));
    }
  }, [location]);
  const pages = getAccessiblePages();
  const hideSideBar = () => !isSideBarVisible || location.pathname === '/login';

  return (
    <>
      {/* <ActivityTimer /> */}
      <PageTitle />
      {hideSideBar() ? (
        <></>
      ) : (
        <>
          <Box
            position="fixed"
            top={0}
            bottom={0}
            left={0}
            right="auto"
            width={200}
            bgcolor="#202123"
            component="a"
            border={1}
            p={0}
            key="sidebar BP1"
            sx={{
              overflowY: 'scroll',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              overflow: 'auto',
            }}
          >
            <Box
              sx={{
                width: 'auto',
                margin: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                sx={{
                  alignSelf: 'center',
                  height: 100,
                  width: 100,
                }}
                alt="Dicastal Logo"
                src={logo}
              />
              <h1 style={{ color: 'white', textAlign: 'center', margin: 0 }}>
                Dicastal
              </h1>
            </Box>
            {Object.keys(pages).map((key) => {
              const numberOfSubMenus = Object.keys(pages[key]).length;
              // Normal sideBarButton
              if (numberOfSubMenus === 0) {
                return (
                  <SideBarButton
                    displayName={getButtonName(key)}
                    name={key}
                    key={accessControlRules[key].path}
                    selected={key === selectedMenu}
                    onSidebarButtonClick={() => onSideBarButtonClickTest(key)}
                  />
                );
              }
              // Collapsable sideBarButton
              return (
                <Box key={`collapsableButtonFor${key}`}>
                  <SideBarButton
                    displayName={getButtonName(key)}
                    name={key}
                    key={accessControlRules[key].path}
                    selected={
                      key === selectedMenu ||
                      Object.keys(pages[key]).includes(selectedMenu)
                    }
                    isCollapsable
                    onSidebarButtonClick={() => onSideBarButtonClickTest(key)}
                  />
                  <Collapse
                    key={`collapseFor${key}`}
                    in={
                      key === selectedMenu ||
                      Object.keys(pages[key]).includes(selectedMenu)
                    }
                    timeout="auto"
                    unmountOnExit
                  >
                    {Object.keys(pages[key]).map((subKey) => (
                      // Child sideBarButton
                      <SideBarButton
                        displayName={getButtonName(subKey)}
                        name={subKey}
                        key={accessControlRules[key][subKey].path}
                        selected={subKey === selectedMenu}
                        isChild
                        onSidebarButtonClick={() =>
                          onSideBarButtonClickTest(key, subKey)
                        }
                      />
                    ))}
                  </Collapse>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </>
  );
}

SideBar.propTypes = {
  // selectedMenu: PropTypes.string,
  // onSideBarButtonClick: PropTypes.func,
};

export default SideBar;
