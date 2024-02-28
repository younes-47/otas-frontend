/*
 * AvanceVoyageView Messages
 *
 * This contains all the text for the AvanceVoyageView container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AvanceVoyageView';

export default defineMessages({
  // Expenses

  expensesTableCurrency: {
    id: `${scope}.table.expenses.currency`,
    defaultMessage: 'Currency',
  },

  expensesTableAmount: {
    id: `${scope}.table.expenses.amount`,
    defaultMessage: 'Amount',
  },

  expensesTableDescription: {
    id: `${scope}.table.expenses.description`,
    defaultMessage: 'Description',
  },

  expensesTableDate: {
    id: `${scope}.table.expenses.date`,
    defaultMessage: 'Date',
  },

  // Trips

  tripsHeader: {
    id: `${scope}.tripsHeader`,
    defaultMessage: 'Trajectories',
  },

  tripsTableDeparturePlace: {
    id: `${scope}.table.trips.DeparturePlace`,
    defaultMessage: 'From',
  },

  tripsTableDestination: {
    id: `${scope}.table.trips.Destination`,
    defaultMessage: 'To',
  },

  tripsTableDepartureDate: {
    id: `${scope}.table.trips.DepartureDate`,
    defaultMessage: 'Depart On',
  },

  tripsTableTransportationMethod: {
    id: `${scope}.table.trips.TransportationMethod`,
    defaultMessage: 'With',
  },
  tripsTableArrivalDate: {
    id: `${scope}.table.trips.ArrivalDate`,
    defaultMessage: 'Arrive On',
  },
  tripsTableUnit: {
    id: `${scope}.table.trips.Unit`,
    defaultMessage: 'Unit',
  },
  tripsTableAmount: {
    id: `${scope}.table.trips.Amount`,
    defaultMessage: 'Amount',
  },
  tripsTableHighwayFee: {
    id: `${scope}.table.trips.HighwayFee`,
    defaultMessage: 'Highway Fee',
  },
  tripsTableEstimatedTotal: {
    id: `${scope}.table.trips.EstimatedTotal`,
    defaultMessage: 'Total estm.',
  },

  // main page
  pageTitle: {
    id: `${scope}.page.title`,
    defaultMessage: 'Travel Advance',
  },
  currentStatus: {
    id: `${scope}.page.currentStatus`,
    defaultMessage: 'Current Status',
  },

  statusHistoryButton: {
    id: `${scope}.page.statusHistoryButton`,
    defaultMessage: 'Status History',
  },

  downloadDocumentButton: {
    id: `${scope}.page.downloadDocumentButton`,
    defaultMessage: 'Download Document',
  },

  generating: {
    id: `${scope}.page.generating`,
    defaultMessage: 'Genereating...',
  },

  requestReturned: {
    id: `${scope}.page.requestReturned`,
    defaultMessage:
      'This request has been returned. Please refer to the comment below and apply the necessary changes.',
  },

  requestRejected: {
    id: `${scope}.page.requestRejected`,
    defaultMessage:
      'This request has been rejected. Please refer to the comment below to know why.',
  },

  requestLinkedTo: {
    id: `${scope}.page.requestLinkedTo`,
    defaultMessage: 'This request is linked to:',
  },

  missionOrderTitle: {
    id: `${scope}.page.missionOrderTitle`,
    defaultMessage: 'Mission Order #',
  },

  moreDetails: {
    id: `${scope}.page.moreDetails`,
    defaultMessage: 'More Details',
  },

  trajectoriesHeader: {
    id: `${scope}.page.trajectoriesHeader`,
    defaultMessage: 'Trajectories',
  },

  expensesHeader: {
    id: `${scope}.page.expensesHeader`,
    defaultMessage: 'Expenses',
  },

  noExpensesHeader: {
    id: `${scope}.page.noExpensesHeader`,
    defaultMessage: 'No Expenses',
  },

  noTripsHeader: {
    id: `${scope}.page.noTripsHeader`,
    defaultMessage: 'No Trajectories',
  },

  requestedAmountHeader: {
    id: `${scope}.page.requestedAmountHeader`,
    defaultMessage: 'Requested Amount',
  },

  returnButton: {
    id: `${scope}.page.returnButton`,
    defaultMessage: 'Return',
  },

  dialogTitle: {
    id: `${scope}.page.dialogTitle`,
    defaultMessage: 'Status History',
  },

  closeButton: {
    id: `${scope}.page.closeButton`,
    defaultMessage: 'Close',
  },
});
