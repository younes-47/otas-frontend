// Trips.js
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { NumericFormat } from 'react-number-format';

// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Expenses = ({
  expenseData,
  updateExpenseData,
  removeExpense,
  isExpenseRequired,
  isExpenseModifiabale = true,
}) => {
  const { id, description, expenseDate, estimatedFee } = expenseData;

  const handleExpenseDate = (e, expenseId) => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
    const noOffsetDate = new Date(e.$d - tzoffset).toISOString().slice(0, -1);
    updateExpenseData(expenseId, 'expenseDate', noOffsetDate);
  };

  return (
    <Box key={id}>
      <Box display="flex" gap={2} marginBottom="1rem">
        {isExpenseRequired || !isExpenseModifiabale ? (
          <IconButton sx={{ fontSize: '10px' }} disableRipple>
            <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
          </IconButton>
        ) : (
          <IconButton onClick={() => removeExpense(id)}>
            <HighlightOffIcon
              sx={{ color: 'red', fontSize: '25px' }}
            ></HighlightOffIcon>
          </IconButton>
        )}
        {/* <IconButton onClick={() => removeExpense(id)}>
          <HighlightOffIcon
            sx={{ color: 'red', fontSize: '25px' }}
          ></HighlightOffIcon>
        </IconButton> */}
        <TextField
          variant={isExpenseModifiabale ? 'outlined' : 'filled'}
          required
          id="outlined-basic"
          label="Description"
          value={description}
          onChange={(e) => updateExpenseData(id, 'description', e.target.value)}
          sx={{ minWidth: 320 }}
          InputProps={{
            readOnly: !isExpenseModifiabale,
          }}
        />
        <LocalizationProvider reuired dateAdapter={AdapterDayjs}>
          <DatePicker
            readOnly={!isExpenseModifiabale}
            variant={isExpenseModifiabale ? 'outlined' : 'filled'}
            sx={{ maxWidth: 180 }}
            value={expenseDate}
            onChange={(e) => handleExpenseDate(e, id)}
            required
            label="Expense Date"
            disablePast={isExpenseModifiabale}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
        <NumericFormat
          required
          label="Fee"
          value={estimatedFee}
          variant={isExpenseModifiabale ? 'outlined' : 'filled'}
          sx={{ maxWidth: 120 }}
          InputProps={{
            readOnly: !isExpenseModifiabale,
          }}
          onValueChange={(values, sourceInfo) => {
            if (values.value === '') {
              updateExpenseData(id, 'estimatedFee', 0);
            } else {
              updateExpenseData(id, 'estimatedFee', values.floatValue);
            }
          }}
          fixedDecimalScale
          decimalScale={2}
          customInput={TextField}
          defaultValue="0"
          allowNegative={false}
          thousandSeparator={
            localStorage.getItem('preferredLanguage') === 'en' ? ',' : ' '
          }
          decimalSeparator={
            localStorage.getItem('preferredLanguage') === 'en' ? '.' : ','
          }
        />
      </Box>
    </Box>
  );
};

Expenses.propTypes = {
  expenseData: PropTypes.object.isRequired,
  updateExpenseData: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  isExpenseRequired: PropTypes.bool.isRequired,
  isExpenseModifiabale: PropTypes.bool,
};

export default Expenses;
