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
import Box from '@mui/system/Box';
import Alert from '@mui/joy/Alert';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import {
  DateTimeFormater,
  FormatNumber,
} from 'utils/Custom/stringManipulation';
import Timeline from '@mui/lab/Timeline';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import DisplayUserinfo from 'components/DisplayUserinfo';
import { cleanupParentDecideOnDepenseCaisseStoreAction } from 'pages/DecideOnDepenseCaisse/actions';
import { setDepenseCaisseStatusAction } from 'containers/DecideOnDepenseCaisseTable/actions';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { makeSelectDepenseCaisseIdentity } from 'pages/DecideOnDepenseCaisse/selectors';
import { NumericFormat } from 'react-number-format';
import { List, ListItem, ListItemDecorator, Radio, RadioGroup } from '@mui/joy';
import ExpensesTable from 'components/ExpensesTable';
import { makeSelectDeciderLevels } from 'pages/DecideOnRequests/selectors';
import { ValidateDeciderComment } from 'utils/Custom/ValidateInputs';
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
  deciderLevels: makeSelectDeciderLevels(),
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
    deciderLevels,
  } = useSelector(mapStateToProps);

  // Control data
  const [deciderComment, setDeciderComment] = useState(null);
  const [decisionString, setDecisionString] = useState(null);
  const [isReturnedToTRByFM, setReturnedToTRByFM] = useState(false);
  const [isReturnedToRequesterByTR, setReturnedToRequesterByTR] = useState('');

  // Control modal content
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalSevirity, setModalSevirity] = useState('');

  const [expenses, setExpenses] = useState([]);
  const [receiptsFile, setReceiptsFile] = useState('');

  const readOnly = state === 'VIEW';

  const data = {
    requestId: depenseCaisseDetails !== null && depenseCaisseDetails?.id,
    deciderComment,
    decisionString,
    returnedToFMByTR: isReturnedToRequesterByTR === 'notReturnedToRequester',
    returnedToTRByFM: isReturnedToTRByFM,
    returnedToRequesterByTR:
      isReturnedToRequesterByTR === 'returnedToRequester',
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
      if (decisionString === 'return' || decisionString === 'reject') {
        const result = ValidateDeciderComment(
          setModalVisibility,
          setModalBody,
          setModalHeader,
          setModalSevirity,
          deciderComment,
        );
        if (result) dispatch(decideOnDepenseCaisseAction(data));
      } else {
        dispatch(decideOnDepenseCaisseAction(data));
      }
    }
  }, [decisionString]);

  // Set request status for snakcbar message in table
  useEffect(() => {
    if (errorDecidingOnDepenseCaisse === false) {
      if (decisionString === 'aprrove') {
        if (
          depenseCaisseDetails?.latestStatus === "Pending Treasury's Validation"
        ) {
          dispatch(setDepenseCaisseStatusAction('approved'));
        } else {
          dispatch(setDepenseCaisseStatusAction('signed and approved'));
        }
      }

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
    if (
      depenseCaisseDetails?.latestStatus === "Pending Treasury's Validation"
    ) {
      setModalBody(
        'By Approving the request, you acknowledge that all information is correct and you start preparing the funds',
      );
    } else {
      setModalBody(
        'By Approving the request, you sign it digitally and forward it to the next decider',
      );
    }
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

  // FM Button

  const handleOnConfirmByFMAfterReturnByTRButtonClick = () => {
    setModalHeader('Confirm the request?');
    setModalBody(
      'By confirming the request again, you acknowledge that all the information are correct. The request will be forwarded to the Treasurer for further inspection.',
    );
    setModalSevirity('success');
    setModalVisibility(true);
  };

  const handleOnConfirmByFMAfterReturnByTRConfirmationButtonClick = () => {
    setReturnedToTRByFM(true);
    setDecisionString('return');
  };

  // TR buttons
  const handleOnFinalizeButtonClick = () => {
    setModalHeader('Finalize the request?');
    setModalBody(
      'By finalizing the request, you acknowledge that everything is settled and no further actions are required. All information will still be accessible afterwards',
    );
    setModalSevirity('success');
    setModalVisibility(true);
  };

  const handleOnReturnRequestByTreasuryButtonClick = () => {
    setModalHeader('Return the request?');
    setModalBody('Please choose to whom you want to return the request.');
    setModalSevirity('warning');
    setModalVisibility(true);
  };

  const handleOnFinalizeConfirmationButtonClick = () => {
    setDecisionString('approve');
  };

  const handleOnReturnRequestByTreasuryConfirmationButtonClick = () => {
    setDecisionString('return');
  };

  //
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
        marginBottom={1}
      >
        <Typography color="neutral" level="title-lg" variant="plain">
          Current Status:{' '}
          <Typography color="primary" level="title-lg" variant="plain">
            {depenseCaisseDetails?.latestStatus}
          </Typography>
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

      {depenseCaisseDetails?.latestStatus ===
        'Returned To Finance Department for missing Information' && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={3}
        >
          <Card
            color="warning"
            variant="soft"
            icon={false}
            sx={{ maxWidth: '60%' }}
          >
            <CardContent sx={{ textAlign: 'center', marginBottom: '1em' }}>
              This request has been returned by the treasurer. <br /> Please
              refer to the comment below.
            </CardContent>
            <Card variant="outlined">
              {depenseCaisseDetails?.deciderComment}
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
            <ExpensesTable expensesData={expenses} />
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
              <NumericFormat
                displayType="text"
                value={depenseCaisseDetails?.total}
                fixedDecimalScale
                decimalScale={2}
                defaultValue="0"
                allowNegative={false}
                thousandSeparator={
                  localStorage.getItem('preferredLanguage') === 'en' ? ',' : ' '
                }
                decimalSeparator={
                  localStorage.getItem('preferredLanguage') === 'en' ? '.' : ','
                }
              />
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
        {!readOnly && !deciderLevels?.includes('TR') && (
          <>
            {depenseCaisseDetails?.latestStatus !==
              'Returned To Finance Department for missing Information' && (
              <Button
                variant="contained"
                color="error"
                onClick={handleOnRejectRequestButtonClick}
              >
                Reject
              </Button>
            )}
            <Button
              variant="contained"
              color="warning"
              onClick={handleOnReturnRequestButtonClick}
            >
              Return the request
            </Button>
            {depenseCaisseDetails?.latestStatus ===
              'Returned To Finance Department for missing Information' && (
              <Button
                variant="contained"
                color="success"
                onClick={handleOnConfirmByFMAfterReturnByTRButtonClick}
              >
                Confirm
              </Button>
            )}
            {depenseCaisseDetails?.latestStatus !==
              'Returned To Finance Department for missing Information' && (
              <Button
                variant="contained"
                color="success"
                onClick={handleOnApproveRequestButtonClick}
              >
                {depenseCaisseDetails?.latestStatus ===
                "Pending Treasury's Validation"
                  ? 'Approve'
                  : 'Sign and Approve'}
              </Button>
            )}
          </>
        )}
        {!readOnly && deciderLevels?.includes('TR') && (
          <Button
            variant="contained"
            color="warning"
            onClick={handleOnReturnRequestByTreasuryButtonClick}
          >
            Return the request
          </Button>
        )}
        {!readOnly && deciderLevels?.includes('TR') && (
          <Button
            variant="contained"
            color="success"
            onClick={handleOnFinalizeButtonClick}
          >
            Finalize
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
              {(modalHeader === 'Return the request?' ||
                modalHeader === 'Reject the request?') &&
                !deciderLevels?.includes('TR') && (
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
                      placeholder="Your Comment (255 characters: ~35 to 50 words)..."
                      variant="outlined"
                      onChange={(e) => setDeciderComment(e.target.value)}
                      inputProps={{ maxLength: 255 }}
                    />
                  </>
                )}
              {modalHeader === 'Return the request?' &&
                deciderLevels?.includes('TR') && (
                  <>
                    <RadioGroup
                      name="delivery-method"
                      sx={{ margin: '1em' }}
                      value={isReturnedToRequesterByTR}
                      onChange={(e) =>
                        setReturnedToRequesterByTR(e.target.value)
                      }
                    >
                      <List
                        sx={{
                          minWidth: 240,
                          '--List-gap': '0.5rem',
                          '--ListItem-paddingY': '1rem',
                          '--ListItem-radius': '8px',
                          '--ListItemDecorator-size': '32px',
                        }}
                      >
                        <ListItem
                          variant="outlined"
                          key="0"
                          sx={{ boxShadow: 'sm' }}
                        >
                          <ListItemDecorator>
                            <PersonIcon />
                          </ListItemDecorator>
                          <Radio
                            overlay
                            value="returnedToRequester"
                            label="Return it to the requester for missing evidences"
                            sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                            slotProps={{
                              action: ({ checked }) => ({
                                sx: (theme) => ({
                                  ...(checked && {
                                    inset: -1,
                                    border: '2px solid',
                                    borderColor:
                                      theme.vars.palette.warning[500],
                                  }),
                                }),
                              }),
                            }}
                            color="warning"
                          />
                        </ListItem>
                        <ListItem
                          variant="outlined"
                          key="1"
                          sx={{ boxShadow: 'sm' }}
                        >
                          <ListItemDecorator>
                            <PersonIcon />
                          </ListItemDecorator>
                          <Radio
                            overlay
                            value="notReturnedToRequester"
                            label="Return it to Finance Manager for wrong information"
                            sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                            slotProps={{
                              action: ({ checked }) => ({
                                sx: (theme) => ({
                                  ...(checked && {
                                    inset: -1,
                                    border: '2px solid',
                                    borderColor:
                                      theme.vars.palette.warning[500],
                                  }),
                                }),
                              }),
                            }}
                            color="warning"
                          />
                        </ListItem>
                      </List>
                    </RadioGroup>
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
          {/* Normal deciders actions */}
          {modalHeader === 'Approve the request?' && (
            <Button
              color="success"
              onClick={handleOnApproveRequestConfirmationButtonClick}
              variant="contained"
            >
              {depenseCaisseDetails?.latestStatus ===
              "Pending Treasury's Validation"
                ? 'Approve'
                : 'Sign and Approve'}
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
          {modalHeader === 'Return the request?' &&
            !deciderLevels?.includes('TR') && (
              <Button
                color="warning"
                onClick={handleOnReturnRequestConfirmationButtonClick}
                variant="contained"
              >
                Return the request
              </Button>
            )}

          {/* FM Special action  */}
          {modalHeader === 'Confirm the request?' && (
            <Button
              color="success"
              onClick={
                handleOnConfirmByFMAfterReturnByTRConfirmationButtonClick
              }
              variant="contained"
            >
              Confirm
            </Button>
          )}

          {/* TR actions */}
          {modalHeader === 'Finalize the request?' && (
            <Button
              color="success"
              onClick={handleOnFinalizeConfirmationButtonClick}
              variant="contained"
            >
              Finalize the request
            </Button>
          )}
          {modalHeader === 'Return the request?' &&
            deciderLevels?.includes('TR') && (
              <Button
                color="warning"
                onClick={handleOnReturnRequestByTreasuryConfirmationButtonClick}
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
