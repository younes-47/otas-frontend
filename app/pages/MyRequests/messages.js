/*
 * MyRequests Messages
 *
 * This contains all the text for the MyRequests container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MyRequests';

export default defineMessages({
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: 'Welcome',
  },

  sectionInfo: {
    id: `${scope}.sectionInfo`,
    defaultMessage:
      'This is the section, where you can access or place your requests.',
  },

  statisticsHeader: {
    id: `${scope}.statisticsHeader`,
    defaultMessage: 'Statistics',
  },

  noRequestsAlert: {
    id: `${scope}.noRequestsAlert`,
    defaultMessage:
      'You have never placed a request before. Head to a corresponding section and click on "Request" to initiate one.',
  },

  requestsAwaitingApprovalHeader: {
    id: `${scope}.requestsAwaitingApprovalHeader`,
    defaultMessage: 'Requests Awaiting Approval',
  },
  ordreMissionHeader: {
    id: `${scope}.ordreMissionHeader`,
    defaultMessage: 'Mission Orders',
  },
  avanceVoyageHeader: {
    id: `${scope}.avanceVoyageHeader`,
    defaultMessage: 'Travel Advances',
  },
  avanceCaisseHeader: {
    id: `${scope}.avanceCaisseHeader`,
    defaultMessage: 'Cash Advances',
  },
  depenseCaisseHeader: {
    id: `${scope}.depenseCaisseHeader`,
    defaultMessage: 'Cash Expenses',
  },
  liquidationsHeader: {
    id: `${scope}.liquidationsHeader`,
    defaultMessage: 'Liquidations',
  },
  approvedRequestsHeader: {
    id: `${scope}.approvedRequestsHeader`,
    defaultMessage: 'Requests you have approved',
  },
  notInitiatedYetHeader: {
    id: `${scope}.notInitiatedYetHeader`,
    defaultMessage: 'Not Initiated Yet',
  },
  ongoingHeader: {
    id: `${scope}.ongoingHeader`,
    defaultMessage: 'Ongoing',
  },
  finalizedHeader: {
    id: `${scope}.finalizedHeader`,
    defaultMessage: 'Finalized',
  },
});
