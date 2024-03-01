/**
 *
 * DecideOnOrdreMissionForm
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HistoryIcon from '@mui/icons-material/History';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectOrdreMissionIdentity } from 'pages/DecideOnOrdreMission/selectors';
import Box from '@mui/system/Box';
import Alert from '@mui/joy/Alert';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Timeline from '@mui/lab/Timeline';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import DisplayUserinfo from 'components/DisplayUserinfo';
import {
  makeSelectIsSideBarVisible,
  makeSelectDeciderLevels,
} from 'containers/SideBar/selectors';
import { cleanupParentDecideOnOrdreMissionPageAction } from 'pages/DecideOnOrdreMission/actions';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import { setOrdreMissionStatusAction } from 'containers/DecideOnOrdreMissionTable/actions';
import { NumericFormat } from 'react-number-format';
import TripsTable from 'components/TripsTable';
import ExpensesTable from 'components/ExpensesTable';
import { ValidateDeciderComment } from 'utils/Custom/ValidateInputs';
import { FormattedMessage, useIntl } from 'react-intl';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  makeSelectErrorDecidingOnOrdreMission,
  makeSelectErrorLoadingOrdreMissionDetails,
  makeSelectOrdreMissionDetails,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupDecideOnOrdreMissionFormPageAction,
  decideOnOrdreMissionAction,
  loadOrdreMissionDetailsAction,
} from './actions';
import messages from './messages';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  ordreMissionIdentity: makeSelectOrdreMissionIdentity(),
  errorLoadingOrdreMissionDetails: makeSelectErrorLoadingOrdreMissionDetails(),
  ordreMissionDetails: makeSelectOrdreMissionDetails(),
  errorDecidingOnOrdreMission: makeSelectErrorDecidingOnOrdreMission(),
  deciderLevels: makeSelectDeciderLevels(),
});

export function DecideOnOrdreMissionForm({ state }) {
  useInjectReducer({ key: 'decideOnOrdreMissionForm', reducer });
  useInjectSaga({ key: 'decideOnOrdreMissionForm', saga });

  const dispatch = useDispatch();
  const {
    isSideBarVisible,
    errorLoadingOrdreMissionDetails,
    ordreMissionDetails,
    ordreMissionIdentity,
    errorDecidingOnOrdreMission,
    deciderLevels,
  } = useSelector(mapStateToProps);

  // control decision
  const [isApprovedWithAvanceVoyage, setIsApprovedWithAvanceVoyage] =
    useState(false);

  // Control data
  const [deciderComment, setDeciderComment] = useState(null);
  const [decisionString, setDecisionString] = useState(null);

  // Trips & expenses
  const [trips, setTrips] = useState([]);
  const [expesnes, setExpenses] = useState([]);

  // Control modal content
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalSevirity, setModalSevirity] = useState('');

  const readOnly = state === 'VIEW';
  const intl = useIntl();

  const data = {
    requestId: ordreMissionDetails !== null && ordreMissionDetails?.id,
    deciderComment,
    decisionString,
    returnedToFMByTR: false,
    returnedToTRByFM: false,
    returnedToRequesterByTR: false,
  };

  // Load the data => object details
  useEffect(() => {
    dispatch(loadOrdreMissionDetailsAction(ordreMissionIdentity));
  }, []);

  useEffect(() => {
    if (errorLoadingOrdreMissionDetails === false) {
      ordreMissionDetails?.avanceVoyagesDetails?.forEach((avanceDetails) => {
        avanceDetails?.trips?.forEach((trip) => {
          const formattedDateTrip = {
            ...trip,
            departureDate: trip.departureDate,
            arrivalDate: trip.arrivalDate,
          };
          setTrips((prevTrips) => [...prevTrips, formattedDateTrip]);
        });
        avanceDetails?.expenses?.forEach((expense) => {
          const formattedDateExpense = {
            ...expense,
            expenseDate: expense.expenseDate,
          };
          setExpenses((prevExpenses) => [
            ...prevExpenses,
            formattedDateExpense,
          ]);
        });
      });
    }
  }, [errorLoadingOrdreMissionDetails]);

  useEffect(() => {
    if (decisionString !== null) {
      if (decisionString === 'return' || decisionString === 'reject') {
        const result = ValidateDeciderComment(
          setModalVisibility,
          setModalBody,
          setModalHeader,
          setModalSevirity,
          deciderComment,
        );
        if (result) dispatch(decideOnOrdreMissionAction(data));
      } else {
        dispatch(decideOnOrdreMissionAction(data));
      }
    }
  }, [decisionString]);

  // Set request status for snakcbar message in table
  useEffect(() => {
    if (errorDecidingOnOrdreMission === false) {
      if (decisionString === 'apptove')
        dispatch(setOrdreMissionStatusAction('signedAndApproved'));
      if (decisionString === 'return')
        dispatch(setOrdreMissionStatusAction('returned'));
      if (decisionString === 'reject')
        dispatch(setOrdreMissionStatusAction('rejected'));

      dispatch(cleanupDecideOnOrdreMissionFormPageAction());
      dispatch(cleanupParentDecideOnOrdreMissionPageAction());
    }
  }, [errorDecidingOnOrdreMission]);

  // Cleanup store
  useEffect(
    () => () => {
      dispatch(cleanupDecideOnOrdreMissionFormPageAction());
      dispatch(cleanupParentDecideOnOrdreMissionPageAction());
    },
    [],
  );

  const handleOnReturnButtonClick = () => {
    dispatch(cleanupDecideOnOrdreMissionFormPageAction());
    dispatch(cleanupParentDecideOnOrdreMissionPageAction());
  };

  const handleOnApproveRequestButtonClick = () => {
    setModalHeader('approveRequest');
    setModalBody('approveRequestBody');
    setModalSevirity('primary');
    setModalVisibility(true);
  };
  const handleOnRejectRequestButtonClick = () => {
    setModalHeader('rejectRequest');
    setModalBody('rejectRequestBody');
    setModalSevirity('danger');
    setModalVisibility(true);
  };
  const handleOnReturnRequestButtonClick = () => {
    setModalHeader('returnRequest');
    setModalBody('returnRequestBody');
    setModalSevirity('warning');
    setModalVisibility(true);
  };

  const handleOnApproveRequestConfirmationButtonClick = () => {
    if (isApprovedWithAvanceVoyage) {
      setDecisionString('approveAll');
    } else {
      setDecisionString('approve');
    }
  };
  const handleOnApproveAllConfirmationButtonClick = () => {
    setDecisionString('approveAll');
  };
  const handleOnRejectRequestConfirmationButtonClick = () => {
    setDecisionString('reject');
  };
  const handleOnReturnRequestConfirmationButtonClick = () => {
    setDecisionString('return');
  };

  return (
    <Box
      position="fixed"
      top={64}
      bottom={0}
      left={isSideBarVisible ? 200 : 0}
      right={0}
      sx={{
        overflowY: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        overflow: 'auto',
      }}
    >
      <Fab
        variant="circular"
        color="info"
        sx={{
          position: 'fixed',
          top: 90,
          left: isSideBarVisible ? 230 : 30,
        }}
        onClick={handleOnReturnButtonClick}
      >
        <ArrowBackIcon />
      </Fab>
      <Box display="flex" justifyContent="center" textAlign="center" margin={3}>
        <Typography level="h2">
          <FormattedMessage id={messages.ordreMissionTitle.id} /> #
          {ordreMissionDetails?.id}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={1}
      >
        <Typography color="neutral" level="title-lg" variant="plain">
          <FormattedMessage id={messages.currentStatus.id} />:{' '}
          <Typography color="primary" level="title-lg" variant="plain">
            {ordreMissionDetails?.latestStatus}
          </Typography>
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <Button
          variant="outlined"
          color="warning"
          onClick={() => {
            setModalVisibility(true);
            setModalHeader('statusHistory');
          }}
          startIcon={<HistoryIcon />}
        >
          <FormattedMessage id={messages.statusHistoryButton.id} />
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
        userData={ordreMissionDetails?.requester}
        isActualRequester={false}
      />

      {/* ACTUAL REQUESTER INFO */}
      {ordreMissionDetails?.onBehalf === true && (
        <>
          {/* DIVIDER */}
          <Box
            display="flex"
            justifyContent="center"
            textAlign="center"
            marginBottom={3}
          >
            <Divider style={{ width: '60%', opacity: 0.7 }} />
          </Box>
          <DisplayUserinfo userData={ordreMissionDetails?.actualRequester} />
        </>
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

      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        marginBottom={3}
      >
        <Typography level="title-md" display="flex">
          <FormattedMessage id={messages.requestAbroadPhrase.id} />
          :&nbsp;
          <Box sx={{ fontWeight: 'bold' }}>
            {ordreMissionDetails?.abroad === true ? (
              <FormattedMessage id={messages.requestsAbroadSet.id} />
            ) : (
              <FormattedMessage id={messages.requestNotAbroadSet.id} />
            )}
          </Box>
        </Typography>
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

      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Card
          variant="soft"
          color="neutral"
          sx={{ width: '50%', bgcolor: 'white', boxShadow: 'sm' }}
        >
          <CardContent>
            <Typography level="title-md">Description</Typography>
            <Typography level="body-md">
              {ordreMissionDetails?.description}
            </Typography>
          </CardContent>
        </Card>
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
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        marginBottom={2}
      >
        <Typography level="h4" display="flex">
          <FormattedMessage id={messages.tripsHeader.id} />
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" marginBottom={5}>
        <TripsTable tripsData={trips} />
      </Box>

      {expesnes.length > 0 && (
        <>
          <Box
            textAlign="center"
            display="flex"
            justifyContent="center"
            marginBottom={2}
          >
            <Typography level="h4" display="flex">
              <FormattedMessage id={messages.expensesHeader.id} />
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" marginBottom={3}>
            <ExpensesTable expensesData={expesnes} />
          </Box>
        </>
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
      {ordreMissionDetails?.avanceVoyagesDetails.map((av) => (
        <Box display="flex" justifyContent="center" marginBottom={3}>
          <Box width="60%" display="flex" justifyContent="flex-end">
            <Typography level="h4">
              <FormattedMessage id={messages.total.id} />
              &nbsp;{av?.currency}:&nbsp;
              <Typography color="success">
                <NumericFormat
                  displayType="text"
                  value={av?.estimatedTotal}
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
                />
              </Typography>
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Buttons */}
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
        {!readOnly && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={handleOnRejectRequestButtonClick}
            >
              <FormattedMessage id={messages.rejectButton.id} />
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleOnReturnRequestButtonClick}
            >
              <FormattedMessage id={messages.returnRequestButton.id} />
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleOnApproveRequestButtonClick}
            >
              <FormattedMessage id={messages.signAndApproveButton.id} />
            </Button>
          </>
        )}
      </Stack>

      {/* THE MODAL */}
      <Dialog
        open={modalVisibility}
        keepMounted
        onClose={() => {
          setModalVisibility(false);
          setDeciderComment(null);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {modalHeader && <FormattedMessage id={messages[modalHeader].id} />}
        </DialogTitle>
        <DialogContent dividers>
          {modalHeader === 'statusHistory' ? (
            <Timeline>
              {ordreMissionDetails?.statusHistory?.map((sh, i, arr) => (
                <CustomizedTimeLine
                  statusHistory={sh}
                  lastOne={arr.length - 1 === i}
                ></CustomizedTimeLine>
              ))}
            </Timeline>
          ) : (
            <DialogContentText id="alert-dialog-slide-description">
              <Alert color={modalSevirity} size="lg" variant="soft">
                {modalBody && <FormattedMessage id={messages[modalBody].id} />}
              </Alert>
              {(modalHeader === 'returnRequest' ||
                modalHeader === 'rejectRequest') && (
                <>
                  <Typography
                    level="title-md"
                    color="danger"
                    marginTop={3}
                    marginBottom={2}
                  >
                    {modalHeader === 'rejectRequest' ? (
                      <FormattedMessage
                        id={messages.rejectingRequestComment.id}
                      />
                    ) : (
                      <FormattedMessage
                        id={messages.returningRequestComment.id}
                      />
                    )}
                  </Typography>
                  <TextField
                    sx={{ width: '100%' }}
                    id="outlined-multiline-static"
                    multiline
                    rows={5}
                    placeholder={intl.formatMessage({
                      id: messages.deciderCommentPlaceholder.id,
                    })}
                    variant="outlined"
                    onChange={(e) => setDeciderComment(e.target.value)}
                    inputProps={{ maxLength: 255 }}
                  />
                </>
              )}
              {modalHeader === 'approveRequest' &&
                ordreMissionDetails?.latestStatus !==
                  "Pending HR's approval" && (
                  <FormControl sx={{ marginTop: 3 }}>
                    <Checkbox
                      color="danger"
                      value={isApprovedWithAvanceVoyage}
                      onChange={() =>
                        setIsApprovedWithAvanceVoyage(
                          !isApprovedWithAvanceVoyage,
                        )
                      }
                      label={
                        <Typography level="title-md" color="danger">
                          <FormattedMessage
                            id={
                              messages
                                .signAndApproveWithRelatedAvanceVoyageButton.id
                            }
                          />
                        </Typography>
                      }
                    />
                  </FormControl>
                )}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setModalVisibility(false)}>
            <FormattedMessage id={messages.closeButton.id} />
          </Button>
          {modalHeader === 'approveRequest' && (
            <Button
              color="success"
              onClick={handleOnApproveRequestConfirmationButtonClick}
              variant="contained"
            >
              <FormattedMessage id={messages.signAndApproveButton.id} />
            </Button>
          )}
          {modalHeader === 'rejectRequest' && (
            <Button
              color="error"
              onClick={handleOnRejectRequestConfirmationButtonClick}
              variant="contained"
            >
              <FormattedMessage id={messages.rejectButton.id} />
            </Button>
          )}
          {modalHeader === 'returnRequest' && (
            <Button
              color="warning"
              onClick={handleOnReturnRequestConfirmationButtonClick}
              variant="contained"
            >
              <FormattedMessage id={messages.returnRequestButton.id} />
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

DecideOnOrdreMissionForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default DecideOnOrdreMissionForm;
