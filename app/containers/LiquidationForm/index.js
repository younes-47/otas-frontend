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
import HistoryIcon from '@mui/icons-material/History';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import Option from '@mui/joy/Option';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Select from '@mui/joy/Select';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import DescriptionIcon from '@mui/icons-material/Description';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/joy/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import DisplayUserinfo from 'components/DisplayUserinfo';
import Expenses from 'containers/AvanceCaisseForm/Expenses';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NumericFormat } from 'react-number-format';
import TripsTable from 'components/TripsTable';
import ExpensesTable from 'components/ExpensesTable';
import Timeline from '@mui/lab/Timeline';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import {
  changeLiquidationParentPageContentAction,
  cleanupliquidationParentPageStoreAction,
} from 'pages/Liquidation/actions';
import { ValidateLiquidationInputs } from 'utils/Custom/ValidateInputs';
import { setLiquidationStatusAction } from 'containers/LiquidationTable/actions';
import WarningIcon from '@mui/icons-material/Warning';
import { FormattedMessage } from 'react-intl';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAddLiquidation,
  makeSelectErrorDownloadingLiquidationDocumentFile,
  makeSelectErrorLoadingLiquidationDetails,
  makeSelectErrorLoadingRequestsToLiquidate,
  makeSelectErrorSubmittingLiquidation,
  makeSelectErrorUpdatingLiquidation,
  makeSelectLiquidationDetails,
  makeSelectLiquidationDocumentFile,
  makeSelectRequestToLiquidateDetails,
  makeSelectRequestTypeToLiquidate,
  makeSelectRequestsToLiquidate,
} from './selectors';
import {
  AddLiquidationAction,
  UpdateLiquidationAction,
  cleanupLiquidationFormPageStoreAction,
  downloadLiquidationDocumentFileAction,
  loadLiquidationDetailsAction,
  loadRequestToLiquidateDetailsAction,
  loadRequestsToLiquidateAction,
  nullifyRequestToLiquidateDetailsAction,
  selectRequestTypeToLiquidateAction,
  submitLiquidationAction,
} from './actions';
import AdditionalTrips from './AdditionalTrips';
import messages from './messages';

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
  errorDownloadingLiquidationDocumentFile:
    makeSelectErrorDownloadingLiquidationDocumentFile(),
  liquidationDocumentFile: makeSelectLiquidationDocumentFile(),
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
    errorDownloadingLiquidationDocumentFile,
    liquidationDocumentFile,
  } = useSelector(mapStateToProps);
  const avanceVoyageLabel = (
    <Typography color="primary" level="title-lg">
      <FormattedMessage id={messages.avanceVoyageLabel.id} />
    </Typography>
  );
  const avanceCaisseLabel = (
    <Typography color="primary" level="title-lg">
      <FormattedMessage id={messages.avanceCaisseLabel.id} />
    </Typography>
  );

  const [isRequestToLiquidateSelected, setRequestToLiquidateSelection] =
    useState(0);
  const [counter, setCounter] = useState(0); // used for uniqueness of items (trips/expenses)
  const [newExpenses, setNewExpenses] = useState([]);
  const [newTrips, setNewTrips] = useState([]);
  const [expensesToLiquidate, setExpensesToLiquidate] = useState([]);
  const [tripsToLiquidate, setTripsToLiquidate] = useState([]);
  const [actualTotal, setActualTotal] = useState(0.0);
  const [result, setResult] = useState(0.0);
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
      'Returned for missing evidences' ||
    liquidationDetails?.latestStatus === 'Returned for missing evidences';

  const data = {
    id: liquidationDetails !== null ? liquidationDetails?.id : 0,
    requestId:
      requestToLiquidateDetails !== null
        ? requestToLiquidateDetails?.id
        : liquidationDetails?.requestId,
    requestType:
      requestTypeToLiquidate !== null
        ? requestTypeToLiquidate
        : liquidationDetails?.requestType,
    receiptsFile:
      liquidationDetails?.receiptsFile === receiptsFile ? null : receiptsFile,
    tripsLiquidations: tripsToLiquidate,
    expensesLiquidations: expensesToLiquidate,
    newExpenses,
    newTrips,
    action: state === 'EDIT' ? 'save' : 'submit',
  };

  // Load liquidation detils in a case oher than ADD
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
          actualFee: expense.estimatedFee,
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
            actualFee: trip.estimatedFee,
          };
          setTripsToLiquidate((prevTrips) => [...prevTrips, toLiquidateTrip]);
        });
      }
    }
  }, [requestToLiquidateDetails]);

  // clean arrays in case of changing request type
  useEffect(() => {
    setTripsToLiquidate([]);
    setExpensesToLiquidate([]);
    setNewExpenses([]);
    setNewTrips([]);
  }, [requestTypeToLiquidate, isRequestToLiquidateSelected]);

  // update actual total and result
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

    const estimatedTotal =
      requestToLiquidateDetails !== null
        ? requestToLiquidateDetails?.estimatedTotal
        : liquidationDetails?.requestDetails?.estimatedTotal;

    const newResult = newTotal - estimatedTotal;

    setResult(Number(newResult.toFixed(2)));
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

  // Download Document
  useEffect(() => {
    if (errorDownloadingLiquidationDocumentFile === false) {
      const binaryString = atob(liquidationDocumentFile.fileContents);
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
      link.download = liquidationDocumentFile.fileDownloadName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoadingButton(false);
    }
  }, [errorDownloadingLiquidationDocumentFile]);

  // Cleanup store during unmount
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
    const trip = tripsToLiquidate.find((item) => item.tripId === tripId);
    return trip ? trip.actualFee : 0.0;
  };

  const getExpenseActualFee = (expenseId) => {
    const expense = expensesToLiquidate.find(
      (item) => item.expenseId === expenseId,
    );
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

  const getResultPrefix = () => {
    if (requestToLiquidateDetails !== null) {
      if (result >= 0) {
        return `${requestToLiquidateDetails?.currency} +`;
      }

      return `${requestToLiquidateDetails?.currency} -`;
    }
    if (liquidationDetails !== null) {
      if (result >= 0) {
        return `${liquidationDetails?.requestDetails?.currency} +`;
      }

      return `${liquidationDetails?.requestDetails?.currency} -`;
    }
    return '';
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
    const validationResult = ValidateLiquidationInputs(
      setModalVisibility,
      setModalBody,
      setModalHeader,
      setModalSevirity,
      data,
      actualTotal,
    );
    if (validationResult === true) {
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
    const validationResult = ValidateLiquidationInputs(
      setModalVisibility,
      setModalBody,
      setModalHeader,
      setModalSevirity,
      data,
      actualTotal,
    );
    if (validationResult === true) {
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
      "Please Review your information before confirming your changes. You won't be able to modify your request afterwards!",
    );
    setModalSevirity('warning');
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
    const validationResult = ValidateLiquidationInputs(
      setModalVisibility,
      setModalBody,
      setModalHeader,
      setModalSevirity,
      data,
      actualTotal,
    );
    if (validationResult === true) {
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

  const handleOnDownloadDocumentClick = () => {
    setLoadingButton(true);
    dispatch(downloadLiquidationDocumentFileAction(liquidationDetails.id));
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
                <FormattedMessage id={messages.chooseRequestType.id} />
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
                onChange={(event) => {
                  dispatch(
                    selectRequestTypeToLiquidateAction(event.target.value),
                  );
                }}
              >
                <List
                  component="div"
                  variant="outlined"
                  orientation="horizontal"
                  sx={{
                    borderRadius: 'sm',
                    boxShadow: 'sm',
                  }}
                  onChange={() => {
                    setRequestToLiquidateSelection(0);
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
                  <FormattedMessage id={messages.chooseRequest.id} />
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
                >
                  {requestsToLiquidate?.map((req) => (
                    <Option
                      key={req.id}
                      value={req.id}
                      onClick={() => {
                        if (
                          requestToLiquidateDetails == null ||
                          requestToLiquidateDetails?.id !== req.id
                        ) {
                          setRequestToLiquidateSelection(() =>
                            setRequestToLiquidateSelection(
                              (prevValue) => prevValue + 1,
                            ),
                          );
                          dispatch(
                            loadRequestToLiquidateDetailsAction(
                              req.id,
                              requestTypeToLiquidate,
                            ),
                          );
                        }
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

        {/* Load request details to liquidate */}
        {((requestToLiquidateDetails !== null &&
          isRequestToLiquidateSelected > 0) ||
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
            {state === 'CONFIRM' && (
              <Box
                display="flex"
                justifyContent="center"
                textAlign="center"
                marginBottom={3}
              >
                <Box>
                  <Typography level="h1" marginTop={3} gutterBottom>
                    <FormattedMessage id={messages.confirmationAlert.id} />
                  </Typography>
                </Box>
              </Box>
            )}
            {state === 'ADD' ? (
              <Typography level="h3" textAlign="center">
                {requestTypeToLiquidate === 'AC' ? (
                  <FormattedMessage id={messages.liquidatingAvanceCaisse.id} />
                ) : (
                  <FormattedMessage id={messages.liquidatingAvanceVoyage.id} />
                )}{' '}
                #{requestToLiquidateDetails?.id}
              </Typography>
            ) : (
              <Typography level="h3" textAlign="center">
                {liquidationDetails?.requestType === 'AC' ? (
                  <FormattedMessage id={messages.liquidatingAvanceCaisse.id} />
                ) : (
                  <FormattedMessage id={messages.liquidatingAvanceVoyage.id} />
                )}{' '}
                #{liquidationDetails?.requestId}
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
              <DisplayUserinfo
                userData={liquidationDetails?.requestDetails?.actualRequester}
              />
            )}

            {/* CURRENCY */}
            <Box
              textAlign="center"
              display="flex"
              justifyContent="center"
              marginTop={1}
              marginBottom={3}
            >
              <Typography color="success" level="title-md" display="flex">
                <FormattedMessage id={messages.requestCurrencySet.id} />
                &nbsp;
                <Box sx={{ fontWeight: 'bold' }}>
                  {state === 'ADD' && requestToLiquidateDetails?.currency}
                  {state !== 'ADD' &&
                    liquidationDetails?.requestDetails?.currency}
                </Box>
              </Typography>
            </Box>

            {(state === 'VIEW' || state === 'MODIFY') && (
              <>
                <Box
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                  marginBottom={1}
                >
                  <Typography color="neutral" level="title-lg" variant="plain">
                    <FormattedMessage id={messages.currentStatus.id} />:{' '}
                    <Typography
                      color="primary"
                      level="title-lg"
                      variant="plain"
                    >
                      {liquidationDetails?.latestStatus}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                  marginBottom={2}
                  gap={2}
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
                    <FormattedMessage id={messages.statusHistoryButton.id} />
                  </Button>
                  {liquidationDetails?.latestStatus !== 'Returned' &&
                    liquidationDetails?.latestStatus !== 'Rejected' &&
                    liquidationDetails?.latestStatus !==
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
                          <FormattedMessage
                            id={messages.downloadDocumentButton.id}
                          />
                        ) : (
                          <FormattedMessage id={messages.generating.id} />
                        )}
                      </Button>
                    )}
                </Box>
              </>
            )}

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
                    {state === 'ADD'
                      ? requestToLiquidateDetails?.description
                      : liquidationDetails?.requestDetails?.description}
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
                  <FormattedMessage id={messages.tripsHeader.id} />
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
                        <FormattedMessage id={messages.moreTripsHeader.id} />
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
              {expensesToLiquidate.length > 0 ? (
                <FormattedMessage id={messages.expensesHeader.id} />
              ) : (
                <FormattedMessage id={messages.noExpensesHeader.id} />
              )}
            </Typography>
            <Box display="flex" justifyContent="center" marginBottom={3}>
              {requestToLiquidateDetails !== null &&
                expensesToLiquidate.length > 0 && (
                  <ExpensesTable
                    expensesData={requestToLiquidateDetails?.expenses}
                    updateExpenseToLiquidate={updateExpenseToLiquidate}
                    getActualFee={getExpenseActualFee}
                    isExpenseModifiable={!readOnly}
                  />
                )}
              {liquidationDetails !== null &&
                liquidationDetails?.requestDetails?.expenses.length > 0 && (
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
                    <FormattedMessage id={messages.moreExpensesHeader.id} />
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
                      {state !== 'CONFIRM' && 'Old'}{' '}
                      <FormattedMessage id={messages.receiptsFileHeader.id} />
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
                    <FormattedMessage id={messages.yourReceiptsHeader.id} />
                  </Typography>
                ) : (
                  <>
                    <Typography
                      level="title-lg"
                      textAlign="center"
                      marginBottom={2}
                    >
                      <FormattedMessage
                        id={messages.updateYourReceiptsHeader.id}
                      />
                      &nbsp;
                      <Typography level="body-sm">
                        <FormattedMessage id={messages.optionalHeader.id} />
                      </Typography>
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
                              <FormattedMessage
                                id={messages.pleaseNoteHeader.id}
                              />
                              &nbsp;
                            </Typography>
                            <FormattedMessage
                              id={messages.updatingFileNote.id}
                            />
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
                      <FormattedMessage id={messages.signlePdfFileHeader.id} />
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
                      {!loadingButton ? (
                        <FormattedMessage id={messages.uploadButton.id} />
                      ) : (
                        <FormattedMessage id={messages.uploading.id} />
                      )}

                      <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={(e) => updateReceiptsFileData(e)}
                      ></input>
                    </Button>
                    {receiptsFileName && (
                      <Typography level="title-sm" color="neutral">
                        <FormattedMessage id={messages.selectedFile.id} />{' '}
                        {receiptsFileName}
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
                  <FormattedMessage id={messages.estimatedTotal.id} />
                  &nbsp;
                  <Typography color="success">
                    <NumericFormat
                      prefix={
                        requestToLiquidateDetails !== null
                          ? `${requestToLiquidateDetails?.currency} `
                          : `${liquidationDetails?.requestDetails?.currency} `
                      }
                      displayType="text"
                      value={
                        requestToLiquidateDetails !== null
                          ? requestToLiquidateDetails?.estimatedTotal
                          : liquidationDetails?.requestDetails?.estimatedTotal
                      }
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
                  <FormattedMessage id={messages.actualAmountSpent.id} />
                  &nbsp;
                  <Typography color="success">
                    <NumericFormat
                      prefix={
                        requestToLiquidateDetails !== null
                          ? `${requestToLiquidateDetails?.currency} `
                          : `${liquidationDetails?.requestDetails?.currency} `
                      }
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
              <Box width="60%" display="flex" justifyContent="flex-end">
                <Typography level="h4">
                  <FormattedMessage id={messages.youOwe.id} />
                  &nbsp;
                  <Typography color={result < 0 ? 'danger' : 'success'}>
                    <NumericFormat
                      prefix={getResultPrefix()}
                      displayType="text"
                      value={result}
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

            <Box display="flex" justifyContent="center" marginBottom={2}>
              <Box
                display="flex"
                justifyContent="center"
                marginBottom={2}
                width="40rem"
              >
                <Card variant="soft" color={result < 0 ? 'danger' : 'success'}>
                  <Typography
                    level="title-lg"
                    textColor="inherit"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    <FormattedMessage id={messages.decision.id} />
                  </Typography>
                  <Typography
                    level="title-md"
                    textColor="inherit"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {result < 0 && (
                      <>
                        <FormattedMessage id={messages.mustHandOverPhrase.id} />{' '}
                        {requestToLiquidateDetails !== null
                          ? requestToLiquidateDetails?.currency
                          : liquidationDetails?.requestDetails?.currency}{' '}
                        <NumericFormat
                          displayType="text"
                          value={Math.abs(result)}
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
                      </>
                    )}
                    {result >= 0 && (
                      <>
                        <FormattedMessage id={messages.anAmountOf.id} />{' '}
                        {requestToLiquidateDetails !== null
                          ? requestToLiquidateDetails?.currency
                          : liquidationDetails?.requestDetails?.currency}{' '}
                        <NumericFormat
                          displayType="text"
                          value={Math.abs(result)}
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
                        <FormattedMessage
                          id={messages.mustBeRefundedToYou.id}
                        />
                      </>
                    )}
                  </Typography>
                </Card>
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
              <Timeline>
                {liquidationDetails?.statusHistory?.map((sh, i, arr) => (
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

        {/* Confirmation Modal full page */}
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
                  <Typography level="h4" color="warning">
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
                  dispatch(cleanupliquidationParentPageStoreAction());
                  dispatch(changeLiquidationParentPageContentAction('CONFIRM'));
                  setFullPageModalVisibility(false);
                  setSavedSnackbarVisibility(true);
                }}
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
