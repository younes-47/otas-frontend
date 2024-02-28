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
import Link from '@mui/joy/Link';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Typography as JoyTypography } from '@mui/joy';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { changePageContentAction } from 'pages/AvanceVoyage/actions';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import Timeline from '@mui/lab/Timeline';
import DisplayUserinfo from 'components/DisplayUserinfo';
import DescriptionIcon from '@mui/icons-material/Description';
import {
  ChangePageContentAction,
  setOrdreMissionIdentityAction,
} from 'pages/OrdreMission/actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { makeSelectAvanceVoyageIdentity } from 'pages/AvanceVoyage/selectors';
import { NumericFormat } from 'react-number-format';
import TripsTable from 'components/TripsTable';
import ExpensesTable from 'components/ExpensesTable';
import messages from './messages';
import makeSelectAvanceVoyageView, {
  makeSelectAvanceVoyageDetails,
  makeSelectAvanceVoyageDocumentFile,
  makeSelectErrorDownloadingAvanceVoyageDocumentFile,
  makeSelectErrorLoadingAvanceVoyage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupAvanceVoyageViewStoreAction,
  downloadAvanceVoyageDocumentFileAction,
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
  errorDownloadingAvanceVoyageDocumentFile:
    makeSelectErrorDownloadingAvanceVoyageDocumentFile(),
  avanceVoyageDocumentFile: makeSelectAvanceVoyageDocumentFile(),
});

