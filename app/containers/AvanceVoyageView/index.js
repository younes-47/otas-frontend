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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import HistoryIcon from '@mui/icons-material/History';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormLabel,
  Slide,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { changePageContentAction } from 'pages/AvanceVoyage/actions';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import Timeline from '@mui/lab/Timeline';
import DisplayUserinfo from 'components/DisplayUserinfo';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { makeSelectUserInfo } from 'pages/MyRequests/selectors';
import makeSelectAvanceVoyageView, {
  makeSelectAvanceVoyageDetails,
  makeSelectAvanceVoyageIdentity,
  makeSelectErrorLoadingAvanceVoyage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  cleanupAvanceVoyageViewStoreAction,
  loadAvanceVoyageAction,
} from './actions';

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
  const [statusHistoryDialogVisibility, setStatusHistoryDialogVisibility] =
    useState(false);

  useEffect(() => {
    if (errorLoadingAvanceVoyage === null && avanceVoyageIdentity !== null) {
      dispatch(loadAvanceVoyageAction(avanceVoyageIdentity));
    }
  }, [avanceVoyageIdentity]);

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(cleanupAvanceVoyageViewStoreAction());
    dispatch(changePageContentAction('TABLE'));
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
          <Button onClick={() => setStatusHistoryDialogVisibility(false)}>
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
