/**
 *
 * DecideOnDepenseCaisseForm
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import HistoryIcon from '@mui/icons-material/History';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { Box } from '@mui/system';
import { Alert, Card, CardContent, Stack, Typography } from '@mui/joy';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import {
  DateTimeFormater,
  FormatNumber,
} from 'utils/Custom/stringManipulation';
import { Timeline } from '@mui/lab';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SimpleExpensesTable from 'components/SimpleExpensesTable';
import DisplayUserinfo from 'components/DisplayUserinfo';
import { cleanupParentDecideOnDepenseCaisseStoreAction } from 'pages/DecideOnDepenseCaisse/actions';
import { setDepenseCaisseStatusAction } from 'containers/DecideOnDepenseCaisseTable/actions';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { makeSelectDepenseCaisseIdentity } from 'pages/DecideOnDepenseCaisse/selectors';
import {
  makeSelectDepenseCaisseDetails,
  makeSelectErrorDecidingOnDepenseCaisse,
  makeSelectErrorLoadingDepenseCaisseDetails,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupDecideOnDepenseCaisseFormPageAction,
  decideOnDepenseCaisseAction,
  loadDepenseCaisseDetailsAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  depenseCaisseIdentity: makeSelectDepenseCaisseIdentity(),
  errorLoadingDepenseCaisseDetails:
    makeSelectErrorLoadingDepenseCaisseDetails(),
  errorDecidingOnDepenseCaisse: makeSelectErrorDecidingOnDepenseCaisse(),
  depenseCaisseDetails: makeSelectDepenseCaisseDetails(),
});

export function DecideOnDepenseCaisseForm({ state }) {
  useInjectReducer({ key: 'decideOnDepenseCaisseForm', reducer });
  useInjectSaga({ key: 'decideOnDepenseCaisseForm', saga });

  const dispatch = useDispatch();

  const {
    isSideBarVisible,
    errorLoadingDepenseCaisseDetails,
    errorDecidingOnDepenseCaisse,
    depenseCaisseDetails,
    depenseCaisseIdentity,
  } = useSelector(mapStateToProps);

  // Control data
  const [deciderComment, setDeciderComment] = useState(null);
  const [decisionString, setDecisionString] = useState(null);
  const [returnedToFMByTR, setReturnedToFMByTR] = useState(false);
  const [returnedToTRByFM, setReturnedToTRByFM] = useState(false);
  const [returnedToRequesterByTR, setReturnedToRequesterByTR] = useState(false);

  // Control modal content
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalSevirity, setModalSevirity] = useState('');

  const [expenses, setExpenses] = useState([]);
  const [receiptsFile, setReceiptsFile] = useState('');
  const [receiptsFileName, setReceiptsFileName] = useState('');

  const readOnly = state === 'VIEW';

  const data = {
    requestId: depenseCaisseDetails !== null && depenseCaisseDetails?.id,
    deciderComment,
    decisionString,
    returnedToFMByTR,
    returnedToTRByFM,
    returnedToRequesterByTR,
  };

  // Load the data => object details
  useEffect(() => {
    dispatch(loadDepenseCaisseDetailsAction(depenseCaisseIdentity));
  }, []);

  useEffect(() => {
    if (errorLoadingDepenseCaisseDetails === false) {
      depenseCaisseDetails?.expenses?.forEach((expense) => {
        const formattedDateExpense = {
          ...expense,
          expenseDate: DateTimeFormater(new Date(expense.expenseDate)),
        };
        setExpenses((prevExpenses) => [...prevExpenses, formattedDateExpense]);
      });

      setReceiptsFile(depenseCaisseDetails?.receiptsFile);
    }
  }, [errorLoadingDepenseCaisseDetails]);

  // Decide
  useEffect(() => {
    if (decisionString !== null) {
      dispatch(decideOnDepenseCaisseAction(data));
    }
  }, [decisionString]);

  // Set request status for snakcbar message in table
  useEffect(() => {
    if (errorDecidingOnDepenseCaisse === false) {
      if (decisionString === 'aprrove')
        dispatch(setDepenseCaisseStatusAction('signed and approved'));
      if (decisionString === 'return')
        dispatch(setDepenseCaisseStatusAction('returned'));
      if (decisionString === 'reject')
        dispatch(setDepenseCaisseStatusAction('rejected'));

      dispatch(cleanupDecideOnDepenseCaisseFormPageAction());
      dispatch(cleanupParentDecideOnDepenseCaisseStoreAction());
    }
  }, [errorDecidingOnDepenseCaisse]);

  // Cleanup Store
  useEffect(
    () => () => {
      dispatch(cleanupDecideOnDepenseCaisseFormPageAction());
      dispatch(cleanupParentDecideOnDepenseCaisseStoreAction());
    },
    [],
  );

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

  const handleOnReturnButtonClick = () => {
    dispatch(cleanupDecideOnDepenseCaisseFormPageAction());
    dispatch(cleanupParentDecideOnDepenseCaisseStoreAction());
  };

  const handleOnApproveRequestButtonClick = () => {
    setModalHeader('Approve the request?');
    setModalBody(
      'By Approving the request, you sign it digitally and forward it to the next decider',
    );
    setModalSevirity('primary');
    setModalVisibility(true);
  };
  const handleOnRejectRequestButtonClick = () => {
    setModalHeader('Reject the request?');
    setModalBody(
      'Are you sure you want to reject this request? This will set the request in an unmodifiable status and it will not continue the approval process',
    );
    setModalSevirity('danger');
    setModalVisibility(true);
  };
  const handleOnReturnRequestButtonClick = () => {
    setModalHeader('Return the request?');
    setModalBody(
      'Are you sure you want to return this request? This will return it to the requester to modify it, and the process of approval will start all over.',
    );
    setModalSevirity('warning');
    setModalVisibility(true);
  };

  const handleOnApproveRequestConfirmationButtonClick = () => {
    setDecisionString('approve');
  };
  const handleOnRejectRequestConfirmationButtonClick = () => {
    setDecisionString('reject');
  };
  const handleOnReturnRequestConfirmationButtonClick = () => {
    setDecisionString('return');
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
      <Box display="flex" justifyContent="center" textAlign="center" margin={3}>
        <Typography level="h2">
          Depense Caisse #{depenseCaisseDetails?.id}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <Button
          variant="outlined"
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
      <DisplayUserinfo
        userData={depenseCaisseDetails?.requester}
        isActualRequester={false}
      />

      {/* ACTUAL REQUESTER INFO */}
      {depenseCaisseDetails?.onBehalf === true && (
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
          <DisplayUserinfo userData={depenseCaisseDetails?.actualRequester} />
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

      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Card
          variant="soft"
          color="neutral"
          sx={{ width: '50%', bgcolor: 'white', boxShadow: 'sm' }}
        >
          <CardContent>
            <Typography level="title-md">Description</Typography>
            <Typography level="body-md">
              {depenseCaisseDetails?.description}
            </Typography>
          </CardContent>
        </Card>
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

      {expenses.length > 0 && (
        <>
          <Box
            textAlign="center"
            display="flex"
            justifyContent="center"
            marginBottom={2}
          >
            <Typography level="h4" display="flex">
              Expenses
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" marginBottom={3}>
            <SimpleExpensesTable expensesData={expenses} />
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

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
        gap={10}
      >
        <Box alignItems="flex-start" width="40rem">
          <Typography level="h4">Receipts File:</Typography>
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
            Total {depenseCaisseDetails?.currency}:&nbsp;
            <Typography color="success">
              {FormatNumber(depenseCaisseDetails?.total)}
            </Typography>
          </Typography>
        </Box>
      </Box>

      {/* Buttons */}
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
        {!readOnly && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={handleOnRejectRequestButtonClick}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleOnReturnRequestButtonClick}
            >
              Return the request
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleOnApproveRequestButtonClick}
            >
              Sign & Approve
            </Button>
          </>
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
              {depenseCaisseDetails?.statusHistory?.map((sh, i, arr) => (
                <CustomizedTimeLine
                  statusHistory={sh}
                  lastOne={arr.length - 1 === i}
                ></CustomizedTimeLine>
              ))}
            </Timeline>
          ) : (
            <DialogContentText id="alert-dialog-slide-description">
              <Alert color={modalSevirity} size="lg" variant="soft">
                {modalBody}
              </Alert>
              {modalHeader === 'Return the request?' && (
                <>
                  <Typography
                    level="title-md"
                    color="danger"
                    marginTop={3}
                    marginBottom={2}
                  >
                    *Please provide a comment on why you are returning this
                    request (required)
                  </Typography>
                  <TextField
                    sx={{ width: '100%' }}
                    id="outlined-multiline-static"
                    multiline
                    rows={5}
                    placeholder="Your Comment..."
                    variant="outlined"
                    onChange={(e) => setDeciderComment(e.target.value)}
                    inputProps={{ maxLength: 255 }}
                  />
                </>
              )}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setModalVisibility(false)}>
            Close
          </Button>
          {modalHeader === 'Approve the request?' && (
            <Button
              color="success"
              onClick={handleOnApproveRequestConfirmationButtonClick}
              variant="contained"
            >
              Sign and Approve
            </Button>
          )}
          {modalHeader === 'Reject the request?' && (
            <Button
              color="error"
              onClick={handleOnRejectRequestConfirmationButtonClick}
              variant="contained"
            >
              Reject
            </Button>
          )}
          {modalHeader === 'Return the request?' && (
            <Button
              color="warning"
              onClick={handleOnReturnRequestConfirmationButtonClick}
              variant="contained"
            >
              Return the request
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

DecideOnDepenseCaisseForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default DecideOnDepenseCaisseForm;
