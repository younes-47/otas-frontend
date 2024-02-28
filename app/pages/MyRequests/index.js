/**
 *
 * MyRequests
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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
import { changeLocale } from 'containers/LanguageProvider/actions';
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
  }, [requesterStats]);

  useEffect(() => {
    if (userInfo !== null) {
      localStorage.setItem('firstName', userInfo.firstName);
      localStorage.setItem('lastName', userInfo.lastName);
      localStorage.setItem('registrationNumber', userInfo.registrationNumber);
      localStorage.setItem('jobTitle', userInfo.jobTitle);
      localStorage.setItem('department', userInfo.department);
      localStorage.setItem('preferredLanguage', userInfo.preferredLanguage);
      localStorage.setItem('managerUserName', userInfo.managerUserName);
      dispatch(
        changeLocale(
          userInfo.preferredLanguage ? userInfo.preferredLanguage : 'en',
        ),
      );
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={3}
      >
        <Box gap={3} width="80%">
          <Grow in>
            <Card variant="outlined">
              <CardContent>
                <Typography level="h4">
                  <FormattedMessage
                    id={messages.requestsAwaitingApprovalHeader.id}
                  />
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  marginTop={3}
                  flexDirection="row"
                >
                  <Card
                    variant="outlined"
                    sx={{ background: '#ef7765', width: '180px' }}
                  >
                    <Typography
                      level="title-lg"
                      display="flex"
                      justifyContent="center"
                      fontSize="40px"
                      fontWeight="600"
                      sx={{ color: 'white' }}
                    >
                      {requesterStats?.pendingOrdreMissionsCount}
                    </Typography>
                    <Typography
                      level="body-md"
                      fontSize="20px"
                      display="flex"
                      justifyContent="center"
                      fontWeight="400"
                      sx={{ color: 'white' }}
                    >
                      <FormattedMessage id={messages.ordreMissionHeader.id} />
                    </Typography>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{ background: '#00a697', width: '180px' }}
                  >
                    <Typography
                      level="title-lg"
                      display="flex"
                      justifyContent="center"
                      fontSize="40px"
                      fontWeight="600"
                      sx={{ color: 'white' }}
                    >
                      {requesterStats?.pendingAvanceVoyagesCount}
                    </Typography>
                    <Typography
                      level="body-md"
                      fontSize="20px"
                      display="flex"
                      justifyContent="center"
                      fontWeight="400"
                      sx={{ color: 'white' }}
                    >
                      <FormattedMessage id={messages.avanceVoyageHeader.id} />
                    </Typography>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{ background: '#f3bc00', width: '180px' }}
                  >
                    <Typography
                      level="title-lg"
                      display="flex"
                      justifyContent="center"
                      fontSize="40px"
                      fontWeight="600"
                      sx={{ color: 'white' }}
                    >
                      {requesterStats?.pendingAvanceCaissesCount}
                    </Typography>
                    <Typography
                      level="body-md"
                      fontSize="20px"
                      display="flex"
                      justifyContent="center"
                      fontWeight="400"
                      sx={{ color: 'white' }}
                    >
                      <FormattedMessage id={messages.avanceCaisseHeader.id} />
                    </Typography>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{ background: '#0075a4', width: '180px' }}
                  >
                    <Typography
                      level="title-lg"
                      display="flex"
                      justifyContent="center"
                      fontSize="40px"
                      fontWeight="600"
                      sx={{ color: 'white' }}
                    >
                      {requesterStats?.pendingDepenseCaissesCount}
                    </Typography>
                    <Typography
                      level="body-md"
                      fontSize="20px"
                      display="flex"
                      justifyContent="center"
                      fontWeight="400"
                      sx={{ color: 'white' }}
                    >
                      <FormattedMessage id={messages.depenseCaisseHeader.id} />
                    </Typography>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{ background: '#b865ef', width: '180px' }}
                  >
                    <Typography
                      level="title-lg"
                      display="flex"
                      justifyContent="center"
                      fontSize="40px"
                      fontWeight="600"
                      sx={{ color: 'white' }}
                    >
                      {requesterStats?.pendingLiquidationsCount}
                    </Typography>
                    <Typography
                      level="body-md"
                      fontSize="20px"
                      display="flex"
                      justifyContent="center"
                      fontWeight="400"
                      sx={{ color: 'white' }}
                    >
                      <FormattedMessage id={messages.liquidationsHeader.id} />
                    </Typography>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grow>
        </Box>
        <Box display="flex" flexDirection="row" width="80%" gap={3}>
          <Grow in timeout={1200} sx={{ flexGrow: 1 }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop={3}
            >
              <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                  <Typography level="h4">
                    <FormattedMessage id={messages.approvedRequestsHeader.id} />
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection="column"
                    marginTop={3}
                    gap={1}
                  >
                    <Card
                      color="neutral"
                      variant="soft"
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography level="title-md" sx={{ width: '153px' }}>
                        <FormattedMessage id={messages.avanceVoyageHeader.id} />
                      </Typography>
                      <Typography
                        level="title-lg"
                        color="primary"
                        textAlign="center"
                        sx={{ width: '31px' }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedAvanceVoyagesCount}
                          duration={2}
                          delay={0}
                          start={0}
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedAvanceVoyagesMADCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" MAD"
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedAvanceVoyagesEURCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" EUR"
                        />
                      </Typography>
                    </Card>
                    <Card
                      color="neutral"
                      variant="soft"
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography level="title-md" sx={{ width: '153px' }}>
                        <FormattedMessage id={messages.avanceCaisseHeader.id} />
                      </Typography>
                      <Typography
                        level="title-lg"
                        color="primary"
                        textAlign="center"
                        sx={{ width: '31px' }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedAvanceCaissesCount}
                          duration={2}
                          delay={0}
                          start={0}
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedAvanceCaissesMADCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" MAD"
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedAvanceCaissesEURCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" EUR"
                        />
                      </Typography>
                    </Card>
                    <Card
                      color="neutral"
                      variant="soft"
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography level="title-md" sx={{ width: '153px' }}>
                        <FormattedMessage
                          id={messages.depenseCaisseHeader.id}
                        />
                      </Typography>
                      <Typography
                        level="title-lg"
                        color="primary"
                        textAlign="center"
                        sx={{ width: '31px' }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedDepenseCaissesCount}
                          duration={2}
                          delay={0}
                          start={0}
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedDepenseCaissesMADCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" MAD"
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedDepenseCaissesEURCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" EUR"
                        />
                      </Typography>
                    </Card>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grow>
          <Grow in timeout={1200} sx={{ flexGrow: 1 }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop={3}
            >
              <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                  <Typography level="h4">
                    <FormattedMessage id={messages.liquidationsHeader.id} />
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection="column"
                    marginTop={3}
                    gap={1}
                  >
                    <Card
                      color="neutral"
                      variant="soft"
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography level="title-md" sx={{ width: '153px' }}>
                        <FormattedMessage
                          id={messages.notInitiatedYetHeader.id}
                        />
                      </Typography>
                      <Typography
                        level="title-lg"
                        color="primary"
                        textAlign="center"
                        sx={{ width: '31px' }}
                      >
                        <CountUp
                          end={requesterStats?.toLiquidateRequestsCount}
                          duration={2}
                          delay={0}
                          start={0}
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.toLiquidateRequestsMADCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" MAD"
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.toLiquidateRequestsEURCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" EUR"
                        />
                      </Typography>
                    </Card>

                    <Card
                      color="neutral"
                      variant="soft"
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography level="title-md" sx={{ width: '153px' }}>
                        <FormattedMessage id={messages.ongoingHeader.id} />
                      </Typography>
                      <Typography
                        level="title-lg"
                        color="primary"
                        textAlign="center"
                        sx={{ width: '31px' }}
                      >
                        <CountUp
                          end={requesterStats?.ongoingLiquidationsCount}
                          duration={2}
                          delay={0}
                          start={0}
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.ongoingLiquidationsMADCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" MAD"
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.ongoingLiquidationsEURCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" EUR"
                        />
                      </Typography>
                    </Card>

                    <Card
                      color="neutral"
                      variant="soft"
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography level="title-md" sx={{ width: '153px' }}>
                        <FormattedMessage id={messages.finalizedHeader.id} />
                      </Typography>
                      <Typography
                        level="title-lg"
                        color="primary"
                        textAlign="center"
                        sx={{ width: '31px' }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedLiquidationsCount}
                          duration={2}
                          delay={0}
                          start={0}
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.finalizedLiquidationsMADCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" MAD"
                        />
                      </Typography>
                      <Typography
                        level="title-sm"
                        color="success"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '111px',
                        }}
                      >
                        <CountUp
                          end={requesterStats?.FinalizedLiquidationsEURCount}
                          duration={2}
                          decimals={2}
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
                          delay={0}
                          start={0}
                          suffix=" EUR"
                        />
                      </Typography>
                    </Card>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grow>
        </Box>
      </Box>
    </Box>
  );
}
