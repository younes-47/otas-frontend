/*
 * DepenseCaisseTable Messages
 *
 * This contains all the text for the DepenseCaisseTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DepenseCaisseTable';

export default defineMessages({
  tableDescription: {
    id: `${scope}.table.description`,
    defaultMessage: 'Description',
  },

  tableTotal: {
    id: `${scope}.table.total`,
    defaultMessage: 'Total',
  },

  tableCurrency: {
    id: `${scope}.table.currency`,
    defaultMessage: 'Currency',
  },

  tableLatestStatus: {
    id: `${scope}.table.latestStatus`,
    defaultMessage: 'Latest Status',
  },

  tableOnBehalf: {
    id: `${scope}.table.onBehalf`,
    defaultMessage: 'On Behalf',
  },

  tableCreatedOn: {
    id: `${scope}.table.createdOn`,
    defaultMessage: 'CreatedOn',
  },

  tableActions: {
    id: `${scope}.table.actions`,
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

  tableReceiptsFile: {
    id: `${scope}.table.receiptsFile`,
    defaultMessage: 'Receipts File',
  },

  requestButton: {
    id: `${scope}.table.requestButton`,
    defaultMessage: 'Request',
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
