/**
 *
 * OrdreMissionForm
 *
 */

import React, { useState } from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, FormControl, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { v4 as uuidv4 } from 'uuid';
import { Stack } from '@mui/system';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import dayjs from 'dayjs';
import saga from './saga';
import reducer from './reducer';
import makeSelectOrdreMissionForm, { makeSelectOnBehalf } from './selectors';
import Trips from './Trips';
import Expenses from './Expenses';
import { SelectOnBehalfAction } from './actions';

const mapStateToProps = createStructuredSelector({
  ordreMissionForm: makeSelectOrdreMissionForm(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  onBehalfSelection: makeSelectOnBehalf(),
});

export function OrdreMissionForm() {
  useInjectReducer({ key: 'ordreMissionForm', reducer });
  useInjectSaga({ key: 'ordreMissionForm', saga });

  const history = useHistory();
  const dispatch = useDispatch();
  const { isSideBarVisible, onBehalfSelection } = useSelector(mapStateToProps);

  const handleOnBehalfSelectionChange = (event) => {
    if (event.target.value !== onBehalfSelection.toString()) {
      dispatch(SelectOnBehalfAction(event.target.value.toString()));
    }
  };

  const [trips, setTrips] = useState([
    {
      id: 0,
      departure: '',
      destination: '',
      departureDate: dayjs(Date()),
      transportationMethod: '',
      unit: '',
      value: '',
      highwayFee: '',
      estimatedTripFee: '',
    },
  ]);
  const [expenses, setExpenses] = useState([]);
  const addTrip = () => {
    const tripId = uuidv4(); // generate random ID for each trip
    const newTrip = {
      id: tripId,
      departure: '',
      destination: '',
      departureDate: dayjs(Date()),
      transportationMethod: '',
      unit: '',
      value: '',
      highwayFee: '',
      estimatedTripFee: '',
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
    const expenseId = uuidv4();
    const newExpense = {
      id: expenseId,
      description: '',
      expenseDate: dayjs(Date()),
      currency: '',
      estimatedExpenseFee: '',
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

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
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
        value={onBehalfSelection.toString()} // Convert the boolean to a string
        onChange={handleOnBehalfSelectionChange}
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No" />
      </RadioGroup>

      {onBehalfSelection.toString() === 'true' ? (
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
                required
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                required
              />
              <TextField
                id="outlined-basic"
                label="Registration Number"
                variant="outlined"
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
                required
              />
              {/* <TextField
                id="outlined-basic"
                label="Hiring Date"
                variant="outlined"
                required
              /> */}
              <LocalizationProvider reuired dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ maxWidth: 210 }}
                  required
                  label="Expense Date"
                />
              </LocalizationProvider>
              <TextField
                id="outlined-basic"
                label="Department"
                variant="outlined"
                required
              />
            </Box>
            <TextField
              id="outlined-basic"
              label="Manager"
              variant="outlined"
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
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No" />
      </RadioGroup>

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
          required
          sx={{ width: '50%' }}
        />
      </Box>

      {trips.map((trip) => {
        if (trip.id === 0) {
          return (
            <div key={trip.id}>
              <Trips
                key={trip.id}
                tripData={trip}
                updateTripData={updateTripData}
              />
              <Box display="flex" justifyContent="center" flexDirection="row">
                <IconButton
                  style={{ marginBottom: '40px' }}
                  size="small"
                  onClick={addTrip}
                >
                  <AddBoxIcon
                    sx={{ color: 'green', fontSize: '50px' }}
                  ></AddBoxIcon>
                  <h4>Add Trip</h4>
                </IconButton>
              </Box>
            </div>
          );
        }
        return (
          <div key={trip.id}>
            <Trips tripData={trip} updateTripData={updateTripData} />
            <Box display="flex" justifyContent="center" flexDirection="row">
              <IconButton
                style={{ marginBottom: '40px' }}
                size="small"
                onClick={() => removeTrip(trip.id)}
              >
                <DeleteForeverIcon
                  sx={{ color: 'red', fontSize: '40px' }}
                ></DeleteForeverIcon>
                <h4>Remove Trip</h4>
              </IconButton>
            </Box>
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
        <Box display="flex" justifyContent="center" flexDirection="row">
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
      <Box display="flex" justifyContent="flex-end" width="60rem">
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between" gap={5}>
            <h1 style={{ fontSize: '1.3rem' }}>Estimated Total in MAD:</h1>
            <h1 style={{ fontSize: '1.3rem' }}>N/A</h1>
          </Box>
          <Box display="flex" justifyContent="space-between" gap={5}>
            <h1 style={{ fontSize: '1.3rem' }}>Estimated Total in EUR:</h1>
            <h1 style={{ fontSize: '1.3rem' }}>N/A</h1>
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
        <Button variant="contained" color="warning">
          Save as Draf
        </Button>
        <Button variant="contained" color="success">
          Confirm
        </Button>
      </Stack>
    </Box>
  );
}

OrdreMissionForm.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default OrdreMissionForm;
