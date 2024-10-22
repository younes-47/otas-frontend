// Trips.js
import React from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { NumericFormat } from 'react-number-format';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from './messages';
import { makeSelectAbroad } from './selectors';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const mapStateToProps = createStructuredSelector({
  abroadSelection: makeSelectAbroad(),
});

const Expenses = ({
  expenseData,
  updateExpenseData,
  removeExpense,
  isExpenseRequired,
}) => {
  const { id, description, expenseDate, currency, estimatedFee } = expenseData;

  const { abroadSelection } = useSelector(mapStateToProps);

  const handleExpenseDate = (e, expenseId) => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
    const noOffsetDate = new Date(e.$d - tzoffset).toISOString().slice(0, -1);
    updateExpenseData(expenseId, 'expenseDate', noOffsetDate);
  };

  const intl = useIntl();

  return (
    <Box key={id}>
      <Box display="flex" gap={2} marginBottom="1rem">
        {isExpenseRequired === false ? (
          <IconButton onClick={() => removeExpense(id)}>
            <HighlightOffIcon
              sx={{ color: 'red', fontSize: '25px' }}
            ></HighlightOffIcon>
          </IconButton>
        ) : (
          <IconButton sx={{ fontSize: '10px' }} disableRipple>
            <KeyboardArrowRightIcon />
          </IconButton>
        )}

        <TextField
          required
          InputProps={{
            readOnly: isExpenseRequired,
          }}
          variant={!isExpenseRequired ? 'outlined' : 'filled'}
          id="outlined-basic"
          label={intl.formatMessage({
            id: messages.expenseDescriptionLabel.id,
          })}
          value={description}
          onChange={(e) => updateExpenseData(id, 'description', e.target.value)}
        />

        <DatePicker
          readOnly={isExpenseRequired}
          variant={!isExpenseRequired ? 'outlined' : 'filled'}
          value={expenseDate === null ? expenseDate : dayjs(expenseDate)}
          onChange={(e) => handleExpenseDate(e, id)}
          sx={{ maxWidth: 170 }}
          required
          label={intl.formatMessage({
            id: messages.expenseDateLabel.id,
          })}
          disablePast={!isExpenseRequired}
          format="DD/MM/YYYY"
        />

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel required id="demo-simple-select-label">
              <FormattedMessage id={messages.expensesTableCurrency.id} />
            </InputLabel>
            <Select
              inputProps={{ readOnly: isExpenseRequired }}
              variant={!isExpenseRequired ? 'outlined' : 'filled'}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={intl.formatMessage({
                id: messages.expensesTableCurrency.id,
              })}
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
        <NumericFormat
          InputProps={{
            readOnly: isExpenseRequired,
          }}
          required
          label={intl.formatMessage({ id: messages.expensesFeeLabel.id })}
          value={estimatedFee}
          onValueChange={(values, sourceInfo) => {
            if (values.value === '') {
              updateExpenseData(id, 'estimatedFee', 0);
            } else {
              updateExpenseData(id, 'estimatedFee', values.floatValue);
            }
          }}
          sx={{ maxWidth: 120 }}
          disabled={currency !== 'MAD' && currency !== 'EUR'}
          variant={
            (currency !== 'MAD' && currency !== 'EUR') || isExpenseRequired
              ? 'filled'
              : 'outlined'
          }
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
};

export default Expenses;
