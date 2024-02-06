import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Typography } from '@mui/joy';
import { NumericFormat } from 'react-number-format';
import Input from '@mui/joy/Input';
import { FormattedDate } from 'react-intl';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e9c99b',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ExpensesToLiquidateTable({
  expensesData,
  updateExpenseToLiquidate,
  getActualFee,
}) {
  return (
    <TableContainer component={Paper} sx={{ width: '60%' }}>
      <Table sx={{ minWidth: 700 }} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Expense&nbsp;Date</StyledTableCell>
            <StyledTableCell align="left">Currency</StyledTableCell>
            <StyledTableCell align="left">Amount</StyledTableCell>
            <StyledTableCell align="left" color="danger">
              Actual&nbsp;amount&nbsp;spent*
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expensesData.map((expense) => (
            <StyledTableRow key={expense.id}>
              <StyledTableCell align="left">
                <Typography level="body-md">{expense.description}</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography level="body-md">
                  {FormattedDate(expense.expenseDate)}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography level="body-md">{expense.currency}</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography level="title-md" color="success">
                  <NumericFormat
                    displayType="text"
                    value={expense.estimatedFee}
                    fixedDecimalScale
                    decimalScale={2}
                    defaultValue="0"
                    allowNegative={false}
                    thousandSeparator={
                      localStorage.getItem('preferredLanguage') === 'en'
                        ? ','
                        : ' '
                    }
                    decimalSeparator={
                      localStorage.getItem('preferredLanguage') === 'en'
                        ? '.'
                        : ','
                    }
                  />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <NumericFormat
                  prefix={expense.currency === 'MAD' ? 'MAD ' : 'EUR '}
                  required
                  displayType="input"
                  placeholder="Enter the amount here..."
                  value={getActualFee(expense.id)}
                  onValueChange={(values, sourceInfo) => {
                    updateExpenseToLiquidate(expense.id, values.floatValue);
                  }}
                  size="md"
                  variant="outlined"
                  customInput={Input}
                  valueIsNumericString
                  defaultValue="0"
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  thousandSeparator={
                    localStorage.getItem('preferredLanguage') === 'en'
                      ? ','
                      : ' '
                  }
                  decimalSeparator={
                    localStorage.getItem('preferredLanguage') === 'en'
                      ? '.'
                      : ','
                  }
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ExpensesToLiquidateTable.propTypes = {
  expensesData: PropTypes.array.isRequired,
  updateExpenseToLiquidate: PropTypes.func.isRequired,
  getActualFee: PropTypes.func.isRequired,
};
