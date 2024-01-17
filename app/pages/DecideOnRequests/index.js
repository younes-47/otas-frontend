/**
 *
 * DecideOnRequests
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Box, Stack } from '@mui/system';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { Alert } from '@mui/material';
import makeSelectDecideOnRequests, { makeSelectUserInfo } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { cleanupStoreAction, loadUserInfoAction } from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  userInfo: makeSelectUserInfo(),
});

export function DecideOnRequests() {
  useInjectReducer({ key: 'decideOnRequests', reducer });
  useInjectSaga({ key: 'decideOnRequests', saga });
  const dispatch = useDispatch();
  const { isSideBarVisible, userInfo } = useSelector(mapStateToProps);

  useEffect(() => {
    dispatch(loadUserInfoAction());
  }, []);

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
          <Alert
            severity="info"
            style={{
              fontSize: '20px',
              marginBottom: '30px',
              marginTop: '80px',
              textAlign: 'center',
            }}
          >
            This is the section where you can access and decide upon requests of
            others as a {userInfo?.level}
          </Alert>
        </Stack>
      </Box>
    </Box>
  );
}

DecideOnRequests.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnRequests;
