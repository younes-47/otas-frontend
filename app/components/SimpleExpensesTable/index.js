/**
 *
 * SimpleExpensesTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/joy';
import './SimpleExpensesTableStyling.css';
import { numberFormatterEN } from 'utils/Custom/stringManipulation';
import { NumericFormat } from 'react-number-format';

function SimpleExpensesTable({ expensesData }) {
  return (
    <table className="expenses-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Expense Date</th>
          <th>Currency</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {expensesData.map((expense) => (
          <tr>
            <td>
              <Typography level="body-md">{expense.description}</Typography>
            </td>
            <td>
              <Typography level="body-md">{expense.expenseDate}</Typography>
            </td>
            <td>
              <Typography level="body-md">{expense.currency}</Typography>
            </td>
            <td>
              <Typography level="body-md">
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

SimpleExpensesTable.propTypes = {
  expensesData: PropTypes.array.isRequired,
};

export default SimpleExpensesTable;
