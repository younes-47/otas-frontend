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
import {
  makeSelectIsSideBarVisible,
  makeSelectDeciderLevels,
} from 'containers/SideBar/selectors';
import { makeSelectDepenseCaisseIdentity } from 'pages/DecideOnDepenseCaisse/selectors';
import { NumericFormat } from 'react-number-format';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import ExpensesTable from 'components/ExpensesTable';
import { ValidateDeciderComment } from 'utils/Custom/ValidateInputs';
import { FormattedMessage, useIntl } from 'react-intl';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import messages from './messages';

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
  const intl = useIntl();

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
      if (decisionString === 'approve') {
        if (
          depenseCaisseDetails?.latestStatus === "Pending Treasury's Validation"
        ) {
          dispatch(setDepenseCaisseStatusAction('approved'));
        } else {
          dispatch(setDepenseCaisseStatusAction('signedAndApproved'));
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

    window.open(blobUrl, '_blank');
  };

  const handleOnReturnButtonClick = () => {
    dispatch(cleanupDecideOnDepenseCaisseFormPageAction());
    dispatch(cleanupParentDecideOnDepenseCaisseStoreAction());
  };

  const handleOnApproveRequestButtonClick = () => {
    setModalHeader('approveRequest');
    if (
      depenseCaisseDetails?.latestStatus === "Pending Treasury's Validation"
    ) {
      setModalBody('approveRequestTRBody');
    } else {
      setModalBody('approveRequestFMBody');
    }
    setModalSevirity('primary');
    setModalVisibility(true);
  };
  const handleOnRejectRequestButtonClick = () => {
    setModalHeader('rejectRequest');
    setModalBody('rejectRequestBody');
    setModalSevirity('danger');
    setModalVisibility(true);
  };
  const handleOnReturnRequestButtonClick = () => {
    setModalHeader('returnRequest');
    setModalBody('returnRequestBody');
    setModalSevirity('warning');
    setModalVisibility(true);
  };

  // FM Button

  const handleOnConfirmByFMAfterReturnByTRButtonClick = () => {
    setModalHeader('confirmRequest');
    setModalBody('confirmRequestBody');
    setModalSevirity('success');
    setModalVisibility(true);
  };

  const handleOnConfirmByFMAfterReturnByTRConfirmationButtonClick = () => {
    setReturnedToTRByFM(true);
    setDecisionString('return');
  };

  // TR buttons
  const handleOnFinalizeButtonClick = () => {
    setModalHeader('finalizeRequest');
    setModalBody('finalizeRequestBody');
    setModalSevirity('success');
    setModalVisibility(true);
  };

  const handleOnReturnRequestByTreasuryButtonClick = () => {
    setModalHeader('returnRequest');
    setModalBody('returnRequestBodyTR');
    setModalSevirity('warning');
    setModalVisibility(true);
  };

  const handleOnFinalizeConfirmationButtonClick = () => {
    setDecisionString('approve');
  };

  const handleOnReturnRequestByTreasuryConfirmationButtonClick = () => {
    if (isReturnedToRequesterByTR === '') {
      setModalHeader('invalidChoice');
      setModalBody('invalidChoiceBody');
      setModalSevirity('danger');
      setModalVisibility(true);
    } else {
      setDecisionString('return');
    }
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
      <Fab
        variant="circular"
        color="info"
        sx={{
          position: 'fixed',
          top: 90,
          left: isSideBarVisible ? 230 : 30,
        }}
        onClick={handleOnReturnButtonClick}
      >
        <ArrowBackIcon />
      </Fab>
      <Box display="flex" justifyContent="center" textAlign="center" margin={3}>
        <Typography level="h2">
          <FormattedMessage id={messages.depenseCaisseTitle.id} /> #
          {depenseCaisseDetails?.id}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={1}
      >
        <Typography color="neutral" level="title-lg" variant="plain">
          <FormattedMessage id={messages.currentStatus.id} />:{' '}
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
            setModalHeader('statusHistory');
          }}
          startIcon={<HistoryIcon />}
        >
          <FormattedMessage id={messages.statusHistoryButton.id} />
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
              <FormattedMessage id={messages.returnedByTRAlert.id} />
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
              <FormattedMessage id={messages.expensesHeader.id} />
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
          <Typography level="h4">
            <FormattedMessage id={messages.receiptsFile.id} />:
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
            <FormattedMessage id={messages.total.id} />
            &nbsp;
            {depenseCaisseDetails?.currency}:&nbsp;
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
          <FormattedMessage id={messages.returnButton.id} />
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
                <FormattedMessage id={messages.rejectButton.id} />
              </Button>
            )}
            <Button
              variant="contained"
              color="warning"
              onClick={handleOnReturnRequestButtonClick}
            >
              <FormattedMessage id={messages.returnRequestButton.id} />
            </Button>
            {depenseCaisseDetails?.latestStatus ===
              'Returned To Finance Department for missing Information' && (
              <Button
                variant="contained"
                color="success"
                onClick={handleOnConfirmByFMAfterReturnByTRButtonClick}
              >
                <FormattedMessage id={messages.signAndApproveButton.id} />
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
                "Pending Treasury's Validation" ? (
                  <FormattedMessage id={messages.approveButton.id} />
                ) : (
                  <FormattedMessage id={messages.signAndApproveButton.id} />
                )}
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
            <FormattedMessage id={messages.returnRequestButton.id} />
          </Button>
        )}
        {!readOnly && deciderLevels?.includes('TR') && (
          <Button
            variant="contained"
            color="success"
            onClick={handleOnFinalizeButtonClick}
          >
            <FormattedMessage id={messages.finalizeButton.id} />
          </Button>
        )}
      </Stack>

      {/* THE MODAL */}
      <Dialog
        open={modalVisibility}
        keepMounted
        onClose={() => {
          setModalVisibility(false);
          setDeciderComment(null);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {modalHeader && <FormattedMessage id={messages[modalHeader].id} />}
        </DialogTitle>
        <DialogContent dividers>
          {modalHeader === 'statusHistory' ? (
            <Timeline>
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
                {modalBody && <FormattedMessage id={messages[modalBody].id} />}
              </Alert>
              {(modalHeader === 'returnRequest' ||
                modalHeader === 'rejectRequest') &&
                !deciderLevels?.includes('TR') && (
                  <>
                    <Typography
                      level="title-md"
                      color="danger"
                      marginTop={3}
                      marginBottom={2}
                    >
                      {modalHeader === 'rejectRequest' ? (
                        <FormattedMessage
                          id={messages.rejectingRequestComment.id}
                        />
                      ) : (
                        <FormattedMessage
                          id={messages.returningRequestComment.id}
                        />
                      )}
                    </Typography>
                    <TextField
                      sx={{ width: '100%' }}
                      id="outlined-multiline-static"
                      multiline
                      rows={5}
                      placeholder={intl.formatMessage({
                        id: messages.deciderCommentPlaceholder.id,
                      })}
                      variant="outlined"
                      onChange={(e) => setDeciderComment(e.target.value)}
                      inputProps={{ maxLength: 255 }}
                    />
                  </>
                )}
              {modalHeader === 'returnRequest' &&
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
                            label={intl.formatMessage({
                              id: messages.returnToRequesterLabel.id,
                            })}
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
                            label={intl.formatMessage({
                              id: messages.returnToFMLabel.id,
                            })}
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
                      <FormattedMessage
                        id={messages.returningRequestComment.id}
                      />
                    </Typography>
                    <TextField
                      sx={{ width: '100%' }}
                      id="outlined-multiline-static"
                      multiline
                      rows={5}
                      placeholder={intl.formatMessage({
                        id: messages.deciderCommentPlaceholder.id,
                      })}
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
            <FormattedMessage id={messages.closeButton.id} />
          </Button>
          {/* Normal deciders actions */}
          {modalHeader === 'approveRequest' && (
            <Button
              color="success"
              onClick={handleOnApproveRequestConfirmationButtonClick}
              variant="contained"
            >
              {depenseCaisseDetails?.latestStatus ===
              "Pending Treasury's Validation" ? (
                <FormattedMessage id={messages.approveButton.id} />
              ) : (
                <FormattedMessage id={messages.signAndApproveButton.id} />
              )}
            </Button>
          )}
          {modalHeader === 'rejectRequest' && (
            <Button
              color="error"
              onClick={handleOnRejectRequestConfirmationButtonClick}
              variant="contained"
            >
              <FormattedMessage id={messages.rejectButton.id} />
            </Button>
          )}
          {modalHeader === 'returnRequest' &&
            !deciderLevels?.includes('TR') && (
              <Button
                color="warning"
                onClick={handleOnReturnRequestConfirmationButtonClick}
                variant="contained"
              >
                <FormattedMessage id={messages.returnRequestButton.id} />
              </Button>
            )}

          {/* FM Special action  */}
          {modalHeader === 'confirmRequest' && (
            <Button
              color="success"
              onClick={
                handleOnConfirmByFMAfterReturnByTRConfirmationButtonClick
              }
              variant="contained"
            >
              <FormattedMessage id={messages.confirmButton.id} />
            </Button>
          )}

          {/* TR actions */}
          {modalHeader === 'finalizeRequest' && (
            <Button
              color="success"
              onClick={handleOnFinalizeConfirmationButtonClick}
              variant="contained"
            >
              <FormattedMessage id={messages.finalizeButton.id} />
            </Button>
          )}
          {modalHeader === 'returnRequest' && deciderLevels?.includes('TR') && (
            <Button
              color="warning"
              onClick={handleOnReturnRequestByTreasuryConfirmationButtonClick}
              variant="contained"
            >
              <FormattedMessage id={messages.returnRequestButton.id} />
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
