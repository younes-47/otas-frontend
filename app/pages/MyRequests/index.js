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
import CountUp from 'react-countup';
import { PieChart } from '@mui/x-charts';
import {
  FormatNumber,
  parseDecimalFromString,
} from 'utils/Custom/stringManipulation';
import saga from './saga';
import reducer from './reducer';
import {
  cleanupStoreAction,
  loadRequesterStatsAction,
  loadUserInfoAction,
} from './actions';
import {
  makeSelectErrorLoadingRequesterStats,
  makeSelectRequesterStats,
  makeSelectUserInfo,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  userInfo: makeSelectUserInfo(),
  errorLoadingRequesterStats: makeSelectErrorLoadingRequesterStats(),
  requesterStats: makeSelectRequesterStats(),
});

export default function MyRequests() {
  useInjectReducer({ key: 'myRequests', reducer });
  useInjectSaga({ key: 'myRequests', saga });
  const dispatch = useDispatch();
  const {
    isSideBarVisible,
    userInfo,
    errorLoadingRequesterStats,
    requesterStats,
  } = useSelector(mapStateToProps);

  useEffect(() => {
    // only token, username, and role => dispatch to get userInfo
    if (localStorage.length === 3) {
      dispatch(loadUserInfoAction());
    }
  }, []);

  useEffect(() => {
    if (errorLoadingRequesterStats === null) {
      dispatch(loadRequesterStatsAction());
    }
  }, []);

  useEffect(() => {
    if (userInfo !== null) {
      localStorage.setItem('firstName', userInfo.firstName);
      localStorage.setItem('lastName', userInfo.lastName);
      localStorage.setItem('registrationNumber', userInfo.registrationNumber);
      localStorage.setItem('jobTitle', userInfo.jobTitle);
      localStorage.setItem('department', userInfo.department);
      localStorage.setItem('preferredLanguage', userInfo.preferredLanguage);
      localStorage.setItem('managerUserName', userInfo.managerUserName);
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
          <Grow in>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h1" variant="plain" color="primary">
                    {requesterStats?.requestsStats?.allOngoingRequestsCount}
                  </Typography>
                  <Typography level="title-md">
                    Requests are in the process of approval.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grow>
          <Grow in timeout={1200}>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h1" variant="plain" color="warning">
                    {Math.floor(
                      requesterStats?.requestsStats
                        ?.hoursPassedSinceLastRequest / 24,
                    )}
                    {/* &nbsp;Days&nbsp; */}
                    {/* {Math.floor(
                      requesterStats?.requestsStats
                        ?.hoursPassedSinceLastRequest,
                    ) % 24}
                    &nbsp;Hours */}
                  </Typography>
                  <Typography level="title-md">
                    Days Have been passed since your last request.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grow>
          <Grow in timeout={2200}>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h1" variant="plain" color="success">
                    <CountUp
                      delay={0}
                      start={0}
                      end={requesterStats?.requestsStats?.allTimeCount}
                      duration={3.2}
                    />
                  </Typography>
                  <Typography level="title-md">
                    requests have been created so far!
                  </Typography>
                  {/* <Box display="flex" alignItems="center" > */}
                  <PieChart
                    slotProps={{ legend: { hidden: true } }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '0',
                    }}
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value:
                              requesterStats?.requestsStats
                                ?.ordreMissionsAllTimeCount,
                            label: 'Ordre Mission',
                            color: '#ef7765',
                          },
                          {
                            id: 1,
                            value:
                              requesterStats?.requestsStats
                                ?.avanceVoyagesAllTimeCount,
                            label: 'Avance Voyage',
                            color: '#00a697',
                          },
                          {
                            id: 2,
                            value:
                              requesterStats?.requestsStats
                                ?.avanceCaissesAllTimeCount,
                            label: 'Avance Caisse',
                            color: '#f3bc00',
                          },
                          {
                            id: 3,
                            value:
                              requesterStats?.requestsStats
                                ?.depenseCaissesAllTimeCount,
                            label: 'Depense Caisse',
                            color: '#0075a4',
                          },
                        ],
                      },
                    ]}
                    width={226.3}
                    height={200}
                  />
                  {/* </Box> */}
                </CardContent>
              </Card>
            </Grid>
          </Grow>

          <Grow in timeout={3200}>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h3" variant="plain" color="success">
                    <CountUp
                      delay={0}
                      start={0}
                      end={requesterStats?.moneyStats?.allTimeAmountMAD}
                      separator={
                        localStorage.getItem('preferredLanguage') === 'en'
                          ? ','
                          : ' '
                      }
                      decimal={
                        localStorage.getItem('preferredLanguage') === 'en'
                          ? '.'
                          : ','
                      }
                      decimals={2}
                      duration={3.2}
                    />
                    &nbsp;MAD
                  </Typography>
                  <Typography level="h3" variant="plain" color="success">
                    <CountUp
                      delay={0}
                      start={0}
                      end={requesterStats?.moneyStats?.allTimeAmountEUR}
                      separator={
                        localStorage.getItem('preferredLanguage') === 'en'
                          ? ','
                          : ' '
                      }
                      decimal={
                        localStorage.getItem('preferredLanguage') === 'en'
                          ? '.'
                          : ','
                      }
                      decimals={2}
                      duration={3.2}
                    />
                    &nbsp;EUR
                  </Typography>
                  <Typography level="title-md">
                    have been requested so far!
                  </Typography>
                  <PieChart
                    slotProps={{ legend: { hidden: true } }}
                    height={200}
                    width={226.3}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value:
                              requesterStats?.moneyStats
                                ?.avanceVoyagesAllTimeAmountMAD,

                            label: 'Avance Voyage MAD',
                            color: '#00a697',
                          },
                          {
                            id: 1,
                            value:
                              requesterStats?.moneyStats
                                ?.avanceCaissesAllTimeAmountMAD,

                            label: 'Avance Caisse MAD',
                            color: '#f3bc00',
                          },
                          {
                            id: 2,
                            value:
                              requesterStats?.moneyStats
                                ?.depenseCaissesAllTimeAmountMAD,

                            label: 'Depense Caisse MAD',
                            color: '#0075a4',
                          },
                        ],
                        outerRadius: 50,
                      },
                      {
                        data: [
                          {
                            id: 0,
                            value:
                              requesterStats?.moneyStats
                                ?.avanceVoyagesAllTimeAmountEUR,

                            label: 'Avance Voyage EUR',
                            color: '#00a697',
                          },
                          {
                            id: 1,
                            value:
                              requesterStats?.moneyStats
                                ?.avanceCaissesAllTimeAmountEUR,

                            label: 'Avance Caisse EUR',
                            color: '#f3bc00',
                          },
                          {
                            id: 2,
                            value:
                              requesterStats?.moneyStats
                                ?.depenseCaissesAllTimeAmountEUR,

                            label: 'Depense Caisse EUR',
                            color: '#0075a4',
                          },
                        ],
                        innerRadius: 40,
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grow>
        </Grid>
      </Container>
    </Box>
  );
}
