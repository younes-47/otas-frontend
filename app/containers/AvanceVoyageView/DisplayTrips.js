// Trips.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import Typography from '@mui/joy/Typography';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createStructuredSelector } from 'reselect';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import { NumericFormat } from 'react-number-format';
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
      &nbsp;
      <NumericFormat
        displayType="text"
        value={tripData.value}
        fixedDecimalScale
        decimalScale={2}
        defaultValue="0"
        allowNegative={false}
        thousandSeparator={
          localStorage.getItem('preferredLanguage') === 'en' ? ',' : ' '
        }
        decimalSeparator={
          localStorage.getItem('preferredLanguage') === 'en' ? '.' : ','
        }
      />
    </Typography>
  );
  const highwayFee = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        HighwayFee
      </Typography>
      &nbsp;
      <NumericFormat
        displayType="text"
        value={tripData.highwayFee}
        fixedDecimalScale
        decimalScale={2}
        defaultValue="0"
        allowNegative={false}
        thousandSeparator={
          localStorage.getItem('preferredLanguage') === 'en' ? ',' : ' '
        }
        decimalSeparator={
          localStorage.getItem('preferredLanguage') === 'en' ? '.' : ','
        }
      />
    </Typography>
  );
  const estimatedFee = (
    <Typography>
      <Typography color="primary" level="body-md" variant="soft">
        Total (estm.)
      </Typography>
      &nbsp;
      <NumericFormat
        displayType="text"
        value={tripData.estimatedFee}
        fixedDecimalScale
        decimalScale={2}
        defaultValue="0"
        allowNegative={false}
        thousandSeparator={
          localStorage.getItem('preferredLanguage') === 'en' ? ',' : ' '
        }
        decimalSeparator={
          localStorage.getItem('preferredLanguage') === 'en' ? '.' : ','
        }
      />
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
          {tripData.unit === 'KM' && (
            <>
              <ListItemText primary={value} />
              <ListItemText primary={highwayFee} />
            </>
          )}
          <ListItemText primary={estimatedFee} />
        </List>
      </Collapse>
    </>
  );
};

DisplayTrips.propTypes = {
  tripData: PropTypes.object.isRequired,
};
export default DisplayTrips;
