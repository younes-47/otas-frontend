/*
 * LiquidationForm Messages
 *
 * This contains all the text for the LiquidationForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LiquidationForm';

export default defineMessages({
  // Additionnal trips
  tripDeparture: {
    id: `${scope}.tripDeparture`,
    defaultMessage: 'Departure',
  },

  tripDestination: {
    id: `${scope}.tripDestination`,
    defaultMessage: 'Destination',
  },

  tripDepartureDate: {
    id: `${scope}.tripDepartureDate`,
    defaultMessage: 'Departure Date',
  },

  tripArrivalDate: {
    id: `${scope}.tripArrivalDate`,
    defaultMessage: 'Arrival Date',
  },

  tripTransportation: {
    id: `${scope}.tripTransportation`,
    defaultMessage: 'Transportation',
  },

  tripUnit: {
    id: `${scope}.tripUnit`,
    defaultMessage: 'Unit',
  },

  tripMileage: {
    id: `${scope}.tripMileage`,
    defaultMessage: 'Mileage',
  },

  tripFee: {
    id: `${scope}.tripFee`,
    defaultMessage: 'Fee',
  },

  tripHighwayFee: {
    id: `${scope}.tripHighwayFee`,
    defaultMessage: 'Highway',
  },

  tripTotal: {
    id: `${scope}.tripTotal`,
    defaultMessage: 'Total',
  },

  // Main page
  avanceVoyageLabel: {
    id: `${scope}.avanceVoyageLabel`,
    defaultMessage: 'Travel Advance',
  },

  avanceCaisseLabel: {
    id: `${scope}.avanceCaisseLabel`,
    defaultMessage: 'Cash Advance',
  },
  chooseRequestType: {
    id: `${scope}.chooseRequestType`,
    defaultMessage: 'Please choose a Request Type to liquidate:',
  },
  chooseRequest: {
    id: `${scope}.chooseRequest`,
    defaultMessage: 'Please choose a Request:',
  },

  confirmationAlert: {
    id: `${scope}.confirmationAlert`,
    defaultMessage: 'Please Review your information before submitting.',
  },

  liquidatingAvanceVoyage: {
    id: `${scope}.liquidatingAvanceVoyage`,
    defaultMessage: 'Liquidating Travel Advance',
  },

  liquidatingAvanceCaisse: {
    id: `${scope}.liquidatingAvanceCaisse`,
    defaultMessage: 'Liquidating Cash Advance',
  },
  requestCurrencySet: {
    id: `${scope}.page.requestCurrencySet`,
    defaultMessage: "This Request's currency is set to be: ",
  },
  currentStatus: {
    id: `${scope}.page.currentStatus`,
    defaultMessage: 'Current Status',
  },
  statusHistoryButton: {
    id: `${scope}.page.statusHistoryButton`,
    defaultMessage: 'Status History',
  },
  generating: {
    id: `${scope}.page.generating`,
    defaultMessage: 'Generating...',
  },
  downloadDocumentButton: {
    id: `${scope}.page.downloadDocumentButton`,
    defaultMessage: 'Download Document',
  },

  tripsHeader: {
    id: `${scope}.tripsHeader`,
    defaultMessage: 'Trajectories',
  },

  moreTripsHeader: {
    id: `${scope}.moreTripsHeader`,
    defaultMessage: 'Made additional trajectories? (optional)',
  },

  expensesHeader: {
    id: `${scope}.expensesHeader`,
    defaultMessage: 'Expenses',
  },

  noExpensesHeader: {
    id: `${scope}.noExpensesHeader`,
    defaultMessage: 'No Expenses to Liquidate',
  },

  moreExpensesHeader: {
    id: `${scope}.moreExpensesHeader`,
    defaultMessage: 'Spent additional expenses? (optional)',
  },

  receiptsFileHeader: {
    id: `${scope}.receiptsFileHeader`,
    defaultMessage: 'Receipts File:',
  },
  yourReceiptsHeader: {
    id: `${scope}.yourReceiptsHeader`,
    defaultMessage: 'Your Receipts*',
  },

  updateYourReceiptsHeader: {
    id: `${scope}.updateYourReceiptsHeader`,
    defaultMessage: 'Update Your Receipts',
  },

  optionalHeader: {
    id: `${scope}.optionalHeader`,
    defaultMessage: '(Optional)',
  },
  pleaseNoteHeader: {
    id: `${scope}.pleaseNoteHeader`,
    defaultMessage: 'Please Note:',
  },

  updatingFileNote: {
    id: `${scope}.updatingFileNote`,
    defaultMessage:
      'uploading a new file will override the old one. You may want to attach your previously uploaded receipts in case you still want to include them.',
  },
  signlePdfFileHeader: {
    id: `${scope}.signlePdfFileHeader`,
    defaultMessage: 'Please upload your receipts in a single PDF file*',
  },

  uploadButton: {
    id: `${scope}.uploadButton`,
    defaultMessage: 'Upload File',
  },
  uploading: {
    id: `${scope}.uploading`,
    defaultMessage: 'Uploading...',
  },
  selectedFile: {
    id: `${scope}.selectedFile`,
    defaultMessage: 'Selected File:',
  },
  estimatedTotal: {
    id: `${scope}.estimatedTotal`,
    defaultMessage: 'Estimated Total:',
  },

  actualAmountSpent: {
    id: `${scope}.actualAmountSpent`,
    defaultMessage: 'Actual Amount Spent:',
  },

  youOwe: {
    id: `${scope}.youOwe`,
    defaultMessage: 'You Owe:',
  },
  decision: {
    id: `${scope}.decision`,
    defaultMessage: 'Decision:',
  },
  mustHandOverPhrase: {
    id: `${scope}.mustHandOverPhrase`,
    defaultMessage: 'You must hand over an amount of',
  },
  anAmountOf: {
    id: `${scope}.anAmountOf`,
    defaultMessage: 'An Amount Of',
  },

  mustBeRefundedToYou: {
    id: `${scope}.mustBeRefundedToYou`,
    defaultMessage: 'must Be Refunded To You.',
  },
});
