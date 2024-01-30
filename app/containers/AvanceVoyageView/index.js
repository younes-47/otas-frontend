/**
 *
 * AvanceVoyageView
 *
 */

import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import HistoryIcon from '@mui/icons-material/History';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormLabel,
  List,
  ListSubheader,
  Slide,
  Typography,
} from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Link } from '@mui/joy';
import { Box, Stack } from '@mui/system';
import { changePageContentAction } from 'pages/AvanceVoyage/actions';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import Timeline from '@mui/lab/Timeline';
import DisplayUserinfo from 'components/DisplayUserinfo';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { makeSelectUserInfo } from 'pages/MyRequests/selectors';
import {
  ChangePageContentAction,
  setOrdreMissionIdentityAction,
} from 'pages/OrdreMission/actions';
import OrdreMissionForm from 'containers/OrdreMissionForm';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { makeSelectAvanceVoyageIdentity } from 'pages/AvanceVoyage/selectors';
import makeSelectAvanceVoyageView, {
  makeSelectAvanceVoyageDetails,
  makeSelectErrorLoadingAvanceVoyage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  cleanupAvanceVoyageViewStoreAction,
  loadAvanceVoyageAction,
} from './actions';
import DisplayTrips from './DisplayTrips';
import DisplayExpenses from './DisplayExpenses';

const mapStateToProps = createStructuredSelector({
  avanceVoyageView: makeSelectAvanceVoyageView(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  avanceVoyageDetails: makeSelectAvanceVoyageDetails(),
  avanceVoyageIdentity: makeSelectAvanceVoyageIdentity(),
  errorLoadingAvanceVoyage: makeSelectErrorLoadingAvanceVoyage(),
});

export function AvanceVoyageView() {
  useInjectReducer({ key: 'avanceVoyageView', reducer });
  useInjectSaga({ key: 'avanceVoyageView', saga });
  const {
    errorLoadingAvanceVoyage,
    isSideBarVisible,
    avanceVoyageDetails,
    avanceVoyageIdentity,
  } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const history = useHistory();
  const [statusHistoryDialogVisibility, setStatusHistoryDialogVisibility] =
    useState(false);

  useEffect(() => {
    if (errorLoadingAvanceVoyage == null) {
      dispatch(loadAvanceVoyageAction(avanceVoyageIdentity));
    }
  }, [errorLoadingAvanceVoyage]);

  useEffect(
    () => () => {
      dispatch(cleanupAvanceVoyageViewStoreAction());
    },
    [],
  );

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(cleanupAvanceVoyageViewStoreAction());
    dispatch(changePageContentAction('TABLE'));
  };

  const handleOnOrdreMissionLinkClick = () => {
    dispatch(
      setOrdreMissionIdentityAction(avanceVoyageDetails?.ordreMissionId),
    );
    dispatch(ChangePageContentAction('VIEW'));
    history.push('/my-requests/ordre-mission');
  };

  return (
    <Box
      position="fixed"
      top={64}
      bottom={0}
      left={isSideBarVisible ? 200 : 0}
      right={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        overflow: 'auto',
      }}
    >
      {/* THE HEADER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={1}
      >
        {avanceVoyageDetails ? (
          <h1 style={{ fontSize: '30px' }}>
            Avance Voyage #{avanceVoyageDetails?.id} Details
          </h1>
        ) : (
          <></>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
        gap={3}
      >
        <Button
          // variant="contained"
          color="warning"
          onClick={() => setStatusHistoryDialogVisibility(true)}
          startIcon={<HistoryIcon />}
        >
          Status History
        </Button>
        <Button color="secondary" size="large" startIcon={<DescriptionIcon />}>
          Download Document
        </Button>
      </Box>

      {/* DIVIDER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={3}
      >
        <Divider style={{ width: '60%', opacity: 0.7 }} />
      </Box>

      {/* USER INFO */}

      <DisplayUserinfo
        userData={
          avanceVoyageDetails?.requesterInfo !== null
            ? avanceVoyageDetails?.requesterInfo
            : null
        }
      />

      {/* DIVIDER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={1}
      >
        <Divider style={{ width: '60%', opacity: 0.7 }} />
      </Box>
      <Box
        key={avanceVoyageDetails?.id}
        display="flex"
        justifyContent="center"
        marginBottom={3}
        marginTop={3}
      >
        <Accordion sx={{ width: '50%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              variant="h6"
              sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}
            >
              More Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Alert severity="info">
              <Typography variant="P">
                This Avance Voyage is Linked to&nbsp;
              </Typography>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                level="title-sm"
                underline="always"
                onClick={() => handleOnOrdreMissionLinkClick()}
              >
                Ordre Mission #{avanceVoyageDetails?.ordreMissionId}&nbsp;
                <InsertLinkIcon fontSize="small" />
              </Link>
            </Alert>
            <Box
              key={avanceVoyageDetails?.id}
              display="flex"
              justifyContent="center"
              marginBottom={3}
              marginTop={3}
            >
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader
                    sx={{ fontSize: '20px' }}
                    component="div"
                    id="nested-list-subheader"
                  >
                    Trajectories
                  </ListSubheader>
                }
              >
                {avanceVoyageDetails?.trips.map((trip) => (
                  <div key={trip.id}>
                    <DisplayTrips tripData={trip} />
                  </div>
                ))}
              </List>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader
                    sx={{ fontSize: '20px' }}
                    component="div"
                    id="nested-list-subheader"
                  >
                    Expenses
                  </ListSubheader>
                }
              >
                {avanceVoyageDetails?.expenses.map((expense) => (
                  <div key={expense.id}>
                    <DisplayExpenses expenseData={expense} />
                  </div>
                ))}
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      {/* DIVIDER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={1}
      >
        <Divider style={{ width: '60%', opacity: 0.7 }} />
      </Box>

      {/* Calculated Total */}
      <Box display="flex" justifyContent="center">
        <Box display="flex" justifyContent="flex-end" width="60%">
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" gap={5}>
              <Typography variant="h6" align="left" display="flex">
                Requested Amount:&nbsp; &nbsp;
                <Typography
                  variant="h6"
                  sx={{ color: 'success.main', fontWeight: 'bold' }}
                >
                  {avanceVoyageDetails?.estimatedTotal}{' '}
                  {avanceVoyageDetails?.currency}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        margin={10}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOnReturnButtonClick}
        >
          Return
        </Button>
      </Stack>

      <Dialog
        open={statusHistoryDialogVisibility}
        keepMounted
        onClose={() => setStatusHistoryDialogVisibility(false)}
        width="80px"
      >
        <DialogTitle>Status History</DialogTitle>
        <DialogContent dividers>
          <Timeline position="alternate">
            {avanceVoyageDetails?.statusHistory?.map((sh, i, arr) => (
              <CustomizedTimeLine
                statusHistory={sh}
                lastOne={arr.length - 1 === i}
              ></CustomizedTimeLine>
            ))}
          </Timeline>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setStatusHistoryDialogVisibility(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

AvanceVoyageView.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default AvanceVoyageView;
