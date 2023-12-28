/**
 *
 * AvanceCaisseForm
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Box, Stack } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import dayjs from 'dayjs';
import { changePageContentAction } from 'pages/AvanceCaisse/actions';
import makeSelectAvanceCaisseForm, { makeSelectOnBehalf } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Expenses from './Expenses';
import { SelectOnBehalfAction } from './actions';

const mapStateToProps = createStructuredSelector({
  avanceCaisseForm: makeSelectAvanceCaisseForm(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  onBehalfSelection: makeSelectOnBehalf(),
});

export function AvanceCaisseForm() {
  useInjectReducer({ key: 'avanceCaisseForm', reducer });
  useInjectSaga({ key: 'avanceCaisseForm', saga });
  const dispatch = useDispatch();
  const { isSideBarVisible, onBehalfSelection } = useSelector(mapStateToProps);
  const [currency, setCurrency] = useState('MAD');
  const [total, setTotal] = useState(0.0);
  const [description, setDescription] = useState('');
  const [actualRequester, setActualRequester] = useState({
    firstName: '',
    lastName: '',
    registrationNumber: 0,
    jobTitle: '',
    hiringDate: dayjs(Date()),
    department: '',
    manager: '',
  });
  const [expenses, setExpenses] = useState([
    {
      id: 0,
      description: '',
      expenseDate: dayjs(Date()),
      estimatedExpenseFee: 0.0,
    },
  ]);

  const handleOnBehalfSelectionChange = (event) => {
    if (event.target.value !== String(onBehalfSelection)) {
      dispatch(SelectOnBehalfAction(event.target.value.toString()));
    }
  };

  useEffect(() => {
    let totalExpenses = 0.0;
    expenses.forEach((expense) => {
      totalExpenses += parseFloat(expense.estimatedExpenseFee);
    });
    setTotal(totalExpenses);
  }, [expenses]);

  const addExpense = () => {
    const expenseId = uuidv4();
    const newExpense = {
      id: expenseId,
      description: '',
      expenseDate: dayjs(Date()),
      estimatedExpenseFee: 0.0,
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const updateExpenseData = (expenseId, field, value) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === expenseId ? { ...expense, [field]: value } : expense,
      ),
    );
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

  const handlecurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const removeExpense = (expenseId) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId,
    );
    setExpenses(updatedExpenses);
  };

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(changePageContentAction('TABLE'));
  };

  const data = {
    userId: '4',
    onBehalf: onBehalfSelection === 'true',
    description,
    currency,
    actualRequester,
    expenses,
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
        <h1 style={{ fontSize: '30px' }}>Avance Caisse</h1>
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
        required
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
              <LocalizationProvider reuired dateAdapter={AdapterDayjs}>
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
              </LocalizationProvider>
              <TextField
                id="outlined-basic"
                label="Department"
                variant="outlined"
                required
                value={actualRequester.department}
                onChange={(e) =>
                  updateActualRequesterData('department', e.target.value)
                }
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

      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <FormLabel id="demo-row-radio-buttons-group-label">
          Please choose the currency
        </FormLabel>
      </Box>
      {/* <Stack direction="column" alignItems="center" justifyContent="center">
        <Alert severity="info" width="50px">
          If your request consists of multiple currencies, you may to fill
          another form.
        </Alert>
      </Stack> */}
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
        value={currency}
        onChange={handlecurrencyChange}
      >
        <FormControlLabel value="MAD" control={<Radio />} label="MAD" />
        <FormControlLabel value="EUR" control={<Radio />} label="EUR" />
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
          label="Description"
          required
          sx={{ width: '50%' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <Box display="flex" justifyContent="flex-start" width="40rem">
          <h1 style={{ fontSize: '18px' }}>Expense(s)*</h1>
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
              isExpenseRequired={expense.id === 0}
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
              <h1 style={{ fontSize: '1.1rem' }}>
                Estimated Total in {currency === 'MAD' ? 'MAD' : 'EUR'}
              </h1>
              <h1 style={{ fontSize: '1.1rem', color: 'green' }}>{total}</h1>
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

AvanceCaisseForm.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default AvanceCaisseForm;
