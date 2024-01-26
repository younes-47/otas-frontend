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
import DropzoneArea from 'material-ui-dropzone';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import HistoryIcon from '@mui/icons-material/History';
import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import dayjs from 'dayjs';
import {
  changePageContentAction,
  cleanupDepenseCaisseParentPageStoreAction,
} from 'pages/DepenseCaisse/actions';
import DisplayUserinfo from 'components/DisplayUserinfo';
import { setDepenseCaisseStatusAction } from 'containers/DepenseCaisseTable/actions';
import { LoadingButton, Timeline } from '@mui/lab';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import { makeSelectDepenseCaisseIdentity } from 'pages/DepenseCaisse/selectors';
import ActualRequesterInputs from 'components/ActualRequesterInputs';
import { ValidateInputs } from 'utils/Custom/ValidateInputs';
import Expenses from './Expenses';
import {
  makeSelectAddDepenseCaisse,
  makeSelectDepenseCaisseDetails,
  makeSelectErrorLoadingDepenseCaisseDetails,
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
  UpdateDepenseCaisseAction,
  cleanupDepenseCaisseFormPageStoreAction,
  loadDepenseCaisseDetailsAction,
  submitDepenseCaisseAction,
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
  depenseCaisseDetails: makeSelectDepenseCaisseDetails(),
  depenseCaisseIdentity: makeSelectDepenseCaisseIdentity(),
});

