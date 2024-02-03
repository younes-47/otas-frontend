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
import { Box, Stack } from '@mui/system';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { Alert } from '@mui/material';
import { Card, CardContent, Container, Grid } from '@mui/joy';
import reducer from './reducer';
import saga from './saga';
import { cleanupStoreAction, loadDeciderLevelsAction } from './actions';
import {
  makeSelectDeciderLevels,
  makeSelectErrorLoadingDeciderLevels,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  deciderLevels: makeSelectDeciderLevels(),
  errorLoadingDeciderLevels: makeSelectErrorLoadingDeciderLevels(),
});

export function DecideOnRequests() {
  useInjectReducer({ key: 'decideOnRequests', reducer });
  useInjectSaga({ key: 'decideOnRequests', saga });
  const dispatch = useDispatch();
  const { isSideBarVisible, errorLoadingDeciderLevels, deciderLevels } =
    useSelector(mapStateToProps);

  const [levelsString, setLevelsString] = useState('');

  useEffect(() => {
    if (errorLoadingDeciderLevels === null) {
      dispatch(loadDeciderLevelsAction());
    }
  }, [errorLoadingDeciderLevels]);

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
              string += 'and Manager of your department';
            }
            break;
          case 'FM':
            if (index === 0) {
              string += 'a Finance Manager';
            } else {
              string += 'and Finance Manager';
            }
            localStorage.setItem('level', 'FM');
            break;
          case 'HR':
            if (index === 0) {
              string += 'an HR Manager';
            } else {
              string += 'and HR Manager';
            }
            break;
          case 'TR':
            if (index === 0) {
              string += 'a Treasury Manager';
            } else {
              string += 'and Treasury Manager';
            }
            localStorage.setItem('level', 'TR');
            break;
          case 'DG':
            if (index === 0) {
              string += 'a General Director';
            } else if (index === arr.length) {
              string += 'and a General Director';
            } else {
              string += ', General Director';
            }
            break;
          case 'VP':
            if (index === 0) {
              string += 'a Vice President';
            } else if (index === arr.length) {
              string += 'and a Vice President';
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
