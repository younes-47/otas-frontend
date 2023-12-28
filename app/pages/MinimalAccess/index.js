/**
 *
 * MinimalAccess
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Box, Stack } from '@mui/system';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { Alert, AlertTitle } from '@mui/material';
import makeSelectMinimalAccess from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const mapStateToProps = createStructuredSelector({
  minimalAccess: makeSelectMinimalAccess(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function MinimalAccess() {
  useInjectReducer({ key: 'minimalAccess', reducer });
  useInjectSaga({ key: 'minimalAccess', saga });
  const { isSideBarVisible } = useSelector(mapStateToProps);

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
        flexDirection="column"
        alignItems="center"
        marginTop={5}
      >
        <Alert severity="error">
          <AlertTitle>ACCESS DENIED!</AlertTitle>
          <strong>
            You do not have access to this application. Please consult the IT
            department.
          </strong>
        </Alert>
      </Box>
    </Box>
  );
}

MinimalAccess.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default MinimalAccess;
