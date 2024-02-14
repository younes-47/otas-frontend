/**
 *
 * DecideOnRequests
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Typography from '@mui/joy/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import { PieChart } from '@mui/x-charts/PieChart';
import CountUp from 'react-countup';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupStoreAction,
  loadDeciderLevelsAction,
  loadDeciderStatsAction,
} from './actions';
import {
  makeSelectDeciderLevels,
  makeSelectDeciderStats,
  makeSelectErrorLoadingDeciderLevels,
  makeSelectErrorLoadingDeciderStats,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  deciderLevels: makeSelectDeciderLevels(),
  errorLoadingDeciderLevels: makeSelectErrorLoadingDeciderLevels(),
  errorLoadingDeciderStats: makeSelectErrorLoadingDeciderStats(),
  deciderStats: makeSelectDeciderStats(),
});

export function DecideOnRequests() {
  useInjectReducer({ key: 'decideOnRequests', reducer });
  useInjectSaga({ key: 'decideOnRequests', saga });
  const dispatch = useDispatch();
  const {
    isSideBarVisible,
    errorLoadingDeciderLevels,
    deciderLevels,
    errorLoadingDeciderStats,
    deciderStats,
  } = useSelector(mapStateToProps);

  const [levelsString, setLevelsString] = useState('');

  useEffect(() => {
    if (errorLoadingDeciderLevels === null) {
      dispatch(loadDeciderLevelsAction());
    }
  }, [errorLoadingDeciderLevels]);

  useEffect(() => {
    if (errorLoadingDeciderStats === null) {
      dispatch(loadDeciderStatsAction());
    }
  }, []);

  useEffect(
    () => () => {
      dispatch(cleanupStoreAction());
    },
    [],
  );

  useEffect(() => {
    if (errorLoadingDeciderLevels === false) {
      let string = '';
      // eslint-disable-next-line array-callback-return
      deciderLevels?.map((level, index, arr) => {
        switch (level) {
          case 'MG':
            if (index === 0) {
              string += 'a Manager of your department';
            } else {
              string += ' and Manager of your department';
            }
            break;
          case 'FM':
            if (index === 0) {
              string += 'a Finance Manager';
            } else {
              string += ' and Finance Manager';
            }
            break;
          case 'HR':
            if (index === 0) {
              string += 'an HR Manager';
            } else {
              string += ' and HR Manager';
            }
            break;
          case 'TR':
            if (index === 0) {
              string += 'a Treasurer';
            } else {
              string += ' and Treasurer';
            }
            break;
          case 'DG':
            if (index === 0) {
              string += 'a General Director';
            } else if (index === arr.length) {
              string += ' and a General Director';
            } else {
              string += ', General Director';
            }
            break;
          case 'VP':
            if (index === 0) {
              string += 'a Vice President';
            } else if (index === arr.length) {
              string += ' and a Vice President';
            } else {
              string += ', Vice President';
            }
            break;
          default:
            break;
        }
      });
      setLevelsString(string);
    }
  }, [errorLoadingDeciderLevels]);

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
            Welcome&nbsp;{localStorage.getItem('firstName')}&nbsp;
            {localStorage.getItem('lastName')}
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
            others as {levelsString}.
          </Alert>
        </Stack>
      </Box>

      <Container maxWidth="sm">
        <Typography level="h3" textAlign="center">
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
            <Grid xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h1" variant="plain" color="primary">
                    {deciderStats?.requestsStats?.allOngoingRequestsCount}
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
                  {deciderStats?.requestsStats?.hoursPassedSinceLastRequest ===
                  null ? (
                    <>
                      <Typography
                        level="title-md"
                        marginTop={3}
                        marginBottom={3}
                      >
                        You have never decider upon a request before.
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography level="h1" variant="plain" color="warning">
                        {Math.floor(
                          deciderStats?.requestsStats
                            ?.hoursPassedSinceLastRequest / 24,
                        )}
                      </Typography>
                      <Typography level="title-md">
                        Days Have been passed since the last time you decided
                        upon a request.
                      </Typography>
                    </>
                  )}
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
                      end={deciderStats?.requestsStats?.allTimeCount}
                      duration={3.2}
                    />
                  </Typography>
                  <Typography level="title-md">
                    requests have been decided upon so far!
                  </Typography>
                  {deciderStats?.requestsStats && (
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
                                deciderStats?.requestsStats
                                  ?.ordreMissionsAllTimeCount,
                              label: 'Ordre Mission',
                              color: '#ef7765',
                            },
                            {
                              id: 1,
                              value:
                                deciderStats?.requestsStats
                                  ?.avanceVoyagesAllTimeCount,
                              label: 'Avance Voyage',
                              color: '#00a697',
                            },
                            {
                              id: 2,
                              value:
                                deciderStats?.requestsStats
                                  ?.avanceCaissesAllTimeCount,
                              label: 'Avance Caisse',
                              color: '#f3bc00',
                            },
                            {
                              id: 3,
                              value:
                                deciderStats?.requestsStats
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
                      end={deciderStats?.moneyStats?.allTimeAmountMAD}
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
                      end={deciderStats?.moneyStats?.allTimeAmountEUR}
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
                    have been decided upon so far!
                  </Typography>
                  {deciderStats?.moneyStats && (
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
                                deciderStats?.moneyStats
                                  ?.avanceVoyagesAllTimeAmountMAD,

                              label: 'Avance Voyage MAD',
                              color: '#00a697',
                            },
                            {
                              id: 1,
                              value:
                                deciderStats?.moneyStats
                                  ?.avanceCaissesAllTimeAmountMAD,

                              label: 'Avance Caisse MAD',
                              color: '#f3bc00',
                            },
                            {
                              id: 2,
                              value:
                                deciderStats?.moneyStats
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
                                deciderStats?.moneyStats
                                  ?.avanceVoyagesAllTimeAmountEUR,

                              label: 'Avance Voyage EUR',
                              color: '#00a697',
                            },
                            {
                              id: 1,
                              value:
                                deciderStats?.moneyStats
                                  ?.avanceCaissesAllTimeAmountEUR,

                              label: 'Avance Caisse EUR',
                              color: '#f3bc00',
                            },
                            {
                              id: 2,
                              value:
                                deciderStats?.moneyStats
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
        </Grid>
      </Container>
    </Box>
  );
}

DecideOnRequests.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnRequests;