export function AvanceVoyageView() {
  useInjectReducer({ key: 'avanceVoyageView', reducer });
  useInjectSaga({ key: 'avanceVoyageView', saga });
  const {
    errorDownloadingAvanceVoyageDocumentFile,
    avanceVoyageDocumentFile,
    errorLoadingAvanceVoyage,
    isSideBarVisible,
    avanceVoyageDetails,
    avanceVoyageIdentity,
  } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const history = useHistory();
  const [statusHistoryDialogVisibility, setStatusHistoryDialogVisibility] =
    useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    if (errorLoadingAvanceVoyage == null) {
      dispatch(loadAvanceVoyageAction(avanceVoyageIdentity));
    }
  }, [errorLoadingAvanceVoyage]);

  // Download Document
  useEffect(() => {
    if (errorDownloadingAvanceVoyageDocumentFile === false) {
      const binaryString = atob(avanceVoyageDocumentFile.fileContents);
      const bytes = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i += 1) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes.buffer], {
        type: 'application/pdf',
      });

      const blobUrl = window.URL.createObjectURL(blob);

      window.open(blobUrl, '_blank');
      setLoadingButton(false);
    }
  }, [errorDownloadingAvanceVoyageDocumentFile]);

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

  const handleOnDownloadDocumentClick = () => {
    setLoadingButton(true);
    dispatch(downloadAvanceVoyageDocumentFileAction(avanceVoyageDetails.id));
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
            <FormattedMessage id={messages.pageTitle.id} />
            &nbsp; #{avanceVoyageDetails?.id}
          </h1>
        ) : (
          <></>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={1}
      >
        <JoyTypography color="neutral" level="title-lg" variant="plain">
          <FormattedMessage id={messages.currentStatus.id} />:{' '}
          <JoyTypography color="primary" level="title-lg" variant="plain">
            {avanceVoyageDetails?.latestStatus}
          </JoyTypography>
        </JoyTypography>
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
          size="medium"
          variant="contained"
        >
          <FormattedMessage id={messages.statusHistoryButton.id} />
        </Button>
        {avanceVoyageDetails?.latestStatus === 'Funds Prepared' && (
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={
              loadingButton ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <DescriptionIcon />
              )
            }
            onClick={() => handleOnDownloadDocumentClick()}
            disabled={loadingButton}
          >
            {!loadingButton ? (
              <FormattedMessage id={messages.downloadDocumentButton.id} />
            ) : (
              <FormattedMessage id={messages.generating.id} />
            )}
          </Button>
        )}
      </Box>

      {avanceVoyageDetails?.latestStatus === 'Returned' && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={3}
        >
          <Card color="warning" variant="soft" icon={false}>
            <CardContent sx={{ textAlign: 'center', marginBottom: '1em' }}>
              <FormattedMessage id={messages.requestReturned.id} />
            </CardContent>
            <Card variant="outlined">
              {avanceVoyageDetails?.deciderComment}
            </Card>
          </Card>
        </Box>
      )}
      {avanceVoyageDetails?.latestStatus === 'Rejected' && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={3}
        >
          <Card color="danger" variant="soft" icon={false}>
            <CardContent sx={{ textAlign: 'center', marginBottom: '1em' }}>
              <FormattedMessage id={messages.requestRejected.id} />
            </CardContent>
            <Card variant="outlined">
              {avanceVoyageDetails?.deciderComment}
            </Card>
          </Card>
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
        display="flex"
        justifyContent="center"
        marginTop={3}
        marginBottom={3}
      >
        <Alert severity="info">
          <Typography variant="P">
            <FormattedMessage id={messages.requestLinkedTo.id} />
            &nbsp;
          </Typography>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            level="title-sm"
            underline="always"
            onClick={() => handleOnOrdreMissionLinkClick()}
          >
            <FormattedMessage id={messages.missionOrderTitle.id} />
            {avanceVoyageDetails?.ordreMissionId}&nbsp;
            <InsertLinkIcon fontSize="small" />
          </Link>
        </Alert>
      </Box>

      {/* Accordion */}
      {/* <Box
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
              <FormattedMessage id={messages.moreDetails.id} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                    <FormattedMessage id={messages.trajectoriesHeader.id} />
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
                    <FormattedMessage id={messages.expensesHeader.id} />
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
      </Box> */}

      {/* Trips */}

      <Typography level="title-lg" textAlign="center" marginBottom={2}>
        <FormattedMessage id={messages.tripsHeader.id} />
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom={5}>
        <TripsTable tripsData={avanceVoyageDetails?.trips} />
      </Box>

      {/* Expenses */}

      <Typography level="title-lg" textAlign="center" marginBottom={2}>
        {avanceVoyageDetails?.expenses.length > 0 ? (
          <FormattedMessage id={messages.expensesHeader.id} />
        ) : (
          <FormattedMessage id={messages.noExpensesHeader.id} />
        )}
      </Typography>
      {avanceVoyageDetails?.expenses.length > 0 && (
        <Box display="flex" justifyContent="center" marginBottom={5}>
          <ExpensesTable expensesData={avanceVoyageDetails?.expenses} />
        </Box>
      )}

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
                <FormattedMessage id={messages.requestedAmountHeader.id} />
                :&nbsp; &nbsp;
                <Typography
                  variant="h6"
                  sx={{ color: 'success.main', fontWeight: 'bold' }}
                >
                  <NumericFormat
                    displayType="text"
                    value={avanceVoyageDetails?.estimatedTotal}
                    fixedDecimalScale
                    decimalScale={2}
                    defaultValue="0"
                    allowNegative={false}
                    thousandSeparator={
                      localStorage.getItem('preferredLanguage') === 'en'
                        ? ','
                        : ' '
                    }
                    decimalSeparator={
                      localStorage.getItem('preferredLanguage') === 'en'
                        ? '.'
                        : ','
                    }
                  />{' '}
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
          <FormattedMessage id={messages.returnButton.id} />
        </Button>
      </Stack>

      <Dialog
        open={statusHistoryDialogVisibility}
        keepMounted
        onClose={() => setStatusHistoryDialogVisibility(false)}
        width="80px"
      >
        <DialogTitle>
          <FormattedMessage id={messages.dialogTitle.id} />
        </DialogTitle>
        <DialogContent dividers>
          <Timeline>
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
            <FormattedMessage id={messages.closeButton.id} />
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
