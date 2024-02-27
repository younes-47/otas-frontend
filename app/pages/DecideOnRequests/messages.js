/*
 * DecideOnRequests Messages
 *
 * This contains all the text for the DecideOnRequests container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DecideOnRequests';

export default defineMessages({
  // decider levels
  managerFirst: {
    id: `${scope}.managerFirst`,
    defaultMessage: 'a Manager of your department',
  },
  managerMiddle: {
    id: `${scope}.managerMiddle`,
    defaultMessage: ', Manager of your department',
  },
  managerLast: {
    id: `${scope}.managerLast`,
    defaultMessage: ' and Manager of your department',
  },

  gdFirst: {
    id: `${scope}.gdFirst`,
    defaultMessage: 'a General Director',
  },
  gdMiddle: {
    id: `${scope}.gdMiddle`,
    defaultMessage: ', General Director',
  },
  gdLast: {
    id: `${scope}.gdLast`,
    defaultMessage: ' and a General Director',
  },

  vpFirst: {
    id: `${scope}.vpFirst`,
    defaultMessage: 'a Vice President',
  },
  vpMiddle: {
    id: `${scope}.vpMiddle`,
    defaultMessage: ', Vice President',
  },
  vpLast: {
    id: `${scope}.vpLast`,
    defaultMessage: ' and a Vice President',
  },

  financeFirst: {
    id: `${scope}.financeFirst`,
    defaultMessage: 'a Finance Manager',
  },
  financeLast: {
    id: `${scope}.financeLast`,
    defaultMessage: ' and Finance Manager',
  },

  hrFirst: {
    id: `${scope}.hrFirst`,
    defaultMessage: 'an HR Manager',
  },
  hrLast: {
    id: `${scope}.hrLast`,
    defaultMessage: ' and HR Manager',
  },

  trFirst: {
    id: `${scope}.trFirst`,
    defaultMessage: 'a Treasurer',
  },
  trLast: {
    id: `${scope}.trLast`,
    defaultMessage: ' and Treasurer',
  },

  //

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
