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
});
