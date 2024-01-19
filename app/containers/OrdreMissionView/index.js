/**
 *
 * OrdreMissionView
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import HistoryIcon from '@mui/icons-material/History';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import DisplayUserinfo from 'components/DisplayUserinfo';
import { Timeline } from '@mui/icons-material';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import { ChangePageContentAction } from 'pages/OrdreMission/actions';
import { cleanupStoreAction } from 'containers/OrdreMissionForm/actions';
import { makeSelectOrdreMissionIdentity } from 'containers/OrdreMissionForm/selectors';
import {
  makeSelectErrorLoadingOrdreMissionDetails,
  makeSelectOrdreMissionDetails,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupOrdreMissionViewStoreAction,
  loadOrdreMissionDetailsAction,
} from './actions';
import DisplayTrips from './DisplayTrips';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  errorLoadingOrdreMissionDetails: makeSelectErrorLoadingOrdreMissionDetails(),
  ordreMissionDetails: makeSelectOrdreMissionDetails(),
  ordreMissionidentity: makeSelectOrdreMissionIdentity(),
});

export function OrdreMissionView({ state }) {
  useInjectReducer({ key: 'ordreMissionView', reducer });
  useInjectSaga({ key: 'ordreMissionView', saga });
  const [savedSnackbarVisibility, setSavedSnackbarVisibility] = useState(true);
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => setSavedSnackbarVisibility(false)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const {
    isSideBarVisible,
    errorLoadingOrdreMissionDetails,
    ordreMissionDetails,
    ordreMissionidentity,
  } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const [statusHistoryDialogVisibility, setStatusHistoryDialogVisibility] =
    useState(false);

  useEffect(() => {
    if (errorLoadingOrdreMissionDetails === null && ordreMissionidentity) {
      dispatch(loadOrdreMissionDetailsAction(ordreMissionidentity));
    }
  }, [ordreMissionidentity]);

  useEffect(
    () => () => {
      dispatch(cleanupStoreAction()); // ordremissionform
      // dispatch(cleanupOrdreMissionViewStoreAction());
    },
    [],
  );

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(cleanupOrdreMissionViewStoreAction());
    dispatch(ChangePageContentAction('TABLE'));
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

      {/* {ordreMissionDetails ? (
          <h1 style={{ fontSize: '30px' }}>
            Ordre Mission #{ordreMissionDetails?.id} Details
          </h1>
        ) : (
          <></>
        )} */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={1}
      >
        {state === 'VIEW' ? (
          <Typography variant="h5" gutterBottom>
            Ordre Mission #{ordreMissionDetails?.id} Details
          </Typography>
        ) : (
          <Typography variant="h5" marginTop={3} gutterBottom>
            Please Review your information before submitting
          </Typography>
        )}
      </Box>

      {state === 'CONFIRM' && (
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          marginBottom={1}
        >
          <Typography variant="caption">
            *This request has been saved as a draft. You can still modify it if
            you don&apos;t submit it
          </Typography>
        </Box>
      )}
      {state === 'VIEW' && (
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          marginBottom={2}
        >
          <Button
            variant="contained"
            color="warning"
            onClick={() => setStatusHistoryDialogVisibility(true)}
            startIcon={<HistoryIcon />}
          >
            Status History
          </Button>
        </Box>
      )}

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
          ordreMissionDetails?.requesterInfo !== null
            ? ordreMissionDetails?.requesterInfo
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

      {/* AvanceVoyage */}
      {ordreMissionDetails?.avanceVoyagesDetails.map((avanceVoyage) => (
        <Box
          key={avanceVoyage.id}
          display="flex"
          justifyContent="center"
          marginBottom={3}
          marginTop={3}
        >
          <Accordion defaultExpanded sx={{ width: '60%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                variant="h6"
                sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}
              >
                Avance Voyage #{avanceVoyage.id}
              </Typography>
              <Typography variant="h6" sx={{ color: 'success.main' }}>
                Estimated Total: {avanceVoyage.estimatedTotal}
                {avanceVoyage.currency}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion defaultExpanded sx={{ width: '60%' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    variant="h6"
                    sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}
                  >
                    Trips
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {avanceVoyage.trips.map((trip) => (
                    <div key={trip.id}>
                      <DisplayTrips tripData={trip} />
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}

      {/* DIVIDER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={1}
      >
        <Divider style={{ width: '60%', opacity: 0.7 }} />
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
        <Button variant="contained" color="success">
          Submit
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
            {ordreMissionDetails?.statusHistory?.map((sh, i, arr) => (
              <CustomizedTimeLine
                statusHistory={sh}
                lastOne={arr.length - 1 === i}
              ></CustomizedTimeLine>
            ))}
          </Timeline>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusHistoryDialogVisibility(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={savedSnackbarVisibility}
        autoHideDuration={3000}
        onClose={() => setSavedSnackbarVisibility(false)}
        action={action}
      >
        <Alert
          onClose={() => setSavedSnackbarVisibility(false)}
          severity="info"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Request has been saved as a darft!
        </Alert>
      </Snackbar>
    </Box>
  );
}

OrdreMissionView.propTypes = {
  state: PropTypes.string.isRequired,
};

export default OrdreMissionView;
