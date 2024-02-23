/*
 * OrdreMissionTable Messages
 *
 * This contains all the text for the OrdreMissionTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.OrdreMissionTable';

export default defineMessages({
  dialogHeader: {
    id: `${scope}.dialog.header`,
    defaultMessage: 'Are you sure you want to delete this request!',
  },
  tableDescription: {
    id: `${scope}.table.description`,
    defaultMessage: 'Description',
  },
  tableAbroad: {
    id: `${scope}.table.abroad`,
    defaultMessage: 'Abroad',
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
  tableEstimatedTotal: {
    id: `${scope}.table.estimatedTotal`,
    defaultMessage: 'Estimated Total',
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
