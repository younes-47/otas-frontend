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
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import dayjs from 'dayjs';
import {
  changePageContentAction,
  cleanupAvanceCaisseParentPageStoreAction,
} from 'pages/AvanceCaisse/actions';
import DisplayUserinfo from 'components/DisplayUserinfo';
import { setAvanceCaisseStatusAction } from 'containers/AvanceCaisseTable/actions';
import { makeSelectAvanceCaisseIdentity } from 'pages/AvanceCaisse/selectors';
import { Timeline } from '@mui/lab';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import ActualRequesterInputs from 'components/ActualRequesterInputs';
import { ValidateInputs } from 'utils/Custom/ValidateInputs';
import LinearProgress from '@mui/material/LinearProgress';
import { Card, CardContent, Snackbar } from '@mui/joy';
import { NumericFormat } from 'react-number-format';
import {
  makeSelectAddAvanceCaisse,
  makeSelectAvanceCaisseDetails,
  makeSelectErrorLoadingAvanceCaisseDetails,
  makeSelectErrorLoadingStaticData,
  makeSelectErrorSubmittingAvanceCaisse,
  makeSelectErrorUpdatingAvanceCaisse,
  makeSelectOnBehalf,
  makeSelectStaticData,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Expenses from './Expenses';
import {
  AddAvanceCaisseAction,
  LoadStaticDataAction,
  SelectOnBehalfAction,
  UpdateAvanceCaisseAction,
  cleanupAvanceCaisseFormPageStoreAction,
  loadAvanceCaisseDetailsAction,
  submitAvanceCaisseAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  onBehalfSelection: makeSelectOnBehalf(),
  errorAddingAvanceCaisse: makeSelectAddAvanceCaisse(),
  errorLoadingStaticData: makeSelectErrorLoadingStaticData(),
  errorUpdatingAvanceCaisse: makeSelectErrorUpdatingAvanceCaisse(),
  errorSubmittingAvanceCaisse: makeSelectErrorSubmittingAvanceCaisse(),
  staticData: makeSelectStaticData(),
  avanceCaisseIdentity: makeSelectAvanceCaisseIdentity(),
  errorloadingAvanceCaisseDetails: makeSelectErrorLoadingAvanceCaisseDetails(),
  avanceCaisseDetails: makeSelectAvanceCaisseDetails(),
});

