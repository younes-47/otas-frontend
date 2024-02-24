/*
 * DecideOnOrdreMissionForm Messages
 *
 * This contains all the text for the DecideOnOrdreMissionForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnOrdreMissionForm';

export default defineMessages({
  ordreMissionTitle: {
    id: `${scope}.ordreMissionTitle`,
    defaultMessage: 'Mission Order',
  },
  currentStatus: {
    id: `${scope}.currentStatus`,
    defaultMessage: 'Current Status',
  },
  statusHistoryButton: {
    id: `${scope}.statusHistoryButton`,
    defaultMessage: 'Status History',
  },
  requestAbroadPhrase: {
    id: `${scope}.requestAbroadPhrase`,
    defaultMessage: 'This mission is set to be',
  },
  requestsAbroadSet: {
    id: `${scope}.requestsAbroadSet`,
    defaultMessage: 'Abroad',
  },
  requestNotAbroadSet: {
    id: `${scope}.requestNotAbroadSet`,
    defaultMessage: 'Domestic',
  },
  tripsHeader: {
    id: `${scope}.tripsHeader`,
    defaultMessage: 'Trajectories',
  },
  expensesHeader: {
    id: `${scope}.expensesHeader`,
    defaultMessage: 'Expenses',
  },
  total: {
    id: `${scope}.total`,
    defaultMessage: 'Total',
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
  closeButton: {
    id: `${scope}.closeButton`,
    defaultMessage: 'Close',
  },
  signAndApproveButton: {
    id: `${scope}.signAndApproveButton`,
    defaultMessage: 'Sign and Approve',
  },
  signAndApproveWithRelatedAvanceVoyageButton: {
    id: `${scope}.signAndApproveWithRelatedAvanceVoyageButton`,
    defaultMessage: 'Sign and Approve with Related Avance Voyage',
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
  deciderCommentPlaceholder: {
    id: `${scope}.deciderCommentPlaceholder`,
    defaultMessage: 'Your Comment (MAX 255 characters: ~35 to 50 words)...',
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
