/*
 * DecideOnRequests Messages
 *
 * This contains all the text for the DecideOnRequests container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnRequests';

export default defineMessages({
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: 'Welcome',
  },
  sectionInfo: {
    id: `${scope}.sectionInfo`,
    defaultMessage: 'This is the section where you can decide on requests as ',
  },
  statsHeader: {
    id: `${scope}.statsHeader`,
    defaultMessage: 'Statistics',
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
