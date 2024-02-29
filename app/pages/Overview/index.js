/**
 *
 * Overview
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectErrorFullName,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectLoadingFullName,
} from './selectors';
import { loadFullNameAction } from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  loadingFullName: makeSelectLoadingFullName(),
  errorFullName: makeSelectErrorFullName(),
  firstName: makeSelectFirstName(),
  lastName: makeSelectLastName(),
});
export function Overview() {
  useInjectReducer({ key: 'overview', reducer });
  useInjectSaga({ key: 'overview', saga });
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const dispatch = useDispatch();
  const {
    isSideBarVisible,
    // loadingFullName,
    // errorFullName,
    firstName,
    lastName,
  } = useSelector(mapStateToProps);
  const loadFullName = () => {
    dispatch(loadFullNameAction(username));
  };
  useEffect(() => {
    if (firstName === '' || lastName === '') {
      loadFullName();
    }
  }, [firstName, lastName]);
  return (
    <Box
      position="fixed"
      top={64}
      bottom={0}
      left={isSideBarVisible ? 200 : 0}
      right={0}
      sx={{
        overflowY: 'scroll',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        overflow: 'auto',
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        // alignItems="center"
        textAlign="center"
        minHeight="100vh"
      >
        {firstName !== '' && lastName !== '' ? (
          <>
            <Stack>
              <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
                Welcome {lastName} {firstName}
              </h1>
              {role === 'minimal-access' ? (
                <p style={{ fontSize: '24px', marginBottom: '40px' }}>
                  If you require additional access please contact your
                  administrator
                </p>
              ) : (
                <p style={{ fontSize: '24px', marginBottom: '40px' }}>
                  to the Application name goes here
                </p>
              )}
            </Stack>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}

Overview.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default Overview;
