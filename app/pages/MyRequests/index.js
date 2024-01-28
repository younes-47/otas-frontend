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
import Typography from '@mui/joy/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import Stack from '@mui/material/Stack';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Alert, Container, Grid, Grow } from '@mui/material';
import { Card, CardContent } from '@mui/joy';
import CountUp from 'react-countup/build/CountUp';
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
    // only token, username, and role => dispatch to get userInfo
    if (localStorage.length === 3) {
      dispatch(loadUserInfoAction());
    }
  }, []);

  useEffect(() => {
    if (userInfo !== null) {
      localStorage.setItem('firstName', userInfo.firstName);
      localStorage.setItem('lastName', userInfo.lastName);
      localStorage.setItem('registrationNumber', userInfo.registrationNumber);
      localStorage.setItem('jobTitle', userInfo.jobTitle);
      localStorage.setItem('department', userInfo.department);
      localStorage.setItem('managerUserName', userInfo.managerUserName);
      localStorage.setItem('level', userInfo.level);
    }
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
              marginBottom: '60px',
              textAlign: 'center',
            }}
          >
            This is the section, where you can access or place your requests.
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
          <Grow>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h1" variant="plain" color="primary">
                    5
                  </Typography>
                  <Typography level="title-md">
                    Requests are in the process of approval.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grow>

          <Grow timeout={1000}>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h1" variant="plain" color="success">
                    <CountUp delay={0} start={0} end={89} duration={2.75} />
                  </Typography>
                  <Typography level="title-md">
                    requests have been created so far!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grow>

          <Grow timeout={2000}>
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
          </Grow>

          <Grow timeout={3000}>
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
          </Grow>
        </Grid>
      </Container>
    </Box>
  );
}
