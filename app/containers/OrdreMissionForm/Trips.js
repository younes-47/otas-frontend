// Trips.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {
  FormControl,
  IconButton,
  // IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { makeSelectAbroad } from './selectors';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
  // if (id === 0) {
  //   updateTripData(id, 'departureDate', '2025-01-19T00:00:00.000Z');
  //   updateTripData(id, 'arrivalDate', '2025-01-20T00:00:00.000Z');
  // } else {
  //   updateTripData(id, 'departureDate', '2025-01-21T00:00:00.000Z');
  //   updateTripData(id, 'arrivalDate', '2025-01-23T00:00:00.000Z');
  // }
  return (
    <Box key={id} marginRight={3} marginLeft={3} marginBottom={2}>
      <Box display="flex" justifyContent="center" gap={0.8}>
        <TextField
          variant={isTripModifiabale ? 'outlined' : 'filled'}
          id="input-with-icon-textfield"
          label="Departure"
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
          label="Destination"
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
          label="Departure Date"
          value={departureDate}
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
          label="Arrival"
          value={arrivalDate}
          onChange={(e) => {
            handleTripDates(id, 'arrivalDate', e);
          }}
          disablePast={isTripModifiabale}
          format="DD/MM/YYYY"
        />

        <Box sx={{ minWidth: 160, maxWidth: 160 }}>
          <FormControl fullWidth>
            <InputLabel required id="demo-simple-select-label">
              Transportation
            </InputLabel>
            <Select
              inputProps={{ readOnly: !isTripModifiabale }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Transportation"
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
        {/* <DropDownMenu
          sx={{ width: 80 }}
          label="Transportation"
          dataArray={transportationMethodOptions}
          selectedMenuItem={transportationMethod}
          onSelectedMenuItemChange={(e) =>
            updateTripData(id, 'transportationMethod', e.target.value)
          }
        /> */}
        <Box sx={{ maxWidth: 90, minWidth: 90 }}>
          <FormControl fullWidth>
            <InputLabel required id="demo-simple-select-label">
              Unit
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Unit"
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

        <TextField
          required
          id="outlined-required"
          type="number"
          label={unit === 'KM' ? 'Mileage' : 'Fee'}
          value={value}
          onChange={(e) => updateTripData(id, 'value', e.target.value)}
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
        />

        {transportationMethod === transportationMethodOptions[6] ||
        transportationMethod === transportationMethodOptions[7] ? (
          <TextField
            required
            type="number"
            id={
              transportationMethod === transportationMethodOptions[6] ||
              transportationMethod === transportationMethodOptions[7]
                ? 'outlined-required'
                : 'filled-disabled'
            }
            label="Highway"
            value={highwayFee}
            onChange={(e) => updateTripData(id, 'highwayFee', e.target.value)}
            sx={{ maxWidth: 90, minWidth: 90 }}
            variant={!isTripModifiabale ? 'filled' : undefined}
            inputProps={{
              readOnly: !isTripModifiabale,
            }}
          />
        ) : (
          <TextField
            required
            disabled
            type="number"
            id="filled-disabled"
            label="Highway"
            value={highwayFee}
            onChange={(e) => updateTripData(id, 'highwayFee', e.target.value)}
            sx={{ maxWidth: 90, minWidth: 90 }}
            variant="filled"
          />
        )}

        <TextField
          sx={{ maxWidth: 90, minWidth: 90 }}
          id="filled-read-only-input"
          label="Total"
          value={
            // unit === 'EUR'
            //   ? `EUR ${calculatedTripFee}`
            //   : `MAD ${calculatedTripFee}`
            calculatedTripFee
          }
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
  // removeTrip: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
};
export default Trips;
