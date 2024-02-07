/**
 *
 * LiquidationForm
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { makeSelectLiquidationIdentity } from 'pages/Liquidation/selectors';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import {
  Box,
  Card,
  CardContent,
  List,
  ListDivider,
  ListItem,
  Option,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/joy';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  Snackbar,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DisplayUserinfo from 'components/DisplayUserinfo';
import Expenses from 'containers/AvanceCaisseForm/Expenses';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';
import TripsTable from 'components/TripsTable';
import ExpensesTable from 'components/ExpensesTable';
import { Timeline } from '@mui/lab';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import {
  changeLiquidationParentPageContentAction,
  cleanupliquidationParentPageStoreAction,
} from 'pages/Liquidation/actions';
import { ValidateLiquidationInputs } from 'utils/Custom/ValidateInputs';
import { setLiquidationStatusAction } from 'containers/LiquidationTable/actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAddLiquidation,
  makeSelectErrorLoadingLiquidationDetails,
  makeSelectErrorLoadingRequestsToLiquidate,
  makeSelectErrorSubmittingLiquidation,
  makeSelectErrorUpdatingLiquidation,
  makeSelectLiquidationDetails,
  makeSelectRequestToLiquidateDetails,
  makeSelectRequestTypeToLiquidate,
  makeSelectRequestsToLiquidate,
} from './selectors';
import {
  AddLiquidationAction,
  UpdateLiquidationAction,
  cleanupLiquidationFormPageStoreAction,
  loadLiquidationDetailsAction,
  loadRequestToLiquidateDetailsAction,
  loadRequestsToLiquidateAction,
  nullifyRequestToLiquidateDetailsAction,
  selectRequestTypeToLiquidateAction,
  submitLiquidationAction,
} from './actions';
import AdditionalTrips from './AdditionalTrips';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  errorAddingLiquidation: makeSelectAddLiquidation(),
  errorUpdatingLiquidation: makeSelectErrorUpdatingLiquidation(),
  errorSubmittingLiquidation: makeSelectErrorSubmittingLiquidation(),
  errorLoadingLiquidationDetails: makeSelectErrorLoadingLiquidationDetails(),
  liquidationDetails: makeSelectLiquidationDetails(),
  liquidationIdentity: makeSelectLiquidationIdentity(),
  requestTypeToLiquidate: makeSelectRequestTypeToLiquidate(),
  errorLoadingRequestsToLiquidate: makeSelectErrorLoadingRequestsToLiquidate(),
  requestsToLiquidate: makeSelectRequestsToLiquidate(),
  requestToLiquidateDetails: makeSelectRequestToLiquidateDetails(),
});

export function LiquidationForm({ state }) {
  useInjectReducer({ key: 'liquidationForm', reducer });
  useInjectSaga({ key: 'liquidationForm', saga });
  const dispatch = useDispatch();
  const {
    isSideBarVisible,
    errorAddingLiquidation,
    errorUpdatingLiquidation,
    errorSubmittingLiquidation,
    errorLoadingLiquidationDetails,
    liquidationDetails,
    liquidationIdentity,
    requestTypeToLiquidate,
    requestsToLiquidate,
    requestToLiquidateDetails,
  } = useSelector(mapStateToProps);
  const avanceVoyageLabel = (
    <Typography color="primary" level="title-lg">
      Avance Voyage
    </Typography>
  );
  const avanceCaisseLabel = (
    <Typography color="primary" level="title-lg">
      Avance Caisse
    </Typography>
  );

  const [selection, setSelection] = useState(null);
  const [counter, setCounter] = useState(0); // used for uniqueness of items (trips/expenses)
  const [newExpenses, setNewExpenses] = useState([]);
  const [newTrips, setNewTrips] = useState([]);
  const [expensesToLiquidate, setExpensesToLiquidate] = useState([]);
  const [tripsToLiquidate, setTripsToLiquidate] = useState([]);
  const [actualTotal, setActualTotal] = useState(0.0);
  const [receiptsFile, setReceiptsFile] = useState('');
  const [receiptsFileName, setReceiptsFileName] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalSevirity, setModalSevirity] = useState('');
  const [savedSnackbarVisibility, setSavedSnackbarVisibility] = useState(false);
  const [fullPageModalVisibility, setFullPageModalVisibility] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(''); // this state is used to track which button has been clicked

  const readOnly =
    state === 'VIEW' ||
    state === 'CONFIRM' ||
    requestToLiquidateDetails?.latestStatus ===
      'Returned for missing evidences';

  const data = {
    id: liquidationDetails !== null ? liquidationDetails?.id : 0,
    requestId: requestToLiquidateDetails?.id,
    requestType: requestTypeToLiquidate,
    receiptsFile:
      liquidationDetails?.receiptsFile === receiptsFile ? null : receiptsFile,
    tripsLiquidations: tripsToLiquidate,
    expensesLiquidations: expensesToLiquidate,
    newExpenses,
    newTrips,
    action: state === 'EDIT' ? 'save' : 'submit',
  };

  // Scroll to top
  useEffect(() => {
    if (buttonClicked === 'CONFIRM') {
      document.getElementById('main-box').scrollTop = 0;
    }
  }, [buttonClicked]);

  // Load request data => object details
  useEffect(() => {
    if (state !== 'ADD') {
      dispatch(loadLiquidationDetailsAction(liquidationIdentity));
    }
  }, []);

  // load Requests to liquidate in case of adding
  useEffect(() => {
    if (requestTypeToLiquidate !== null && state === 'ADD') {
      dispatch(loadRequestsToLiquidateAction(requestTypeToLiquidate));
    }
  }, [requestTypeToLiquidate]);

  // Fill the data in case of editing or modifying
  useEffect(() => {
    if (liquidationDetails !== null) {
      setReceiptsFile(liquidationDetails?.receiptsFile);
      let newAddedExpensesReq = [];
      let expensesToLiquidateReq = [];
      liquidationDetails?.requestDetails?.expenses.forEach((expense) => {
        if (expense.estimatedFee === 0) {
          newAddedExpensesReq = [...newAddedExpensesReq, expense];
        } else {
          expensesToLiquidateReq = [
            ...expensesToLiquidateReq,
            {
              expenseId: expense.id,
              actualFee: expense.actualFee,
            },
          ];
        }
      });
      setNewExpenses(newAddedExpensesReq);
      setExpensesToLiquidate(expensesToLiquidateReq);
      let newAddedTripsReq = [];
      let tripsToLiquidateReq = [];
      liquidationDetails?.requestDetails?.trips.forEach((trip) => {
        if (trip.estimatedFee === 0) {
          newAddedTripsReq = [...newAddedTripsReq, trip];
        } else {
          tripsToLiquidateReq = [
            ...tripsToLiquidateReq,
            {
              tripId: trip.id,
              actualFee: trip.actualFee,
            },
          ];
        }
      });
      setNewTrips(newAddedTripsReq);
      setTripsToLiquidate(tripsToLiquidateReq);
    }
  }, [liquidationDetails]);

  // init trips and expenses to liquidate in case of adding
  useEffect(() => {
    if (requestToLiquidateDetails !== null) {
      // Expenses
      requestToLiquidateDetails?.expenses?.forEach((expense) => {
        const toLiquidateExpense = {
          expenseId: expense.id,
          actualFee: 0.0,
        };
        setExpensesToLiquidate((prevExpenses) => [
          ...prevExpenses,
          toLiquidateExpense,
        ]);
      });

      // Trips
      if (
        requestToLiquidateDetails?.trips !== undefined &&
        requestToLiquidateDetails?.trips !== null
      ) {
        requestToLiquidateDetails?.trips?.forEach((trip) => {
          const toLiquidateTrip = {
            tripId: trip.id,
            actualFee: 0.0,
          };
          setTripsToLiquidate((prevTrips) => [...prevTrips, toLiquidateTrip]);
        });
      }
    }
  }, [requestToLiquidateDetails]);

  // Change PAGE CONTENT TO CONFIRMATION PAGE when the object is loaded and the button clicked is CONFIRM
  useEffect(() => {
    if (
      buttonClicked === 'CONFIRM' &&
      errorLoadingLiquidationDetails === false
    ) {
      dispatch(cleanupliquidationParentPageStoreAction());
      dispatch(changeLiquidationParentPageContentAction('CONFIRM'));
      setFullPageModalVisibility(true);
      setSavedSnackbarVisibility(true);
    }
  }, [errorLoadingLiquidationDetails]);

  // clean arrays in case of changing request type
  useEffect(() => {
    setTripsToLiquidate([]);
    setExpensesToLiquidate([]);
    setNewExpenses([]);
    setNewTrips([]);
  }, [selection]);

  // update actual total
  useEffect(() => {
    let newTotal = 0.0;

    newTrips.forEach((trip) => {
      if (trip.unit === 'KM') {
        newTotal += trip.value * 2.5 + trip.highwayFee;
      } else {
        newTotal += trip.value + trip.highwayFee;
      }
    });

    newExpenses.forEach((expense) => {
      newTotal += expense.estimatedFee;
    });

    expensesToLiquidate.forEach((expense) => {
      newTotal += expense.actualFee;
    });

    tripsToLiquidate.forEach((trip) => {
      newTotal += trip.actualFee;
    });

    setActualTotal(Number(newTotal.toFixed(2)));
  }, [expensesToLiquidate, tripsToLiquidate, newExpenses, newTrips]);

  // Listen to adding & updating
  useEffect(() => {
    if (errorAddingLiquidation === false) {
      if (buttonClicked === 'SAVE-AS-DRAFT') {
        dispatch(setLiquidationStatusAction('SAVED'));
        dispatch(cleanupliquidationParentPageStoreAction());
      }
      if (buttonClicked === 'CONFIRM') {
        dispatch(loadLiquidationDetailsAction(liquidationIdentity));
      }
    }
    if (errorUpdatingLiquidation === false) {
      if (buttonClicked === 'SAVE-AS-DRAFT') {
        dispatch(setLiquidationStatusAction('UPDATED'));
        dispatch(cleanupliquidationParentPageStoreAction());
      }
      if (buttonClicked === 'SUBMIT-MODIFICATIONS') {
        dispatch(setLiquidationStatusAction('RESUBMITTED'));
        dispatch(cleanupliquidationParentPageStoreAction());
      }
      if (buttonClicked === 'CONFIRM') {
        dispatch(loadLiquidationDetailsAction(liquidationIdentity));
      }
    }
  }, [errorAddingLiquidation, errorUpdatingLiquidation]);

  useEffect(
    () => () => {
      dispatch(cleanupLiquidationFormPageStoreAction());
      dispatch(cleanupliquidationParentPageStoreAction());
    },
    [],
  );

  // FUNCS TO UPDATE ACTUAL FEES
  const updateExpenseToLiquidate = (expenseId, actualFee) => {
    const expenseIndex = expensesToLiquidate.findIndex(
      (expense) => expense.expenseId === expenseId,
    );

    if (expenseIndex !== -1) {
      setExpensesToLiquidate((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        updatedExpenses[expenseIndex] = {
          ...updatedExpenses[expenseIndex],
          actualFee,
        };
        return updatedExpenses;
      });
    }
  };

  const updateTripsToLiquidate = (tripId, actualFee) => {
    const tripIndex = tripsToLiquidate.findIndex(
      (trip) => trip.tripId === tripId,
    );

    if (tripIndex !== -1) {
      setTripsToLiquidate((prevTrips) => {
        const updatedTrips = [...prevTrips];
        updatedTrips[tripIndex] = { ...updatedTrips[tripIndex], actualFee };
        return updatedTrips;
      });
    }
  };

  const getTripActualFee = (tripId) => {
    const trip = tripsToLiquidate.find((item) => item.id === tripId);
    return trip ? trip.actualFee : 0.0;
  };

  const getExpenseActualFee = (expenseId) => {
    const expense = expensesToLiquidate.find((item) => item.id === expenseId);
    return expense ? expense.actualFee : 0.0;
  };

  const updateReceiptsFileData = async (e) => {
    setLoadingButton(true);
    const file = e.target.files[0];

    const binaryData = new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
    const response = await binaryData;
    const base64data = response.split(',')[1];
    setReceiptsFile(base64data);
    setReceiptsFileName(file.name);
    setLoadingButton(false);
  };

  // FUNCS FOR NEW DATA
  const removeExpense = (expenseId) => {
    const updatedExpenses = newExpenses.filter(
      (expense) => expense.id !== expenseId,
    );
    setNewExpenses(updatedExpenses);
  };

  const addExpense = () => {
    const newExpense = {
      id: counter,
      description: '',
      expenseDate: null,
      estimatedFee: 0.0,
    };
    setCounter((prevCount) => prevCount + 1);
    setNewExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const updateExpenseData = (expenseId, field, value) => {
    const expenseIndex = newExpenses.findIndex(
      (expense) => expense.id === expenseId,
    );

    if (expenseIndex !== -1) {
      setNewExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        updatedExpenses[expenseIndex] = {
          ...updatedExpenses[expenseIndex],
          [field]: value,
        };
        return updatedExpenses;
      });
    }
  };

  const addTrip = () => {
    const newTrip = {
      id: counter,
      departurePlace: '',
      destination: '',
      departureDate: null,
      arrivalDate: null,
      transportationMethod: '',
      unit: '',
      value: 0,
      highwayFee: 0,
    };
    setCounter((prevCount) => prevCount + 1);
    setNewTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const updateTripData = (tripId, field, value) => {
    const tripIndex = newTrips.findIndex((trip) => trip.id === tripId);

    if (
      field === 'transportationMethod' &&
      (value === 'Personal Vehicule' || value === "Company's Vehicule")
    ) {
      if (tripIndex !== -1) {
        setNewTrips((prevTrips) => {
          const updatedTrips = [...prevTrips];
          updatedTrips[tripIndex] = { ...updatedTrips[tripIndex], unit: 'KM' };
          return updatedTrips;
        });
      }
    }

    if (
      field === 'transportationMethod' &&
      value !== 'Personal Vehicule' &&
      value !== "Company's Vehicule"
    ) {
      if (tripIndex !== -1) {
        if (newTrips[tripIndex].unit === 'KM') {
          setNewTrips((prevTrips) => {
            const updatedTrips = [...prevTrips];
            updatedTrips[tripIndex] = {
              ...updatedTrips[tripIndex],
              unit: 'MAD',
            };
            return updatedTrips;
          });
        }
      }
    }

    if (tripIndex !== -1) {
      // Check if trip exists
      setNewTrips((prevTrips) => {
        const updatedTrips = [...prevTrips];
        updatedTrips[tripIndex] = {
          ...updatedTrips[tripIndex],
          [field]: value,
        };
        return updatedTrips;
      });
    }
  };

  const removeTrip = (tripId) => {
    const updatedTrips = newTrips.filter((trip) => trip.id !== tripId);
    setNewTrips(updatedTrips);
  };

  // HANDLE BUTTONS

  const handleOnReturnButtonClick = () => {
    dispatch(cleanupLiquidationFormPageStoreAction());
    dispatch(cleanupliquidationParentPageStoreAction());
  };

  const handleOnSaveAsDraftClick = () => {
    const result = ValidateLiquidationInputs(
      setModalVisibility,
      setModalBody,
      setModalHeader,
      setModalSevirity,
      data,
      actualTotal,
    );
    if (result === true) {
      if (state === 'ADD') {
        dispatch(AddLiquidationAction(data));
        setButtonClicked('SAVE-AS-DRAFT');
      }
      if (state === 'EDIT') {
        // Edit and save in case of draft
        dispatch(UpdateLiquidationAction(data));
        setButtonClicked('SAVE-AS-DRAFT');
      }
    }
  };

  const handleOnConfirmButtonClick = () => {
    const result = ValidateLiquidationInputs(
      setModalVisibility,
      setModalBody,
      setModalHeader,
      setModalSevirity,
      data,
      actualTotal,
    );
    if (result === true) {
      if (state === 'ADD') {
        dispatch(AddLiquidationAction(data));
        setButtonClicked('CONFIRM');
      }
      if (state === 'EDIT') {
        // Edit and save in case of draft
        dispatch(UpdateLiquidationAction(data));
        setButtonClicked('CONFIRM');
      }
    }
  };

  const handleOnSubmitButtonClick = () => {
    setModalHeader('Submit');
    setModalBody(
      'By submitting this request, you acknowledge that all provided information is correct.',
    );
    setModalSevirity('info');
    setModalVisibility(true);
  };

  const handleOnSubmitConfirmationButtonClick = () => {
    dispatch(submitLiquidationAction(liquidationDetails?.id));
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
    const result = ValidateLiquidationInputs(
      setModalVisibility,
      setModalBody,
      setModalHeader,
      setModalSevirity,
      data,
      actualTotal,
    );
    if (result === true) {
      dispatch(UpdateLiquidationAction(data));
      setButtonClicked('SUBMIT-MODIFICATIONS');
    }
  };

  const handleOnFileButtonClick = () => {
    const binaryString = atob(liquidationDetails?.receiptsFile);
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
    link.download = liquidationDetails?.receiptsFileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        {state === 'ADD' && (
          <>
            {/* Choose a request Type to liquidate */}
            <Box
              display="flex"
              justifyContent="center"
              textAlign="center"
              marginTop={2}
              marginBottom={3}
            >
              <Typography level="h2">
                Please choose a Request Type to liquidate:
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <RadioGroup
                overlay
                value={requestTypeToLiquidate}
                onChange={(event) =>
                  dispatch(
                    selectRequestTypeToLiquidateAction(event.target.value),
                  )
                }
              >
                <List
                  component="div"
                  variant="outlined"
                  orientation="horizontal"
                  sx={{
                    borderRadius: 'sm',
                    boxShadow: 'sm',
                  }}
                >
                  <React.Fragment key={0}>
                    <ListItem>
                      <Radio id="AV" value="AV" label={avanceVoyageLabel} />
                    </ListItem>
                  </React.Fragment>
                  <React.Fragment key={1}>
                    <ListDivider />
                    <ListItem>
                      <Radio id="AC" value="AC" label={avanceCaisseLabel} />
                    </ListItem>
                  </React.Fragment>
                </List>
              </RadioGroup>
            </Box>
            {/* select a request to liquidate */}
            {(requestTypeToLiquidate === 'AV' ||
              requestTypeToLiquidate === 'AC') && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
                marginTop={3}
                marginBottom={3}
              >
                <Typography level="title-lg">
                  Please choose a Request:
                </Typography>
                <Select
                  key={0}
                  placeholder="Select Request to liquidate..."
                  sx={{ width: '50%' }}
                  slotProps={{
                    listbox: {
                      placement: 'bottom-start',
                    },
                  }}
                  size="lg"
                  onChange={(e) => setSelection(e?.target?.value)}
                >
                  {requestsToLiquidate?.map((req) => (
                    <Option
                      key={req.id}
                      value={req.id}
                      onClick={() => {
                        dispatch(
                          loadRequestToLiquidateDetailsAction(
                            req.id,
                            requestTypeToLiquidate,
                          ),
                        );
                      }}
                    >
                      #{req.id}&nbsp;-&nbsp;{req.description}
                    </Option>
                  ))}
                </Select>
              </Box>
            )}
          </>
        )}

        {/* Load details request details to liquidate */}
        {((requestToLiquidateDetails !== null &&
          selection !== undefined &&
          selection !== null) ||
          state !== 'ADD') && (
          <Box marginBottom={20} marginTop={3}>
            {/* DIVIDER */}
            {state === 'ADD' && (
              <Box
                display="flex"
                justifyContent="center"
                textAlign="center"
                marginBottom={3}
              >
                <Divider style={{ width: '60%', opacity: 0.7 }} />
              </Box>
            )}

            {/* THE HEADER */}
            {state === 'ADD' ? (
              <Typography level="title-lg" textAlign="center">
                {`Liquidating ${
                  requestTypeToLiquidate === 'AC'
                    ? 'Avance Caisse'
                    : 'Avance Voyage'
                } #${requestToLiquidateDetails?.id}`}
              </Typography>
            ) : (
              <Typography level="title-lg" textAlign="center">
                {`Liquidating ${
                  liquidationDetails?.requestType === 'AC'
                    ? 'Avance Caisse'
                    : 'Avance Voyage'
                } #${liquidationDetails?.requestId}`}
              </Typography>
            )}
            {/* ACTUAL REQUESTER INFO */}
            {state === 'ADD' &&
              requestToLiquidateDetails?.onBehalf === true && (
                <DisplayUserinfo
                  userData={requestToLiquidateDetails?.actualRequester}
                />
              )}
            {state !== 'ADD' && liquidationDetails?.onBehalf === true && (
              <DisplayUserinfo userData={liquidationDetails?.actualRequester} />
            )}

            {/* CURRENCY */}
            <Box
              textAlign="center"
              display="flex"
              justifyContent="center"
              marginTop={1}
              marginBottom={3}
            >
              <Typography color="success" level="title-sm" display="flex">
                This Request&apos;s currency is set to be:&nbsp;
                <Box sx={{ fontWeight: 'bold' }}>
                  {state === 'ADD' && requestToLiquidateDetails?.currency}
                  {state !== 'ADD' &&
                    liquidationDetails?.requestDetails?.currency}
                </Box>
              </Typography>
            </Box>
            {/* DESCRIPTION */}
            <Box display="flex" justifyContent="center" marginBottom={3}>
              <Card
                variant="soft"
                color="neutral"
                sx={{ width: '50%', bgcolor: 'white', boxShadow: 'sm' }}
              >
                <CardContent>
                  <Typography level="title-md">Description</Typography>
                  <Typography level="body-md">
                    {state === 'ADD' && requestToLiquidateDetails?.description}
                    {state === 'ADD' &&
                      liquidationDetails?.requestDetails?.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            {/* Trips */}
            {(requestTypeToLiquidate === 'AV' ||
              liquidationDetails?.requestDetails?.trips.length > 0) && (
              <>
                <Typography
                  level="title-lg"
                  textAlign="center"
                  marginBottom={2}
                >
                  Trajectories
                </Typography>
                <Box display="flex" justifyContent="center" marginBottom={5}>
                  <TripsTable
                    tripsData={
                      requestTypeToLiquidate === 'AV'
                        ? requestToLiquidateDetails?.trips
                        : liquidationDetails?.requestDetails?.trips
                    }
                    updateTripsToLiquidate={updateTripsToLiquidate}
                    getActualFee={getTripActualFee}
                    isTripModifiable={!readOnly}
                  />
                </Box>
                {(state === 'ADD' || state === 'EDIT') && (
                  <>
                    <Box
                      display="flex"
                      justifyContent="center"
                      textAlign="center"
                      marginBottom={2}
                    >
                      <Typography
                        level="title-md"
                        textAlign="center"
                        marginBottom={2}
                      >
                        Made additional trajectories? (optional)
                        <IconButton onClick={addTrip}>
                          <AddCircleIcon
                            sx={{ color: 'green' }}
                            fontSize="10px"
                          />
                        </IconButton>
                      </Typography>
                    </Box>

                    {newTrips.map((trip, index) => (
                      <div key={trip.id}>
                        <AdditionalTrips
                          key={trip.id}
                          tripData={trip}
                          updateTripData={updateTripData}
                          isTripRequired={false}
                          isTripModifiabale
                          removeTrip={removeTrip}
                          isRequestAbroad={
                            requestToLiquidateDetails?.currency === 'EUR'
                          }
                        />
                      </div>
                    ))}
                  </>
                )}
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

            {/* Expenses */}
            <Typography level="title-lg" textAlign="center" marginBottom={2}>
              Expenses
            </Typography>
            <Box display="flex" justifyContent="center" marginBottom={3}>
              {requestToLiquidateDetails !== null && (
                <ExpensesTable
                  expensesData={requestToLiquidateDetails?.expenses}
                  updateExpenseToLiquidate={updateExpenseToLiquidate}
                  getActualFee={getExpenseActualFee}
                  isExpenseModifiable={!readOnly}
                />
              )}
              {liquidationDetails !== null && (
                <ExpensesTable
                  expensesData={liquidationDetails?.requestDetails?.expenses}
                  updateExpenseToLiquidate={updateExpenseToLiquidate}
                  getActualFee={getExpenseActualFee}
                  isExpenseModifiable={!readOnly}
                />
              )}
            </Box>

            {(state === 'ADD' || state === 'EDIT') && (
              <>
                <Box
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                  marginBottom={2}
                >
                  <Typography
                    level="title-md"
                    textAlign="center"
                    marginBottom={2}
                  >
                    Spent additional expenses? (optional)
                    <IconButton onClick={addExpense}>
                      <AddCircleIcon
                        sx={{ color: 'chocolate' }}
                        fontSize="10px"
                      />
                    </IconButton>
                  </Typography>
                </Box>
                {newExpenses.map((expense) => (
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
                        isExpenseRequired={false}
                        isExpenseModifiabale
                      />
                    </div>
                  </Box>
                ))}
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

            {state !== 'ADD' && (
              <>
                <Box
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                  marginBottom={2}
                  gap={10}
                >
                  <Box alignItems="flex-start" width="40rem">
                    <Typography level="title-md">
                      {state !== 'CONFIRM' && 'Old'} Receipts File:
                    </Typography>

                    <Button
                      color="secondary"
                      size="large"
                      startIcon={<FilePresentIcon />}
                      onClick={() => handleOnFileButtonClick()}
                    >
                      PDF
                    </Button>
                  </Box>
                </Box>
              </>
            )}

            {((state !== 'VIEW' && state !== 'CONFIRM') ||
              liquidationDetails?.latestStatus ===
                'Returned for missing evidences') && (
              <>
                {/* RECEIPTS FILE */}
                {state !== 'EDIT' && state !== 'MODIFY' ? (
                  <Typography
                    level="title-lg"
                    textAlign="center"
                    marginBottom={2}
                  >
                    Your Receipts*
                  </Typography>
                ) : (
                  <>
                    <Typography
                      level="title-lg"
                      textAlign="center"
                      marginBottom={2}
                    >
                      Update your receipts&nbsp;
                      <Typography level="body-sm">(optional)</Typography>
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="center"
                      marginBottom={2}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        marginBottom={2}
                        width="40rem"
                      >
                        <Alert severity="warning" textAlign="left">
                          <Typography level="body-md">
                            <Typography level="title-md">
                              Please note:&nbsp;
                            </Typography>
                            uploading a new file will override the old one. You
                            may want to attach your previously uploaded receipts
                            in case you still want to include them.
                          </Typography>
                        </Alert>
                      </Box>
                    </Box>
                  </>
                )}
                <Box display="flex" justifyContent="center" marginBottom={3}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    width="40rem"
                  >
                    <Typography level="body-sm" color="danger">
                      Please upload your receipts in a single pdf file*
                    </Typography>
                    <Button
                      component="label"
                      variant={loadingButton ? 'contained' : 'outlined'}
                      color="warning"
                      startIcon={
                        loadingButton ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <FileUploadIcon />
                        )
                      }
                      fullWidth
                      disabled={loadingButton}
                    >
                      {!loadingButton ? <>Upload file</> : <>Uploading...</>}

                      <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={(e) => updateReceiptsFileData(e)}
                      ></input>
                    </Button>
                    {receiptsFileName && (
                      <Typography level="title-sm" color="neutral">
                        Selected file: {receiptsFileName}
                      </Typography>
                    )}
                  </Box>
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
            {/* CALCULATED TOTAL */}
            <Box display="flex" justifyContent="center" marginBottom={3}>
              <Box width="60%" display="flex" justifyContent="flex-end">
                <Typography level="h4">
                  Estimated Total:&nbsp;
                  <Typography color="success">
                    <NumericFormat
                      prefix={`${requestToLiquidateDetails?.currency} `}
                      displayType="text"
                      value={requestToLiquidateDetails?.estimatedTotal}
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
            <Box display="flex" justifyContent="center" marginBottom={3}>
              <Box width="60%" display="flex" justifyContent="flex-end">
                <Typography level="h4">
                  Actual Amount Spent:&nbsp;
                  <Typography color="success">
                    <NumericFormat
                      prefix={`${requestToLiquidateDetails?.currency} `}
                      displayType="text"
                      value={actualTotal}
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
          </Box>
        )}

        {/* dialog */}
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
                {requestToLiquidateDetails?.statusHistory?.map((sh, i, arr) => (
                  <CustomizedTimeLine
                    statusHistory={sh}
                    lastOne={arr.length - 1 === i}
                  ></CustomizedTimeLine>
                ))}
              </Timeline>
            ) : (
              <DialogContentText id="alert-dialog-slide-description">
                <Alert sevirity={modalSevirity}>{modalBody}</Alert>
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
                Submit
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
              <Box>
                <Typography variant="h4">
                  Please Review your information before submitting
                </Typography>
                <Box sx={{ width: '100%' }}>
                  <LinearProgress color="info" value={40} />
                </Box>
              </Box>
            </Grid>
            <Grid item justifyContent="center">
              <Button
                variant="contained"
                color="info"
                // endIcon={<ThumbUpOffAltIcon />}
                onClick={() => setFullPageModalVisibility(false)}
                aria-label="close"
                size="large"
              >
                OK
              </Button>
            </Grid>
          </Grid>
        </Dialog>

        <Snackbar
          variant="solid"
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
        >
          Request has been saved!
        </Snackbar>
      </LocalizationProvider>
    </Box>
  );
}

LiquidationForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default LiquidationForm;
