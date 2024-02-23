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
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Grid from '@mui/joy/Grid';
import Grow from '@mui/material/Grow';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CountUp from 'react-countup';
import { PieChart } from '@mui/x-charts/PieChart';
import {
  FormatNumber,
  parseDecimalFromString,
} from 'utils/Custom/stringManipulation';
import DropDownMenu from 'components/DropDownMenu';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
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
  // temporary fix
  const [selectedRole, setSelectedRole] = React.useState('');
  useEffect(() => {
    UsersToggle.forEach((user, index) => {
      if (user.username === localStorage.getItem('username')) {
        setSelectedRole(index);
      }
    });
  }, []);
  const UsersToggle = [
    {},
    {
      role: 'decider',
      username: 'yelasraoui',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InllbGFzcmFvdWkiLCJyb2xlIjoiZGVjaWRlciIsIm5iZiI6MTcwNjEwOTY1MiwiZXhwIjoxNzQ2MTk2MDUyLCJpYXQiOjE3MDYxMDk2NTJ9.P_OI3r4MN7PQD9__OkV0l_YJpxjjWQnq-lWjIQQieSQ',
    },
    {
      role: 'decider',
      username: 'msenhaji',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im1zZW5oYWppIiwicm9sZSI6ImRlY2lkZXIiLCJuYmYiOjE3MDYxMDk2NTIsImV4cCI6MTc0NjE5NjA1MiwiaWF0IjoxNzA2MTA5NjUyfQ.WxRAlJZE78ske9T6pgyukDqiQqUU-6miZHsy8HOn-28',
    },
    {
      role: 'decider',
      username: 'youhammou',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InlvdWhhbW1vdSIsInJvbGUiOiJkZWNpZGVyIiwibmJmIjoxNzA2MTA5NjUyLCJleHAiOjE3NDYxOTYwNTIsImlhdCI6MTcwNjEwOTY1Mn0.AJRyMaSx-2la08LPvQq6Uh3SnYv4ovKB77gL99MnwbA',
    },
    {
      role: 'decider',
      username: 'blahmoudi',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJsYWhtb3VkaSIsInJvbGUiOiJkZWNpZGVyIiwibmJmIjoxNzA2MTA5NjUyLCJleHAiOjE3NDYxOTYwNTIsImlhdCI6MTcwNjEwOTY1Mn0.XG_6m1XB4aBjJgGi697IQ32T3bDa3RvOVRKvJLZYSP0',
    },
    {
      role: 'decider',
      username: 'blahmoudi',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJsYWhtb3VkaSIsInJvbGUiOiJkZWNpZGVyIiwibmJmIjoxNzA2MTA5NjUyLCJleHAiOjE3NDYxOTYwNTIsImlhdCI6MTcwNjEwOTY1Mn0.XG_6m1XB4aBjJgGi697IQ32T3bDa3RvOVRKvJLZYSP0',
    },
    {
      role: 'decider',
      username: 'houguellit',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImhvdWd1ZWxsaXQiLCJyb2xlIjoiZGVjaWRlciIsIm5iZiI6MTcwNjEwOTY1MiwiZXhwIjoxNzQ2MTk2MDUyLCJpYXQiOjE3MDYxMDk2NTJ9.Srjuy-CJnPB7JR_6CxxhyiLuODnduJnwUD77pOpnsvA',
    },
    {
      role: 'requester',
      username: 'ykhoubaz',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InlraG91YmF6Iiwicm9sZSI6InJlcXVlc3RlciIsIm5iZiI6MTcwNzk4MjUyMCwiZXhwIjoyNTA4MDY4OTIwLCJpYXQiOjE3MDc5ODI1MjB9.I9xBreCZAmD_AxAdCzmABUu6Yv7zQAK1cA0-jnTSfNA',
    },
  ];
  const RolesList = [
    {
      id: 1,
      label: 'manager',
    },
    {
      id: 2,
      label: 'HR',
    },
    {
      id: 3,
      label: 'Finance',
    },
    {
      id: 4,
      label: 'General Manager',
    },
    {
      id: 5,
      label: 'Vice President',
    },
    {
      id: 6,
      label: 'Treasury',
    },
    {
      id: 7,
      label: 'Younes Khoubaz',
    },
  ];
  const onSelectedRoleChange = (evt) => {
    setSelectedRole(evt.target.value);
  };
  const changeCurrentUser = () => {
    localStorage.clear();
    localStorage.setItem('username', UsersToggle[selectedRole].username);
    localStorage.setItem('token', UsersToggle[selectedRole].token);
    localStorage.setItem('role', UsersToggle[selectedRole].role);
    window.location.reload();
  };
  useEffect(() => {
    if (
      selectedRole !== '' &&
      localStorage.getItem('username') !== UsersToggle[selectedRole].username
    ) {
      changeCurrentUser();
    }
  }, [selectedRole]);
  // temporary fix
  const dispatch = useDispatch();
  const {
    isSideBarVisible,
    userInfo,
    errorLoadingRequesterStats,
    requesterStats,
  } = useSelector(mapStateToProps);

  useEffect(() => {
    dispatch(loadUserInfoAction());
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
      <DropDownMenu
        label="Roles"
        dataArray={RolesList}
        selectedMenuItem={selectedRole}
        onSelectedMenuItemChange={onSelectedRoleChange}
      />
      <Box display="flex" justifyContent="center" textAlign="center">
        <Stack>
          <Typography
            level="h1"
            sx={{ fontSize: '50px', marginBottom: '10px', marginTop: '20px' }}
          >
            <FormattedMessage id={messages.welcome.id} />{' '}
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
            <FormattedMessage id={messages.sectionInfo.id} />
          </Alert>
        </Stack>
      </Box>
      <Container maxWidth="sm">
        <Typography level="h3" textAlign="center">
          <FormattedMessage id={messages.statisticsHeader.id} />{' '}
          <TrendingUpIcon />
        </Typography>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          marginTop={0.5}
        >
          {requesterStats?.requestsStats?.hoursPassedSinceLastRequest ===
          null ? (
            <>
              <Grow in>
                <Grid xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        level="title-md"
                        variant="plain"
                        color="warning"
                      >
                        <FormattedMessage id={messages.noRequestsAlert.id} />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            </>
          ) : (
            <>
              <Grow in>
                <Grid xs={6}>
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
                <Grid xs={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography level="h1" variant="plain" color="warning">
                        {Math.floor(
                          requesterStats?.requestsStats
                            ?.hoursPassedSinceLastRequest / 24,
                        )}
                      </Typography>
                      <Typography level="title-md">
                        Days Have been passed since your last request.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
              <Grow in timeout={2200}>
                <Grid xs={6}>
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
                      {requesterStats?.requestsStats && (
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
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
              <Grow in timeout={3200}>
                <Grid xs={6}>
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
                      {requesterStats?.moneyStats && (
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
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
