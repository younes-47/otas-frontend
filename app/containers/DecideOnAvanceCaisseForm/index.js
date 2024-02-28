/**
 *
 * DecideOnAvanceCaisseForm
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import HistoryIcon from '@mui/icons-material/History';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import Box from '@mui/system/Box';
import Alert from '@mui/joy/Alert';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
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
import Timeline from '@mui/lab/Timeline';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectIsSideBarVisible,
  makeSelectDeciderLevels,
} from 'containers/SideBar/selectors';
import { makeSelectAvanceCaisseIdentity } from 'pages/DecideOnAvanceCaisse/selectors';
import { setAvanceCaisseStatusAction } from 'containers/DecideOnAvanceCaisseTable/actions';
import {
  changeDecideOnAvanceCaissePageContentAction,
  cleanupParentDecideOnAvanceCaisseStoreAction,
} from 'pages/DecideOnAvanceCaisse/actions';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import DisplayUserinfo from 'components/DisplayUserinfo';
import { NumericFormat, PatternFormat } from 'react-number-format';

import ExpensesTable from 'components/ExpensesTable';
import { ValidateDeciderComment } from 'utils/Custom/ValidateInputs';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from './messages';
import {
  makeSelectAvanceCaisseDetails,
  makeSelectConfirmingAvanceCaisseFundsDelivery,
  makeSelectErrorConfirmingAvanceCaisseFundsDelivery,
  makeSelectErrorDecidingOnAvanceCaisse,
  makeSelectErrorLoadingAvanceCaisseDetails,
  makeSelectErrorMarkingAvanceCaisseFundsAsPrepared,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupDecideOnAvanceCaisseFormPageAction,
  confirmAvanceCaisseFundsDeliveryAction,
  decideOnAvanceCaisseAction,
  loadAvanceCaisseDetailsAction,
  markAvanceCaisseFundsAsPreparedAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  avanceCaisseIdentity: makeSelectAvanceCaisseIdentity(),
  errorLoadingAvanceCaisseDetails: makeSelectErrorLoadingAvanceCaisseDetails(),
  errorDecidingOnAvanceCaisse: makeSelectErrorDecidingOnAvanceCaisse(),
  avanceCaisseDetails: makeSelectAvanceCaisseDetails(),
  deciderLevels: makeSelectDeciderLevels(),
  errorMarkingFundsAsPrepared:
    makeSelectErrorMarkingAvanceCaisseFundsAsPrepared(),
  confirmingAvanceCaisseFundsDelivery:
    makeSelectConfirmingAvanceCaisseFundsDelivery(),
  errorConfirmingAvanceCaisseFundsDelivery:
    makeSelectErrorConfirmingAvanceCaisseFundsDelivery(),
});

export function DecideOnAvanceCaisseForm({ state }) {
  useInjectReducer({ key: 'decideOnAvanceCaisseForm', reducer });
  useInjectSaga({ key: 'decideOnAvanceCaisseForm', saga });

  const dispatch = useDispatch();

  const {
    isSideBarVisible,
    errorLoadingAvanceCaisseDetails,
    errorDecidingOnAvanceCaisse,
    avanceCaisseDetails,
    avanceCaisseIdentity,
    deciderLevels,
    errorMarkingFundsAsPrepared,
    confirmingAvanceCaisseFundsDelivery,
    errorConfirmingAvanceCaisseFundsDelivery,
  } = useSelector(mapStateToProps);

  // Control data
  const [deciderComment, setDeciderComment] = useState(null);
  const [decisionString, setDecisionString] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState(null);
  const [methodOfDelivery, setMethodOfDelivery] = useState('CASH');

  // Control modal content
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalSevirity, setModalSevirity] = useState('');
  const [expesnes, setExpenses] = useState([]);
  const intl = useIntl();

  const readOnly = state === 'VIEW';

  const data = {
    requestId: avanceCaisseDetails !== null && avanceCaisseDetails?.id,
    deciderComment,
    decisionString,
    returnedToFMByTR: false,
    returnedToTRByFM: false,
    returnedToRequesterByTR: false,
  };

  const markFundsAsPreparedDecision = {
    requestId: avanceCaisseDetails !== null && avanceCaisseDetails?.id,
    advanceOption: methodOfDelivery,
  };

  const confirmFundsDelivery = {
    requestId: avanceCaisseDetails !== null && avanceCaisseDetails?.id,
    confirmationNumber,
  };

  // Load the data => object details
  useEffect(() => {
    dispatch(loadAvanceCaisseDetailsAction(avanceCaisseIdentity));
  }, []);

  useEffect(() => {
    if (errorLoadingAvanceCaisseDetails === false) {
      avanceCaisseDetails?.expenses?.forEach((expense) => {
        const formattedDateExpense = {
          ...expense,
          expenseDate: DateTimeFormater(new Date(expense.expenseDate)),
        };
        setExpenses((prevExpenses) => [...prevExpenses, formattedDateExpense]);
      });
    }
  }, [errorLoadingAvanceCaisseDetails]);

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
        if (result) dispatch(decideOnAvanceCaisseAction(data));
      } else {
        dispatch(decideOnAvanceCaisseAction(data));
      }
    }
  }, [decisionString]);

  // Set request status for snakcbar message in table
  useEffect(() => {
    if (errorDecidingOnAvanceCaisse === false) {
      if (decisionString === 'aprrove') {
        dispatch(setAvanceCaisseStatusAction('signedAndApproved'));
      }
      if (decisionString === 'return')
        dispatch(setAvanceCaisseStatusAction('returned'));
      if (decisionString === 'reject')
        dispatch(setAvanceCaisseStatusAction('rejected'));

      dispatch(cleanupDecideOnAvanceCaisseFormPageAction());
      dispatch(changeDecideOnAvanceCaissePageContentAction('TABLE'));
    }

    if (errorMarkingFundsAsPrepared === false) {
      dispatch(setAvanceCaisseStatusAction('signedAndApproved'));
      dispatch(cleanupDecideOnAvanceCaisseFormPageAction());
      dispatch(cleanupParentDecideOnAvanceCaisseStoreAction());
    }

    if (errorConfirmingAvanceCaisseFundsDelivery === false) {
      dispatch(setAvanceCaisseStatusAction('fundsDeliveryConfirmed'));
      dispatch(cleanupDecideOnAvanceCaisseFormPageAction());
      dispatch(cleanupParentDecideOnAvanceCaisseStoreAction());
    }
  }, [
    errorDecidingOnAvanceCaisse,
    errorMarkingFundsAsPrepared,
    errorConfirmingAvanceCaisseFundsDelivery,
  ]);

  // Cleanup Store
  useEffect(
    () => () => {
      dispatch(cleanupDecideOnAvanceCaisseFormPageAction());
      dispatch(cleanupParentDecideOnAvanceCaisseStoreAction());
    },
    [],
  );

  const handleOnReturnButtonClick = () => {
    dispatch(cleanupDecideOnAvanceCaisseFormPageAction());
    dispatch(cleanupParentDecideOnAvanceCaisseStoreAction());
  };

  const handleOnApproveRequestButtonClick = () => {
    setModalHeader('approveRequest');
    setModalBody('approveRequestBody');

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

  // TR buttons
  const handleOnMarkFundsAsPreparedButtonClick = () => {
    setModalHeader('markFundsAsPrepared');
    setModalBody('markFundsAsPreparedBody');
    setModalSevirity('success');
    setModalVisibility(true);
  };

  const handleOnConfirmFundsDeliveryButtonClick = () => {
    setModalHeader('confirmFundsDelivery');
    setModalBody('confirmFundsDeliveryBody');
    setModalSevirity('warning');
    setModalVisibility(true);
  };

  const handleOnMethodOfDeliveryConfirmationButtonClick = () => {
    dispatch(
      markAvanceCaisseFundsAsPreparedAction(markFundsAsPreparedDecision),
    );
  };

  const handleOnConfirmFundsDeliveryConfirmationButtonClick = () => {
    dispatch(confirmAvanceCaisseFundsDeliveryAction(confirmFundsDelivery));
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
          <FormattedMessage id={messages.avanceCaisseTitle.id} /> #
          {avanceCaisseDetails?.id}
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
            {avanceCaisseDetails?.latestStatus}
          </Typography>
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
        gap={2}
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
        userData={avanceCaisseDetails?.requester}
        isActualRequester={false}
      />

      {/* ACTUAL REQUESTER INFO */}
      {avanceCaisseDetails?.onBehalf === true && (
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
          <DisplayUserinfo userData={avanceCaisseDetails?.actualRequester} />
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
              {avanceCaisseDetails?.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {expesnes.length > 0 && (
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
            <ExpensesTable expensesData={expesnes} />
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

      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Box width="60%" display="flex" justifyContent="flex-end">
          <Typography level="h4">
            <FormattedMessage id={messages.total.id} />
            &nbsp;
            {avanceCaisseDetails?.currency}:&nbsp;
            <Typography color="success">
              <NumericFormat
                displayType="text"
                value={avanceCaisseDetails?.estimatedTotal}
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
            <Button
              variant="contained"
              color="error"
              onClick={handleOnRejectRequestButtonClick}
            >
              <FormattedMessage id={messages.rejectButton.id} />
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleOnReturnRequestButtonClick}
            >
              <FormattedMessage id={messages.returnRequestButton.id} />
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleOnApproveRequestButtonClick}
            >
              <FormattedMessage id={messages.signAndApproveButton.id} />
            </Button>
          </>
        )}
        {!readOnly &&
          deciderLevels?.includes('TR') &&
          avanceCaisseDetails?.latestStatus === 'Preparing Funds' && (
            <Button
              variant="contained"
              color="success"
              onClick={handleOnMarkFundsAsPreparedButtonClick}
            >
              <FormattedMessage id={messages.markFundsAsPreparedButton.id} />
            </Button>
          )}
        {!readOnly &&
          deciderLevels?.includes('TR') &&
          avanceCaisseDetails?.latestStatus === 'Funds Prepared' && (
            <Button
              variant="contained"
              color="success"
              onClick={handleOnConfirmFundsDeliveryButtonClick}
            >
              <FormattedMessage id={messages.confirmFundsDeliveryButton.id} />
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
              {avanceCaisseDetails?.statusHistory?.map((sh, i, arr) => (
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
                modalHeader === 'rejectRequest') && (
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
              {modalHeader === 'markFundsAsPrepared' && (
                <RadioGroup
                  name="delivery-method"
                  sx={{ margin: '1em' }}
                  value={methodOfDelivery}
                  onChange={(e) => setMethodOfDelivery(e.target.value)}
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
                        <PaymentsIcon color="success" />
                      </ListItemDecorator>
                      <Radio
                        overlay
                        value="CASH"
                        label={intl.formatMessage({
                          id: messages.cash.id,
                        })}
                        sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                        slotProps={{
                          action: ({ checked }) => ({
                            sx: (theme) => ({
                              ...(checked && {
                                inset: -1,
                                border: '2px solid',
                                borderColor: theme.vars.palette.success[500],
                              }),
                            }),
                          }),
                        }}
                        color="success"
                      />
                    </ListItem>
                    <ListItem
                      variant="outlined"
                      key="1"
                      sx={{ boxShadow: 'sm' }}
                    >
                      <ListItemDecorator>
                        <AccountBalanceIcon color="warning" />
                      </ListItemDecorator>
                      <Radio
                        overlay
                        value="PROVISION"
                        label={intl.formatMessage({
                          id: messages.provision.id,
                        })}
                        sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                        slotProps={{
                          action: ({ checked }) => ({
                            sx: (theme) => ({
                              ...(checked && {
                                inset: -1,
                                border: '2px solid',
                                borderColor: theme.vars.palette.success[500],
                              }),
                            }),
                          }),
                        }}
                        color="success"
                      />
                    </ListItem>
                  </List>
                </RadioGroup>
              )}
              {modalHeader === 'confirmFundsDelivery' && (
                <>
                  <FormControl sx={{ marginTop: '2em' }}>
                    <FormLabel>
                      <FormattedMessage id={messages.confirmationNumber.id} />
                    </FormLabel>
                    <PatternFormat
                      displayType="input"
                      placeholder="##-##-##-##"
                      value={confirmationNumber}
                      onValueChange={(values, sourceInfo) => {
                        setConfirmationNumber(values.value);
                      }}
                      decimalScale={0}
                      format="##-##-##-##"
                      disabled={confirmingAvanceCaisseFundsDelivery === true}
                      required
                      color="neutral"
                      size="lg"
                      variant="outlined"
                      customInput={Input}
                      allowNegative={false}
                      valueIsNumericString
                      error={confirmationNumber?.toString().length !== 8}
                    />
                    <FormHelperText>
                      <FormattedMessage
                        id={messages.confirmationNumberExplainer.id}
                      />
                    </FormHelperText>
                  </FormControl>
                  {errorConfirmingAvanceCaisseFundsDelivery === true && (
                    <Alert color="danger" size="md" variant="soft">
                      <FormattedMessage
                        id={messages.wrongConfirmationNumberMessage.id}
                      />
                    </Alert>
                  )}
                </>
              )}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setModalVisibility(false)}>
            <FormattedMessage id={messages.closeButton.id} />
          </Button>
          {modalHeader === 'approveRequest' && (
            <Button
              color="success"
              onClick={handleOnApproveRequestConfirmationButtonClick}
              variant="contained"
            >
              {!deciderLevels?.includes('FM') ? (
                <FormattedMessage id={messages.signAndApproveButton.id} />
              ) : (
                <FormattedMessage id={messages.approveButton.id} />
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
          {modalHeader === 'returnRequest' && (
            <Button
              color="warning"
              onClick={handleOnReturnRequestConfirmationButtonClick}
              variant="contained"
            >
              <FormattedMessage id={messages.returnRequestButton.id} />
            </Button>
          )}
          {modalHeader === 'markFundsDelivery' && (
            <Button
              color="success"
              onClick={handleOnMethodOfDeliveryConfirmationButtonClick}
              variant="contained"
            >
              <FormattedMessage id={messages.confirmButton.id} />
            </Button>
          )}
          {modalHeader === 'confirmFundsDelivery' && (
            <Button
              color="success"
              onClick={handleOnConfirmFundsDeliveryConfirmationButtonClick}
              variant="contained"
              disabled={confirmingAvanceCaisseFundsDelivery === true}
            >
              <FormattedMessage id={messages.confirmButton.id} />
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

DecideOnAvanceCaisseForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default DecideOnAvanceCaisseForm;
