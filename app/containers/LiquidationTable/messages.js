/*
 * LiquidationTable Messages
 *
 * This contains all the text for the LiquidationTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LiquidationTable';

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
  tableLatestStatus: {
    id: `${scope}.tableLatestStatus`,
    defaultMessage: 'Latest Status',
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

  tableEditButton: {
    id: `${scope}.tableEditButton`,
    defaultMessage: 'Edit',
  },

  tableDeleteButton: {
    id: `${scope}.tableDeleteButton`,
    defaultMessage: 'Delete',
  },

  tableModifyButton: {
    id: `${scope}.tableModifyButton`,
    defaultMessage: 'Modify',
  },

  tableViewButton: {
    id: `${scope}.tableViewButton`,
    defaultMessage: 'View',
  },

  dialogHeader: {
    id: `${scope}.dialog.header`,
    defaultMessage: 'Are you sure you want to delete this request!',
  },
  dialogConfirmButton: {
    id: `${scope}.dialog.confirmButton`,
    defaultMessage: 'Confirm',
  },
  dialogCloseButton: {
    id: `${scope}.dialog.closeButton`,
    defaultMessage: 'Close',
  },
  dialogDeletionAlert: {
    id: `${scope}.dialog.deletionAlert`,
    defaultMessage:
      "This will delete all information related to it. This can't be undone.",
  },
});
