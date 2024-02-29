/**
 *
 * Unauthorized
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import Typography from '@mui/joy/Typography';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function Unauthorized() {
  useInjectReducer({ key: 'unauthorized', reducer });
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
      <Box display="flex" justifyContent="center" textAlign="center">
        <Stack>
          <Typography
            color="danger"
            variant="outlined"
            level="h1"
            gutterBottom
            marginTop={5}
          >
            Unauthorized
          </Typography>
          <Typography color="danger" variant="soft" level="title-lg">
            You do not have permission to access this Page.
          </Typography>

          {/* <Link
            to="/my-requests"
            style={{ fontSize: '24px', marginBottom: '40px' }}
          >
            Go to MyRequests
          </Link> */}
        </Stack>
      </Box>
    </Box>
  );
}

Unauthorized.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default Unauthorized;
