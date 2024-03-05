/*
 * DepenseCaisseForm Messages
 *
 * This contains all the text for the DepenseCaisseForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DepenseCaisseForm';

export default defineMessages({
  pageTitleAdd: {
    id: `${scope}.pageTitleAdd`,
    defaultMessage: 'Request Cash Expense',
  },
  pageTitleEdit: {
    id: `${scope}.pageTitleEdit`,
    defaultMessage: 'Edit Cash Expense',
  },
  pageTitleModify: {
    id: `${scope}.pageTitleModify`,
    defaultMessage: 'Modify Cash Expense',
  },
  pageTitleView: {
    id: `${scope}.pageTitleView`,
    defaultMessage: 'View Cash Expense',
  },
  pageTitleConfirm: {
    id: `${scope}.pageTitleConfirm`,
    defaultMessage: 'Please review your information before submitting',
  },
  pageSubtitleConfirm: {
    id: `${scope}.pageSubtitleConfirm`,
    defaultMessage:
      'This request has been saved as a draft. You can still modify it if you do not submit it. Please note: Your request cannot be modified once it is submitted.',
  },
  currentStatus: {
    id: `${scope}.currentStatus`,
    defaultMessage: 'Current Status',
  },
  statusHistoryButton: {
    id: `${scope}.statusHistoryButton`,
    defaultMessage: 'Status History',
  },
  downloadDocumentButton: {
    id: `${scope}.downloadDocumentButton`,
    defaultMessage: 'Download Document',
  },
  generating: {
    id: `${scope}.generating`,
    defaultMessage: 'Generating...',
  },
  requestReturned: {
    id: `${scope}.requestReturned`,
    defaultMessage:
      'This request has been returned. Please refer to the comment below and apply the necessary changes.',
  },
  requestRejected: {
    id: `${scope}.requestRejected`,
    defaultMessage:
      'This request has been rejected. Please refer to the comment below to know why.',
  },
  onBehalfOfSomeoneElse: {
    id: `${scope}.onBehalfOfSomeoneElse`,
    defaultMessage:
      'Are you submitting this request on behalf of someone else?',
  },
  chooseCurrency: {
    id: `${scope}.chooseCurrency`,
    defaultMessage: 'Please choose the currency',
  },
  requestCurrencySet: {
    id: `${scope}.requestCurrencySet`,
    defaultMessage: "This request's currency has been set to: ",
  },
  expenses: {
    id: `${scope}.expenses`,
    defaultMessage: 'Expense(s)',
  },
  receiptsFileHeader: {
    id: `${scope}.receiptsFileHeader`,
    defaultMessage: 'Receipts File',
  },
  receiptsUploadHeader: {
    id: `${scope}.receiptsUploadHeader`,
    defaultMessage: 'Receipts*',
  },
  updateReceipts: {
    id: `${scope}.updateReceipts`,
    defaultMessage: 'Update your receipts',
  },
  optionalSmallHeader: {
    id: `${scope}.optionalSmallHeader`,
    defaultMessage: '(optional)',
  },
  pleaseNoteHeader: {
    id: `${scope}.pleaseNoteHeader`,
    defaultMessage: 'Please note',
  },
  overrideUploadNote: {
    id: `${scope}.overrideUploadNote`,
    defaultMessage:
      'Uploading new receipts will override the existing ones. You may want to attach your previously uploaded receipts in case you still want to include them.',
  },
  signlePdfFileHeader: {
    id: `${scope}.signlePdfFileHeader`,
    defaultMessage: 'Please upload your receipts in a single PDF file',
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
    defaultMessage: 'Selected File',
  },
  total: {
    id: `${scope}.total`,
    defaultMessage: 'Total',
  },
  returnButton: {
    id: `${scope}.returnButton`,
    defaultMessage: 'Return',
  },
  saveAsDraftButton: {
    id: `${scope}.saveAsDraftButton`,
    defaultMessage: 'Save As Draft',
  },
  confirmButton: {
    id: `${scope}.confirmButton`,
    defaultMessage: 'Confirm',
  },
  confirmModificationsButton: {
    id: `${scope}.confirmModificationsButton`,
    defaultMessage: 'Confirm Modifications',
  },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: 'Submit',
  },
  submitAcknowledgement: {
    id: `${scope}.submitAcknowledgement`,
    defaultMessage:
      'By submitting this request, you acknowledge that all provided information is correct.',
  },
  requestSaved: {
    id: `${scope}.requestSaved`,
    defaultMessage: 'Request has been saved as a draft successfully.',
  },

  fullpageModalHeader: {
    id: `${scope}.fullpageModalHeader`,
    defaultMessage:
      'By submitting this request, you acknowledge that all provided information is correct.',
  },

  // expenses
  expenseDescription: {
    id: `${scope}.expenseDescription`,
    defaultMessage: 'Description',
  },
  expenseDate: {
    id: `${scope}.expenseDate`,
    defaultMessage: 'Date',
  },

  expenseFee: {
    id: `${scope}.expenseFee`,
    defaultMessage: 'Fee',
  },

  // modal header

  invalidInformationHeader: {
    id: `${scope}.modal.invalidInformationHeader`,
    defaultMessage: 'Invalid Information!',
  },
  invalidFileType: {
    id: `${scope}.modal.invalidFileType`,
    defaultMessage:
      'Invalid File Type! Please upload your receipts in a PDF format.',
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

  // validation
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
  invalidReceiptsFile: {
    id: `${scope}.modal.invalidReceiptsFile`,
    defaultMessage:
      'Please upload your receipts file! Or wait for it while it is being uploaded.',
  },
});
