/**
 *
 * DecideOnLiquidationForm
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
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Link from '@mui/joy/Link';
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
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import Timeline from '@mui/lab/Timeline';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import DisplayUserinfo from 'components/DisplayUserinfo';
import { cleanupDecideOnLiquidationParentPageStoreAction } from 'pages/DecideOnLiquidation/actions';
import { setLiquidationStatusAction } from 'containers/DecideOnLiquidationTable/actions';
import {
  makeSelectIsSideBarVisible,
  makeSelectDeciderLevels,
} from 'containers/SideBar/selectors';
import { makeSelectLiquidationIdentity } from 'pages/DecideOnLiquidation/selectors';
import { NumericFormat } from 'react-number-format';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import ExpensesTable from 'components/ExpensesTable';
import TripsTable from 'components/TripsTable';
import { ValidateDeciderComment } from 'utils/Custom/ValidateInputs';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  changeDecideOnAvanceVoyagePageContentAction,
  setAvanceVoyageIdentityAction,
} from 'pages/DecideOnAvanceVoyage/actions';
import {
  changeDecideOnAvanceCaissePageContentAction,
  setAvanceCaisseIdentityAction,
} from 'pages/DecideOnAvanceCaisse/actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  makeSelectLiquidationDetails,
  makeSelectErrorDecidingOnLiquidation,
  makeSelectErrorLoadingLiquidationDetails,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupDecideOnLiquidationFormPageAction,
  decideOnLiquidationAction,
  loadLiquidationDetailsAction,
} from './actions';
import messages from './messages';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  liquidationIdentity: makeSelectLiquidationIdentity(),
  errorLoadingLiquidationDetails: makeSelectErrorLoadingLiquidationDetails(),
  errorDecidingOnLiquidation: makeSelectErrorDecidingOnLiquidation(),
  liquidationDetails: makeSelectLiquidationDetails(),
  deciderLevels: makeSelectDeciderLevels(),
});

export function DecideOnLiquidationForm({ state }) {
  useInjectReducer({ key: 'decideOnLiquidationForm', reducer });
  useInjectSaga({ key: 'decideOnLiquidationForm', saga });

  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();

  const {
    isSideBarVisible,
    errorLoadingLiquidationDetails,
    errorDecidingOnLiquidation,
    liquidationDetails,
    liquidationIdentity,
    deciderLevels,
  } = useSelector(mapStateToProps);

  // Control data
  const [deciderComment, setDeciderComment] = useState('');
  const [decisionString, setDecisionString] = useState(null);
  const [isReturnedToTRByFM, setReturnedToTRByFM] = useState(false);
  const [isReturnedToRequesterByTR, setReturnedToRequesterByTR] = useState('');

  // Control modal content
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalSevirity, setModalSevirity] = useState('');

  const [expenses, setExpenses] = useState([]);
  const [trips, setTrips] = useState([]);
  const [receiptsFile, setReceiptsFile] = useState('');

  const readOnly = state === 'VIEW';

  const data = {
    requestId: liquidationDetails !== null && liquidationDetails?.id,
    deciderComment,
    decisionString,
    returnedToFMByTR: isReturnedToRequesterByTR === 'notReturnedToRequester',
    returnedToTRByFM: isReturnedToTRByFM,
    returnedToRequesterByTR:
      isReturnedToRequesterByTR === 'returnedToRequester',
  };

  // Load the data => object details
  useEffect(() => {
    dispatch(loadLiquidationDetailsAction(liquidationIdentity));
  }, []);

  useEffect(() => {
    if (errorLoadingLiquidationDetails === false) {
      liquidationDetails?.requestDetails?.expenses?.forEach((expense) => {
        const formattedDateExpense = {
          ...expense,
          expenseDate: DateTimeFormater(new Date(expense.expenseDate)),
        };
        setExpenses((prevExpenses) => [...prevExpenses, formattedDateExpense]);
      });

      liquidationDetails?.requestDetails?.trips?.forEach((trip) => {
        const formattedDateTrip = {
          ...trip,
        };
        setTrips((prevTrips) => [...prevTrips, formattedDateTrip]);
      });

      setReceiptsFile(liquidationDetails?.receiptsFile);
    }
  }, [errorLoadingLiquidationDetails]);

  // Decide
  useEffect(() => {
    if (decisionString !== null) {
      if (decisionString === 'return') {
        const result = ValidateDeciderComment(
          setModalVisibility,
          setModalBody,
          setModalHeader,
          setModalSevirity,
          deciderComment,
        );
        if (result) dispatch(decideOnLiquidationAction(data));
      } else {
        dispatch(decideOnLiquidationAction(data));
      }
    }
  }, [decisionString]);

  // Set request status for snakcbar message in table
  useEffect(() => {
    if (errorDecidingOnLiquidation === false) {
      if (decisionString === 'aprrove') {
        if (
          liquidationDetails?.latestStatus === "Pending Treasury's Validation"
        ) {
          dispatch(setLiquidationStatusAction('approved'));
        } else {
          dispatch(setLiquidationStatusAction('signedAndApproved'));
        }
      }

      if (decisionString === 'return')
        dispatch(setLiquidationStatusAction('returned'));

      dispatch(cleanupDecideOnLiquidationFormPageAction());
      dispatch(cleanupDecideOnLiquidationParentPageStoreAction());
    }
  }, [errorDecidingOnLiquidation]);

  // Cleanup Store
  useEffect(
    () => () => {
      dispatch(cleanupDecideOnLiquidationFormPageAction());
      dispatch(cleanupDecideOnLiquidationParentPageStoreAction());
    },
    [],
  );

  const handleOnFileButtonClick = () => {
    const binaryString = atob(liquidationDetails?.receiptsFile);
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
    dispatch(cleanupDecideOnLiquidationFormPageAction());
    dispatch(cleanupDecideOnLiquidationParentPageStoreAction());
  };

  const handleOnApproveRequestButtonClick = () => {
    setModalHeader('approveRequest');
    if (liquidationDetails?.latestStatus === "Pending Treasury's Validation") {
      setModalBody('approveRequestTRBody');
    } else {
      setModalBody('approveRequestFMBody');
    }
    setModalSevirity('primary');
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

  // Other deciders buttons
  const handleOnApproveRequestConfirmationButtonClick = () => {
    setDecisionString('approve');
  };
  const handleOnReturnRequestConfirmationButtonClick = () => {
    setDecisionString('return');
  };

  //
  const handleOnAvanceVoyageLinkClick = (avanceVoyageId) => {
    dispatch(setAvanceVoyageIdentityAction(avanceVoyageId));
    dispatch(changeDecideOnAvanceVoyagePageContentAction('VIEW'));
    history.push('/decide-on-requests/decide-on-avance-voyage');
  };

  const handleOnAvanceCaisseLinkClick = (avanceCaisseId) => {
    dispatch(setAvanceCaisseIdentityAction(avanceCaisseId));
    dispatch(changeDecideOnAvanceCaissePageContentAction('VIEW'));
    history.push('/decide-on-requests/decide-on-avance-caisse');
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
          <FormattedMessage id={messages.decideOnLQHeader.id} /> #
          {liquidationDetails?.id}
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
            {liquidationDetails?.latestStatus}
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

      {liquidationDetails?.latestStatus ===
        'Returned To Finance Department for missing Information' &&
        deciderLevels?.includes('FM') && (
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
                {liquidationDetails?.deciderComment}
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
        userData={liquidationDetails?.requester}
        isActualRequester={false}
      />

      {/* ACTUAL REQUESTER INFO */}
      {liquidationDetails?.onBehalf === true && (
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
          <DisplayUserinfo
            userData={liquidationDetails?.requestDetails?.actualRequester}
          />
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
        marginTop={3}
        marginBottom={3}
      >
        <Alert severity="info">
          <Typography variant="P">
            <FormattedMessage id={messages.requestLinkedTo.id} />
          </Typography>
          {liquidationDetails?.requestType === 'AC' ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link
              level="title-sm"
              underline="always"
              onClick={() =>
                handleOnAvanceCaisseLinkClick(liquidationDetails?.requestId)
              }
            >
              <FormattedMessage id={messages.avanceCaisseTitle.id} />
              &nbsp;#{liquidationDetails?.requestId}
              <InsertLinkIcon fontSize="small" />
            </Link>
          ) : (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link
              level="title-sm"
              underline="always"
              onClick={() =>
                handleOnAvanceVoyageLinkClick(liquidationDetails?.requestId)
              }
            >
              <FormattedMessage id={messages.avanceVoyageTitle.id} />
              &nbsp;#{liquidationDetails?.requestId}
              <InsertLinkIcon fontSize="small" />
            </Link>
          )}
        </Alert>
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
              {liquidationDetails?.requestDetails?.description}
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

      {trips.length > 0 && (
        <>
          <Typography level="title-lg" textAlign="center" marginBottom={2}>
            <FormattedMessage id={messages.tripsHeader.id} />
          </Typography>
          <Box display="flex" justifyContent="center" marginBottom={5}>
            <TripsTable
              tripsData={trips}
              isTripModifiable={false}
              isLiquidationView
            />
          </Box>
        </>
      )}

      {expenses.length > 0 && (
        <>
          <Box
            textAlign="center"
            display="flex"
            justifyContent="center"
            marginBottom={2}
          >
            <Typography level="title-lg" textAlign="center" marginBottom={2}>
              <FormattedMessage id={messages.expensesHeader.id} />
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" marginBottom={3}>
            <ExpensesTable
              expensesData={expenses}
              isExpenseModifiable={false}
              isLiquidationView
            />
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
          <Typography level="title-lg" textAlign="center" marginBottom={2}>
            <FormattedMessage id={messages.receiptsFileHeader.id} />:
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
      {/* CALCULATED TOTAL */}
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Box width="60%" display="flex" justifyContent="flex-end">
          <Typography level="h4">
            <FormattedMessage id={messages.estimatedTotal.id} />
            :&nbsp;
            <Typography color="success">
              <NumericFormat
                prefix={`${liquidationDetails?.requestDetails?.currency} `}
                displayType="text"
                value={liquidationDetails?.requestDetails?.estimatedTotal}
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
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Box width="60%" display="flex" justifyContent="flex-end">
          <Typography level="h4">
            <FormattedMessage id={messages.actualAmountSpent.id} />
            :&nbsp;
            <Typography color="success">
              <NumericFormat
                prefix={`${liquidationDetails?.requestDetails?.currency} `}
                displayType="text"
                value={liquidationDetails?.actualTotal}
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
            <FormattedMessage id={messages.requesterOwes.id} />
            :&nbsp;
            <Typography
              color={liquidationDetails?.result < 0 ? 'danger' : 'success'}
            >
              <NumericFormat
                prefix={`${liquidationDetails?.requestDetails?.currency} `}
                displayType="text"
                value={liquidationDetails?.result}
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

      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Box
          display="flex"
          justifyContent="center"
          marginBottom={2}
          width="40rem"
        >
          <Card
            variant="soft"
            color={liquidationDetails?.result < 0 ? 'danger' : 'success'}
          >
            <Typography
              level="title-lg"
              textColor="inherit"
              sx={{ textTransform: 'capitalize' }}
            >
              <FormattedMessage id={messages.decisionHeader.id} />:
            </Typography>
            <Typography
              level="title-md"
              textColor="inherit"
              sx={{ textTransform: 'capitalize' }}
            >
              {liquidationDetails?.result < 0 && (
                <>
                  <FormattedMessage id={messages.anAmountOf.id} />{' '}
                  {liquidationDetails?.requestDetails?.currency}{' '}
                  {Math.abs(liquidationDetails?.result)}{' '}
                  <FormattedMessage id={messages.mustBeHandedOver.id} />
                </>
              )}
              {liquidationDetails?.result >= 0 && (
                <>
                  <FormattedMessage id={messages.anAmountOf.id} />{' '}
                  {liquidationDetails?.requestDetails?.currency}{' '}
                  {liquidationDetails?.result}{' '}
                  <FormattedMessage
                    id={messages.mustBeRefundedToTheRequester.id}
                  />
                </>
              )}
            </Typography>
          </Card>
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
              color="warning"
              onClick={handleOnReturnRequestButtonClick}
            >
              <FormattedMessage id={messages.returnRequestButton.id} />
            </Button>
            {liquidationDetails?.latestStatus ===
              'Returned To Finance Department for missing Information' && (
              <Button
                variant="contained"
                color="success"
                onClick={handleOnConfirmByFMAfterReturnByTRButtonClick}
              >
                <FormattedMessage id={messages.confirmButton.id} />
              </Button>
            )}
            {liquidationDetails?.latestStatus !==
              'Returned To Finance Department for missing Information' && (
              <Button
                variant="contained"
                color="success"
                onClick={handleOnApproveRequestButtonClick}
              >
                {liquidationDetails?.latestStatus ===
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
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {modalHeader && <FormattedMessage id={messages[modalHeader].id} />}
        </DialogTitle>
        <DialogContent dividers>
          {modalHeader === 'statusHistory' ? (
            <Timeline>
              {liquidationDetails?.statusHistory?.map((sh, i, arr) => (
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
              {modalHeader === 'returnRequest' &&
                !deciderLevels?.includes('TR') && (
                  <>
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
              {liquidationDetails?.latestStatus ===
              "Pending Treasury's Validation" ? (
                <FormattedMessage id={messages.approveButton.id} />
              ) : (
                <FormattedMessage id={messages.signAndApproveButton.id} />
              )}
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

DecideOnLiquidationForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default DecideOnLiquidationForm;
