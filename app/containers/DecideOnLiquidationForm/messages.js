/*
 * DecideOnLiquidationForm Messages
 *
 * This contains all the text for the DecideOnLiquidationForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnLiquidationForm';

export default defineMessages({
  decideOnLQHeader: {
    id: `${scope}.decideOnLQHeader`,
    defaultMessage: 'Decide On Liquidation',
  },
  currentStatus: {
    id: `${scope}.currentStatus`,
    defaultMessage: 'Current Status',
  },
  statusHistoryButton: {
    id: `${scope}.statusHistoryButton`,
    defaultMessage: 'Status History',
  },
  statusHistory: {
    id: `${scope}.statusHistory`,
    defaultMessage: 'Status History',
  },
  returnedByTRAlert: {
    id: `${scope}.returnedByTRAlert`,
    defaultMessage:
      'This request has been returned by the treasurer. Please refer to the comment below.',
  },
  tripsHeader: {
    id: `${scope}.tripsHeader`,
    defaultMessage: 'Trajectories',
  },
  expensesHeader: {
    id: `${scope}.expensesHeader`,
    defaultMessage: 'Expenses',
  },
  receiptsFileHeader: {
    id: `${scope}.receiptsFileHeader`,
    defaultMessage: 'Receipts File',
  },
  estimatedTotal: {
    id: `${scope}.estimatedTotal`,
    defaultMessage: 'Estimated Total',
  },
  actualAmountSpent: {
    id: `${scope}.actualAmountSpent`,
    defaultMessage: 'Actual Amount Spent',
  },
  requesterOwes: {
    id: `${scope}.requesterOwes`,
    defaultMessage: 'Requester Owes',
  },
  decisionHeader: {
    id: `${scope}.decisionHeader`,
    defaultMessage: 'Decision',
  },
  anAmountOf: {
    id: `${scope}.anAmountOf`,
    defaultMessage: 'An Amount Of',
  },
  mustBeHandedOver: {
    id: `${scope}.mustBeHandedOver`,
    defaultMessage: 'Must Be Handed Over',
  },
  returnButton: {
    id: `${scope}.returnButton`,
    defaultMessage: 'Return',
  },
  returnRequestButton: {
    id: `${scope}.returnRequestButton`,
    defaultMessage: 'Return Request',
  },
  confirmButton: {
    id: `${scope}.confirmButton`,
    defaultMessage: 'Confirm',
  },
  approveButton: {
    id: `${scope}.approveButton`,
    defaultMessage: 'Approve',
  },
  signAndApproveButton: {
    id: `${scope}.signAndApproveButton`,
    defaultMessage: 'Sign and Approve',
  },
  finalizeButton: {
    id: `${scope}.finalizeButton`,
    defaultMessage: 'Finalize',
  },
  closeButton: {
    id: `${scope}.closeButton`,
    defaultMessage: 'Close',
  },
  returningRequestComment: {
    id: `${scope}.returningRequestComment`,
    defaultMessage:
      '*Please provide a comment on why you are returning this request (required)',
  },
  mustBeRefundedToTheRequester: {
    id: `${scope}.mustBeRefundedToTheRequester`,
    defaultMessage: 'Must Be Refunded To The Requester',
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
  returnRequest: {
    id: `${scope}.returnRequest`,
    defaultMessage: 'Return the Request?',
  },
  returnToFMLabel: {
    id: `${scope}.returnToFMLabel`,
    defaultMessage:
      'Return the request to Finance Manager for missing information',
  },
  returnToRequesterLabel: {
    id: `${scope}.returnToRequesterLabel`,
    defaultMessage: 'Return the request to requester for missing evidences',
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
  approveRequestTRBody: {
    id: `${scope}.approveRequestTRBody`,
    defaultMessage:
      'By Approving the request, you acknowledge that all information is correct and you start preparing the funds',
  },
  approveRequestFMBody: {
    id: `${scope}.approveRequestFMBody`,
    defaultMessage:
      'By Approving the request, you sign it digitally and forward it to the next decider.',
  },
  confirmRequestBody: {
    id: `${scope}.confirmRequestBody`,
    defaultMessage:
      'By confirming the request again, you acknowledge that all the information are correct. The request will be forwarded to the Treasurer for further inspection.',
  },
  confirmRequest: {
    id: `${scope}.confirmRequest`,
    defaultMessage: 'Confirm the request?',
  },
  finalizeRequest: {
    id: `${scope}.finalizeRequest`,
    defaultMessage: 'Finalize the request?',
  },
  finalizeRequestBody: {
    id: `${scope}.finalizeRequestBody`,
    defaultMessage:
      'By finalizing the request, you acknowledge that everything is settled and no further actions are required. All information will still be accessible afterwards.',
  },
  returnRequestBodyTR: {
    id: `${scope}.returnRequestBodyTR`,
    defaultMessage: 'Please choose to whom you want to return the request.',
  },
  invalidChoice: {
    id: `${scope}.invalidChoice`,
    defaultMessage: 'Invalid Choice!',
  },
  invalidChoiceBody: {
    id: `${scope}.invalidChoiceBody`,
    defaultMessage:
      'If you are returning this request, you should specify to whom!',
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
  deciderCommentPlaceholder: {
    id: `${scope}.deciderCommentPlaceholder`,
    defaultMessage: 'Your Comment (255 characters: ~35 to 50 words)...',
  },

  avanceVoyageTitle: {
    id: `${scope}.avanceVoyageTitle`,
    defaultMessage: 'Travel Advance',
  },

  avanceCaisseTitle: {
    id: `${scope}.avanceCaisseTitle`,
    defaultMessage: 'Cash Advance',
  },
  requestLinkedTo: {
    id: `${scope}.requestLinkedTo`,
    defaultMessage: 'This request is linked to:',
  },
});
