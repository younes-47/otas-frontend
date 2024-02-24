/*
 * OrdreMissionForm Messages
 *
 * This contains all the text for the OrdreMissionForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.OrdreMissionForm';

export default defineMessages({
  // main page
  pageTitleAdd: {
    id: `${scope}.page.titleAdd`,
    defaultMessage: 'New Mission Order',
  },
  pageTitleEdit: {
    id: `${scope}.page.titleEdit`,
    defaultMessage: 'Editing Mission Order',
  },
  pageTitleModify: {
    id: `${scope}.page.titleModify`,
    defaultMessage: 'Modifying Mission Order',
  },
  pageTitleView: {
    id: `${scope}.page.titleView`,
    defaultMessage: 'View Mission Order',
  },
  pageTitleConfirm: {
    id: `${scope}.page.titleConfirm`,
    defaultMessage: 'Please Review your information before submitting',
  },
  pageSubtitleConfirm: {
    id: `${scope}.page.subtitleConfirm`,
    defaultMessage:
      "*This request has been saved as a draft. You can still modify it if you don't submit it. Please note: your request cannot be edited once it is submitted.",
  },
  currentStatus: {
    id: `${scope}.page.currentStatus`,
    defaultMessage: 'Current Status',
  },

  generating: {
    id: `${scope}.page.generating`,
    defaultMessage: 'Generating...',
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

  onBehalfOfSomeoneElse: {
    id: `${scope}.page.onBehalfOfSomeoneElse`,
    defaultMessage: 'Are you filling this form on behalf of someone else?',
  },

  chooseAbroad: {
    id: `${scope}.chooseAbroad`,
    defaultMessage: 'Is this mission abroad?',
  },
  requestAbroadPhrase: {
    id: `${scope}.requestAbroadPhrase`,
    defaultMessage: 'This mission is set to be',
  },
  requestsAbroadSet: {
    id: `${scope}.requestsAbroadSet`,
    defaultMessage: 'ABROAD',
  },
  requestNotAbroadSet: {
    id: `${scope}.requestNotAbroadSet`,
    defaultMessage: 'DOMESTIC',
  },
  tripsHeader: {
    id: `${scope}.tripsHeader`,
    defaultMessage: 'Trajectories',
  },
  noExpensesHeader: {
    id: `${scope}.noExpensesHeader`,
    defaultMessage: 'No Expenses',
  },
  otherExpensesHeader: {
    id: `${scope}.otherExpensesHeader`,
    defaultMessage: 'Other Expenses',
  },
  optionalExpensesHeader: {
    id: `${scope}.optionalExpensesHeader`,
    defaultMessage: '(optional)',
  },
  estimatedTotalInMAD: {
    id: `${scope}.estimatedTotalInMAD`,
    defaultMessage: 'Estimated Total In MAD',
  },
  estimatedTotalInEUR: {
    id: `${scope}.estimatedTotalInEUR`,
    defaultMessage: 'Estimated Total In EUR',
  },

  // buttons

  downloadDocumentButton: {
    id: `${scope}.page.downloadDocumentButton`,
    defaultMessage: 'Download Document',
  },

  statusHistoryButton: {
    id: `${scope}.page.statusHistoryButton`,
    defaultMessage: 'Status History',
  },

  returnButton: {
    id: `${scope}.page.returnButton`,
    defaultMessage: 'Return',
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
  closeButton: {
    id: `${scope}.page.closeButton`,
    defaultMessage: 'Close',
  },

  //

  fullpageModalHeader: {
    id: `${scope}.fullpageModalHeader`,
    defaultMessage:
      'By submitting this request, you acknowledge that all provided information is correct.',
  },

  // expense
  expensesTableCurrency: {
    id: `${scope}.expensesTableCurrency`,
    defaultMessage: 'Currency',
  },
  expenseDateLabel: {
    id: `${scope}.expenseDateLabel`,
    defaultMessage: 'Date',
  },

  expenseDescriptionLabel: {
    id: `${scope}.expenseDescriptionLabel`,
    defaultMessage: 'Description',
  },

  expensesFeeLabel: {
    id: `${scope}.expensesFeeLabel`,
    defaultMessage: 'Fee',
  },

  // trips
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

  // modal header

  noteHeader: {
    id: `${scope}.modal.noteHeader`,
    defaultMessage: 'Note',
  },

  invalidInformationHeader: {
    id: `${scope}.modal.invalidInformationHeader`,
    defaultMessage: 'Invalid Information!',
  },
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

  // modal body
  invalidAbroadSelection: {
    id: `${scope}.modal.invalidAbroadSelection`,
    defaultMessage:
      'Could not figure out whether this request is abroad or not! Please select "Yes" or "No".',
  },

  // validate expenses
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
  invalidOnBehalf: {
    id: `${scope}.modal.invalidOnBehalf`,
    defaultMessage:
      'Could not figure out whether you are filling this request on behalf of someone else or not! Please select "Yes" or "No".',
  },
  invalidActualRequesterInformation: {
    id: `${scope}.modal.invalidActualRequesterInformation`,
    defaultMessage:
      'You must fill all actual requester information if you are filling this request on behalf of someone else!',
  },
  invalidDescription: {
    id: `${scope}.modal.invalidDescription`,
    defaultMessage: 'You must provide a description for the mission!',
  },
  expenseDescriptionNotSpecified: {
    id: `${scope}.modal.expenseDescriptionNotSpecified`,
    defaultMessage:
      'One of the expenses description is not specified! Please review your expenses and fill all necessary information.',
  },
  expenseDateNotSet: {
    id: `${scope}.modal.expenseDateNotSet`,
    defaultMessage:
      "One of the expenses' date is not set yet! Please review your expenses information and try again.",
  },

  expenseCurrencyNotSpecified: {
    id: `${scope}.modal.expenseCurrencyNotSpecified`,
    defaultMessage:
      'One of the expenses currency is not specified! Please review your expenses and fill all necessary information.',
  },
  expenseFeeInvalid: {
    id: `${scope}.modal.expenseFeeInvalid`,
    defaultMessage:
      'Expense fee cannot be 0 or negative! Please review your expenses information and try again.',
  },
  invalidExpenseFeeValue: {
    id: `${scope}.modal.invalidExpenseFeeValue`,
    defaultMessage: 'Invalid Fee value in one of the expenses!',
  },
  // validate trips
  missingTripInformation: {
    id: `${scope}.modal.missingTripInformation`,
    defaultMessage:
      "One of the trajectories' required information is missing! Please review your trajectories and fill all necessary information",
  },
  invalidTripValue: {
    id: `${scope}.modal.invalidTripValue`,
    defaultMessage:
      "A trajectory's fee or mileage cannot be 0 or negative! Please review your trajectories information and try again",
  },
  blankTripValue: {
    id: `${scope}.modal.blankTripValue`,
    defaultMessage:
      'Invalid Total value! Please review your trajectories and/or expenses fee/Mileage values and try again',
  },
  invalidTripDates: {
    id: `${scope}.modal.invalidTripDates`,
    defaultMessage:
      'Arrival date cannot be earlier than the departure date! Please review your trajectories information and try again',
  },
  nonsenseTripDates: {
    id: `${scope}.modal.nonsenseTripDates`,
    defaultMessage:
      'Trips dates do not make sense! You cannot start another trip before you arrive from the previous one.',
  },

  //

  requestHasBeenSaved: {
    id: `${scope}.page.requestHasBeenSaved`,
    defaultMessage: 'Request has been saved!',
  },
});
