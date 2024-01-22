// Trips.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { makeSelectAbroad } from './selectors';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const mapStateToProps = createStructuredSelector({
  //   abroadSelection: makeSelectAbroad(),
});

const DisplayTrips = ({ tripData }) => {
  const departurePlace = `From: ${tripData.departurePlace}`;
  const destination = `To: ${tripData.destination}`;
  const departureDate = `Depart On: ${tripData.departureDate}`;
  const transportationMethod = `With: ${tripData.transportationMethod}`;
  const arrivalDate = `Arrive On: ${tripData.arrivalDate}`;
  const unit = `Unit: ${tripData.unit}`;
  const value = `Amount: ${tripData.value}`;
  const highwayFee = `HighwayFee: ${tripData.highwayFee}`;
  const estimatedFee = `Total (estm.): ${tripData.estimatedFee}`;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AirlineStopsIcon />
        </ListItemIcon>
        <ListItemText primary="Trjectory" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          <ListItemText primary={departurePlace} />
          <ListItemText primary={destination} />
          <ListItemText primary={departureDate} />
          <ListItemText primary={transportationMethod} />
          <ListItemText primary={arrivalDate} />
          <ListItemText primary={unit} />
          <ListItemText primary={value} />
          <ListItemText primary={highwayFee} />
          <ListItemText primary={estimatedFee} />
        </List>
      </Collapse>
    </>
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
