/*
 * DecideOnAvanceCaisseTable Messages
 *
 * This contains all the text for the DecideOnAvanceCaisseTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnAvanceCaisseTable';

export default defineMessages({
  // snakcbar messages
  signedAndApproved: {
    id: `${scope}.snackbar.signedAndApproved`,
    defaultMessage: 'Request has been signed and approved successfully!',
  },
  returned: {
    id: `${scope}.snackbar.returned`,
    defaultMessage: 'Request has been returned successfully!',
  },
  rejected: {
    id: `${scope}.snackbar.rejected`,
    defaultMessage: 'Request has been rejected successfully!',
  },
  fundsDeliveryConfirmed: {
    id: `${scope}.snackbar.fundsDeliveryConfirmed`,
    defaultMessage: 'Funds has been marked as delivered successfully!',
  },

  //

  tableDescription: {
    id: `${scope}.table.description`,
    defaultMessage: 'Description',
  },
  tableOnBehalf: {
    id: `${scope}.table.onBehalf`,
    defaultMessage: 'On Behalf',
  },
  tableCurrency: {
    id: `${scope}.table.currency`,
    defaultMessage: 'Currency',
  },
  tableStatus: {
    id: `${scope}.table.Status`,
    defaultMessage: 'Status',
  },
  tableCreatedOn: {
    id: `${scope}.table.createdOn`,
    defaultMessage: 'Created On',
  },
  tableActions: {
    id: `${scope}.table.actions`,
    defaultMessage: 'Actions',
  },
  tableEstimatedTotal: {
    id: `${scope}.table.estimatedTotal`,
    defaultMessage: 'Estimated Total',
  },
  tableDecideButton: {
    id: `${scope}.table.decideButton`,
    defaultMessage: 'Decide',
  },
  tableDecidedUpon: {
    id: `${scope}.table.decidedUpon`,
    defaultMessage: 'Decided Upon',
  },
  tablePending: {
    id: `${scope}.table.pending`,
    defaultMessage: 'Pending',
  },
  tableViewButton: {
    id: `${scope}.table.viewButton`,
    defaultMessage: 'View',
  },
});
