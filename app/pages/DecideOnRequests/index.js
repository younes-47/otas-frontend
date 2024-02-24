/**
 *
 * DecideOnRequests
 *
 */

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Typography from '@mui/joy/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import {
  makeSelectDeciderLevels,
  makeSelectErrorLoadingDeciderLevels,
  makeSelectIsSideBarVisible,
} from 'containers/SideBar/selectors';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import { PieChart } from '@mui/x-charts/PieChart';
import CountUp from 'react-countup';
import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import reducer from './reducer';
import saga from './saga';
import { cleanupStoreAction, loadDeciderStatsAction } from './actions';
import {
  makeSelectDeciderStats,
  makeSelectErrorLoadingDeciderStats,
} from './selectors';
import messages from './messages';

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
            <FormattedMessage id={messages.welcome.id} />
            &nbsp;{localStorage.getItem('firstName')}&nbsp;
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
            <FormattedMessage id={messages.sectionInfo.id} /> {levelsString}.
          </Alert>
        </Stack>
      </Box>

      <Box
        display="flex"
        justifyItems="center"
        flexDirection="column"
        gap={3}
        marginBottom={10}
      >
        <Typography level="h3" textAlign="center">
          <FormattedMessage id={messages.statsHeader.id} /> <TrendingUpIcon />
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
          <Box gap={3}>
            <Grow in>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h4">
                    <FormattedMessage
                      id={messages.requestsAwaitingApprovalHeader.id}
                    />
                  </Typography>
                  <List>
                    <ListItem
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography level="body-md">
                        <FormattedMessage id={messages.ordreMissionHeader.id} />
                      </Typography>
                      <Typography
                        variant="soft"
                        color="warning"
                        level="title-lg"
                      >
                        {deciderStats?.pendingOrdreMissionsCount}
                      </Typography>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography level="body-md">
                        <FormattedMessage id={messages.avanceVoyageHeader.id} />
                      </Typography>
                      <Typography
                        variant="soft"
                        color="warning"
                        level="title-lg"
                      >
                        {deciderStats?.pendingAvanceVoyagesCount}
                      </Typography>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography level="body-md">
                        <FormattedMessage id={messages.avanceCaisseHeader.id} />
                      </Typography>
                      <Typography
                        variant="soft"
                        color="warning"
                        level="title-lg"
                      >
                        {deciderStats?.pendingAvanceCaissesCount}
                      </Typography>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography level="body-md">
                        <FormattedMessage
                          id={messages.depenseCaisseHeader.id}
                        />
                      </Typography>
                      <Typography
                        variant="soft"
                        color="warning"
                        level="title-lg"
                      >
                        {deciderStats?.pendingDepenseCaissesCount}
                      </Typography>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography level="body-md">
                        <FormattedMessage id={messages.liquidationsHeader.id} />
                      </Typography>
                      <Typography
                        variant="soft"
                        color="warning"
                        level="title-lg"
                      >
                        {deciderStats?.pendingLiquidationsCount}
                      </Typography>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grow>
            <Grow in timeout={1200}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop={3}
              >
                <Card variant="outlined">
                  <CardContent>
                    <Typography level="h4">
                      <FormattedMessage
                        id={messages.approvedRequestsHeader.id}
                      />
                    </Typography>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      marginTop={3}
                      gap={1}
                    >
                      <Card
                        color="neutral"
                        variant="soft"
                        sx={{ width: '100%' }}
                      >
                        <Typography level="title-md">
                          <FormattedMessage
                            id={messages.avanceVoyageHeader.id}
                          />
                        </Typography>
                        <Typography
                          level="title-lg"
                          color="primary"
                          textAlign="center"
                        >
                          <CountUp
                            end={deciderStats?.finalizedAvanceVoyagesCount}
                            duration={3.2}
                            delay={0}
                            start={0}
                          />
                        </Typography>
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.finalizedAvanceVoyagesMADCount}
                            duration={3.2}
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
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.finalizedAvanceVoyagesEURCount}
                            duration={3.2}
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
                        sx={{ width: '100%' }}
                      >
                        <Typography level="title-md">
                          <FormattedMessage
                            id={messages.avanceCaisseHeader.id}
                          />
                        </Typography>
                        <Typography
                          level="title-lg"
                          color="primary"
                          textAlign="center"
                        >
                          <CountUp
                            end={deciderStats?.finalizedAvanceCaissesCount}
                            duration={3.2}
                            delay={0}
                            start={0}
                          />
                        </Typography>
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.finalizedAvanceCaissesMADCount}
                            duration={3.2}
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
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.finalizedAvanceCaissesEURCount}
                            duration={3.2}
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
                        sx={{ width: '100%' }}
                      >
                        <Typography level="title-md">
                          <FormattedMessage
                            id={messages.depenseCaisseHeader.id}
                          />
                        </Typography>
                        <Typography
                          level="title-lg"
                          color="primary"
                          textAlign="center"
                        >
                          <CountUp
                            end={deciderStats?.finalizedDepenseCaissesCount}
                            duration={3.2}
                            delay={0}
                            start={0}
                          />
                        </Typography>
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.finalizedDepenseCaissesMADCount}
                            duration={3.2}
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
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.finalizedDepenseCaissesEURCount}
                            duration={3.2}
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
          <Box>
            <Grow in timeout={1200}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Card variant="outlined">
                  <CardContent>
                    <Typography level="h4">
                      <FormattedMessage id={messages.liquidationsHeader.id} />
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      marginTop={3}
                      gap={0.5}
                    >
                      <Card
                        color="neutral"
                        variant="soft"
                        sx={{ width: '100%' }}
                      >
                        <Typography level="title-md">
                          <FormattedMessage
                            id={messages.notInitiatedYetHeader.id}
                          />
                        </Typography>
                        <Typography
                          level="title-lg"
                          color="primary"
                          textAlign="center"
                        >
                          <CountUp
                            end={deciderStats?.toLiquidateRequestsCount}
                            duration={3.2}
                            delay={0}
                            start={0}
                          />
                        </Typography>
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.toLiquidateRequestsMADCount}
                            duration={3.2}
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
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.toLiquidateRequestsEURCount}
                            duration={3.2}
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
                        sx={{ width: '100%' }}
                      >
                        <Typography level="title-md">
                          <FormattedMessage id={messages.ongoingHeader.id} />
                        </Typography>
                        <Typography
                          level="title-lg"
                          color="primary"
                          textAlign="center"
                        >
                          <CountUp
                            end={deciderStats?.ongoingLiquidationsCount}
                            duration={3.2}
                            delay={0}
                            start={0}
                          />
                        </Typography>
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.ongoingLiquidationsMADCount}
                            duration={3.2}
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
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.ongoingLiquidationsEURCount}
                            duration={3.2}
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
                        sx={{ width: '100%' }}
                      >
                        <Typography level="title-md">
                          <FormattedMessage id={messages.finalizedHeader.id} />
                        </Typography>
                        <Typography
                          level="title-lg"
                          color="primary"
                          textAlign="center"
                        >
                          <CountUp
                            end={deciderStats?.finalizedLiquidationsCount}
                            duration={3.2}
                            delay={0}
                            start={0}
                          />
                        </Typography>
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.finalizedLiquidationsMADCount}
                            duration={3.2}
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
                        <Typography level="title-sm" color="success">
                          <CountUp
                            end={deciderStats?.FinalizedLiquidationsEURCount}
                            duration={3.2}
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
    </Box>
  );
}

DecideOnRequests.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnRequests;