export function DepenseCaisseForm({ state }) {
  useInjectReducer({ key: 'depenseCaisseForm', reducer });
  useInjectSaga({ key: 'depenseCaisseForm', saga });
  const dispatch = useDispatch();
  const {
    errorLoadingStaticData,
    errorUpdatingDepenseCaisse,
    errorSubmittingDepenseCaisse,
    depenseCaisseDetails,
    staticData,
    errorLoadingDepenseCaisseDetails,
    isSideBarVisible,
    onBehalfSelection,
    errorAddingDepenseCaisse,
    depenseCaisseIdentity,
  } = useSelector(mapStateToProps);

  const [currency, setCurrency] = useState('MAD');
  const [total, setTotal] = useState(0.0);
  const [expensesCounter, setExpensesCounter] = useState(1); // This counter is being used for the uniqueness of expenses ids
  const [description, setDescription] = useState('');
  const [receiptsFile, setReceiptsFile] = useState('');
  const [receiptsFileName, setReceiptsFileName] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalSevirity, setModalSevirity] = useState('');
  const [buttonClicked, setButtonClicked] = useState(''); // this state is used to track which button has been clicked
  const [savedSnackbarVisibility, setSavedSnackbarVisibility] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
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
    managerUserName: '',
  });
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

  // Load the data => object details and static data
  useEffect(() => {
    if (state !== 'ADD') {
      dispatch(loadDepenseCaisseDetailsAction(depenseCaisseIdentity));
    }
    if (!readOnly) {
      dispatch(LoadStaticDataAction());
    }
  }, []);

  // Fill the data in case of editing/modifying
  useEffect(() => {
    if (depenseCaisseDetails !== null) {
      setDescription(depenseCaisseDetails?.description);
      dispatch(SelectOnBehalfAction(depenseCaisseDetails?.onBehalf.toString()));
      if (depenseCaisseDetails?.requesterInfo !== null) {
        setActualRequester(depenseCaisseDetails?.requesterInfo);
      }

      setReceiptsFile(depenseCaisseDetails?.receiptsFile);
      setExpenses([]);

      depenseCaisseDetails?.expenses?.forEach((expense) => {
        const formattedDateExpense = {
          id: expense.id,
          description: expense.description,
          expenseDate: dayjs(new Date(expense.expenseDate)),
          estimatedFee: expense.estimatedFee,
        };
        setExpenses((prevExpenses) => [...prevExpenses, formattedDateExpense]);
      });
    }
  }, [depenseCaisseDetails]);

  // Listen to adding & updating
  useEffect(() => {
    if (errorAddingDepenseCaisse === false) {
      if (buttonClicked === 'SAVE-AS-DRAFT') {
        dispatch(setDepenseCaisseStatusAction('SAVED'));
        dispatch(cleanupDepenseCaisseParentPageStoreAction());
      }
      if (buttonClicked === 'CONFIRM') {
        dispatch(loadDepenseCaisseDetailsAction(depenseCaisseIdentity));
      }
    }
    if (errorUpdatingDepenseCaisse === false) {
      if (buttonClicked === 'SAVE-AS-DRAFT') {
        dispatch(setDepenseCaisseStatusAction('UPDATED'));
        dispatch(cleanupDepenseCaisseParentPageStoreAction());
      }
      if (buttonClicked === 'CONFIRM') {
        dispatch(loadDepenseCaisseDetailsAction(depenseCaisseIdentity));
      }
    }
  }, [errorAddingDepenseCaisse, errorUpdatingDepenseCaisse]);

  // Change PAGE CONTENT TO CONFIRMATION PAGE when the object is loaded and the button clicked is CONFIRM
  useEffect(() => {
    if (
      buttonClicked === 'CONFIRM' &&
      errorLoadingDepenseCaisseDetails === false
    ) {
      dispatch(cleanupDepenseCaisseParentPageStoreAction());
      dispatch(changePageContentAction('CONFIRM'));
      setSavedSnackbarVisibility(true);
    }
  }, [errorLoadingDepenseCaisseDetails]);

  // Listen to Submit/Resubmit
  useEffect(() => {
    if (errorSubmittingDepenseCaisse === false) {
      if (buttonClicked === 'SUBMIT') {
        dispatch(setDepenseCaisseStatusAction('SUBMITTED'));
      }
      if (buttonClicked === 'SUBMIT-MODIFICATIONS') {
        dispatch(setDepenseCaisseStatusAction('RESUBMITTED'));
      }

      dispatch(cleanupDepenseCaisseParentPageStoreAction());
    }
  }, [errorSubmittingDepenseCaisse]);

  // Cleanup store
  useEffect(
    () => () => {
      dispatch(cleanupDepenseCaisseFormPageStoreAction());
      dispatch(cleanupDepenseCaisseParentPageStoreAction());
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

  // FUNCS
  const addExpense = () => {
    setExpensesCounter(expensesCounter + 1);
    const newExpense = {
      id: expensesCounter,
      description: '',
      expenseDate: null,
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
    const updatedRequester = { ...actualRequester, [fieldName]: value };
    setActualRequester(updatedRequester);
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

  const handlecurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleOnBehalfSelectionChange = (event) => {
    if (event.target.value !== String(onBehalfSelection)) {
      dispatch(SelectOnBehalfAction(event.target.value.toString()));
    }
  };

  const getAction = () => {
    let requestAction = '';
    if (depenseCaisseDetails !== null) {
      requestAction = state === 'EDIT' ? 'save' : 'submit';
    }
    return requestAction;
  };

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(cleanupDepenseCaisseFormPageStoreAction());
    dispatch(cleanupDepenseCaisseParentPageStoreAction());
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
        dispatch(AddDepenseCaisseAction(data));
        setButtonClicked('SAVE-AS-DRAFT');
      }
      if (state === 'EDIT') {
        // Edit and save in case of draft
        dispatch(UpdateDepenseCaisseAction(data));
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
        dispatch(AddDepenseCaisseAction(data));
        setButtonClicked('CONFIRM');
      }
      if (state === 'EDIT') {
        // Edit and save in case of draft
        dispatch(UpdateDepenseCaisseAction(data));
        setButtonClicked('CONFIRM');
      }
    }
  };

  const handleOnSubmitButtonClick = () => {
    dispatch(submitDepenseCaisseAction(depenseCaisseDetails?.id));
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
      dispatch(UpdateDepenseCaisseAction(data));
      setButtonClicked('SUBMIT-MODIFICATIONS');
    }
  };

  const handleOnFileButtonClick = () => {
    const binaryString = atob(depenseCaisseDetails?.receiptsFile);
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
    link.download = depenseCaisseDetails?.receiptsFileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const data = {
    id: depenseCaisseDetails !== null ? depenseCaisseDetails?.id : 0,
    action: getAction(),
    onBehalf: onBehalfSelection === 'true',
    description,
    receiptsFile:
      depenseCaisseDetails?.receiptsFile === receiptsFile ? null : receiptsFile,
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
        {state === 'ADD' && (
          <h1 style={{ fontSize: '30px' }}>New Depense Caisse Request</h1>
        )}
        {state === 'EDIT' && (
          <h1 style={{ fontSize: '30px' }}>
            Editing Depense Caisse #{depenseCaisseDetails?.id}
          </h1>
        )}
        {state === 'MODIFY' && (
          <h1 style={{ fontSize: '30px' }}>
            Modifying Depense Caisse #{depenseCaisseDetails?.id}
          </h1>
        )}
        {state === 'VIEW' && (
          <h1 style={{ fontSize: '30px' }}>
            View Depense Caisse #{depenseCaisseDetails?.id}
          </h1>
        )}
        {state === 'CONFIRM' && (
          <h1 style={{ fontSize: '30px' }}>
            <Typography variant="h5" marginTop={3} gutterBottom>
              Please Review your information before submitting
            </Typography>
          </h1>
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
      {state === 'VIEW' && (
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          marginBottom={2}
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
            depenseCaisseDetails?.requesterInfo !== null
              ? depenseCaisseDetails?.requesterInfo
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
              {depenseCaisseDetails?.currency}
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
              <Typography variant="h6">
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

      {!readOnly && (
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="40rem"
          >
            {state === 'ADD' && <h1 style={{ fontSize: '18px' }}>Receipts*</h1>}
            {(state === 'CONFIRM' || state === 'VIEW') && (
              <h1 style={{ fontSize: '18px' }}>Receipts*</h1>
            )}
            {(state === 'EDIT' || state === 'MODIFY') && (
              <h1 style={{ fontSize: '18px' }}>
                Update your receipts&nbsp;
                <Typography variant="caption">(optional)</Typography>
              </h1>
            )}
            {(state === 'EDIT' || state === 'MODIFY') && (
              <Alert severity="warning" textAlign="left">
                <Typography variant="p">
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Please note:
                  </Typography>
                  uploading a new file will override the old one. You may want
                  to attach your previously uploaded receipts in case you still
                  want to include them.
                </Typography>
              </Alert>
            )}

            <Typography
              variant="caption"
              sx={{ color: 'error.main' }}
              marginTop={3}
            >
              Please upload your receipts in a single pdf file.
            </Typography>

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
            {/* <LoadingButton
              color="secondary"
              loading={loadingButton}
              loadingPosition="start"
              startIcon={<FileUploadIcon />}
              variant="outlined"
              fullWidth
            >
              <span> Upload file</span>
              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => updateReceiptsFileData(e)}
              ></input>
            </LoadingButton> */}
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
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Selected file: {receiptsFileName}
              </Typography>
            )}
          </Box>
        </Box>
      )}

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
              {depenseCaisseDetails?.statusHistory?.map((sh, i, arr) => (
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
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={savedSnackbarVisibility}
        autoHideDuration={3000}
        onClose={() => setSavedSnackbarVisibility(false)}
        action={action}
      >
        <Alert
          onClose={() => setSavedSnackbarVisibility(false)}
          severity="info"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Request has been saved!
        </Alert>
      </Snackbar>
    </Box>
  );
}

DepenseCaisseForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default DepenseCaisseForm;
