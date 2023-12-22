/**
 *
 * OrdreMissionForm
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import dayjs from 'dayjs';
import { ChangePageContentAction } from 'pages/OrdreMission/actions';
import saga from './saga';
import reducer from './reducer';
import makeSelectOrdreMissionForm, {
  makeSelectAbroad,
  makeSelectOnBehalf,
} from './selectors';
import Trips from './Trips';
import Expenses from './Expenses';
import {
  AddOrdreMissionAction,
  SelectAbroadAction,
  SelectOnBehalfAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  ordreMissionForm: makeSelectOrdreMissionForm(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  onBehalfSelection: makeSelectOnBehalf(),
  abroadSelection: makeSelectAbroad(),
});

export function OrdreMissionForm() {
  useInjectReducer({ key: 'ordreMissionForm', reducer });
  useInjectSaga({ key: 'ordreMissionForm', saga });
  const { isSideBarVisible, onBehalfSelection, abroadSelection } =
    useSelector(mapStateToProps);
  const [trips, setTrips] = useState([
    {
      id: 0,
      departurePlace: '',
      destination: '',
      departureDate: '',
      arrivalDate: '',
      transportationMethod: '',
      unit: '',
      value: 0,
      highwayFee: 0,
    },
    {
      id: 1,
      departurePlace: '',
      destination: '',
      departureDate: '',
      arrivalDate: '',
      transportationMethod: '',
      unit: '',
      value: 0,
      highwayFee: 0,
    },
  ]);
  const [actualRequester, setActualRequester] = useState({
    firstName: '',
    lastName: '',
    registrationNumber: 0,
    jobTitle: '',
    hiringDate: dayjs(Date()),
    department: '',
    manager: '',
  });
  const [totalMAD, setTotalMAD] = useState(0);
  const [totalEUR, setTotalEUR] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [tripsCounter, setTripsCounter] = useState(2); // This counter is being used for the uniqueness of trips ids
  const [expensesCounter, setExpensesCounter] = useState(0); // This counter is being used for the uniqueness of expenses ids
  const [error, setError] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
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
        totalExpensesMAD += parseFloat(expense.estimatedExpenseFee);
      } else {
        totalExpensesEUR += parseFloat(expense.estimatedExpenseFee);
      }
    });
    const TOTAL_MAD = totalExpensesMAD + totalTripsMAD;
    const TOTAL_EUR = totalExpensesEUR + totalTripsEUR;
    setTotalMAD(TOTAL_MAD);
    setTotalEUR(TOTAL_EUR);
  }, [trips, expenses]);

  const history = useHistory();
  const dispatch = useDispatch();

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
    let updatedValue = value;
    if (fieldName === 'hiringDate') {
      const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
      updatedValue = new Date(value - tzoffset).toISOString().slice(0, -1);
    }
    const updatedRequester = { ...actualRequester, [fieldName]: updatedValue };

    setActualRequester(updatedRequester);
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
      estimatedExpenseFee: 0.0,
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

  const data = {
    UserId: '4',
    description,
    Abroad: abroadSelection === 'true',
    onBehalf: onBehalfSelection === 'true',
    trips,
    expenses,
    actualRequester,
  };

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(ChangePageContentAction('TABLE'));
  };
  const handleOnSaveAsDraftClick = () => {
    // Invalid on behalf selection
    if (data.onBehalf !== true && data.onBehalf !== false) {
      setError(
        'Could not figure out whether you are filling this request on behalf of someone else or not! Please select "Yes" or "No".',
      );
      setModalVisibility(true);
      return;
    }

    // on behalf of someone + missing actual requester info
    if (
      data.onBehalf === true &&
      (actualRequester.firstName === '' ||
        actualRequester.lastName === '' ||
        actualRequester.registrationNumber === 0 ||
        actualRequester.jobTitle === '' ||
        actualRequester.department === '' ||
        actualRequester.manager === '' ||
        actualRequester.hiringDate === '')
    ) {
      setError(
        'You must fill all actual requester information if you are filling this request on behalf of someone else!',
      );
      setModalVisibility(true);
      return;
    }

    // invalid abroad selection
    if (data.Abroad !== true && data.Abroad !== false) {
      setError(
        'Could not figure out whether this request is abroad or not! Please select "Yes" or "No".',
      );
      setModalVisibility(true);
      return;
    }

    // Description
    if (data.description === '') {
      setError('You must provide a description for the mission!');
      setModalVisibility(true);
      return;
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
        setError(
          "One of the trajectories' required information is missing! Please review your trajectories and fill all necessary information",
        );
        setModalVisibility(true);
        isAllGood = false;
      }

      // value = 0
      if (trip.value <= 0 || trip.value === '0') {
        setError(
          "A trajectory's fee or mileage cannot be 0 or negative! Please review your trajectories information and try again",
        );
        setModalVisibility(true);
        isAllGood = false;
      }

      // value is blank
      if (
        trip.value === '' ||
        totalMAD.isNaN === true ||
        totalEUR.isNaN === true
      ) {
        setError(
          'Invalid Total value! Please review your trajectories and/or expenses fee/Mileage values and try again',
        );
        setModalVisibility(true);
        isAllGood = false;
      }

      // ArrivalDate < DepartureDate
      if (trip.departureDate > trip.arrivalDate) {
        setError(
          'Arrival date cannot be earlier than the departure date! Please review your trajectories information and try again',
        );
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
          setError(
            'Trips dates do not make sense! You cannot start another trip before you arrive from the previous one.',
          );
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
        setError(
          'One of the expenses required information is missing! Please review your expenses and fill all necessary information.',
        );
        setModalVisibility(true);
        isAllGood = false;
      }
      // fee = 0
      if (
        expense.estimatedExpenseFee <= 0 ||
        expense.estimatedExpenseFee === '0'
      ) {
        setError(
          'Expense fee cannot be 0 or negative! Please review your expenses information and try again.',
        );
        setModalVisibility(true);
        isAllGood = false;
      }
      // value is blank
      if (
        expense.estimatedExpenseFee === '' ||
        totalMAD.isNaN === true ||
        totalEUR.isNaN === true
      ) {
        setError(
          'Invalid Total value! Please review your trajectories and/or expenses fee/Mileage values and try again',
        );
        setModalVisibility(true);
        isAllGood = false;
      }
    });
    if (isAllGood === false) {
      return;
    }
    dispatch(AddOrdreMissionAction(data));
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
          <h1 style={{ fontSize: '30px' }}>Ordre Mission</h1>
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
        <Box justifyContent="center" textAlign="center" marginBottom={3}>
          <Box display="flex" justifyContent="center" gap={2} marginBottom={2}>
            <TextField
              id="outlined-basic"
              label="First Name"
              defaultValue="Placeholder"
              variant="filled"
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              defaultValue="Placeholder"
              variant="filled"
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Registration Number"
              defaultValue="Placeholder"
              variant="filled"
              disabled
            />
          </Box>
          <Box display="flex" justifyContent="center" gap={2} marginBottom={2}>
            <TextField
              id="outlined-basic"
              label="Job Title"
              defaultValue="Placeholder"
              variant="filled"
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Hiring Date"
              defaultValue="Placeholder"
              variant="filled"
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Department"
              defaultValue="Placeholder"
              variant="filled"
              disabled
            />
          </Box>
          <TextField
            id="outlined-basic"
            label="Manager"
            defaultValue="Placeholder"
            variant="filled"
            disabled
          />
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

                <DatePicker
                  sx={{ maxWidth: 210 }}
                  required
                  label="Hiring Date"
                  value={actualRequester.hiringDate}
                  onChange={(e) =>
                    updateActualRequesterData('hiringDate', e.$d)
                  }
                  format="DD/MM/YYYY"
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
              </Box>
              <TextField
                id="outlined-basic"
                label="Manager"
                variant="outlined"
                value={actualRequester.manager}
                onChange={(e) =>
                  updateActualRequesterData('manager', e.target.value)
                }
                required
              />
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
        {trips.map((trip) => {
          if (trip.id === 0 || trip.id === 1) {
            return (
              <div key={trip.id}>
                <Trips
                  key={trip.id}
                  tripData={trip}
                  updateTripData={updateTripData}
                  isTripRequired
                  removeTrip={removeTrip}
                />
              </div>
            );
          }
          return (
            <div key={trip.id}>
              <Trips
                key={trip.id}
                tripData={trip}
                updateTripData={updateTripData}
                isTripRequired={false}
                removeTrip={removeTrip}
              />
            </div>
          );
        })}

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
          <Button
            variant="contained"
            color="warning"
            onClick={handleOnSaveAsDraftClick}
          >
            Save as Draft
          </Button>
          <Button variant="contained" color="success">
            Confirm
          </Button>
        </Stack>

        {/* This dialog appears only when submitting a bad request */}
        <Dialog
          open={modalVisibility}
          keepMounted
          onClose={() => setModalVisibility(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Bad Request!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Alert severity="error">{error}</Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalVisibility(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Box>
  );
}

OrdreMissionForm.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default OrdreMissionForm;
