/**
 *
 * DecideOnAvanceVoyageForm
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Box } from '@mui/system';
import CustomizedTimeLine from 'components/CustomizedTimeLine';
import HistoryIcon from '@mui/icons-material/History';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PaymentsIcon from '@mui/icons-material/Payments';
import {
  Alert,
  Card,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemDecorator,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/joy';
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
import { Timeline } from '@mui/lab';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { makeSelectAvanceVoyageIdentity } from 'pages/DecideOnAvanceVoyage/selectors';
import { cleanupParentDecideOnAvanceVoyageStoreAction } from 'pages/DecideOnAvanceVoyage/actions';
import DisplayUserinfo from 'components/DisplayUserinfo';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  changePageContentAction,
  setOrdreMissionIdentityAction,
} from 'pages/DecideOnOrdreMission/actions';
import { setAvanceVoyageStatusAction } from 'containers/DecideOnAvanceVoyageTable/actions';
import { NumericFormat } from 'react-number-format';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAvanceVoyageDetails,
  makeSelectErrorDecidingOnAvanceVoyage,
  makeSelectErrorLoadingAvanceVoyageDetails,
} from './selectors';
import {
  cleanupDecideOnAvanceVoyageFormPageAction,
  decideOnAvanceVoyageAction,
  loadAvanceVoyageDetailsAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  avanceVoyageIdentity: makeSelectAvanceVoyageIdentity(),
  errorLoadingAvanceVoyageDetails: makeSelectErrorLoadingAvanceVoyageDetails(),
  errorDecidingOnAvanceVoyage: makeSelectErrorDecidingOnAvanceVoyage(),
  avanceVoyageDetails: makeSelectAvanceVoyageDetails(),
});

export function DecideOnAvanceVoyageForm({ state }) {
  useInjectReducer({ key: 'decideOnAvanceVoyageForm', reducer });
  useInjectSaga({ key: 'decideOnAvanceVoyageForm', saga });

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    isSideBarVisible,
    errorLoadingAvanceVoyageDetails,
    errorDecidingOnAvanceVoyage,
    avanceVoyageDetails,
    avanceVoyageIdentity,
  } = useSelector(mapStateToProps);

  // Control data
  const [deciderComment, setDeciderComment] = useState(null);
  const [decisionString, setDecisionString] = useState(null);
  const [methodOfDelivery, setMethodOfDelivery] = useState('CASH');

  // Control modal content
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalSevirity, setModalSevirity] = useState('');

  const readOnly = state === 'VIEW';

  const data = {
    requestId: avanceVoyageDetails !== null && avanceVoyageDetails?.id,
    deciderComment,
    decisionString,
    returnedToFMByTR: false,
    returnedToTRByFM: false,
    returnedToRequesterByTR: false,
  };

  // Load the data => object details
  useEffect(() => {
    dispatch(loadAvanceVoyageDetailsAction(avanceVoyageIdentity));
  }, []);

  // Decide
  useEffect(() => {
    if (decisionString !== null) {
      dispatch(decideOnAvanceVoyageAction(data));
    }
  }, [decisionString]);

  // Set request status for snakcbar message in table
  useEffect(() => {
    if (errorDecidingOnAvanceVoyage === false) {
      if (decisionString === 'aprrove')
        dispatch(setAvanceVoyageStatusAction('signed and approved'));
      if (decisionString === 'return')
        dispatch(setAvanceVoyageStatusAction('returned'));
      if (decisionString === 'reject')
        dispatch(setAvanceVoyageStatusAction('rejected'));

      dispatch(cleanupDecideOnAvanceVoyageFormPageAction());
      dispatch(cleanupParentDecideOnAvanceVoyageStoreAction());
    }
  }, [errorDecidingOnAvanceVoyage]);

  // Cleanup Store
  useEffect(
    () => () => {
      dispatch(cleanupDecideOnAvanceVoyageFormPageAction());
      dispatch(cleanupParentDecideOnAvanceVoyageStoreAction());
    },
    [],
  );

  const handleOnReturnButtonClick = () => {
    dispatch(cleanupDecideOnAvanceVoyageFormPageAction());
    dispatch(cleanupParentDecideOnAvanceVoyageStoreAction());
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

  // TR buttons
  const handleOnMarkFundsAsPreparedButtonClick = () => {
    setModalHeader('Mark funds as prepared?');
    setModalBody('Please choose method of delivery.');
    setModalSevirity('success');
    setModalVisibility(true);
  };

  const handleOnMethodOfDeliveryConfirmationButtonClick = () => {
    // setDecisionString('approve');
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

  const handleOnOrdreMissionLinkClick = () => {
    dispatch(
      setOrdreMissionIdentityAction(avanceVoyageDetails?.ordreMissionId),
    );
    dispatch(changePageContentAction('VIEW'));
    history.push('/decide-on-requests/decide-on-ordre-mission');
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
          Avance Voyage #{avanceVoyageDetails?.id}
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
        userData={avanceVoyageDetails?.requester}
        isActualRequester={false}
      />

      {/* ACTUAL REQUESTER INFO */}
      {avanceVoyageDetails?.onBehalf === true && (
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
          <DisplayUserinfo userData={avanceVoyageDetails?.actualRequester} />
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

      {localStorage.getItem('level') !== 'TR' && (
        <>
          <Box
            textAlign="center"
            display="flex"
            justifyContent="center"
            marginBottom={3}
          >
            <Alert severity="info">
              <Typography level="title-md" color="neutral">
                This Avance Voyage is Linked to
              </Typography>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                level="title-md"
                underline="always"
                onClick={() => handleOnOrdreMissionLinkClick()}
              >
                Ordre Mission #{avanceVoyageDetails?.ordreMissionId}&nbsp;
                <InsertLinkIcon fontSize="small" />
              </Link>
            </Alert>
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
        </>
      )}

      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Card
          variant="soft"
          color="neutral"
          sx={{ width: '50%', bgcolor: 'white', boxShadow: 'sm' }}
        >
          <CardContent>
            <Typography level="title-md">Description</Typography>
            <Typography level="body-md">
              {avanceVoyageDetails?.ordreMissionDescription}
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

      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Box width="60%" display="flex" justifyContent="flex-end">
          <Typography level="h4">
            Total {avanceVoyageDetails?.currency}:&nbsp;
            <Typography color="success">
              <NumericFormat
                displayType="text"
                value={avanceVoyageDetails?.estimatedTotal}
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
        {!readOnly && localStorage.getItem('level') !== 'TR' && (
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
        {localStorage.getItem('level') === 'TR' && (
          <Button
            variant="contained"
            color="success"
            onClick={handleOnMarkFundsAsPreparedButtonClick}
          >
            Mark funds as prepared
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
              {avanceVoyageDetails?.statusHistory?.map((sh, i, arr) => (
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
              {modalHeader === 'Mark funds as prepared?' && (
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
                        label="Cash"
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
                        label="Provision"
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
          {modalHeader === 'Mark funds as prepared?' && (
            <Button
              color="success"
              onClick={handleOnMethodOfDeliveryConfirmationButtonClick}
              variant="contained"
            >
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

DecideOnAvanceVoyageForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default DecideOnAvanceVoyageForm;
