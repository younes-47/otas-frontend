/**
 *
 * MyRequests
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import Box from '@mui/material/Box';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { createStructuredSelector } from 'reselect';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import Stack from '@mui/material/Stack';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import saga from './saga';
import reducer from './reducer';
import { cleanupStoreAction, loadUserInfoAction } from './actions';
import { makeSelectUserInfo } from './selectors';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  userInfo: makeSelectUserInfo(),
});

export default function MyRequests() {
  useInjectReducer({ key: 'myRequests', reducer });
  useInjectSaga({ key: 'myRequests', saga });
  const dispatch = useDispatch();
  const { isSideBarVisible, userInfo } = useSelector(mapStateToProps);

  useEffect(() => {
    dispatch(loadUserInfoAction());
  }, [userInfo]);
  useEffect(
    () => () => {
      dispatch(cleanupStoreAction());
    },
    [],
  );
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
      <Box display="flex" justifyContent="center" textAlign="center">
        <Stack>
          <h1 style={{ fontSize: '72px', marginBottom: '10px' }}>
            Welcome {userInfo.firstName} {userInfo.lastName}
          </h1>

          <Alert
            severity="info"
            style={{
              fontSize: '20px',
              marginBottom: '30px',
              textAlign: 'center',
            }}
          >
            This is my Requests section, where you can access or place your
            requests.
          </Alert>
        </Stack>
      </Box>
    </Box>
  );
}

// MyRequests.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };
