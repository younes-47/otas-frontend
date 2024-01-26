/**
 *
 * DecideOnRequests
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Typography from '@mui/joy/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Box, Stack } from '@mui/system';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { Alert } from '@mui/material';
import { Card, CardContent, Container, Grid } from '@mui/joy';
import { makeSelectUserInfo } from './selectors';
import reducer from './reducer';
import saga from './saga';
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
          <Typography
            level="h1"
            sx={{ fontSize: '50px', marginBottom: '10px', marginTop: '20px' }}
          >
            Welcome{' '}
            {localStorage.getItem('firstName') !== null
              ? `${localStorage.getItem('firstName')} ${localStorage.getItem(
                  'lastName',
                )}`
              : `${userInfo?.firstName} ${userInfo?.lastName}`}
          </Typography>
          <Alert
            severity="info"
            style={{
              fontSize: '20px',
              marginBottom: '30px',
              textAlign: 'center',
            }}
          >
            This is the section where you can access and decide upon requests of
            others as a {userInfo?.level}
          </Alert>
        </Stack>
      </Box>

      <Container maxWidth="sm">
        <Typography
          level="h3"
          textAlign="center"
          // sx={{ fontSize: '50px', marginBottom: '10px', marginTop: '20px' }}
        >
          Statistics <TrendingUpIcon />
        </Typography>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          marginTop={0.5}
        >
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="h1" variant="plain" color="primary">
                  5
                </Typography>
                <Typography level="title-md">
                  Requests are pending your approval.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="h1" variant="plain" color="success">
                  89
                </Typography>
                <Typography level="title-md">
                  requests have been decided upon!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="h1" variant="plain" color="success">
                  70%
                </Typography>
                <Typography level="title-md">
                  of requests have been approved!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="h1" variant="plain" color="danger">
                  0
                </Typography>
                <Typography level="title-md">
                  Requests have been rejected.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more Grid items as needed */}
        </Grid>
      </Container>
    </Box>
  );
}

DecideOnRequests.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnRequests;
