// Trips.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
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

const DisplayExpenses = ({ expenseData }) => {
  const currency = (
    <Typography>
      <Typography color="warning" level="body-md" variant="soft">
        Currency
      </Typography>
      &nbsp;{expenseData.currency}
    </Typography>
  );
  const estimatedFee = (
    <Typography>
      <Typography color="warning" level="body-md" variant="soft">
        Amount
      </Typography>
      &nbsp;{expenseData.estimatedFee}
    </Typography>
  );
  const description = (
    <Typography>
      <Typography color="warning" level="body-md" variant="soft">
        Description
      </Typography>
      &nbsp;{expenseData.description}
    </Typography>
  );
  const expenseDate = (
    <Typography>
      <Typography color="warning" level="body-md" variant="soft">
        Date
      </Typography>
      &nbsp;{DateTimeFormater(expenseData.expenseDate)}
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
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Expense" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          <ListItemText primary={description} />
          <ListItemText primary={expenseDate} />
          <ListItemText primary={currency} />
          <ListItemText primary={estimatedFee} />
        </List>
      </Collapse>
    </>
  );
};

DisplayExpenses.propTypes = {
  expenseData: PropTypes.object.isRequired,
};
export default DisplayExpenses;
