// Trips.js
import React from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Divider,
  FormControl,
  IconButton,
  // IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { makeSelectAbroad } from './selectors';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const mapStateToProps = createStructuredSelector({
  abroadSelection: makeSelectAbroad(),
});

const Expenses = ({ expenseData, updateExpenseData, removeExpense }) => {
  const { id, description, expenseDate, currency, estimatedExpenseFee } =
    expenseData;

  const { abroadSelection } = useSelector(mapStateToProps);

  return (
    <Box key={id}>
      <Box display="flex" gap={2} marginBottom="1rem">
        <IconButton onClick={() => removeExpense(id)}>
          <HighlightOffIcon
            sx={{ color: 'red', fontSize: '25px' }}
          ></HighlightOffIcon>
        </IconButton>

        <TextField
          required
          id="outlined-basic"
          label="Description"
          value={description}
          onChange={(e) => updateExpenseData(id, 'description', e.target.value)}
          variant="outlined"
        />
        <LocalizationProvider reuired dateAdapter={AdapterDayjs}>
          <DatePicker
            value={expenseDate}
            onChange={(e) => updateExpenseData(id, 'expenseDate', e.$d)}
            sx={{ maxWidth: 170 }}
            required
            label="Expense Date"
          />
        </LocalizationProvider>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel required id="demo-simple-select-label">
              Currency
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Currency"
              value={currency}
              onChange={(e) =>
                updateExpenseData(id, 'currency', e.target.value)
              }
              required
            >
              <MenuItem value="MAD">MAD</MenuItem>
              {String(abroadSelection) === 'true' && (
                <MenuItem value="EUR">EUR</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <TextField
          required
          type="number"
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
  );
};

Expenses.propTypes = {
  expenseData: PropTypes.object.isRequired,
  updateExpenseData: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default Expenses;
