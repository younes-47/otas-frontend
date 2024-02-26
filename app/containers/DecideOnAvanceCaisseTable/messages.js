/*
 * DecideOnAvanceCaisseTable Messages
 *
 * This contains all the text for the DecideOnAvanceCaisseTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnAvanceCaisseTable';

export default defineMessages({
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
