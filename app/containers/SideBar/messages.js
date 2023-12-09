/*
 * SideBar Messages
 *
 * This contains all the text for the SideBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SideBar';

export default defineMessages({
  overview: {
    id: `${scope}.overview`,
    defaultMessage: '-Overview',
  },
  myRequests: {
    id: `${scope}.myRequests`,
    defaultMessage: '-myRequests',
  },
  ordreMission: {
    id: `${scope}.ordreMission`,
    defaultMessage: '-ordreMission',
  },
  avanceVoyage: {
    id: `${scope}.avanceVoyage`,
    defaultMessage: '-avanceVoyage',
  },
  avanceCaisse: {
    id: `${scope}.avanceCaisse`,
    defaultMessage: '-avanceCaisse',
  },
  depenseCaisse: {
    id: `${scope}.depenseCaisse`,
    defaultMessage: '-depenseCaisse',
  },
  notFound: {
    id: `${scope}.notFound`,
    defaultMessage: '-Not found',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: '-Log in',
  },
  unauthorized: {
    id: `${scope}.unauthorized`,
    defaultMessage: '-Unauthorized',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: '-Log out',
  },
});
