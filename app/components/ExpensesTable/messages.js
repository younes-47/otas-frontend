/*
 * ExpensesToLiquidateTable Messages
 *
 * This contains all the text for the ExpensesToLiquidateTable component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ExpensesToLiquidateTable';

export default defineMessages({
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: 'Date',
  },
  currency: {
    id: `${scope}.currency`,
    defaultMessage: 'Currency',
  },
  amount: {
    id: `${scope}.amount`,
    defaultMessage: 'Amount',
  },
  actualAmountSpent: {
    id: `${scope}.actualAmountSpent`,
    defaultMessage: 'Actual Amount Spent*',
  },
});
