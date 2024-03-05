/*
 * AvanceCaisseForm Messages
 *
 * This contains all the text for the AvanceCaisseForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AvanceCaisseForm';

export default defineMessages({
  pageTitleAdd: {
    id: `${scope}.page.titleAdd`,
    defaultMessage: 'New Cash Advance Request',
  },
  pageTitleEdit: {
    id: `${scope}.page.titleEdit`,
    defaultMessage: 'Editing Cash Advance Request',
  },
  pageTitleModify: {
    id: `${scope}.page.titleModify`,
    defaultMessage: 'Modifying Cash Advance Request',
  },
  pageTitleView: {
    id: `${scope}.page.titleView`,
    defaultMessage: 'View Cash Advance Request',
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
  chooseCurrency: {
    id: `${scope}.page.chooseCurrency`,
    defaultMessage: 'Please choose the currency*',
  },
  estimatedTotalIn: {
    id: `${scope}.page.estimatedTotalIn`,
    defaultMessage: 'Estimated Total in',
  },
  requestHasBeenSaved: {
    id: `${scope}.page.requestHasBeenSaved`,
    defaultMessage: 'Request has been saved!',
  },
  fullpageModalHeader: {
    id: `${scope}.page.fullpageModalHeader`,
    defaultMessage:
      'By submitting this request, you acknowledge that all provided information is correct.',
  },
  requestCurrencySet: {
    id: `${scope}.page.requestCurrencySet`,
    defaultMessage: "This Request's currency is set to be: ",
  },
  expensesHeader: {
    id: `${scope}.page.expenses`,
    defaultMessage: 'Expense(s)',
  },
  // Buttons
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

  // Modal body messages
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

  // expenses
  expenseDescription: {
    id: `${scope}.expense.description`,
    defaultMessage: 'Description',
  },
  expenseDate: {
    id: `${scope}.expense.date`,
    defaultMessage: 'Date',
  },
  expenseFee: {
    id: `${scope}.expense.fee`,
    defaultMessage: 'Fee',
  },
});
