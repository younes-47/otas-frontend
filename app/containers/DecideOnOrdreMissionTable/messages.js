/*
 * DecideOnOrdreMissionTable Messages
 *
 * This contains all the text for the DecideOnOrdreMissionTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnOrdreMissionTable';

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
  tableDescription: {
    id: `${scope}.tableDescription`,
    defaultMessage: 'Description',
  },
  tableRequestedAmount: {
    id: `${scope}.tableRequestedAmount`,
    defaultMessage: 'Requested Amount',
  },
  tableMissionDuration: {
    id: `${scope}.tableMissionDuration`,
    defaultMessage: 'Mission Duration',
  },
  tableDays: {
    id: `${scope}.tableDays`,
    defaultMessage: 'Days',
  },
  tableStatus: {
    id: `${scope}.tableStatus`,
    defaultMessage: 'Status',
  },
  tablePending: {
    id: `${scope}.tablePending`,
    defaultMessage: 'Pending',
  },
  tableDecidedUpon: {
    id: `${scope}.tableDecidedUpon`,
    defaultMessage: 'Decided Upon',
  },
  tableAbroad: {
    id: `${scope}.tableAbroad`,
    defaultMessage: 'Abroad',
  },
  tableCreatedOn: {
    id: `${scope}.tableCreatedOn`,
    defaultMessage: 'Created On',
  },
  tableActions: {
    id: `${scope}.tableActions`,
    defaultMessage: 'Actions',
  },
  tableDecideButton: {
    id: `${scope}.tableDecideButton`,
    defaultMessage: 'Decide',
  },
  tableViewButton: {
    id: `${scope}.tableViewButton`,
    defaultMessage: 'View',
  },
});
