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
import { makeSelectAbroad } from './selectors';
import { SelectTransportationMethodAction } from './actions';
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
  const TransportationMethods = [
    'Train',
    'Plane',
    'Taxi',
    'Bus',
    'Tram/Metro',
    'Personal Vehicule',
    "Company's Vehicule",
  ];
  const [calculatedTripFee, setCalculatedTripFee] = useState(
    parseFloat(value) + parseFloat(highwayFee),
  );
  const { abroadSelection } = useSelector(mapStateToProps);
  const handleOnTransportationMethodChange = (e) => {
    updateTripData(id, 'transportationMethod', e.target.value);
    // update data
  };
  const handleOnValueChange = (e) => {
    updateTripData(id, 'value', e.target.value);
    // setCalculatedTripFee((prevCalculatedTripFee) =>
    //   unit === 'KM'
    //     ? prevCalculatedTripFee + parseFloat(value) * 2.5
    //     : prevCalculatedTripFee + parseFloat(value),
    // );
    //   unit === 'KM'
    //     ? setCalculatedTripFee(parseFloat(value) * 2.5 + parseFloat(highwayFee))
    //     : setCalculatedTripFee(parseFloat(value) + parseFloat(highwayFee));
  };
  useEffect(() => {
    if (unit === 'KM') {
      setCalculatedTripFee(parseFloat(value) * 2.5 + parseFloat(highwayFee));
    } else {
      setCalculatedTripFee(parseFloat(value) + parseFloat(highwayFee));
    }
  }, [unit, value, highwayFee]);

  const handleOnHighwayFeeChange = (e) => {
    updateTripData(id, 'highwayFee', e.target.value);
  };
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

        <Box sx={{ minWidth: 210 }}>
          <FormControl fullWidth>
            <InputLabel required id="demo-simple-select-label">
              Transportation Method
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Transportation Method"
              value={transportationMethod}
              onChange={handleOnTransportationMethodChange}
              required
            >
              {TransportationMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
              {/* <MenuItem value="Train">Train</MenuItem>
              <MenuItem value="Plane">Plane</MenuItem>
              <MenuItem value="Taxi">Taxi</MenuItem>
              <MenuItem value="Bus">Bus</MenuItem>
              <MenuItem value="Tram/Metro">Tram/Metro</MenuItem>
              <MenuItem value="Personal Vehicule">Personal Vehicule</MenuItem>
              <MenuItem value="Company's Vehicule">
                Company&#39;s Vehicule
              </MenuItem> */}
            </Select>
          </FormControl>
        </Box>
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
              {transportationMethod === TransportationMethods[5] ||
              transportationMethod === TransportationMethods[6] ? (
                <MenuItem value="KM">KM</MenuItem>
              ) : (
                <MenuItem value="MAD">MAD</MenuItem>
              )}
              {/* <MenuItem value="MAD">MAD</MenuItem> */}
              {String(abroadSelection) === 'true' &&
                transportationMethod !== TransportationMethods[5] &&
                transportationMethod !== TransportationMethods[6] && (
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
            onChange={handleOnValueChange}
          />
          <FormHelperText>Number of KM or Fee amount</FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="center" gap={2} marginBottom={5}>
        <TextField
          required
          type="number"
          // id={
          //   transportationMethod !== transportationMethod[5] ||
          //   transportationMethod !== transportationMethod[6]
          //     ? 'filled-disabled'
          //     : 'outlined-required'
          // }
          id="outlined-disabled"
          label="Highway Fee"
          value={highwayFee}
          onChange={handleOnHighwayFeeChange}
        />
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
      {/* <Box display="flex" justifyContent="center" flexDirection="row">
        <IconButton
          style={{ marginBottom: '40px' }}
          size="small"
          onClick={() => removeTrip(id)}
        >
          <DeleteForeverIcon
            sx={{ color: 'red', fontSize: '40px' }}
          ></DeleteForeverIcon>
          <h4>Remove Trip</h4>
        </IconButton>
      </Box> */}
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
