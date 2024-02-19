/*
 * AvanceCaisseTable Messages
 *
 * This contains all the text for the AvanceCaisseTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AvanceCaisseTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the AvanceCaisseTable container!',
  },
  dialogHeader: {
    id: `${scope}.dialog.header`,
    defaultMessage: 'Are you sure you want to delete this request!',
  },
  tableDescription: {
    id: `${scope}.table.description`,
    defaultMessage: 'Description',
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
    defaultMessage: 'Created On',
  },
  tableActions: {
    id: `${scope}.table.actions`,
    defaultMessage: 'Actions',
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
  requestButton: {
    id: `${scope}.dialog.requestButton`,
    defaultMessage: 'Request',
  },
});
