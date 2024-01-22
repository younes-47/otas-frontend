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
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';
import {
  ChangePageContentAction,
  cleanupParentOrdreMissionPageAction,
} from 'pages/OrdreMission/actions';
import { setOrdreMissionStatusAction } from 'containers/OrdreMissionTable/actions';
import DisplayUserinfo from 'components/DisplayUserinfo';
import { makeSelectOrdreMissionDetails } from 'pages/OrdreMission/selectors';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectAbroad,
  makeSelectAddOrdreMissionError,
  makeSelectOnBehalf,
  makeSelectUpdateOrdreMissionError,
} from './selectors';
import Trips from './Trips';
import Expenses from './Expenses';
import {
  AddOrdreMissionAction,
  SelectAbroadAction,
  SelectOnBehalfAction,
  UpdateOrdreMissionAction,
  cleanupOrdreMissionFormPageAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  onBehalfSelection: makeSelectOnBehalf(),
  abroadSelection: makeSelectAbroad(),
  errorAddingOrdreMission: makeSelectAddOrdreMissionError(),
  errorUpdatingOrdreMission: makeSelectUpdateOrdreMissionError(),
  ordreMissionDetails: makeSelectOrdreMissionDetails(),
});

export function OrdreMissionForm({ state }) {
  useInjectReducer({ key: 'ordreMissionForm', reducer });
  useInjectSaga({ key: 'ordreMissionForm', saga });
  const dispatch = useDispatch();
  const {
    isSideBarVisible,
    onBehalfSelection,
    abroadSelection,
    errorAddingOrdreMission,
    errorUpdatingOrdreMission,
    ordreMissionDetails,
  } = useSelector(mapStateToProps);
  const [trips, setTrips] = useState([
    {
      id: 0,
      departurePlace: 'X',
      destination: 'Y',
      departureDate: dayjs(new Date('2025-01-10T00:00:00.000Z')),
      arrivalDate: dayjs(new Date('2025-01-11T00:00:00.000Z')),
      transportationMethod: 'Train',
      unit: 'MAD',
      value: 9,
      highwayFee: 0,
    },
    {
      id: 1,
      departurePlace: 'X',
      destination: 'Y',
      departureDate: dayjs(new Date('2025-01-12T00:00:00.000Z')),
      arrivalDate: dayjs(new Date('2025-01-13T00:00:00.000Z')),
      transportationMethod: 'Train',
      unit: 'MAD',
      value: 9,
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

  useEffect(() => {
    if (state === 'EDIT' || state === 'MODIFY') {
      if (ordreMissionDetails !== null) {
        updateDescriptionData(ordreMissionDetails?.description);
        dispatch(
          SelectOnBehalfAction(ordreMissionDetails?.onBehalf.toString()),
        );
        dispatch(SelectAbroadAction(ordreMissionDetails?.abroad.toString()));
        if (ordreMissionDetails?.requesterInfo !== null) {
          updateActualRequesterData(
            'firstName',
            ordreMissionDetails?.requesterInfo?.firstName,
          );
          updateActualRequesterData(
            'lastName',
            ordreMissionDetails?.requesterInfo?.lastName,
          );
          updateActualRequesterData(
            'registrationNumber',
            ordreMissionDetails?.requesterInfo?.registrationNumber,
          );
          updateActualRequesterData(
            'jobTitle',
            ordreMissionDetails?.requesterInfo?.jobTitle,
          );
          updateActualRequesterData(
            'managerUserName',
            ordreMissionDetails?.requesterInfo?.managerUserName,
          );
          updateActualRequesterData(
            'department',
            ordreMissionDetails?.requesterInfo?.department,
          );
        }

        setTrips([]);
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
    }
  }, [ordreMissionDetails]);

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

  useEffect(() => {
    if (errorAddingOrdreMission === false) {
      dispatch(cleanupOrdreMissionFormPageAction());
      dispatch(setOrdreMissionStatusAction('SAVED'));
      dispatch(cleanupParentOrdreMissionPageAction());
    }
  }, [errorAddingOrdreMission]);
  useEffect(() => {
    if (errorUpdatingOrdreMission === false) {
      dispatch(cleanupOrdreMissionFormPageAction());
      dispatch(setOrdreMissionStatusAction('UPDATED'));
      dispatch(cleanupParentOrdreMissionPageAction());
    }
  }, [errorUpdatingOrdreMission]);

  useEffect(
    () => () => {
      dispatch(cleanupOrdreMissionFormPageAction());
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
      departureDate: '',
      arrivalDate: '',
      transportationMethod: '',
      unit: '',
      value: 0,
      highwayFee: 0,
    };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const updateTripData = (tripId, field, value) => {
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
      expenseDate: dayjs(Date()),
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
    let action = '';
    if (ordreMissionDetails !== null) {
      action = state === 'EDIT' ? 'save' : 'submit';
    }
    return action;
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

  const ValidateInputs = () => {
    // Invalid on behalf selection
    if (data.onBehalf !== true && data.onBehalf !== false) {
      setModalHeader('Invalid Information!');
      setModalBody(
        'Could not figure out whether you are filling this request on behalf of someone else or not! Please select "Yes" or "No".',
      );
      setModalSevirity('error');
      setModalVisibility(true);
      return false;
    }

    // on behalf of someone + missing actual requester info
    if (
      data.onBehalf === true &&
      (actualRequester.firstName === '' ||
        actualRequester.lastName === '' ||
        actualRequester.registrationNumber === '' ||
        actualRequester.jobTitle === '' ||
        actualRequester.department === '' ||
        actualRequester.managerUserId === '')
    ) {
      setModalHeader('Invalid Information!');
      setModalBody(
        'You must fill all actual requester information if you are filling this request on behalf of someone else!',
      );
      setModalSevirity('error');
      setModalVisibility(true);
      return false;
    }

    // invalid abroad selection
    if (data.Abroad !== true && data.Abroad !== false) {
      setModalHeader('Invalid Information!');
      setModalBody(
        'Could not figure out whether this request is abroad or not! Please select "Yes" or "No".',
      );
      setModalSevirity('error');
      setModalVisibility(true);
      return false;
    }

    // Description
    if (data.description === '') {
      setModalHeader('Invalid Information!');
      setModalBody('You must provide a description for the mission!');
      setModalSevirity('error');
      setModalVisibility(true);
      return false;
    }

    // Trips
    const copiedTrips = [...trips];
    const sortedTrips = copiedTrips.sort(
      (a, b) => new Date(a.departureDate) - new Date(b.departureDate),
    );
    let isAllGood = true;
    sortedTrips.forEach((trip) => {
      // Blank input
      if (
        trip.departurePlace === '' ||
        trip.destination === '' ||
        trip.departureDate === '' ||
        trip.arrivalDate === '' ||
        trip.transportationMethod === '' ||
        trip.unit === ''
      ) {
        setModalHeader('Invalid Information!');
        setModalBody(
          "One of the trajectories' required information is missing! Please review your trajectories and fill all necessary information",
        );
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // value = 0
      if (trip.value <= 0 || trip.value === '0') {
        setModalHeader('Invalid Information!');
        setModalBody(
          "A trajectory's fee or mileage cannot be 0 or negative! Please review your trajectories information and try again",
        );
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // value is blank
      if (
        trip.value === '' ||
        totalMAD.isNaN === true ||
        totalEUR.isNaN === true
      ) {
        setModalHeader('Invalid Information!');
        setModalBody(
          'Invalid Total value! Please review your trajectories and/or expenses fee/Mileage values and try again',
        );
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // ArrivalDate < DepartureDate
      if (trip.departureDate > trip.arrivalDate) {
        setModalHeader('Invalid Information!');
        setModalBody(
          'Arrival date cannot be earlier than the departure date! Please review your trajectories information and try again',
        );
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // Arrival date of current trip shouldn't be bigger than the departuredate of the next trip
      // Prevent out of range index exception
      if (trip !== sortedTrips.at(sortedTrips.length - 1)) {
        if (
          trip.arrivalDate >
          sortedTrips.at(sortedTrips.length - 1).departureDate
        ) {
          setModalHeader('Invalid Information!');
          setModalBody(
            'Trips dates do not make sense! You cannot start another trip before you arrive from the previous one.',
          );
          setModalSevirity('error');
          setModalVisibility(true);
          isAllGood = false;
        }
      }
    });

    data.expenses.forEach((expense) => {
      if (
        expense.description === '' ||
        (expense.currency !== 'MAD' && expense.currency !== 'EUR')
      ) {
        setModalHeader('Invalid Information!');
        setModalBody(
          'One of the expenses required information is missing! Please review your expenses and fill all necessary information.',
        );
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }
      // fee = 0
      if (expense.estimatedFee <= 0 || expense.estimatedFee === '0') {
        setModalHeader('Invalid Information!');
        setModalBody(
          'Expense fee cannot be 0 or negative! Please review your expenses information and try again.',
        );
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }
      // value is blank
      if (
        expense.estimatedFee === '' ||
        totalMAD.isNaN === true ||
        totalEUR.isNaN === true
      ) {
        setModalHeader('Invalid Information!');
        setModalBody(
          'Invalid Total value! Please review your trajectories and/or expenses fee/Mileage values and try again',
        );
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }
    });
    if (isAllGood === false) {
      return false;
    }

    return true;
  };

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(cleanupOrdreMissionFormPageAction());
    dispatch(cleanupParentOrdreMissionPageAction());
  };
  const handleOnSaveAsDraftClick = () => {
    const result = ValidateInputs();
    if (result === true) {
      if (state === 'ADD') {
        dispatch(AddOrdreMissionAction(data));
      }
      if (state === 'EDIT') {
        // Edit and save in case of draft
        dispatch(UpdateOrdreMissionAction(data));
      }
    }
  };

  const handleOnConfirmButtonClick = () => {
    const result = ValidateInputs();
    if (result === true) {
      if (state === 'ADD') {
        dispatch(AddOrdreMissionAction(data));
        dispatch(ChangePageContentAction('CONFIRM'));
      }
      if (state === 'EDIT') {
        // Edit and save in case of draft
        dispatch(UpdateOrdreMissionAction(data));
        dispatch(ChangePageContentAction('CONFIRM'));
      }
    }
  };

  const handleOnSubmitModificationsButtonClick = () => {
    setModalHeader('Confirmation');
    setModalBody(
      "Please Review your information before confirming your submition. You won't be able to modify your request afterwards!",
    );
    setModalSevirity('warning');
    setModalVisibility(true);
  };

  const handleOnSubmitModificationsConfirmationButtonClick = () => {
    // This button is in the modal
    const result = ValidateInputs();
    if (result === true) {
      dispatch(UpdateOrdreMissionAction(data));
      dispatch(cleanupStoreAction());
      dispatch(setOrdreMissionStatusAction('RESUBMITTED'));
      dispatch(ChangePageContentAction('TABLE'));
    }
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* THE HEADER */}
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          marginBottom={2}
        >
          {state === 'ADD' && (
            <h1 style={{ fontSize: '30px' }}>Ordre Mission</h1>
          )}
          {state === 'EDIT' && (
            <h1 style={{ fontSize: '30px' }}>
              Editing Ordre Mission #{ordreMissionDetails?.id}
            </h1>
          )}
          {state === 'Modify' && (
            <h1 style={{ fontSize: '30px' }}>
              Modifying Ordre Mission #{ordreMissionDetails?.id}
            </h1>
          )}
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
        <DisplayUserinfo />

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
          <FormLabel id="demo-row-radio-buttons-group-label">
            Are you filling this form on behalf of someone else?
          </FormLabel>
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

        {onBehalfSelection && onBehalfSelection.toString() === 'true' ? (
          <>
            <Box
              display="flex"
              justifyContent="center"
              textAlign="center"
              marginBottom={2}
            >
              <h1 style={{ fontSize: '18px' }}>
                Please fill the actual requester information*
              </h1>
            </Box>

            <Box justifyContent="center" textAlign="center" marginBottom={3}>
              <Box
                display="flex"
                justifyContent="center"
                gap={2}
                marginBottom={2}
              >
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  value={actualRequester.firstName}
                  onChange={(e) =>
                    updateActualRequesterData('firstName', e.target.value)
                  }
                  required
                />
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  value={actualRequester.lastName}
                  onChange={(e) =>
                    updateActualRequesterData('lastName', e.target.value)
                  }
                  required
                />
                <TextField
                  id="outlined-basic"
                  label="Registration Number"
                  variant="outlined"
                  value={actualRequester.registrationNumber}
                  onChange={(e) =>
                    updateActualRequesterData(
                      'registrationNumber',
                      e.target.value,
                    )
                  }
                  required
                />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                gap={2}
                marginBottom={2}
              >
                <TextField
                  id="outlined-basic"
                  label="Job Title"
                  variant="outlined"
                  value={actualRequester.jobTitle}
                  onChange={(e) =>
                    updateActualRequesterData('jobTitle', e.target.value)
                  }
                  required
                />

                <TextField
                  id="outlined-basic"
                  label="Department"
                  variant="outlined"
                  value={actualRequester.department}
                  onChange={(e) =>
                    updateActualRequesterData('department', e.target.value)
                  }
                  required
                />
                <TextField
                  id="outlined-basic"
                  label="Manager"
                  variant="outlined"
                  value={actualRequester.managerUserName}
                  onChange={(e) =>
                    updateActualRequesterData('managerUserName', e.target.value)
                  }
                  required
                />
              </Box>
            </Box>
          </>
        ) : (
          <></>
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

        <Box textAlign="center">
          <FormLabel id="demo-row-radio-buttons-group-label">
            Is this mission abroad?
          </FormLabel>
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
            variant="outlined"
            multiline
            minRows={3}
            label="Mission description"
            value={description}
            onChange={(e) => updateDescriptionData(e.target.value)}
            required
            sx={{ width: '50%' }}
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
          <IconButton onClick={addTrip}>
            <AddCircleIcon
              sx={{ color: 'green', fontSize: '30px' }}
            ></AddCircleIcon>
          </IconButton>
        </Box>
        {trips.map((trip, index) => (
          <div key={trip.id}>
            <Trips
              key={trip.id}
              tripData={trip}
              updateTripData={updateTripData}
              isTripRequired={index === 0 || index === 1}
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
              Other expenses <em>(optional)</em>
            </h1>
            <IconButton onClick={addExpense}>
              <AddCircleIcon
                sx={{ color: 'chocolate', fontSize: '30px' }}
              ></AddCircleIcon>
            </IconButton>
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
                isExpenseRequired={false}
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
                  {totalMAD}
                </h1>
              </Box>
              {abroadSelection === 'true' && (
                <Box display="flex" justifyContent="space-between" gap={5}>
                  <h1 style={{ fontSize: '1.1rem' }}>
                    Estimated Total in EUR:
                  </h1>
                  <h1 style={{ fontSize: '1.1rem', color: 'green' }}>
                    {totalEUR}
                  </h1>
                </Box>
              )}
            </Box>
          </Box>
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
          {state !== 'MODIFY' && (
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
        </Stack>

        {/* THE MODAL */}
        <Dialog
          open={modalVisibility}
          keepMounted
          onClose={() => setModalVisibility(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{modalHeader}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Alert severity={modalSevirity}>{modalBody}</Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalVisibility(false)}>Close</Button>
            {modalHeader === 'Confirmation' && (
              <Button
                color="success"
                onClick={handleOnSubmitModificationsConfirmationButtonClick}
              >
                Submit
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Box>
  );
}

OrdreMissionForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default OrdreMissionForm;
