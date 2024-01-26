// Trips.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import Typography from '@mui/joy/Typography';
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
} from '@mui/material';
import { Box } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import { makeSelectAbroad } from './selectors';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const mapStateToProps = createStructuredSelector({
  //   abroadSelection: makeSelectAbroad(),
});

const DisplayTrips = ({ tripData }) => {
  const departurePlace = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        From
      </Typography>
      &nbsp;{tripData.departurePlace}
    </Typography>
  );
  const destination = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        To
      </Typography>
      &nbsp;{tripData.destination}
    </Typography>
  );
  const departureDate = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        Depart On
      </Typography>
      &nbsp;{DateTimeFormater(tripData.departureDate)}
    </Typography>
  );
  const transportationMethod = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        With
      </Typography>
      &nbsp;{tripData.transportationMethod}
    </Typography>
  );
  const arrivalDate = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        Arrive On
      </Typography>
      &nbsp;{DateTimeFormater(tripData.arrivalDate)}
    </Typography>
  );
  const unit = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        Unit
      </Typography>
      &nbsp;{tripData.unit}
    </Typography>
  );
  const value = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        Amount
      </Typography>
      &nbsp;{tripData.value}
    </Typography>
  );
  const highwayFee = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        HighwayFee
      </Typography>
      &nbsp;{tripData.highwayFee}
    </Typography>
  );
  const estimatedFee = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        Total (estm.)
      </Typography>
      &nbsp;{tripData.estimatedFee}
    </Typography>
  );
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
