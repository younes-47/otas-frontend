// Trips.js
import React from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Divider,
  FormControl,
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
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Trips = ({ tripData, updateTripData }) => {
  const {
    id,
    departure,
    destination,
    departureDate,
    transportationMethod,
    unit,
    value,
    highwayFee,
    estimatedTripFee,
  } = tripData;

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
          value={departure}
          onChange={(e) => updateTripData(id, 'departure', e.target.value)}
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
              console.log(e);
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
              onChange={(e) =>
                updateTripData(id, 'transportationMethod', e.target.value)
              }
              required
            >
              <MenuItem value="Train">Train</MenuItem>
              <MenuItem value="Plane">Plane</MenuItem>
              <MenuItem value="Taxi">Taxi</MenuItem>
              <MenuItem value="Bus">Bus</MenuItem>
              <MenuItem value="Tram/Metro">Tram/Metro</MenuItem>
              <MenuItem value="Personal Vehicule">Personal Vehicule</MenuItem>
              <MenuItem value="Company's Vehicule">
                Company&#39;s Vehicule
              </MenuItem>
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
              <MenuItem value="MAD">MAD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="KM">KM</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          required
          id="outlined-required"
          type="number"
          label="Value"
          value={value}
          onChange={(e) => updateTripData(id, 'value', e.target.value)}
        />
      </Box>
      <Box display="flex" justifyContent="center" gap={2} marginBottom={5}>
        <TextField
          required
          type="number"
          id="outlined-required"
          label="Highway Fee"
          value={highwayFee}
          onChange={(e) => updateTripData(id, 'highwayFee', e.target.value)}
        />
        <TextField
          id="filled-read-only-input"
          label="Estimated Trip Fee"
          value={estimatedTripFee}
          onChange={(e) =>
            updateTripData(id, 'estimatedTripFee', e.target.value)
          }
          // defaultValue="0.00 $"
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
