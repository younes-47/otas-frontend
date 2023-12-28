// Trips.js
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Expenses = ({
  expenseData,
  updateExpenseData,
  removeExpense,
  isExpenseRequired,
}) => {
  const { id, description, expenseDate, estimatedExpenseFee } = expenseData;

  const handleExpenseDate = (e, expenseId) => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
    const noOffsetDate = new Date(e.$d - tzoffset).toISOString().slice(0, -1);
    updateExpenseData(expenseId, 'expenseDate', noOffsetDate);
  };

  return (
    <Box key={id}>
      <Box display="flex" gap={2} marginBottom="1rem">
        {!isExpenseRequired ? (
          <IconButton onClick={() => removeExpense(id)}>
            <HighlightOffIcon
              sx={{ color: 'red', fontSize: '25px' }}
            ></HighlightOffIcon>
          </IconButton>
        ) : (
          <IconButton sx={{ fontSize: '10px' }} disableRipple>
            <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
          </IconButton>
        )}
        <TextField
          required
          id="outlined-basic"
          label="Description"
          value={description}
          onChange={(e) => updateExpenseData(id, 'description', e.target.value)}
          variant="outlined"
          sx={{ minWidth: 320 }}
        />
        <LocalizationProvider reuired dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ maxWidth: 180 }}
            value={expenseDate}
            onChange={(e) => handleExpenseDate(e, id)}
            required
            label="Expense Date"
            disableFuture
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
        <TextField
          required
          id="outlined-basic"
          label="Fee"
          value={estimatedExpenseFee}
          type="number"
          onChange={(e) =>
            updateExpenseData(id, 'estimatedExpenseFee', e.target.value)
          }
          variant="outlined"
          sx={{ maxWidth: 120 }}
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
};

export default Expenses;
