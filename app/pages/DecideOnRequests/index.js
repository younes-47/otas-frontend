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
import CountUp from 'react-countup';
import { FormattedMessage, useIntl } from 'react-intl';
import { CardActionArea } from '@mui/material';
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

  const intl = useIntl();

  useEffect(() => {
    if (errorLoadingDeciderLevels === false) {
      let string = '';
      // eslint-disable-next-line array-callback-return
      deciderLevels?.map((level, index, arr) => {
        switch (level) {
          case 'MG':
            if (index === 0) {
              string += intl.formatMessage({ id: messages.managerFirst.id });
            } else if (index === arr.length - 1) {
              string += intl.formatMessage({ id: messages.managerLast.id });
            } else {
              string += intl.formatMessage({ id: messages.managerMiddle.id });
            }
            break;
          case 'FM':
            if (index === 0) {
              string += intl.formatMessage({ id: messages.financeFirst.id });
            } else {
              string += intl.formatMessage({ id: messages.financeLast.id });
            }
            break;
          case 'HR':
            if (index === 0) {
              string += intl.formatMessage({ id: messages.hrFirst.id });
            } else {
              string += intl.formatMessage({ id: messages.hrLast.id });
            }
            break;
          case 'TR':
            if (index === 0) {
              string += intl.formatMessage({ id: messages.trFirst.id });
            } else {
              string += intl.formatMessage({ id: messages.trLast.id });
            }
            break;
          case 'GD':
            if (index === 0) {
              string += intl.formatMessage({ id: messages.gdFirst.id });
            } else if (index === arr.length - 1) {
              string += intl.formatMessage({ id: messages.gdLast.id });
            } else {
              string += intl.formatMessage({ id: messages.gdMiddle.id });
            }
            break;
          case 'VP':
            if (index === 0) {
              string += intl.formatMessage({ id: messages.vpFirst.id });
            } else if (index === arr.length - 1) {
              string += intl.formatMessage({ id: messages.vpLast.id });
            } else {
              string += intl.formatMessage({ id: messages.vpMiddle.id });
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
                        {deciderStats?.pendingOrdreMissionsCount}
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
                        {deciderStats?.pendingAvanceVoyagesCount}
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
                        {deciderStats?.pendingAvanceCaissesCount}
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
                        {deciderStats?.pendingDepenseCaissesCount}
                      </Typography>
                      <Typography
                        level="body-md"
                        fontSize="20px"
                        display="flex"
                        justifyContent="center"
                        fontWeight="400"
                        sx={{ color: 'white' }}
                      >
                        <FormattedMessage
                          id={messages.depenseCaisseHeader.id}
                        />
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
                        {deciderStats?.pendingLiquidationsCount}
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
                      <FormattedMessage
                        id={messages.approvedRequestsHeader.id}
                      />
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
                            id={messages.avanceVoyageHeader.id}
                          />
                        </Typography>
                        <Typography
                          level="title-lg"
                          color="primary"
                          textAlign="center"
                          sx={{ width: '31px' }}
                        >
                          <CountUp
                            end={deciderStats?.finalizedAvanceVoyagesCount}
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
                            end={deciderStats?.finalizedAvanceVoyagesMADCount}
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
                            end={deciderStats?.finalizedAvanceVoyagesEURCount}
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
                            id={messages.avanceCaisseHeader.id}
                          />
                        </Typography>
                        <Typography
                          level="title-lg"
                          color="primary"
                          textAlign="center"
                          sx={{ width: '31px' }}
                        >
                          <CountUp
                            end={deciderStats?.finalizedAvanceCaissesCount}
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
                            end={deciderStats?.finalizedAvanceCaissesMADCount}
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
                            end={deciderStats?.finalizedAvanceCaissesEURCount}
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
                            end={deciderStats?.finalizedDepenseCaissesCount}
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
                            end={deciderStats?.finalizedDepenseCaissesMADCount}
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
                            end={deciderStats?.finalizedDepenseCaissesEURCount}
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
                            end={deciderStats?.toLiquidateRequestsCount}
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
                            end={deciderStats?.toLiquidateRequestsMADCount}
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
                            end={deciderStats?.toLiquidateRequestsEURCount}
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
                            end={deciderStats?.ongoingLiquidationsCount}
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
                            end={deciderStats?.ongoingLiquidationsMADCount}
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
                            end={deciderStats?.ongoingLiquidationsEURCount}
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
                            end={deciderStats?.finalizedLiquidationsCount}
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
                            end={deciderStats?.finalizedLiquidationsMADCount}
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
                            end={deciderStats?.FinalizedLiquidationsEURCount}
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
    </Box>
  );
}

DecideOnRequests.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnRequests;
