/**
 *
 * DepenseCaisseForm
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Box, Stack } from '@mui/system';
import PropTypes from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { DropzoneArea } from 'material-ui-dropzone';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { changePageContentAction } from 'pages/DepenseCaisse/actions';
import DisplayUserinfo from 'components/DisplayUserinfo';
import { setDepenseCaisseStatusAction } from 'containers/DepenseCaisseTable/actions';
import {
  makeSelectDepenseCaisseDetails,
  makeSelectErrorLoadingDepenseCaisseDetails,
} from 'pages/DepenseCaisse/selectors';
import Expenses from './Expenses';
import {
  makeSelectAddDepenseCaisse,
  makeSelectErrorLoadingStaticData,
  makeSelectErrorSubmittingDepenseCaisse,
  makeSelectErrorUpdatingDepenseCaisse,
  makeSelectOnBehalf,
  makeSelectStaticData,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  AddDepenseCaisseAction,
  LoadStaticDataAction,
  SelectOnBehalfAction,
  cleanupStoreAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  onBehalfSelection: makeSelectOnBehalf(),
  errorAddingDepenseCaisse: makeSelectAddDepenseCaisse(),
  errorLoadingStaticData: makeSelectErrorLoadingStaticData(),
  errorUpdatingDepenseCaisse: makeSelectErrorUpdatingDepenseCaisse(),
  errorSubmittingDepenseCaisse: makeSelectErrorSubmittingDepenseCaisse(),
  errorLoadingDepenseCaisseDetails:
    makeSelectErrorLoadingDepenseCaisseDetails(),
  staticData: makeSelectStaticData(),
  DepenseCaisseDetails: makeSelectDepenseCaisseDetails(),
});

export function DepenseCaisseForm({ state }) {
  useInjectReducer({ key: 'depenseCaisseForm', reducer });
  useInjectSaga({ key: 'depenseCaisseForm', saga });
  const dispatch = useDispatch();
  const {
    errorLoadingStaticData,
    errorUpdatingDepenseCaisse,
    errorSubmittingDepenseCaisse,
    DepenseCaisseDetails,
    staticData,
    errorLoadingDepenseCaisseDetails,
    isSideBarVisible,
    onBehalfSelection,
    errorAddingDepenseCaisse,
  } = useSelector(mapStateToProps);

  const [currency, setCurrency] = useState('MAD');
  const [total, setTotal] = useState(0.0);
  const [expensesCounter, setExpensesCounter] = useState(1); // This counter is being used for the uniqueness of expenses ids
  const [description, setDescription] = useState('');
  const [receiptsFile, setReceiptsFile] = useState('');
  const [receiptsFileName, setReceiptsFileName] = useState('');
  const [inputError, setInputError] = useState('');

  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalSevirity, setModalSevirity] = useState('');
  const [buttonClicked, setButtonClicked] = useState(''); // this state is used to track which button has been clicked
  const [savedSnackbarVisibility, setSavedSnackbarVisibility] = useState(false);
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => setSavedSnackbarVisibility(false)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const readOnly = state === 'VIEW' || state === 'CONFIRM';

  const [expenses, setExpenses] = useState([
    {
      id: 0,
      description: '',
      expenseDate: null,
      estimatedFee: 0.0,
    },
  ]);
  const [actualRequester, setActualRequester] = useState({
    firstName: '',
    lastName: '',
    registrationNumber: '',
    jobTitle: '',
    department: '',
    manager: '',
  });

  useEffect(() => {
    if (errorLoadingStaticData === null) {
      dispatch(LoadStaticDataAction());
    }
  }, [staticData]);

  useEffect(() => {
    if (errorAddingDepenseCaisse === false) {
      dispatch(cleanupStoreAction());
      dispatch(setDepenseCaisseStatusAction('SAVED'));
      dispatch(changePageContentAction('TABLE'));
    }
  }, [errorAddingDepenseCaisse]);

  const handleOnBehalfSelectionChange = (event) => {
    if (event.target.value !== String(onBehalfSelection)) {
      dispatch(SelectOnBehalfAction(event.target.value.toString()));
    }
  };

  useEffect(() => {
    let totalExpenses = 0.0;
    expenses.forEach((expense) => {
      totalExpenses += parseFloat(expense.estimatedFee);
    });
    setTotal(totalExpenses);
  }, [expenses]);

  const addExpense = () => {
    setExpensesCounter(expensesCounter + 1);
    const newExpense = {
      id: expensesCounter,
      description: '',
      expenseDate: dayjs(Date()),
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

  const updateActualRequesterData = (fieldName, value) => {
    let updatedValue = value;
    if (fieldName === 'registrationNumber') {
      updatedValue = value.toString();
    }
    const updatedRequester = { ...actualRequester, [fieldName]: updatedValue };

    setActualRequester(updatedRequester);
  };

  const updateReceiptsFileData = async (e) => {
    const file = e.target.files[0];
    setReceiptsFileName(file.name);
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
  };

  const handlecurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  const data = {
    onBehalf: onBehalfSelection === 'true',
    description,
    receiptsFile,
    currency,
    actualRequester,
    expenses,
  };

  const ValidateInputs = () => {
    // Invalid on behalf selection
    if (data.onBehalf !== true && data.onBehalf !== false) {
      setInputError(
        'Could not figure out whether you are filling this request on behalf of someone else or not! Please select "Yes" or "No".',
      );
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
        actualRequester.manager === '')
    ) {
      setInputError(
        'You must fill all actual requester information if you are filling this request on behalf of someone else!',
      );
      setModalVisibility(true);
      return false;
    }

    // Description
    if (data.description === '') {
      setInputError('You must provide a description for the request!');
      setModalVisibility(true);
      return false;
    }

    let isAllGood = true;

    // expenses
    data.expenses.forEach((expense) => {
      if (expense.description === '') {
        setInputError(
          'One of the expenses required information is missing! Please review your expenses and fill all necessary information.',
        );
        setModalVisibility(true);
        isAllGood = false;
      }
      // fee = 0
      if (expense.estimatedFee <= 0 || expense.estimatedFee === '0') {
        setInputError(
          'Expense fee cannot be 0 or negative! Please review your expenses information and try again.',
        );
        setModalVisibility(true);
        isAllGood = false;
      }
      // value is blank
      if (expense.estimatedFee === '') {
        setInputError(
          'Invalid Total value! Please review your trajectories and/or expenses fee/Mileage values and try again',
        );
        setModalVisibility(true);
        isAllGood = false;
      }
      // expense date is invalid
      if (
        expense.expenseDate === null ||
        expense.expenseDate === '' ||
        !expense.expenseDate
      ) {
        setInputError(
          "One of the expenses' date is not set yet! Please review your expenses information and try again.",
        );
        setModalVisibility(true);
        isAllGood = false;
      }
    });

    // Receipts file
    if (data.receiptsFile === '') {
      setInputError('Please upload your receipts!');
      setModalVisibility(true);
      isAllGood = false;
    }
    if (isAllGood === false) {
      return false;
    }

    return true;
  };

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(cleanupStoreAction());
    dispatch(changePageContentAction('TABLE'));
  };

  const handleOnSaveAsDraftClick = () => {
    const result = ValidateInputs();
    if (result === true) {
      if (state === 'ADD') {
        dispatch(AddDepenseCaisseAction(data));
        dispatch(cleanupStoreAction());
        dispatch(setDepenseCaisseStatusAction('SAVED'));
      }
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
      {/* THE HEADER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <h1 style={{ fontSize: '30px' }}>Depense Caisse</h1>
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
          key={expense.id}
          display="flex"
          justifyContent="center"
          flexDirection="row"
        >
          <div key={expense.id}>
            <Expenses
              key={expense.id}
              removeExpense={removeExpense}
              updateExpenseData={updateExpenseData}
              expenseData={expense}
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

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          width="40rem"
        >
          <h1 style={{ fontSize: '18px' }}>Receipts*</h1>
          <em style={{ color: 'red', fontSize: '15px' }}>
            Please upload your receipts in a single pdf file.
          </em>

          {/* The dropzonearea component sill has some side effects */}
          {/* https://yuvaleros.github.io/material-ui-dropzone/ */}
          {/* <DropzoneArea
            acceptedFiles={['application/pdf']}
            dropzoneText="Drag and drop a PDF file here, or click to select"
            maxFileSize={3145728} // 3MB
            showFileNames
            filesLimit={1}
            fileObjects={receiptsFile}
            onChange={(e) => updateReceiptsFileData(e)}
          /> */}

          <Button
            component="label"
            variant="outlined"
            color="warning"
            startIcon={<FileUploadIcon />}
            fullWidth
          >
            Upload file
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => updateReceiptsFileData(e)}
            ></input>
          </Button>
          {receiptsFileName && (
            <em style={{ fontSize: '15px' }}>
              Selected file: {receiptsFileName}
            </em>
          )}
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
            <Alert severity="error">{inputError}</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalVisibility(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

DepenseCaisseForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default DepenseCaisseForm;
