/**
 *
 * OrdreMissionForm
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/system/Stack';
import Box from '@mui/system/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import WarningIcon from '@mui/icons-material/Warning';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Timeline from '@mui/lab/Timeline';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Snackbar from '@mui/joy/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import DescriptionIcon from '@mui/icons-material/Description';
import { Typography as JoyTypography } from '@mui/joy';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import dayjs from 'dayjs';
import {
  ChangePageContentAction,
  cleanupParentOrdreMissionPageAction,
} from 'pages/OrdreMission/actions';
import { setOrdreMissionStatusAction } from 'containers/OrdreMissionTable/actions';
import DisplayUserinfo from 'components/DisplayUserinfo';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import { makeSelectOrdreMissionIdentity } from 'pages/OrdreMission/selectors';
import ActualRequesterInputs from 'components/ActualRequesterInputs';
import { ValidateInputs } from 'utils/Custom/ValidateInputs';

import { NumericFormat } from 'react-number-format';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectAbroad,
  makeSelectAddOrdreMissionError,
  makeSelectErrorDownloadingOrdreMissionDocumentFile,
  makeSelectErrorLoadingOrdreMissionDetails,
  makeSelectErrorLoadingStaticData,
  makeSelectErrorSubmittingOrdreMission,
  makeSelectOnBehalf,
  makeSelectOrdreMissionDetails,
  makeSelectOrdreMissionDocumentFile,
  makeSelectStaticData,
  makeSelectUpdateOrdreMissionError,
} from './selectors';
import Trips from './Trips';
import Expenses from './Expenses';
import {
  AddOrdreMissionAction,
  LoadStaticDataAction,
  SelectAbroadAction,
  SelectOnBehalfAction,
  UpdateOrdreMissionAction,
  cleanupOrdreMissionFormPageAction,
  downloadOrdreMissionDocumentFileAction,
  loadOrdreMissionDetailsAction,
  submitOrdreMissionAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  onBehalfSelection: makeSelectOnBehalf(),
  abroadSelection: makeSelectAbroad(),
  errorLoadingStaticData: makeSelectErrorLoadingStaticData(),
  errorAddingOrdreMission: makeSelectAddOrdreMissionError(),
  errorUpdatingOrdreMission: makeSelectUpdateOrdreMissionError(),
  errorSubmittingOrdreMission: makeSelectErrorSubmittingOrdreMission(),
  staticData: makeSelectStaticData(),
  ordreMissionIdentity: makeSelectOrdreMissionIdentity(),
  errorLoadingOrdreMissionDetails: makeSelectErrorLoadingOrdreMissionDetails(),
  ordreMissionDetails: makeSelectOrdreMissionDetails(),
  errorDownloadingOrdreMissionDocumentFile:
    makeSelectErrorDownloadingOrdreMissionDocumentFile(),
  ordreMissionDocumentFile: makeSelectOrdreMissionDocumentFile(),
});

export function OrdreMissionForm({ state }) {
  useInjectReducer({ key: 'ordreMissionForm', reducer });
  useInjectSaga({ key: 'ordreMissionForm', saga });
  const dispatch = useDispatch();
  const {
    isSideBarVisible,
    onBehalfSelection,
    abroadSelection,
    errorLoadingStaticData,
    staticData,
    errorAddingOrdreMission,
    errorUpdatingOrdreMission,
    errorLoadingOrdreMissionDetails,
    ordreMissionDetails,
    errorSubmittingOrdreMission,
    ordreMissionIdentity,
    errorDownloadingOrdreMissionDocumentFile,
    ordreMissionDocumentFile,
  } = useSelector(mapStateToProps);
  const [trips, setTrips] = useState([
    {
      id: 0,
      departurePlace: '',
      destination: '',
      departureDate: null,
      arrivalDate: null,
      transportationMethod: '',
      unit: '',
      value: 0,
      highwayFee: 0,
    },
    {
      id: 1,
      departurePlace: '',
      destination: '',
      departureDate: null,
      arrivalDate: null,
      transportationMethod: '',
      unit: '',
      value: 0,
      highwayFee: 0,
    },
  ]);
  const [actualRequester, setActualRequester] = useState({
    firstName: '',
    lastName: '',
    registrationNumber: '',
    jobTitle: '',
    department: '',
    managerUserName: '',
  });
  const [totalMAD, setTotalMAD] = useState(0);
  const [totalEUR, setTotalEUR] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [tripsCounter, setTripsCounter] = useState(2); // This counter is being used for the uniqueness of trips ids
  const [expensesCounter, setExpensesCounter] = useState(0); // This counter is being used for the uniqueness of expenses ids
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalSevirity, setModalSevirity] = useState('');
  const [buttonClicked, setButtonClicked] = useState(''); // this state is used to track which button has been clicked
  const [savedSnackbarVisibility, setSavedSnackbarVisibility] = useState(false);
  const [fullPageModalVisibility, setFullPageModalVisibility] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const readOnly = state === 'VIEW' || state === 'CONFIRM';

  // Load the data => object details and static data
  useEffect(() => {
    if (state !== 'ADD') {
      dispatch(loadOrdreMissionDetailsAction(ordreMissionIdentity));
    }
    if (!readOnly) {
      dispatch(LoadStaticDataAction());
    }
  }, []);

  // Fill the loaded data in case of editing/modifying
  useEffect(() => {
    if (ordreMissionDetails !== null) {
      updateDescriptionData(ordreMissionDetails?.description);
      dispatch(SelectOnBehalfAction(ordreMissionDetails?.onBehalf.toString()));
      dispatch(SelectAbroadAction(ordreMissionDetails?.abroad.toString()));
      if (ordreMissionDetails?.requesterInfo !== null) {
        setActualRequester(ordreMissionDetails?.requesterInfo);
      }

      setTrips([]);
      setExpenses([]);

      ordreMissionDetails?.avanceVoyagesDetails?.forEach((avanceDetails) => {
        avanceDetails?.trips?.forEach((trip) => {
          const formattedDateTrip = {
            ...trip,
            departureDate: dayjs(new Date(trip.departureDate)),
            arrivalDate: dayjs(new Date(trip.arrivalDate)),
          };
          setTrips((prevTrips) => [...prevTrips, formattedDateTrip]);
        });
        avanceDetails?.expenses?.forEach((expense) => {
          const formattedDateExpense = {
            id: expense.id,
            currency: expense.currency,
            description: expense.description,
            expenseDate: dayjs(new Date(expense.expenseDate)),
            estimatedFee: expense.estimatedFee,
          };
          setExpenses((prevExpenses) => [
            ...prevExpenses,
            formattedDateExpense,
          ]);
        });
      });
    }
  }, [ordreMissionDetails]);

  // calculate estimated total
  useEffect(() => {
    let totalTripsMAD = 0.0;
    let totalTripsEUR = 0.0;
    let totalExpensesMAD = 0.0;
    let totalExpensesEUR = 0.0;
    trips.forEach((trip) => {
      if (trip.unit === 'KM' || trip.unit === 'MAD') {
        if (trip.unit === 'KM') {
          totalTripsMAD =
            totalTripsMAD +
            parseFloat(trip.value) * 2.5 +
            parseFloat(trip.highwayFee);
        } else {
          totalTripsMAD =
            totalTripsMAD +
            parseFloat(trip.value) +
            parseFloat(trip.highwayFee);
        }
      } else {
        totalTripsEUR =
          totalTripsEUR + parseFloat(trip.value) + parseFloat(trip.highwayFee);
      }
    });
    expenses.forEach((expense) => {
      if (expense.currency === 'MAD') {
        totalExpensesMAD += parseFloat(expense.estimatedFee);
      } else {
        totalExpensesEUR += parseFloat(expense.estimatedFee);
      }
    });
    const TOTAL_MAD = totalExpensesMAD + totalTripsMAD;
    const TOTAL_EUR = totalExpensesEUR + totalTripsEUR;
    setTotalMAD(Number(TOTAL_MAD.toFixed(2)));
    setTotalEUR(Number(TOTAL_EUR.toFixed(2)));
  }, [trips, expenses]);

  // Listen to adding & updating
  useEffect(() => {
    if (errorAddingOrdreMission === false) {
      if (buttonClicked === 'SAVE-AS-DRAFT') {
        dispatch(cleanupParentOrdreMissionPageAction());
        dispatch(setOrdreMissionStatusAction('SAVED'));
      }
      if (buttonClicked === 'CONFIRM') {
        dispatch(loadOrdreMissionDetailsAction(ordreMissionIdentity));
      }
    }
    if (errorUpdatingOrdreMission === false) {
      if (buttonClicked === 'SAVE-AS-DRAFT') {
        dispatch(cleanupParentOrdreMissionPageAction());
        dispatch(setOrdreMissionStatusAction('UPDATED'));
      }
      if (buttonClicked === 'CONFIRM') {
        dispatch(loadOrdreMissionDetailsAction(ordreMissionIdentity));
      }
      if (buttonClicked === 'SUBMIT-MODIFICATIONS') {
        dispatch(cleanupParentOrdreMissionPageAction());
        dispatch(setOrdreMissionStatusAction('RESUBMITTED'));
      }
    }
  }, [errorAddingOrdreMission, errorUpdatingOrdreMission]);

  // Change PAGE CONTENT TO CONFIRMATION PAGE when the object is loaded and the button clicked is CONFIRM
  useEffect(() => {
    if (
      buttonClicked === 'CONFIRM' &&
      errorLoadingOrdreMissionDetails === false
    ) {
      setFullPageModalVisibility(true);
    }
  }, [errorLoadingOrdreMissionDetails]);

  // Listen to Submit/Resubmit
  useEffect(() => {
    if (errorSubmittingOrdreMission === false) {
      if (buttonClicked === 'SUBMIT') {
        dispatch(setOrdreMissionStatusAction('SUBMITTED'));
      }
      if (buttonClicked === 'SUBMIT-MODIFICATIONS') {
        dispatch(setOrdreMissionStatusAction('RESUBMITTED'));
      }

      dispatch(cleanupParentOrdreMissionPageAction());
    }
  }, [errorSubmittingOrdreMission]);

  // Download Document
  useEffect(() => {
    if (errorDownloadingOrdreMissionDocumentFile === false) {
      const binaryString = atob(ordreMissionDocumentFile.fileContents);
      const bytes = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i += 1) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes.buffer], {
        type: 'application/pdf',
      });

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = ordreMissionDocumentFile.fileDownloadName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoadingButton(false);
    }
  }, [errorDownloadingOrdreMissionDocumentFile]);

  // cleanup store
  useEffect(
    () => () => {
      dispatch(cleanupOrdreMissionFormPageAction());
      dispatch(cleanupParentOrdreMissionPageAction());
    },
    [],
  );

  const handleOnBehalfSelectionChange = (event) => {
    if (event.target.value !== String(onBehalfSelection)) {
      dispatch(SelectOnBehalfAction(event.target.value.toString()));
    }
  };
  const handleAbroadSelectionChange = (event) => {
    if (event.target.value !== String(abroadSelection)) {
      dispatch(SelectAbroadAction(event.target.value.toString()));
    }
  };

  const updateDescriptionData = (value) => {
    setDescription(value);
  };

  const updateActualRequesterData = (fieldName, value) => {
    setActualRequester((prevActualRequester) => ({
      ...prevActualRequester,
      [fieldName]: value,
    }));
  };

  const addTrip = () => {
    setTripsCounter(tripsCounter + 1); // generate random ID for each trip by increment the counter
    const newTrip = {
      id: tripsCounter,
      departurePlace: '',
      destination: '',
      departureDate: null,
      arrivalDate: null,
      transportationMethod: '',
      unit: '',
      value: 0,
      highwayFee: 0,
    };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const updateTripData = (tripId, field, value) => {
    if (
      field === 'transportationMethod' &&
      (value === 'Personal Vehicule' || value === "Company's Vehicule")
    ) {
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip.id === tripId ? { ...trip, unit: 'KM' } : trip,
        ),
      );
    }

    if (
      field === 'transportationMethod' &&
      value !== 'Personal Vehicule' &&
      value !== "Company's Vehicule"
    ) {
      const tripToUpdate = trips.find((trip) => trip.id === tripId);
      if (tripToUpdate.unit === 'KM') {
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip.id === tripId ? { ...trip, unit: 'MAD' } : trip,
          ),
        );
      }
    }

    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, [field]: value } : trip,
      ),
    );
  };

  const removeTrip = (tripId) => {
    const updatedTrips = trips.filter((trip) => trip.id !== tripId);
    setTrips(updatedTrips);
  };

  const addExpense = () => {
    setExpensesCounter(expensesCounter + 1);
    const newExpense = {
      id: expensesCounter,
      description: '',
      expenseDate: null,
      currency: '',
      estimatedFee: 0.0,
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const removeExpense = (expenseId) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId,
    );
    setExpenses(updatedExpenses);
  };

  const updateExpenseData = (expenseId, field, value) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === expenseId ? { ...expense, [field]: value } : expense,
      ),
    );
  };

  const getAction = () => {
    let requestAction = '';
    if (ordreMissionDetails !== null) {
      requestAction = state === 'EDIT' ? 'save' : 'submit';
    }
    return requestAction;
  };

  const data = {
    id: ordreMissionDetails !== null ? ordreMissionDetails?.id : 0,
    action: getAction(),
    description,
    Abroad: abroadSelection === 'true',
    onBehalf: onBehalfSelection === 'true',
    trips,
    expenses,
    actualRequester,
  };

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(cleanupOrdreMissionFormPageAction());
    dispatch(cleanupParentOrdreMissionPageAction());
  };
  const handleOnSaveAsDraftClick = () => {
    const result = ValidateInputs(
      setModalVisibility,
      setModalBody,
      setModalHeader,
      setModalSevirity,
      data,
      setActualRequester,
      totalMAD,
      totalEUR,
    );
    if (result === true) {
      if (state === 'ADD') {
        dispatch(AddOrdreMissionAction(data));
        setButtonClicked('SAVE-AS-DRAFT');
      }
      if (state === 'EDIT') {
        // Edit and save in case of draft
        dispatch(UpdateOrdreMissionAction(data));
        setButtonClicked('SAVE-AS-DRAFT');
      }
    }
  };

  const handleOnConfirmButtonClick = () => {
    const result = ValidateInputs(
      setModalVisibility,
      setModalBody,
      setModalHeader,
      setModalSevirity,
      data,
      setActualRequester,
      totalMAD,
      totalEUR,
    );
    if (result === true) {
      if (state === 'ADD') {
        dispatch(AddOrdreMissionAction(data));
        setButtonClicked('CONFIRM');
      }
      if (state === 'EDIT') {
        // Edit and save in case of draft
        dispatch(UpdateOrdreMissionAction(data));
        setButtonClicked('CONFIRM');
      }
    }
  };

  const handleOnSubmitButtonClick = () => {
    setModalHeader('Submit');
    setModalBody(
      "Please Review your information before confirming your changes. You won't be able to modify your request afterwards!",
    );
    setModalSevirity('info');
    setModalVisibility(true);
  };

  const handleOnSubmitConfirmationButtonClick = () => {
    dispatch(submitOrdreMissionAction(ordreMissionDetails?.id));
    setButtonClicked('SUBMIT');
  };

  const handleOnSubmitModificationsButtonClick = () => {
    setModalHeader('Confirmation');
    setModalBody(
      "Please Review your information before confirming your changes. You won't be able to modify your request afterwards!",
    );
    setModalSevirity('warning');
    setModalVisibility(true);
  };

  const handleOnSubmitModificationsConfirmationButtonClick = () => {
    // This button is in the modal
    const result = ValidateInputs(
      setModalVisibility,
      setModalBody,
      setModalHeader,
      setModalSevirity,
      data,
      setActualRequester,
      totalMAD,
      totalEUR,
    );
    if (result === true) {
      dispatch(UpdateOrdreMissionAction(data));
      setButtonClicked('SUBMIT-MODIFICATIONS');
    }
  };

  const handleOnDownloadDocumentClick = () => {
    setLoadingButton(true);
    downloadOrdreMissionDocumentFileAction(ordreMissionDetails.id);
  };

  return (
    <Box
      id="main-box"
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* THE HEADER */}
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          marginBottom={1}
        >
          {state === 'ADD' && (
            <h1 style={{ fontSize: '30px' }}>New Ordre Mission Request</h1>
          )}
          {state === 'EDIT' && (
            <h1 style={{ fontSize: '30px' }}>
              Editing Ordre Mission #{ordreMissionDetails?.id}
            </h1>
          )}
          {state === 'MODIFY' && (
            <h1 style={{ fontSize: '30px' }}>
              Modifying Ordre Mission #{ordreMissionDetails?.id}
            </h1>
          )}
          {state === 'VIEW' && (
            <h1 style={{ fontSize: '30px' }}>
              View Ordre Mission #{ordreMissionDetails?.id}
            </h1>
          )}
          {state === 'CONFIRM' && (
            <Box>
              <Typography variant="h4" marginTop={3} gutterBottom>
                Please Review your information before submitting
              </Typography>
            </Box>
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
              *This request has been saved as a draft. You can still modify it
              if you don&apos;t submit it. <br /> Please note: your request
              cannot be edited once it is submitted.
            </Typography>
          </Box>
        )}
        {(state === 'VIEW' || state === 'MODIFY') && (
          <>
            <Box
              display="flex"
              justifyContent="center"
              textAlign="center"
              marginBottom={1}
            >
              <JoyTypography color="neutral" level="title-lg" variant="plain">
                Current Status:{' '}
                <JoyTypography color="primary" level="title-lg" variant="plain">
                  {ordreMissionDetails?.latestStatus}
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
                variant="contained"
                color="warning"
                onClick={() => {
                  setModalVisibility(true);
                  setModalHeader('Status History');
                }}
                startIcon={<HistoryIcon />}
              >
                Status History
              </Button>
              {ordreMissionDetails?.latestStatus !== 'Returned' &&
                ordreMissionDetails?.latestStatus !== 'Rejected' &&
                ordreMissionDetails?.latestStatus !==
                  'Returned for missing evidences' && (
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
                      <>Download Document</>
                    ) : (
                      <>Generating...</>
                    )}
                  </Button>
                )}
            </Box>
          </>
        )}

        {state === 'MODIFY' && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom={3}
          >
            <Card color="warning" variant="soft" icon={false}>
              <CardContent sx={{ textAlign: 'center', marginBottom: '1em' }}>
                This request has been returned. <br /> Please refer to the
                comment below and apply the necessary changes.
              </CardContent>
              <Card variant="outlined">
                {ordreMissionDetails?.deciderComment}
              </Card>
            </Card>
          </Box>
        )}
        {state === 'VIEW' &&
          ordreMissionDetails?.latestStatus === 'Rejected' && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginBottom={3}
            >
              <Card color="danger" variant="soft" icon={false}>
                <CardContent sx={{ textAlign: 'center', marginBottom: '1em' }}>
                  This request has been rejected. <br /> Please refer to the
                  comment below to know why.
                </CardContent>
                <Card variant="outlined">
                  {ordreMissionDetails?.deciderComment}
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
        {readOnly ? (
          <DisplayUserinfo
            userData={
              ordreMissionDetails?.requesterInfo !== null
                ? ordreMissionDetails?.requesterInfo
                : null
            }
          />
        ) : (
          <DisplayUserinfo />
        )}

        {!readOnly && (
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
            <Box textAlign="center">
              <Typography variant="subtitle1">
                Are you filling this form on behalf of someone else?
              </Typography>
            </Box>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
              value={onBehalfSelection ? onBehalfSelection.toString() : ''} // Convert the boolean to a string
              onChange={handleOnBehalfSelectionChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </>
        )}

        {onBehalfSelection &&
          onBehalfSelection.toString() === 'true' &&
          !readOnly &&
          staticData && (
            <ActualRequesterInputs
              actualRequester={actualRequester}
              updateActualRequesterData={updateActualRequesterData}
              staticData={staticData}
            />
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

        {!readOnly ? (
          <>
            <Box textAlign="center">
              <Typography variant="subtitle1">
                Is this mission abroad?
              </Typography>
            </Box>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
              value={abroadSelection ? abroadSelection.toString() : ''} // Convert the boolean to a string
              onChange={handleAbroadSelectionChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </>
        ) : (
          <Box
            textAlign="center"
            display="flex"
            justifyContent="center"
            marginBottom={3}
          >
            <Typography variant="subtitle1" display="flex">
              This Mission is set to be:&nbsp;
              <Box sx={{ fontWeight: 'bold' }}>
                {ordreMissionDetails?.abroad === true ? 'Abroad' : 'NOT Abroad'}
              </Box>
            </Typography>
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

        {/* DESCRIPTION */}

        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          marginBottom={3}
        >
          <TextField
            variant={readOnly ? 'filled' : 'outlined'}
            multiline
            minRows={3}
            label="Mission description"
            value={description}
            onChange={(e) => updateDescriptionData(e.target.value)}
            required
            sx={{ width: '50%' }}
            InputProps={{
              readOnly,
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{
              maxLength: 500,
            }}
          />
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

        {/* Trip Header */}
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          marginBottom={2}
        >
          <h1 style={{ fontSize: '25px' }}>Trajectories</h1>
          {!readOnly && (
            <IconButton onClick={addTrip}>
              <AddCircleIcon
                sx={{ color: 'green', fontSize: '30px' }}
              ></AddCircleIcon>
            </IconButton>
          )}
        </Box>
        {trips.map((trip, index) => (
          <div key={trip.id}>
            <Trips
              key={trip.id}
              tripData={trip}
              updateTripData={updateTripData}
              isTripRequired={index === 0 || index === 1}
              isTripModifiabale={readOnly === false}
              removeTrip={removeTrip}
            />
          </div>
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

        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          marginBottom={2}
        >
          <Box display="flex" justifyContent="flex-start" width="40rem">
            <h1 style={{ fontSize: '18px' }}>
              {readOnly && expenses.length === 0 ? (
                <>No Expenses</>
              ) : (
                <>Other expenses&nbsp;</>
              )}
              {!readOnly && (
                <Typography variant="caption">(optional)</Typography>
              )}
            </h1>
            {!readOnly && (
              <IconButton onClick={addExpense}>
                <AddCircleIcon
                  sx={{ color: 'chocolate', fontSize: '30px' }}
                ></AddCircleIcon>
              </IconButton>
            )}
          </Box>
        </Box>
        {expenses.map((expense) => (
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            key={expense.id}
          >
            <div key={expense.id}>
              <Expenses
                key={expense.id}
                expenseData={expense}
                updateExpenseData={updateExpenseData}
                removeExpense={removeExpense}
                isExpenseRequired={readOnly}
              />
            </div>
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

        {/* Calculated Total */}
        <Box display="flex" justifyContent="center">
          <Box display="flex" justifyContent="flex-end" width="60%">
            <Box display="flex" flexDirection="column">
              <Box display="flex" justifyContent="space-between" gap={5}>
                <h1 style={{ fontSize: '1.1rem' }}>Estimated Total in MAD:</h1>
                <h1 style={{ fontSize: '1.1rem', color: 'green' }}>
                  <NumericFormat
                    displayType="text"
                    value={totalMAD}
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
                </h1>
              </Box>
              {abroadSelection === 'true' && (
                <Box display="flex" justifyContent="space-between" gap={5}>
                  <h1 style={{ fontSize: '1.1rem' }}>
                    Estimated Total in EUR:
                  </h1>
                  <h1 style={{ fontSize: '1.1rem', color: 'green' }}>
                    <NumericFormat
                      displayType="text"
                      value={totalEUR}
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
                  </h1>
                </Box>
              )}
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
          {(state === 'EDIT' || state === 'ADD') && (
            <>
              <Button
                variant="contained"
                color="warning"
                onClick={handleOnSaveAsDraftClick}
              >
                Save as Draft
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleOnConfirmButtonClick}
              >
                Confirm
              </Button>
            </>
          )}
          {state === 'MODIFY' && (
            <Button
              variant="contained"
              color="success"
              onClick={handleOnSubmitModificationsButtonClick}
            >
              Submit Modifications
            </Button>
          )}
          {state === 'CONFIRM' && (
            <Button
              variant="contained"
              color="success"
              onClick={handleOnSubmitButtonClick}
            >
              Submit
            </Button>
          )}
        </Stack>

        {/* THE MODAL */}
        <Dialog
          open={modalVisibility}
          keepMounted
          onClose={() => setModalVisibility(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{modalHeader}</DialogTitle>
          <DialogContent dividers>
            {modalHeader === 'Status History' ? (
              <Timeline position="alternate">
                {ordreMissionDetails?.statusHistory?.map((sh, i, arr) => (
                  <CustomizedTimeLine
                    statusHistory={sh}
                    lastOne={arr.length - 1 === i}
                  ></CustomizedTimeLine>
                ))}
              </Timeline>
            ) : (
              <DialogContentText id="alert-dialog-slide-description">
                <Alert severity={modalSevirity}>{modalBody}</Alert>
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalVisibility(false)}>Close</Button>
            {modalHeader === 'Confirmation' && (
              <Button
                color="success"
                onClick={handleOnSubmitModificationsConfirmationButtonClick}
                variant="contained"
              >
                Resubmit
              </Button>
            )}
            {modalHeader === 'Submit' && (
              <Button
                color="success"
                onClick={handleOnSubmitConfirmationButtonClick}
                variant="contained"
              >
                Submit
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Confirmation Modal */}
        <Dialog
          fullScreen
          open={fullPageModalVisibility}
          onScroll={() => setFullPageModalVisibility(false)}
          PaperProps={{
            style: {
              backgroundColor: '#f2f2f2',
            },
          }}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
          >
            <Grid item xs={1.5} justifyContent="center">
              <Alert
                sx={{ alignItems: 'flex-start' }}
                variant="outlined"
                severity="warning"
                icon={false}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={3}
                >
                  <WarningIcon color="warning" fontSize="large" />
                  <Typography variant="h6" color="warning">
                    By submitting this request, you acknowledge that all
                    provided information is correct.
                  </Typography>
                </Box>
              </Alert>
            </Grid>
            <Grid item justifyContent="center">
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  document.getElementById('main-box').scrollTop = 0;
                  dispatch(cleanupParentOrdreMissionPageAction());
                  dispatch(ChangePageContentAction('CONFIRM'));
                  setSavedSnackbarVisibility(true);
                  setFullPageModalVisibility(false);
                }}
                aria-label="close"
                size="large"
              >
                OK
              </Button>
            </Grid>
          </Grid>
        </Dialog>

        {/* Notification Bar */}
        <Snackbar
          open={savedSnackbarVisibility}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          size="lg"
          onClose={(event, reason) => {
            if (reason === 'timeout' || reason === 'escapeKeyDown') {
              setSavedSnackbarVisibility(false);
            }
          }}
          endDecorator={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSavedSnackbarVisibility(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          color="primary"
          variant="solid"
        >
          Request has been saved!
        </Snackbar>
      </LocalizationProvider>
    </Box>
  );
}

OrdreMissionForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default OrdreMissionForm;
