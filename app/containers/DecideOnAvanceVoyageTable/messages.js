/*
 * DecideOnAvanceVoyageTable Messages
 *
 * This contains all the text for the DecideOnAvanceVoyageTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnAvanceVoyageTable';

export default defineMessages({
  tableDescription: {
    id: `${scope}.table.description`,
    defaultMessage: 'Description',
  },
  tableOrdreMissionId: {
    id: `${scope}.table.tableOrdreMissionId`,
    defaultMessage: '#Mission Order',
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
  tableRequestedAmount: {
    id: `${scope}.table.requestedAmount`,
    defaultMessage: 'Estimated Total',
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
