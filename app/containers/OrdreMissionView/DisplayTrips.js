// Trips.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { makeSelectAbroad } from './selectors';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const mapStateToProps = createStructuredSelector({
  //   abroadSelection: makeSelectAbroad(),
});

const DisplayTrips = ({ tripData }) => {
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

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        width: '100%',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
      }}
      marginBottom={3}
      gap={3}
    >
      <Accordion defaultExpanded sx={{ width: '60%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            variant="h6"
            sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}
          >
            Trips
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="overline">From</Typography>
            <Box
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#101010' : '#fff',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {tripData.departurePlace}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">To</Typography>
            <Box
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#101010' : '#fff',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {tripData.destination}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">Depart On</Typography>
            <Box
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#101010' : '#fff',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {tripData.departureDate}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">Arrive On</Typography>
            <Box
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#101010' : '#fff',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {tripData.arrivalDate}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">With</Typography>
            <Box
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#101010' : '#fff',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {tripData.departureDate}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">Highway Fee</Typography>
            <Box
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#101010' : '#fff',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {tripData.highwayFee}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">Estimated Fee</Typography>
            <Box
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#101010' : '#fff',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {tripData.estimatedFee}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

DisplayTrips.propTypes = {
  tripData: PropTypes.object.isRequired,
  // updateTripData: PropTypes.func.isRequired,
  // isTripRequired: PropTypes.bool.isRequired,
  // removeTrip: PropTypes.func.isRequired,
  // removeTrip: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
};
export default DisplayTrips;
