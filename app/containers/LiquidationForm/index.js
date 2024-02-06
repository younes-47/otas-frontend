/**
 *
 * LiquidationForm
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { makeSelectLiquidationIdentity } from 'pages/Liquidation/selectors';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  Card,
  CardContent,
  List,
  ListDivider,
  ListItem,
  Option,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/joy';
import { Button, Divider } from '@mui/material';
import DisplayUserinfo from 'components/DisplayUserinfo';
import ExpensesToLiquidateTable from 'components/ExpensesToLiquidateTable';
import TripsToLiquidateTable from 'components/TripsToLiquidateTable';
import Expenses from 'containers/AvanceCaisseForm/Expenses';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  makeSelectAddLiquidation,
  makeSelectErrorLoadingLiquidationDetails,
  makeSelectErrorLoadingRequestsToLiquidate,
  makeSelectErrorSubmittingLiquidation,
  makeSelectErrorUpdatingLiquidation,
  makeSelectLiquidationDetails,
  makeSelectRequestToLiquidateDetails,
  makeSelectRequestTypeToLiquidate,
  makeSelectRequestsToLiquidate,
} from './selectors';
import {
  cleanupLiquidationFormPageStoreAction,
  loadRequestToLiquidateDetailsAction,
  loadRequestsToLiquidateAction,
  nullifyRequestToLiquidateDetailsAction,
  selectRequestTypeToLiquidateAction,
} from './actions';
import AdditionalTrips from './AdditionalTrips';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  errorAddingLiquidation: makeSelectAddLiquidation(),
  errorUpdatingLiquidation: makeSelectErrorUpdatingLiquidation(),
  errorSubmittingLiquidation: makeSelectErrorSubmittingLiquidation(),
  errorLoadingLiquidationDetails: makeSelectErrorLoadingLiquidationDetails(),
  liquidationDetails: makeSelectLiquidationDetails(),
  liquidationIdentity: makeSelectLiquidationIdentity(),
  requestTypeToLiquidate: makeSelectRequestTypeToLiquidate(),
  errorLoadingRequestsToLiquidate: makeSelectErrorLoadingRequestsToLiquidate(),
  requestsToLiquidate: makeSelectRequestsToLiquidate(),
  requestToLiquidateDetails: makeSelectRequestToLiquidateDetails(),
});

export function LiquidationForm({ state }) {
  useInjectReducer({ key: 'liquidationForm', reducer });
  useInjectSaga({ key: 'liquidationForm', saga });
  const dispatch = useDispatch();
  const {
    isSideBarVisible,
    errorAddingLiquidation,
    errorUpdatingLiquidation,
    errorSubmittingLiquidation,
    errorLoadingLiquidationDetails,
    liquidationDetails,
    liquidationIdentity,
    requestTypeToLiquidate,
    requestsToLiquidate,
    requestToLiquidateDetails,
  } = useSelector(mapStateToProps);
  const avanceVoyageLabel = (
    <Typography color="primary" level="title-lg">
      Avance Voyage
    </Typography>
  );
  const avanceCaisseLabel = (
    <Typography color="primary" level="title-lg">
      Avance Caisse
    </Typography>
  );

  const [selection, setSelection] = useState(null);
  const [counter, setCounter] = useState(0); // used for uniqueness of items (trips/expenses)
  const [newExpenses, setNewExpenses] = useState([]);
  const [newTrips, setNewTrips] = useState([]);
  const [expensesToLiquidate, setExpensesToLiquidate] = useState([]);
  const [tripsToLiquidate, setTripsToLiquidate] = useState([]);
  const [actualTotal, setActualTotal] = useState(0.0);
  const [receiptsFile, setReceiptsFile] = useState('');
  const [receiptsFileName, setReceiptsFileName] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);

  const avanceCaisseLiquidationData = {
    avanceCaisseId: requestToLiquidateDetails?.id,
    receiptsFile,
    expensesLiquidations: expensesToLiquidate,
    newExpenses,
  };

  const avanceVoyageLiquidationData = {
    avanceVoyageId: requestToLiquidateDetails?.id,
    receiptsFile,
    tripsLiquidations: tripsToLiquidate,
    expensesLiquidations: expensesToLiquidate,
    newExpenses,
    newTrips,
  };

  useEffect(() => {
    if (requestTypeToLiquidate !== null) {
      dispatch(loadRequestsToLiquidateAction(requestTypeToLiquidate));
    }
  }, [requestTypeToLiquidate]);

  // init trips and expenses to liquidate
  useEffect(() => {
    if (requestToLiquidateDetails !== null) {
      // Expenses
      requestToLiquidateDetails?.expenses?.forEach((expense) => {
        const toLiquidateExpense = {
          expenseId: expense.id,
          actualFee: 0.0,
        };
        setExpensesToLiquidate((prevExpenses) => [
          ...prevExpenses,
          toLiquidateExpense,
        ]);
      });

      // Trips
      if (
        requestToLiquidateDetails?.trips !== undefined &&
        requestToLiquidateDetails?.trips !== null
      ) {
        requestToLiquidateDetails?.trips?.forEach((trip) => {
          const toLiquidateTrip = {
            tripId: trip.id,
            actualFee: 0.0,
          };
          setTripsToLiquidate((prevTrips) => [...prevTrips, toLiquidateTrip]);
        });
      }
    }
  }, [requestToLiquidateDetails]);

  useEffect(() => {
    let newTotal = expensesToLiquidate.reduce(
      (total, expense) => total + expense.actualFee,
      0,
    );

    newTotal += tripsToLiquidate.reduce(
      (total, trip) => total + trip.actualFee,
      0,
    );

    newTotal += newTrips.reduce((total, trip) => {
      if (trip.unit === 'KM') {
        return total + trip.highwayFee + trip.value * 2.5;
      }
      return total + trip.highwayFee + trip.value;
    }, 0);

    newTotal += newExpenses.reduce(
      (total, expense) => total + expense.estimatedFee,
      0,
    );

    setActualTotal(newTotal);
  }, [expensesToLiquidate, tripsToLiquidate, newExpenses, newTrips]);

  useEffect(
    () => () => {
      dispatch(cleanupLiquidationFormPageStoreAction());
    },
    [],
  );

  // FUNCS TO UPDATE ACTUAL FEES
  const updateExpenseToLiquidate = (expenseId, actualFee) => {
    const expenseIndex = expensesToLiquidate.findIndex(
      (expense) => expense.expenseId === expenseId,
    );

    if (expenseIndex !== -1) {
      const oldTotal = expensesToLiquidate.reduce(
        (total, expense) => total + expense.actualFee,
        0,
      );
      setActualTotal((prevTotal) => prevTotal - oldTotal);

      setExpensesToLiquidate((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        updatedExpenses[expenseIndex] = {
          ...updatedExpenses[expenseIndex],
          actualFee,
        };
        return updatedExpenses;
      });

      const newTotal = expensesToLiquidate.reduce(
        (total, expense) => total + expense.actualFee,
        0,
      );

      setActualTotal((prevTotal) => prevTotal + newTotal);
    }
  };

  const updateTripsToLiquidate = (tripId, actualFee) => {
    const tripIndex = tripsToLiquidate.findIndex(
      (trip) => trip.tripId === tripId,
    );

    if (tripIndex !== -1) {
      setTripsToLiquidate((prevTrips) => {
        const updatedTrips = [...prevTrips];
        updatedTrips[tripIndex] = { ...updatedTrips[tripIndex], actualFee };
        return updatedTrips;
      });
    }
  };

  const getTripActualFee = (tripId) => {
    const trip = tripsToLiquidate.find((item) => item.id === tripId);
    return trip ? trip.actualFee : 0.0;
  };

  const getExpenseActualFee = (expenseId) => {
    const expense = expensesToLiquidate.find((item) => item.id === expenseId);
    return expense ? expense.actualFee : 0.0;
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

  // FUNCS FOR NEW DATA
  const removeExpense = (expenseId) => {
    const updatedExpenses = newExpenses.filter(
      (expense) => expense.id !== expenseId,
    );
    setNewExpenses(updatedExpenses);
  };

  const addExpense = () => {
    const newExpense = {
      id: counter,
      description: '',
      expenseDate: null,
      estimatedFee: 0.0,
    };
    setCounter((prevCount) => prevCount + 1);
    setNewExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const updateExpenseData = (expenseId, field, value) => {
    const expenseIndex = newExpenses.findIndex(
      (expense) => expense.id === expenseId,
    );

    if (expenseIndex !== -1) {
      setNewExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        updatedExpenses[expenseIndex] = {
          ...updatedExpenses[expenseIndex],
          [field]: value,
        };
        return updatedExpenses;
      });
    }
  };

  const addTrip = () => {
    const newTrip = {
      id: counter,
      departurePlace: '',
      destination: '',
      departureDate: null,
      arrivalDate: null,
      transportationMethod: '',
      unit: '',
      value: 0,
      highwayFee: 0,
    };
    setCounter((prevCount) => prevCount + 1);
    setNewTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const updateTripData = (tripId, field, value) => {
    const tripIndex = newTrips.findIndex((trip) => trip.id === tripId);

    if (
      field === 'transportationMethod' &&
      (value === 'Personal Vehicule' || value === "Company's Vehicule")
    ) {
      if (tripIndex !== -1) {
        setNewTrips((prevTrips) => {
          const updatedTrips = [...prevTrips];
          updatedTrips[tripIndex] = { ...updatedTrips[tripIndex], unit: 'KM' };
          return updatedTrips;
        });
      }
    }

    if (
      field === 'transportationMethod' &&
      value !== 'Personal Vehicule' &&
      value !== "Company's Vehicule"
    ) {
      if (tripIndex !== -1) {
        if (newTrips[tripIndex].unit === 'KM') {
          setNewTrips((prevTrips) => {
            const updatedTrips = [...prevTrips];
            updatedTrips[tripIndex] = {
              ...updatedTrips[tripIndex],
              unit: 'MAD',
            };
            return updatedTrips;
          });
        }
      }
    }

    if (tripIndex !== -1) {
      // Check if trip exists
      setNewTrips((prevTrips) => {
        const updatedTrips = [...prevTrips];
        updatedTrips[tripIndex] = {
          ...updatedTrips[tripIndex],
          [field]: value,
        };
        return updatedTrips;
      });
    }
  };

  const removeTrip = (tripId) => {
    const updatedTrips = newTrips.filter((trip) => trip.id !== tripId);
    setNewTrips(updatedTrips);
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Choose a request Type to liquidate */}
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          marginTop={2}
          marginBottom={3}
        >
          <Typography level="h2">
            Please choose a Request Type to liquidate:
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <RadioGroup
            overlay
            value={requestTypeToLiquidate}
            onChange={(event) =>
              dispatch(selectRequestTypeToLiquidateAction(event.target.value))
            }
          >
            <List
              component="div"
              variant="outlined"
              orientation="horizontal"
              sx={{
                borderRadius: 'sm',
                boxShadow: 'sm',
              }}
            >
              <React.Fragment key={0}>
                <ListItem>
                  <Radio id="AV" value="AV" label={avanceVoyageLabel} />
                </ListItem>
              </React.Fragment>
              <React.Fragment key={1}>
                <ListDivider />
                <ListItem>
                  <Radio id="AC" value="AC" label={avanceCaisseLabel} />
                </ListItem>
              </React.Fragment>
            </List>
          </RadioGroup>
        </Box>

        {/* select a request to liquidate */}
        {(requestTypeToLiquidate === 'AV' ||
          requestTypeToLiquidate === 'AC') && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
            marginTop={3}
            marginBottom={3}
          >
            <Typography level="title-lg">Please choose a Request:</Typography>
            <Select
              key={0}
              placeholder="Select Request to liquidate..."
              sx={{ width: '50%' }}
              slotProps={{
                listbox: {
                  placement: 'bottom-start',
                },
              }}
              size="lg"
              onChange={(e) => setSelection(e?.target?.value)}
            >
              {requestsToLiquidate?.map((req) => (
                <Option
                  key={req.id}
                  value={req.id}
                  onClick={() => {
                    dispatch(
                      loadRequestToLiquidateDetailsAction(
                        req.id,
                        requestTypeToLiquidate,
                      ),
                    );
                  }}
                >
                  #{req.id}&nbsp;-&nbsp;{req.description}
                </Option>
              ))}
            </Select>
          </Box>
        )}

        {/* Load details request details to liquidate */}
        {requestToLiquidateDetails !== null &&
          selection !== undefined &&
          selection !== null && (
            <Box marginBottom={20}>
              {/* DIVIDER */}
              <Box
                display="flex"
                justifyContent="center"
                textAlign="center"
                marginBottom={3}
              >
                <Divider style={{ width: '60%', opacity: 0.7 }} />
              </Box>
              {/* THE HEADER */}
              <Typography level="title-lg" textAlign="center">
                {`Liquidating ${
                  requestTypeToLiquidate === 'AC'
                    ? 'Avance Caisse'
                    : 'Avance Voyage'
                } #${requestToLiquidateDetails?.id}`}
              </Typography>
              {/* ACTUAL REQUESTER INFO INFO */}
              {requestToLiquidateDetails?.onBehalf === true && (
                <DisplayUserinfo
                  userData={requestToLiquidateDetails?.actualRequester}
                />
              )}
              {/* CURRENCY */}
              <Box
                textAlign="center"
                display="flex"
                justifyContent="center"
                marginTop={1}
                marginBottom={3}
              >
                <Typography color="success" level="title-sm" display="flex">
                  This Request&apos;s currency is set to be:&nbsp;
                  <Box sx={{ fontWeight: 'bold' }}>
                    {requestToLiquidateDetails?.currency}
                  </Box>
                </Typography>
              </Box>
              {/* DESCRIPTION */}
              <Box display="flex" justifyContent="center" marginBottom={3}>
                <Card
                  variant="soft"
                  color="neutral"
                  sx={{ width: '50%', bgcolor: 'white', boxShadow: 'sm' }}
                >
                  <CardContent>
                    <Typography level="title-md">Description</Typography>
                    <Typography level="body-md">
                      {requestToLiquidateDetails?.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              {/* Trips */}
              {requestTypeToLiquidate === 'AV' && (
                <>
                  <Typography
                    level="title-lg"
                    textAlign="center"
                    marginBottom={2}
                  >
                    Trajectories
                  </Typography>
                  <Box display="flex" justifyContent="center" marginBottom={5}>
                    <TripsToLiquidateTable
                      tripsData={requestToLiquidateDetails?.trips}
                      updateTripsToLiquidate={updateTripsToLiquidate}
                      getActualFee={getTripActualFee}
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    marginBottom={2}
                  >
                    <Typography
                      level="title-md"
                      textAlign="center"
                      marginBottom={2}
                    >
                      Made additional trajectories? (optional)
                      <IconButton onClick={addTrip}>
                        <AddCircleIcon
                          sx={{ color: 'green' }}
                          fontSize="10px"
                        />
                      </IconButton>
                    </Typography>
                  </Box>
                  {newTrips.map((trip, index) => (
                    <div key={trip.id}>
                      <AdditionalTrips
                        key={trip.id}
                        tripData={trip}
                        updateTripData={updateTripData}
                        isTripRequired={false}
                        isTripModifiabale
                        removeTrip={removeTrip}
                        isRequestAbroad={
                          requestToLiquidateDetails?.currency === 'EUR'
                        }
                      />
                    </div>
                  ))}
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

              {/* Expenses */}
              <Typography level="title-lg" textAlign="center" marginBottom={2}>
                Expenses
              </Typography>
              <Box display="flex" justifyContent="center" marginBottom={3}>
                <ExpensesToLiquidateTable
                  expensesData={requestToLiquidateDetails?.expenses}
                  updateExpenseToLiquidate={updateExpenseToLiquidate}
                  getActualFee={getExpenseActualFee}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                textAlign="center"
                marginBottom={2}
              >
                <Typography
                  level="title-md"
                  textAlign="center"
                  marginBottom={2}
                >
                  Spent additional expenses? (optional)
                  <IconButton onClick={addExpense}>
                    <AddCircleIcon
                      sx={{ color: 'chocolate' }}
                      fontSize="10px"
                    />
                  </IconButton>
                </Typography>
              </Box>
              {newExpenses.map((expense) => (
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
                      isExpenseRequired={false}
                      isExpenseModifiabale
                    />
                  </div>
                </Box>
              ))}

              {/* DIVIDER */}
              <Box
                display="flex"
                justifyContent="center"
                textAlign="center"
                marginBottom={3}
              >
                <Divider style={{ width: '60%', opacity: 0.7 }} />
              </Box>

              {/* RECEIPTS FILE */}
              <Typography level="title-lg" textAlign="center" marginBottom={2}>
                Your Receipts
              </Typography>
              <Box display="flex" justifyContent="center" marginBottom={3}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  width="40rem"
                >
                  <Typography level="body-sm" color="danger">
                    Please upload your receipts in a single pdf file*
                  </Typography>
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
                    <Typography level="title-sm" color="neutral">
                      Selected file: {receiptsFileName}
                    </Typography>
                  )}
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
                    Estimated Total:&nbsp;
                    <Typography color="success">
                      <NumericFormat
                        prefix={`${requestToLiquidateDetails?.currency} `}
                        displayType="text"
                        value={requestToLiquidateDetails?.estimatedTotal}
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
                    </Typography>
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" marginBottom={3}>
                <Box width="60%" display="flex" justifyContent="flex-end">
                  <Typography level="h4">
                    Actual Amount Spent:&nbsp;
                    <Typography color="success">
                      <NumericFormat
                        prefix={`${requestToLiquidateDetails?.currency} `}
                        displayType="text"
                        value={actualTotal}
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
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
      </LocalizationProvider>
    </Box>
  );
}

LiquidationForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default LiquidationForm;
