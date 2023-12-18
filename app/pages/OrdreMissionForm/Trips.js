// Trips.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Divider,
  FormControl,
  FormHelperText,
  // IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import DropDownMenu from 'components/DropDownMenu';
import { makeSelectAbroad } from './selectors';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const mapStateToProps = createStructuredSelector({
  abroadSelection: makeSelectAbroad(),
});

const Trips = ({ tripData, updateTripData }) => {
  const {
    id,
    departurePlace,
    destination,
    departureDate,
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
  useEffect(() => {
    if (unit === 'KM') {
      setCalculatedTripFee(parseFloat(value) * 2.5 + parseFloat(highwayFee));
    } else {
      setCalculatedTripFee(parseFloat(value) + parseFloat(highwayFee));
    }
  }, [unit, value, highwayFee]);

  return (
    <Box key={id}>
      {/* DIVIDER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={1}
      >
        <Divider style={{ width: '60%', opacity: 0.7 }} />
      </Box>

      {/* Trip Header */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <h1 style={{ fontSize: '25px' }}>Trip</h1>
      </Box>
      <Box display="flex" justifyContent="center" gap={2} marginBottom={3}>
        <TextField
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
          }}
          variant="standard"
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
          }}
          variant="standard"
          required
        />
      </Box>
      <Box display="flex" justifyContent="center" gap={2} marginBottom={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            sx={{ maxWidth: 210 }}
            label="Departure Date"
            value={departureDate}
            onChange={(e) => {
              updateTripData(id, 'departureDate', e.$d);
            }}
          />
        </LocalizationProvider>
        <DropDownMenu
          label="Transportation Method"
          dataArray={transportationMethodOptions}
          selectedMenuItem={transportationMethod}
          onSelectedMenuItemChange={(e) =>
            updateTripData(id, 'transportationMethod', e.target.value)
          }
        />
      </Box>
      <Box display="flex" justifyContent="center" gap={2} marginBottom={3}>
        <Box sx={{ minWidth: 210 }}>
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
            >
              {transportationMethod === transportationMethodOptions[6] ||
              transportationMethod === transportationMethodOptions[7] ? (
                <MenuItem value="KM">KM</MenuItem>
              ) : (
                <MenuItem value="MAD">MAD</MenuItem>
              )}
              {/* <MenuItem value="MAD">MAD</MenuItem> */}
              {String(abroadSelection) === 'true' &&
                transportationMethod !== transportationMethodOptions[6] &&
                transportationMethod !== transportationMethodOptions[7] && (
                  <MenuItem value="EUR">EUR</MenuItem>
                )}
            </Select>
          </FormControl>
        </Box>
        <FormControl>
          <TextField
            required
            id="outlined-required"
            type="number"
            label="Value"
            value={value}
            onChange={(e) => updateTripData(id, 'value', e.target.value)}
          />
          <FormHelperText>Number of KM or Fee amount</FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="center" gap={2} marginBottom={5}>
        {transportationMethod === transportationMethodOptions[6] ||
        transportationMethod === transportationMethodOptions[7] ? (
          <TextField
            required
            type="number"
            id="outlined-required"
            label="Highway Fee"
            value={highwayFee}
            onChange={(e) => updateTripData(id, 'highwayFee', e.target.value)}
          />
        ) : (
          <TextField
            required
            disabled
            type="number"
            id="filled-disabled"
            label="Highway Fee"
            value={highwayFee}
            onChange={(e) => updateTripData(id, 'highwayFee', e.target.value)}
            variant="filled"
          />
        )}
        <TextField
          id="filled-read-only-input"
          label="Estimated Trip Fee"
          value={
            unit === 'EUR'
              ? `EUR ${calculatedTripFee}`
              : `MAD ${calculatedTripFee}`
          }
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </Box>
    </Box>
  );
};

Trips.propTypes = {
  tripData: PropTypes.object.isRequired,
  updateTripData: PropTypes.func.isRequired,
  // removeTrip: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
};
export default Trips;
