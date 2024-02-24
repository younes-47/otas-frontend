/*
 * DecideOnLiquidationTable Messages
 *
 * This contains all the text for the DecideOnLiquidationTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnLiquidationTable';

export default defineMessages({
  tableAvanceVoyage: {
    id: `${scope}.tableAvanceVoyage`,
    defaultMessage: 'Travel Advance',
  },

  tableAvanceCaisse: {
    id: `${scope}.tableAvanceCaisse`,
    defaultMessage: 'Cash Advance',
  },

  tableAvanceCaisseNavigationTitle: {
    id: `${scope}.tableAvanceCaisseNavigationTitle`,
    defaultMessage: 'Navigate to the related Cash Advance request',
  },

  tableAvanceVoyageNavigationTitle: {
    id: `${scope}.tableAvanceVoyageNavigationTitle`,
    defaultMessage: 'Navigate to the related Travel Advance request',
  },

  tableActualTotal: {
    id: `${scope}.tableActualTotal`,
    defaultMessage: 'Actual Total',
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

  tableReceipstsFile: {
    id: `${scope}.tableReceipstsFile`,
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

  tableViewButton: {
    id: `${scope}.tableViewButton`,
    defaultMessage: 'View',
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
