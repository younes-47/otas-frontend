/**
 *
 * MyRequests
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import Stack from '@mui/material/Stack';
import { Link, useHistory, useLocation } from 'react-router-dom';


const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export default function MyRequests() {
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
          <h1 style={{ fontSize: '72px', marginBottom: '10px' }}>My Requests Section</h1>
          <p style={{ fontSize: '24px', marginBottom: '30px' }}>
            In this section you can access and place a request.
          </p>
          {/* <Link
            to="/overview"
            style={{ fontSize: '24px', marginBottom: '40px' }}
          >
            Go to Overview
          </Link> */}
        </Stack>
      </Box>
    </Box>
  );
}

// MyRequests.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

// export default compose(withConnect)(MyRequests);
