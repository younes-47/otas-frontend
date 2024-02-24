/*
 * DecideOnAvanceVoyageForm Messages
 *
 * This contains all the text for the DecideOnAvanceVoyageForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnAvanceVoyageForm';

export default defineMessages({
  avanceVoyageTitle: {
    id: `${scope}.avanceVoyageTitle`,
    defaultMessage: 'Travel Advance',
  },
  currentStatus: {
    id: `${scope}.currentStatus`,
    defaultMessage: 'Current Status',
  },
  statusHistoryButton: {
    id: `${scope}.statusHistoryButton`,
    defaultMessage: 'Status History',
  },
  thisAvanceVoyageIsLinkedTo: {
    id: `${scope}.thisAvanceVoyageIsLinkedTo`,
    defaultMessage: 'This Travel Advance is linked to',
  },
  ordreMission: {
    id: `${scope}.ordreMission`,
    defaultMessage: 'Mission Order',
  },
  tripsHeader: {
    id: `${scope}.tripsHeader`,
    defaultMessage: 'Trajectories',
  },
  expensesHeader: {
    id: `${scope}.expensesHeader`,
    defaultMessage: 'Expenses',
  },
  noExpensesHeader: {
    id: `${scope}.noExpensesHeader`,
    defaultMessage: 'No Expenses',
  },
  total: {
    id: `${scope}.total`,
    defaultMessage: 'Total',
  },
  rejectingRequestComment: {
    id: `${scope}.rejectingRequestComment`,
    defaultMessage:
      '*Please provide a comment on why you are rejecting this request (required)',
  },
  returningRequestComment: {
    id: `${scope}.returningRequestComment`,
    defaultMessage:
      '*Please provide a comment on why you are returning this request (required)',
  },
  confirmationNumberExplainer: {
    id: `${scope}.confirmationNumberExplainer`,
    defaultMessage: 'Consists of 8 digits (no letters or special characters).',
  },
  returnButton: {
    id: `${scope}.returnButton`,
    defaultMessage: 'Return',
  },
  rejectButton: {
    id: `${scope}.rejectButton`,
    defaultMessage: 'Reject',
  },
  returnRequestButton: {
    id: `${scope}.returnRequestButton`,
    defaultMessage: 'Return Request',
  },
  signAndApproveButton: {
    id: `${scope}.signAndApproveButton`,
    defaultMessage: 'Sign and Approve',
  },
  markFundsAsPreparedButton: {
    id: `${scope}.markFundsAsPreparedButton`,
    defaultMessage: 'Mark Funds as Prepared',
  },
  confirmFundsDeliveryButton: {
    id: `${scope}.confirmFundsDeliveryButton`,
    defaultMessage: 'Confirm Funds Delivery',
  },
  confirmationNumber: {
    id: `${scope}.confirmationNumber`,
    defaultMessage: 'Confirmation Number',
  },
  closeButton: {
    id: `${scope}.closeButton`,
    defaultMessage: 'Close',
  },
  confirmButton: {
    id: `${scope}.confirmButton`,
    defaultMessage: 'Confirm',
  },
  deciderCommentPlaceholder: {
    id: `${scope}.deciderCommentPlaceholder`,
    defaultMessage: 'Your Comment (255 characters: ~35 to 50 words)...',
  },
  provision: {
    id: `${scope}.provision`,
    defaultMessage: 'Provision',
  },
  cash: {
    id: `${scope}.cash`,
    defaultMessage: 'Cash',
  },
  approveRequest: {
    id: `${scope}.approveRequest`,
    defaultMessage: 'Approve the Request?',
  },
  approveRequestBody: {
    id: `${scope}.approveRequestBody`,
    defaultMessage:
      'By Approving the request, you sign it digitally and forward it to the next decider.',
  },
  rejectRequest: {
    id: `${scope}.rejectRequest`,
    defaultMessage: 'Reject the Request?',
  },
  rejectRequestBody: {
    id: `${scope}.rejectRequestBody`,
    defaultMessage:
      'Are you sure you want to reject this request? This will archive the request and it will not continue the approval process',
  },
  returnRequest: {
    id: `${scope}.returnRequest`,
    defaultMessage: 'Return the Request?',
  },
  returnRequestBody: {
    id: `${scope}.returnRequestBody`,
    defaultMessage:
      'Are you sure you want to return this request? This will return it to the requester to modify it, and the process of approval will start all over.',
  },
  markFundsDelivery: {
    id: `${scope}.markFundsDelivery`,
    defaultMessage: 'Mark Funds Delivery?',
  },
  markFundsAsPrepared: {
    id: `${scope}.markFundsAsPrepared`,
    defaultMessage: 'Mark Funds as Prepared?',
  },
  markFundsAsPreparedBody: {
    id: `${scope}.markFundsAsPreparedBody`,
    defaultMessage: 'Please choose method of delivery.',
  },
  confirmFundsDelivery: {
    id: `${scope}.confirmFundsDelivery`,
    defaultMessage: 'Confirm Funds Delivery?',
  },
  confirmFundsDeliveryBody: {
    id: `${scope}.confirmFundsDeliveryBody`,
    defaultMessage: 'Please enter the confirmation number below.',
  },
  statusHistory: {
    id: `${scope}.statusHistory`,
    defaultMessage: 'Status History',
  },

  invalidComment: {
    id: `${scope}.invalidComment`,
    defaultMessage: 'Comment is invalid!',
  },

  blankComment: {
    id: `${scope}.blankComment`,
    defaultMessage:
      'You must provide a comment on why you are returning the request!',
  },

  longComment: {
    id: `${scope}.longComment`,
    defaultMessage:
      'Comment is too long! Maximum characters are 255 (~35 to 50 words)',
  },
});
