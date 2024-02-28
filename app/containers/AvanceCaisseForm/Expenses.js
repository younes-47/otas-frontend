// Trips.js
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { NumericFormat } from 'react-number-format';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import messages from './messages';

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

  const intl = useIntl();

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
          label={intl.formatMessage({ id: messages.expenseDescription.id })}
          value={description}
          onChange={(e) => updateExpenseData(id, 'description', e.target.value)}
          sx={{ minWidth: 320 }}
          InputProps={{
            readOnly: !isExpenseModifiabale,
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            readOnly={!isExpenseModifiabale}
            variant={isExpenseModifiabale ? 'outlined' : 'filled'}
            sx={{ maxWidth: 180 }}
            value={expenseDate === null ? expenseDate : dayjs(expenseDate)}
            onChange={(e) => handleExpenseDate(e, id)}
            required
            label={intl.formatMessage({ id: messages.expenseDate.id })}
            disablePast={isExpenseModifiabale}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
        <NumericFormat
          required
          label={intl.formatMessage({ id: messages.expenseFee.id })}
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
