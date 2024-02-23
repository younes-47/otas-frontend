// Trips.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { FormatNumber } from 'utils/Custom/stringManipulation';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { makeSelectAbroad } from './selectors';
import messages from './messages';
const mapStateToProps = createStructuredSelector({
  abroadSelection: makeSelectAbroad(),
});

const Trips = ({
  tripData,
  updateTripData,
  isTripRequired,
  removeTrip,
  isTripModifiabale = true,
}) => {
  const {
    id,
    departurePlace,
    destination,
    departureDate,
    arrivalDate,
    transportationMethod,
    unit,
    value,
    highwayFee,
  } = tripData;
  const transportationMethodOptions = [
    'Train',
    'Plane',
    'Boat',
    'Taxi',
    'Autocar',
    'TGV',
    'Personal Vehicule',
    "Company's Vehicule",
  ];
  const [calculatedTripFee, setCalculatedTripFee] = useState(
    parseFloat(value) + parseFloat(highwayFee),
  );
  const { abroadSelection } = useSelector(mapStateToProps);

  const handleTripDates = (tripId, type, e) => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
    const noOffsetDate = new Date(e.$d - tzoffset).toISOString().slice(0, -1);
    updateTripData(tripId, type, noOffsetDate);
  };

  useEffect(() => {
    if (unit === 'KM') {
      setCalculatedTripFee(parseFloat(value) * 2.5 + parseFloat(highwayFee));
    } else {
      setCalculatedTripFee(parseFloat(value) + parseFloat(highwayFee));
    }
  }, [unit, value, highwayFee]);

  const intl = useIntl();

  return (
    <Box key={id} marginRight={3} marginLeft={3} marginBottom={2}>
      <Box display="flex" justifyContent="center" gap={0.8}>
        <TextField
          variant={isTripModifiabale ? 'outlined' : 'filled'}
          id="input-with-icon-textfield"
          label={intl.formatMessage({ id: messages.tripDeparture.id })}
          value={departurePlace}
          onChange={(e) => updateTripData(id, 'departurePlace', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
            readOnly: !isTripModifiabale,
          }}
          sx={{ minWidth: 160, maxWidth: 160 }}
          required
        />

        <TextField
          id="input-with-icon-textfield"
          label={intl.formatMessage({ id: messages.tripDestination.id })}
          value={destination}
          onChange={(e) => updateTripData(id, 'destination', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
            readOnly: !isTripModifiabale,
          }}
          sx={{ minWidth: 160, maxWidth: 160 }}
          variant={isTripModifiabale ? 'outlined' : 'filled'}
          required
        />

        <DateTimePicker
          readOnly={!isTripModifiabale}
          variant={isTripModifiabale ? 'outlined' : 'filled'}
          sx={{ minWidth: 160, maxWidth: 160 }}
          label={intl.formatMessage({ id: messages.tripDepartureDate.id })}
          value={departureDate === null ? departureDate : dayjs(departureDate)}
          onChange={(e) => {
            handleTripDates(id, 'departureDate', e);
          }}
          disablePast={isTripModifiabale}
          format="DD/MM/YYYY HH:mm"
          fontSize={2}
        />

        <DateTimePicker
          readOnly={!isTripModifiabale}
          variant={isTripModifiabale ? 'outlined' : 'filled'}
          sx={{ minWidth: 160, maxWidth: 160 }}
          label={intl.formatMessage({ id: messages.tripArrivalDate.id })}
          value={arrivalDate === null ? arrivalDate : dayjs(arrivalDate)}
          onChange={(e) => {
            handleTripDates(id, 'arrivalDate', e);
          }}
          disablePast={isTripModifiabale}
          format="DD/MM/YYYY"
        />

        <Box sx={{ minWidth: 160, maxWidth: 160 }}>
          <FormControl fullWidth>
            <InputLabel required id="demo-simple-select-label">
              <FormattedMessage id={messages.tripTransportation.id} />
            </InputLabel>
            <Select
              inputProps={{ readOnly: !isTripModifiabale }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={intl.formatMessage({ id: messages.tripTransportation.id })}
              value={transportationMethod}
              onChange={(e) =>
                updateTripData(id, 'transportationMethod', e.target.value)
              }
              required
              variant={isTripModifiabale ? 'outlined' : 'filled'}
            >
              {Object.values(transportationMethodOptions).map(
                (transportationMethodOption) => (
                  <MenuItem
                    key={transportationMethodOption}
                    value={transportationMethodOption}
                  >
                    {transportationMethodOption}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ maxWidth: 90, minWidth: 90 }}>
          <FormControl fullWidth>
            <InputLabel required id="demo-simple-select-label">
              <FormattedMessage id={messages.tripUnit.id} />
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={intl.formatMessage({ id: messages.tripUnit.id })}
              value={unit}
              onChange={(e) => updateTripData(id, 'unit', e.target.value)}
              required
              disabled={
                transportationMethodOptions.indexOf(transportationMethod) === -1
              }
              variant={
                transportationMethodOptions.indexOf(transportationMethod) ===
                  -1 || !isTripModifiabale
                  ? 'filled'
                  : 'outlined'
              }
              inputProps={{
                readOnly: !isTripModifiabale,
              }}
            >
              {transportationMethod === transportationMethodOptions[6] ||
              transportationMethod === transportationMethodOptions[7] ? (
                <MenuItem value="KM">KM</MenuItem>
              ) : (
                <MenuItem value="MAD">MAD</MenuItem>
              )}
              {String(abroadSelection) === 'true' &&
                transportationMethod !== transportationMethodOptions[6] &&
                transportationMethod !== transportationMethodOptions[7] && (
                  <MenuItem value="EUR">EUR</MenuItem>
                )}
            </Select>
          </FormControl>
        </Box>

        <NumericFormat
          required-
          label={
            unit === 'KM'
              ? intl.formatMessage({ id: messages.tripMileage.id })
              : intl.formatMessage({ id: messages.tripFee.id })
          }
          value={value}
          sx={{ maxWidth: 90, minWidth: 90 }}
          variant={
            (unit !== 'KM' && unit !== 'MAD' && unit !== 'EUR') ||
            !isTripModifiabale
              ? 'filled'
              : 'outlined'
          }
          disabled={unit !== 'KM' && unit !== 'MAD' && unit !== 'EUR'}
          inputProps={{
            readOnly: !isTripModifiabale,
          }}
          onValueChange={(values, sourceInfo) => {
            if (values.value === '') {
              updateTripData(id, 'value', 0);
            } else {
              updateTripData(id, 'value', values.floatValue);
            }
          }}
          fixedDecimalScale
          decimalScale={2}
          customInput={TextField}
          defaultValue="0"
          allowNegative={false}
          thousandSeparator={
            localStorage.getItem('preferredLanguage') === 'en' ? ',' : ' '
          }
          decimalSeparator={
            localStorage.getItem('preferredLanguage') === 'en' ? '.' : ','
          }
        />

        {transportationMethod === transportationMethodOptions[6] ||
        transportationMethod === transportationMethodOptions[7] ? (
          <NumericFormat
            required
            id={
              transportationMethod === transportationMethodOptions[6] ||
              transportationMethod === transportationMethodOptions[7]
                ? 'outlined-required'
                : 'filled-disabled'
            }
            label={intl.formatMessage({ id: messages.tripHighwayFee.id })}
            value={highwayFee}
            sx={{ maxWidth: 90, minWidth: 90 }}
            variant={!isTripModifiabale ? 'filled' : undefined}
            inputProps={{
              readOnly: !isTripModifiabale,
            }}
            onValueChange={(values, sourceInfo) => {
              if (values.value === '') {
                updateTripData(id, 'highwayFee', 0);
              } else {
                updateTripData(id, 'highwayFee', values.floatValue);
              }
            }}
            fixedDecimalScale
            decimalScale={2}
            customInput={TextField}
            defaultValue="0"
            allowNegative={false}
            thousandSeparator={
              localStorage.getItem('preferredLanguage') === 'en' ? ',' : ' '
            }
            decimalSeparator={
              localStorage.getItem('preferredLanguage') === 'en' ? '.' : ','
            }
          />
        ) : (
          <NumericFormat
            required
            disabled
            label={intl.formatMessage({ id: messages.tripHighwayFee.id })}
            value={highwayFee}
            sx={{ maxWidth: 90, minWidth: 90 }}
            variant="filled"
            onValueChange={(values, sourceInfo) => {
              if (values.value === '') {
                updateTripData(id, 'highwayFee', 0);
              } else {
                updateTripData(id, 'highwayFee', values.floatValue);
              }
            }}
            fixedDecimalScale
            decimalScale={2}
            customInput={TextField}
            defaultValue="0"
            allowNegative={false}
            thousandSeparator={
              localStorage.getItem('preferredLanguage') === 'en' ? ',' : ' '
            }
            decimalSeparator={
              localStorage.getItem('preferredLanguage') === 'en' ? '.' : ','
            }
          />
        )}

        <TextField
          sx={{ maxWidth: 90, minWidth: 90 }}
          id="filled-read-only-input"
          label={intl.formatMessage({ id: messages.tripTotal.id })}
          value={FormatNumber(calculatedTripFee)}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          color="success"
          focused
        />

        {isTripRequired || !isTripModifiabale ? (
          <IconButton sx={{ fontSize: '10px' }} disableRipple>
            <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
          </IconButton>
        ) : (
          <IconButton onClick={() => removeTrip(id)}>
            <HighlightOffIcon
              sx={{ color: 'red', fontSize: '25px' }}
            ></HighlightOffIcon>
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

Trips.propTypes = {
  tripData: PropTypes.object.isRequired,
  updateTripData: PropTypes.func.isRequired,
  isTripRequired: PropTypes.bool.isRequired,
  removeTrip: PropTypes.func.isRequired,
  isTripModifiabale: PropTypes.bool,
};
export default Trips;
