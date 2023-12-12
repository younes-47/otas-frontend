/**
 *
 * OrdreMissionForm
 *
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import saga from './saga';
import reducer from './reducer';
import makeSelectOrdreMissionForm from './selectors';

const mapStateToProps = createStructuredSelector({
  ordreMissionForm: makeSelectOrdreMissionForm(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function OrdreMissionForm() {
  useInjectReducer({ key: 'ordreMissionForm', reducer });
  useInjectSaga({ key: 'ordreMissionForm', saga });

  const { isSideBarVisible } = useSelector(mapStateToProps);
  const [trips, setTrips] = useState([]);

  const addTrip = () => {
    setTrips([
      ...trips,
      <>
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
            <DateTimePicker sx={{ maxWidth: 210 }} label="Departure Date" />
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
                required
              >
                <MenuItem value="MAD">MAD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="KM">KM</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField required id="outlined-required" label="Value" />
        </Box>
        <Box display="flex" justifyContent="center" gap={2} marginBottom={5}>
          <TextField required id="outlined-required" label="Highway Fee" />
          <TextField
            id="filled-read-only-input"
            label="Estimated Trip Fee"
            defaultValue="0.00 $"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
        </Box>
        <Box display="flex" justifyContent="center" flexDirection="row">
          <IconButton
            style={{ marginBottom: '100px' }}
            size="small"
            onClick={() => removeTrip(trips.length)}
          >
            <DeleteForeverIcon
              sx={{ color: 'red', fontSize: '40px' }}
            ></DeleteForeverIcon>
            <h4>Remove Trip</h4>
          </IconButton>
        </Box>
      </>,
    ]);
  };

  const removeTrip = (index) => {
    const updatedTrips = [...trips];
    updatedTrips.splice(index, 1);
    setTrips(updatedTrips);
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
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        overflow: 'auto',
      }}
    >
      {/* THE HEADER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <h1 style={{ fontSize: '30px' }}>Ordre Mission</h1>
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
      <Box justifyContent="center" textAlign="center" marginBottom={3}>
        <Box display="flex" justifyContent="center" gap={2} marginBottom={2}>
          <TextField
            id="outlined-basic"
            label="First Name"
            defaultValue="Placeholder"
            variant="filled"
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            defaultValue="Placeholder"
            variant="filled"
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Registration Number"
            defaultValue="Placeholder"
            variant="filled"
            disabled
          />
        </Box>
        <Box display="flex" justifyContent="center" gap={2} marginBottom={2}>
          <TextField
            id="outlined-basic"
            label="Job Title"
            defaultValue="Placeholder"
            variant="filled"
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Hiring Date"
            defaultValue="Placeholder"
            variant="filled"
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Department"
            defaultValue="Placeholder"
            variant="filled"
            disabled
          />
        </Box>
        <TextField
          id="outlined-basic"
          label="Manager"
          defaultValue="Placeholder"
          variant="filled"
          disabled
        />
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

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={3}
      >
        <TextField
          variant="outlined"
          multiline
          minRows={3}
          label="Description"
          required
          sx={{ width: '50%' }}
        />
      </Box>
      <Box textAlign="center">
        <FormLabel id="demo-row-radio-buttons-group-label">
          Is this mission abroad?
        </FormLabel>
      </Box>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No" />
      </RadioGroup>

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

      {/* TRIP */}
      <Box display="flex" justifyContent="center" gap={2} marginBottom={3}>
        <TextField
          id="input-with-icon-textfield"
          label="Departure"
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
          <DateTimePicker sx={{ maxWidth: 210 }} label="Departure Date" />
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
              required
            >
              <MenuItem value="MAD">MAD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="KM">KM</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField required id="outlined-required" label="Value" />
      </Box>
      <Box display="flex" justifyContent="center" gap={2} marginBottom={5}>
        <TextField required id="outlined-required" label="Highway Fee" />
        <TextField
          id="filled-read-only-input"
          label="Estimated Trip Fee"
          defaultValue="0.00 $"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </Box>

      {/* ADD TRIP BUTTON */}
      <Box display="flex" justifyContent="center" flexDirection="row">
        <IconButton
          style={{ marginBottom: '40px' }}
          size="small"
          onClick={addTrip}
        >
          <AddBoxIcon sx={{ color: 'green', fontSize: '50px' }}></AddBoxIcon>
          <h4>Add Trip</h4>
        </IconButton>
      </Box>
      {trips.map((trip, index) => (
        <Box key={index}>{trip}</Box>
      ))}
    </Box>
  );
}

OrdreMissionForm.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default OrdreMissionForm;
