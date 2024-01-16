/*
 * SideBar Messages
 *
 * This contains all the text for the SideBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SideBar';

export default defineMessages({
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
  liquidation: {
    id: `${scope}.liquidation`,
    defaultMessage: '-liquidation',
  },

  decideOnRequests: {
    id: `${scope}.decideOnRequests`,
    defaultMessage: '-decideOnRequests',
  },
  decideOnOrdreMission: {
    id: `${scope}.decideOnOrdreMission`,
    defaultMessage: '-decideOnOrdreMission',
  },
  decideOnAvanceVoyage: {
    id: `${scope}.decideOnAvanceVoyage`,
    defaultMessage: '-decideOnAvanceVoyage',
  },
  decideOnAvanceCaisse: {
    id: `${scope}.decideOnAvanceCaisse`,
    defaultMessage: '-decideOnAvanceCaisse',
  },
  decideOnDepenseCaisse: {
    id: `${scope}.decideOnDepenseCaisse`,
    defaultMessage: '-decideOnDepenseCaisse',
  },
  decideOnLiquidation: {
    id: `${scope}.decideOnLiquidation`,
    defaultMessage: '-decideOnLiquidation',
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
