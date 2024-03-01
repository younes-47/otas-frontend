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
  selectRequestPlaceholder: {
    id: `${scope}.selectRequestPlaceholder`,
    defaultMessage: 'Select a Request to liquidate...',
  },

  noRequestsToLiquidate: {
    id: `${scope}.noRequestsToLiquidate`,
    defaultMessage: 'No Requests to liquidate',
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
    defaultMessage: 'You are owed:',
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

  // modal headers
  submitHeader: {
    id: `${scope}.modal.submitHeader`,
    defaultMessage: 'Submit',
  },
  confirmation: {
    id: `${scope}.modal.confirmation`,
    defaultMessage: 'Confirmation',
  },
  statusHistory: {
    id: `${scope}.modal.statusHistory`,
    defaultMessage: 'Status History',
  },

  fullpageModalHeader: {
    id: `${scope}.fullpageModalHeader`,
    defaultMessage:
      'By submitting this request, you acknowledge that all provided information is correct.',
  },

  invalidInformationHeader: {
    id: `${scope}.modal.invalidInformationHeader`,
    defaultMessage: 'Invalid Information!',
  },

  invalidFileType: {
    id: `${scope}.modal.invalidFileType`,
    defaultMessage:
      'Invalid File Type! Please upload your receipts in a PDF format.',
  },

  invalidAbroadSelection: {
    id: `${scope}.modal.invalidAbroadSelection`,
    defaultMessage:
      'Could not figure out whether this request is abroad or not! Please select "Yes" or "No".',
  },
  invalidExpensesActualFee: {
    id: `${scope}.modal.invalidExpensesActualFee`,
    defaultMessage:
      'You must provide a valid number for the actual amount spent for ALL of your expenses! Please review your expenses information and try again.',
  },
  invalidTripsActualFee: {
    id: `${scope}.modal.invalidTripsActualFee`,
    defaultMessage:
      'You must provide a valid spent amount for all of your trajectories! Please review your trajectories information and try again.',
  },
  missingTripsInfo: {
    id: `${scope}.modal.missingTripsInfo`,
    defaultMessage:
      "One of the trajectories' required information is missing! Please review your trajectories and fill all necessary information.",
  },
  invalidTripValue: {
    id: `${scope}.modal.invalidTripValue`,
    defaultMessage:
      "A trajectory's fee or mileage cannot be 0 or negative! Please review your trajectories information and try again.",
  },
  blankTripsValue: {
    id: `${scope}.modal.blankTripsValue`,
    defaultMessage:
      'Invalid Total value! Please review your trajectories and/or expenses fee/Mileage values and try again.',
  },
  invalidTripsDates: {
    id: `${scope}.modal.invalidTripsDates`,
    defaultMessage:
      'Arrival date cannot be earlier than the departure date! Please review your trajectories information and try again.',
  },
  nonsenseTripsDates: {
    id: `${scope}.modal.nonsenseTripsDates`,
    defaultMessage:
      'Trips dates do not make sense! You cannot start another trip before you arrive from the previous one.',
  },
  invalidExpenseDescription: {
    id: `${scope}.modal.invalidExpenseDescription`,
    defaultMessage:
      'One of the expenses description is not specified! Please review your expenses and fill all necessary information.',
  },
  invalidExpenseCurrency: {
    id: `${scope}.modal.invalidExpenseCurrency`,
    defaultMessage:
      'One of the expenses currency is not specified! Please review your expenses and fill all necessary information.',
  },
  invalidExpenseValue: {
    id: `${scope}.modal.invalidExpenseValue`,
    defaultMessage:
      'Expense fee cannot be 0 or negative! Please review your expenses information and try again.',
  },
  blankExpenseValue: {
    id: `${scope}.modal.blankExpenseValue`,
    defaultMessage:
      'Invalid Total value! Please review your trajectories and/or expenses fee/Mileage values and try again.',
  },
  invalidExpenseDate: {
    id: `${scope}.modal.invalidExpenseDate`,
    defaultMessage:
      "One of the expenses' date is not set yet! Please review your expenses information and try again.",
  },
  invalidReceiptsFile: {
    id: `${scope}.modal.invalidReceiptsFile`,
    defaultMessage:
      'Please upload your receipts file! Or wait for it while it is being uploaded.',
  },
  //
  returnButton: {
    id: `${scope}.page.returnButton`,
    defaultMessage: 'Return',
  },
  closeButton: {
    id: `${scope}.page.closeButton`,
    defaultMessage: 'Close',
  },
  saveAsDraftButton: {
    id: `${scope}.page.saveAsDraftButton`,
    defaultMessage: 'Save as Draft',
  },

  confirmButton: {
    id: `${scope}.page.confirmButton`,
    defaultMessage: 'Confirm',
  },
  submitModificationsButton: {
    id: `${scope}.page.submitModificationsButton`,
    defaultMessage: 'Submit Modifications',
  },

  submitButton: {
    id: `${scope}.page.submitButton`,
    defaultMessage: 'Submit',
  },

  resubmitButton: {
    id: `${scope}.page.resubmitButton`,
    defaultMessage: 'Resubmit',
  },

  requestHasBeenSaved: {
    id: `${scope}.page.requestHasBeenSaved`,
    defaultMessage: 'Request has been saved!',
  },
  onSubmit: {
    id: `${scope}.modal.onSubmit`,
    defaultMessage:
      "Please Review your information before confirming your changes. You won't be able to modify your request afterwards!",
  },
  onSubmitModifications: {
    id: `${scope}.modal.onSubmitModifications`,
    defaultMessage:
      "Please Review your information before confirming your changes. You won't be able to modify your request afterwards!",
  },
});
