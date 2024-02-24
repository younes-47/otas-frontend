/*
 * DecideOnDepenseCaisseTable Messages
 *
 * This contains all the text for the DecideOnDepenseCaisseTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnDepenseCaisseTable';

export default defineMessages({
  tableDescription: {
    id: `${scope}.tableDescription`,
    defaultMessage: 'Description',
  },
  tableTotal: {
    id: `${scope}.tableTotal`,
    defaultMessage: 'Total',
  },
  tableCurrency: {
    id: `${scope}.tableCurrency`,
    defaultMessage: 'Currency',
  },
  tableStatus: {
    id: `${scope}.tableStatus`,
    defaultMessage: 'Status',
  },
  tableOnBehalf: {
    id: `${scope}.tableOnBehalf`,
    defaultMessage: 'On Behalf',
  },
  tableRceiptsFile: {
    id: `${scope}.tableRceiptsFile`,
    defaultMessage: 'Receipts File',
  },
  tableCreateOn: {
    id: `${scope}.tableCreateOn`,
    defaultMessage: 'Create On',
  },
  tableActions: {
    id: `${scope}.tableActions`,
    defaultMessage: 'Actions',
  },
  tableDecideButton: {
    id: `${scope}.tableDecideButton`,
    defaultMessage: 'Decide',
  },
  tableDecidedUpon: {
    id: `${scope}.tableDecidedUpon`,
    defaultMessage: 'Decided Upon',
  },
  tablePending: {
    id: `${scope}.tablePending`,
    defaultMessage: 'Pending',
  },
});
