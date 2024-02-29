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
import Typography from '@mui/joy/Typography';
import { NumericFormat } from 'react-number-format';
import Input from '@mui/joy/Input';
import { FormattedDate, FormattedMessage } from 'react-intl';
import messages from './messages';
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

export default function ExpensesTable({
  expensesData,
  updateExpenseToLiquidate = undefined,
  getActualFee = undefined,
  isExpenseModifiable = true,
  isLiquidationView = false,
}) {
  return (
    <TableContainer component={Paper} sx={{ width: '60%' }}>
      <Table sx={{ minWidth: 700 }} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">
              <FormattedMessage id={messages.description.id} />
            </StyledTableCell>
            <StyledTableCell align="left">
              <FormattedMessage id={messages.date.id} />
            </StyledTableCell>
            <StyledTableCell align="left">
              <FormattedMessage id={messages.currency.id} />
            </StyledTableCell>
            <StyledTableCell align="left">
              <FormattedMessage id={messages.amount.id} />
            </StyledTableCell>
            {((updateExpenseToLiquidate !== undefined &&
              getActualFee !== undefined) ||
              isLiquidationView === true) && (
              <StyledTableCell align="left" color="danger">
                <FormattedMessage id={messages.actualAmountSpent.id} />
              </StyledTableCell>
            )}
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
              <StyledTableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
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
              {((updateExpenseToLiquidate !== undefined &&
                getActualFee !== undefined) ||
                isLiquidationView === true) && (
                <StyledTableCell align="left">
                  <Typography
                    level="title-md"
                    color={isLiquidationView ? 'success' : 'neutral'}
                  >
                    <NumericFormat
                      prefix={expense.currency === 'MAD' ? 'MAD ' : 'EUR '}
                      required
                      displayType={isLiquidationView ? 'text' : 'input'}
                      placeholder="Enter the amount here..."
                      value={
                        isLiquidationView
                          ? expense?.actualFee
                          : getActualFee(expense.id)
                      }
                      onValueChange={(values, sourceInfo) => {
                        if (values.value === '') {
                          updateExpenseToLiquidate(expense.id, 0);
                        } else {
                          updateExpenseToLiquidate(
                            expense.id,
                            values.floatValue,
                          );
                        }
                      }}
                      disabled={!isExpenseModifiable && !isLiquidationView}
                      size="md"
                      variant={isExpenseModifiable ? 'outlined' : 'solid'}
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
                  </Typography>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ExpensesTable.propTypes = {
  expensesData: PropTypes.array.isRequired,
  updateExpenseToLiquidate: PropTypes.func,
  getActualFee: PropTypes.func,
  isExpenseModifiable: PropTypes.bool,
  isLiquidationView: PropTypes.bool,
};
