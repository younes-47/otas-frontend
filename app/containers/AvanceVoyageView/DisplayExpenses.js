// Trips.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Typography from '@mui/joy/Typography';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createStructuredSelector } from 'reselect';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import { NumericFormat } from 'react-number-format';
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
      &nbsp;
      <NumericFormat
        displayType="text"
        value={expenseData.estimatedFee}
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