export function AvanceCaisseForm({ state }) {
  useInjectReducer({ key: 'avanceCaisseForm', reducer });
  useInjectSaga({ key: 'avanceCaisseForm', saga });
  const dispatch = useDispatch();
  const {
    avanceCaisseDetails,
    errorloadingAvanceCaisseDetails,
    avanceCaisseIdentity,
    staticData,
    errorSubmittingAvanceCaisse,
    errorUpdatingAvanceCaisse,
    errorLoadingStaticData,
    isSideBarVisible,
    onBehalfSelection,
    errorAddingAvanceCaisse,
  } = useSelector(mapStateToProps);
  const [currency, setCurrency] = useState('MAD');
  const [total, setTotal] = useState(0.0);
  const [description, setDescription] = useState('');
  const [actualRequester, setActualRequester] = useState({
    firstName: '',
    lastName: '',
    registrationNumber: '',
    jobTitle: '',
    department: '',
    managerUserName: '',
  });
  const [expenses, setExpenses] = useState([
    {
      id: 0,
      description: '',
      expenseDate: null,
      estimatedFee: 0.0,
    },
  ]);

  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalSevirity, setModalSevirity] = useState('');
  const [buttonClicked, setButtonClicked] = useState(''); // this state is used to track which button has been clicked
  const [savedSnackbarVisibility, setSavedSnackbarVisibility] = useState(false);
  const [fullPageModalVisibility, setFullPageModalVisibility] = useState(false);

  const readOnly = state === 'VIEW' || state === 'CONFIRM';

  // Scroll to top
  useEffect(() => {
    if (buttonClicked === 'CONFIRM') {
      document.getElementById('main-box').scrollTop = 0;
    }
  }, [buttonClicked]);

  // Load the data => object details and static data
  useEffect(() => {
    if (state !== 'ADD') {
      dispatch(loadAvanceCaisseDetailsAction(avanceCaisseIdentity));
    }
    if (!readOnly) {
      dispatch(LoadStaticDataAction());
    }
  }, []);

  // Fill the loaded data in case of editing/modifying
  useEffect(() => {
    if (avanceCaisseDetails !== null) {
      setDescription(avanceCaisseDetails?.description);
      dispatch(SelectOnBehalfAction(avanceCaisseDetails?.onBehalf.toString()));

      if (avanceCaisseDetails?.requesterInfo !== null) {
        setActualRequester(avanceCaisseDetails?.requesterInfo);
      }

      setExpenses([]);

      avanceCaisseDetails?.expenses?.forEach((expense) => {
        const formattedDateExpense = {
          id: expense.id,
          currency: expense.currency,
          description: expense.description,
          expenseDate: dayjs(new Date(expense.expenseDate)),
          estimatedFee: expense.estimatedFee,
        };

        setExpenses((prevExpenses) => [...prevExpenses, formattedDateExpense]);
      });
    }
  }, [avanceCaisseDetails]);

  // Listen to adding & updating
  useEffect(() => {
    if (errorAddingAvanceCaisse === false) {
      if (buttonClicked === 'SAVE-AS-DRAFT') {
        dispatch(cleanupAvanceCaisseParentPageStoreAction());
        dispatch(setAvanceCaisseStatusAction('SAVED'));
      }
      if (buttonClicked === 'CONFIRM') {
        dispatch(loadAvanceCaisseDetailsAction(avanceCaisseIdentity));
      }
    }
    if (errorUpdatingAvanceCaisse === false) {
      if (buttonClicked === 'SAVE-AS-DRAFT') {
        dispatch(cleanupAvanceCaisseParentPageStoreAction());
        dispatch(setAvanceCaisseStatusAction('UPDATED'));
      }
      if (buttonClicked === 'CONFIRM') {
        dispatch(loadAvanceCaisseDetailsAction(avanceCaisseIdentity));
      }
    }
  }, [errorAddingAvanceCaisse, errorUpdatingAvanceCaisse]);

  // Change PAGE CONTENT TO CONFIRMATION PAGE when the object is loaded and the button clicked is CONFIRM
  useEffect(() => {
    if (
      buttonClicked === 'CONFIRM' &&
      errorloadingAvanceCaisseDetails === false
    ) {
      dispatch(cleanupAvanceCaisseParentPageStoreAction());
      dispatch(changePageContentAction('CONFIRM'));
      setFullPageModalVisibility(true);
      setSavedSnackbarVisibility(true);
    }
  }, [errorloadingAvanceCaisseDetails]);

  // Listen to Submit/Resubmit
  useEffect(() => {
    if (errorSubmittingAvanceCaisse === false) {
      if (buttonClicked === 'SUBMIT') {
        dispatch(setAvanceCaisseStatusAction('SUBMITTED'));
      }
      if (buttonClicked === 'SUBMIT-MODIFICATIONS') {
        dispatch(setAvanceCaisseStatusAction('RESUBMITTED'));
      }

      dispatch(cleanupAvanceCaisseParentPageStoreAction());
    }
  }, [errorSubmittingAvanceCaisse]);

  useEffect(
    () => () => {
      dispatch(cleanupAvanceCaisseFormPageStoreAction());
      dispatch(cleanupAvanceCaisseParentPageStoreAction());
    },
    [],
  );

  useEffect(() => {
    let totalExpenses = 0.0;
    expenses.forEach((expense) => {
      totalExpenses += parseFloat(expense.estimatedFee);
    });
    setTotal(totalExpenses);
  }, [expenses]);

  const handleOnBehalfSelectionChange = (event) => {
    if (event.target.value !== String(onBehalfSelection)) {
      dispatch(SelectOnBehalfAction(event.target.value.toString()));
    }
  };

  // FUNCS
  const addExpense = () => {
    const expenseId = uuidv4();
    const newExpense = {
      id: expenseId,
      description: '',
      expenseDate: dayjs(Date()),
      estimatedFee: 0.0,
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
    if (fieldName === 'registrationNumber') {
      updatedValue = value.toString();
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

  const getAction = () => {
    let requestAction = '';
    if (avanceCaisseDetails !== null) {
      requestAction = state === 'EDIT' ? 'save' : 'submit';
    }
    return requestAction;
  };

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(cleanupAvanceCaisseFormPageStoreAction());
    dispatch(cleanupAvanceCaisseParentPageStoreAction());
  };

  const handleOnSaveAsDraftClick = () => {
    const result = ValidateInputs(
      setModalVisibility,
      setModalBody,
      setModalHeader,
      setModalSevirity,
      data,
      setActualRequester,
    );
    if (result === true) {
      if (state === 'ADD') {
        dispatch(AddAvanceCaisseAction(data));
        setButtonClicked('SAVE-AS-DRAFT');
      }
      if (state === 'EDIT') {
        // Edit and save in case of draft
        dispatch(UpdateAvanceCaisseAction(data));
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
    );
    if (result === true) {
      if (state === 'ADD') {
        dispatch(AddAvanceCaisseAction(data));
        setButtonClicked('CONFIRM');
      }
      if (state === 'EDIT') {
        // Edit and save in case of draft
        dispatch(UpdateAvanceCaisseAction(data));
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
    dispatch(submitAvanceCaisseAction(avanceCaisseDetails?.id));
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
    );
    if (result === true) {
      dispatch(UpdateAvanceCaisseAction(data));
      setButtonClicked('SUBMIT-MODIFICATIONS');
    }
  };
  const data = {
    id: avanceCaisseDetails !== null ? avanceCaisseDetails?.id : 0,
    action: getAction(),
    onBehalf: onBehalfSelection === 'true',
    description,
    currency,
    actualRequester,
    expenses,
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
      {/* THE HEADER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        {state === 'ADD' && (
          <h1 style={{ fontSize: '30px' }}>New Avance Caisse Request</h1>
        )}
        {state === 'EDIT' && (
          <h1 style={{ fontSize: '30px' }}>
            Editing Avance Caisse #{avanceCaisseDetails?.id}
          </h1>
        )}
        {state === 'MODIFY' && (
          <h1 style={{ fontSize: '30px' }}>
            Modifying Avance Caisse #{avanceCaisseDetails?.id}
          </h1>
        )}
        {state === 'VIEW' && (
          <h1 style={{ fontSize: '30px' }}>
            View Avance Caisse #{avanceCaisseDetails?.id}
          </h1>
        )}
        {state === 'CONFIRM' && (
          <Box>
            <Typography variant="h4" marginTop={3} gutterBottom>
              Please Review your information before submitting
            </Typography>
            <Box sx={{ width: '100%' }}>
              <LinearProgress color="info" value={40} />
            </Box>
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
            *This request has been saved as a draft. You can still modify it if
            you don&apos;t submit it. <br /> Please note: your request cannot be
            edited once it is submitted.
          </Typography>
        </Box>
      )}
      {(state === 'VIEW' || state === 'MODIFY') && (
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          marginBottom={2}
        >
          <Typography color="neutral" level="title-lg" variant="plain">
            Current Status:{' '}
            <Typography color="primary" level="title-lg" variant="plain">
              {avanceCaisseDetails?.latestStatus}
            </Typography>
          </Typography>
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
        </Box>
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
              This request has been returned. <br /> Please refer to the comment
              below and apply the necessary changes.
            </CardContent>
            <Card variant="outlined">
              {avanceCaisseDetails?.deciderComment}
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
            avanceCaisseDetails?.requesterInfo !== null
              ? avanceCaisseDetails?.requesterInfo
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
          <Box
            textAlign="center"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">
              Please choose the currency*
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
            value={currency}
            onChange={handlecurrencyChange}
          >
            <FormControlLabel value="MAD" control={<Radio />} label="MAD" />
            <FormControlLabel value="EUR" control={<Radio />} label="EUR" />
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
            This Request&apos;s currency is set to be:&nbsp;
            <Box sx={{ fontWeight: 'bold' }}>
              {avanceCaisseDetails?.currency}
            </Box>
          </Typography>
        </Box>
      )}

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={3}
      >
        <TextField
          variant={readOnly ? 'filled' : 'outlined'}
          value={description}
          multiline
          minRows={3}
          label="Description"
          required
          sx={{ width: '50%' }}
          onChange={(e) => setDescription(e.target.value)}
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

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <Box display="flex" justifyContent="flex-start" width="40rem">
          <h1 style={{ fontSize: '18px' }}>
            Expense(s)
            {state !== 'CONFIRM' && state !== 'VIEW' && (
              <Typography variant="caption">*</Typography>
            )}
          </h1>
          {state !== 'CONFIRM' && state !== 'VIEW' && (
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
              isExpenseRequired={expense.id === 0}
              isExpenseModifiabale={readOnly === false}
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
              <h1 style={{ fontSize: '1.1rem', color: 'green' }}>
                <NumericFormat
                  displayType="text"
                  value={total}
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
              {avanceCaisseDetails?.statusHistory?.map((sh, i, arr) => (
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
              variant="contained"
              color="success"
              onClick={handleOnSubmitModificationsConfirmationButtonClick}
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
        autoHideDuration={3000}
        variant="solid"
        open={savedSnackbarVisibility}
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
        color="success"
      >
        Request has been saved!
      </Snackbar>
    </Box>
  );
}

AvanceCaisseForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default AvanceCaisseForm;
