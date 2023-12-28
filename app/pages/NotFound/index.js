/**
 *
 * NotFound
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Link, useHistory, useLocation } from 'react-router-dom';
import makeSelectNotFound from './selectors';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  notFound: makeSelectNotFound(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});
export function NotFound() {
  useInjectReducer({ key: 'notFound', reducer });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/not-found') {
      history.push('/not-found');
    }
  }, [location]);

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
          <h1 style={{ fontSize: '72px', marginBottom: '20px' }}>404</h1>
          <p style={{ fontSize: '24px', marginBottom: '40px' }}>
            We can&apos;t seem to find the page you&apos;re looking for.
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

NotFound.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default NotFound;
