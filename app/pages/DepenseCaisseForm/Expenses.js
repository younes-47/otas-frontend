// Trips.js
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Expenses = ({ expenseData, updateExpenseData }) => {
  const { id, description, expenseDate, estimatedExpenseFee } = expenseData;

  return (
    <div key={id}>
      <Box display="flex" justifyContent="center" flexDirection="row">
        <Box display="flex" gap={2} marginBottom="1rem">
          <TextField
            required
            id="outlined-basic"
            label="Description"
            value={description}
            onChange={(e) =>
              updateExpenseData(id, 'description', e.target.value)
            }
            variant="outlined"
            sx={{ minWidth: 320 }}
          />
          <LocalizationProvider reuired dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ maxWidth: 180 }}
              value={expenseDate}
              onChange={(e) => updateExpenseData(id, 'expenseDate', e.$d)}
              required
              label="Expense Date"
            />
          </LocalizationProvider>
          <TextField
            required
            id="outlined-basic"
            label="Fee"
            value={estimatedExpenseFee}
            onChange={(e) =>
              updateExpenseData(id, 'estimatedExpenseFee', e.target.value)
            }
            variant="outlined"
            sx={{ maxWidth: 120 }}
          />
        </Box>
      </Box>
    </div>
  );
};

Expenses.propTypes = {
  expenseData: PropTypes.object.isRequired,
  updateExpenseData: PropTypes.func.isRequired,
};

export default Expenses;
