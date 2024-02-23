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
    defaultMessage: 'My Requests',
  },
  ordreMission: {
    id: `${scope}.ordreMission`,
    defaultMessage: 'Mission Order',
  },
  avanceVoyage: {
    id: `${scope}.avanceVoyage`,
    defaultMessage: 'Travel Advance',
  },
  avanceCaisse: {
    id: `${scope}.avanceCaisse`,
    defaultMessage: 'Cash Advance',
  },
  depenseCaisse: {
    id: `${scope}.depenseCaisse`,
    defaultMessage: 'Cash Expense',
  },
  liquidation: {
    id: `${scope}.liquidation`,
    defaultMessage: 'Liquidation',
  },

  decideOnRequests: {
    id: `${scope}.decideOnRequests`,
    defaultMessage: 'Decide on Requests',
  },
  decideOnOrdreMission: {
    id: `${scope}.decideOnOrdreMission`,
    defaultMessage: 'Mission Order',
  },
  decideOnAvanceVoyage: {
    id: `${scope}.decideOnAvanceVoyage`,
    defaultMessage: 'Travel Advance',
  },
  decideOnAvanceCaisse: {
    id: `${scope}.decideOnAvanceCaisse`,
    defaultMessage: 'Cash Advance',
  },
  decideOnDepenseCaisse: {
    id: `${scope}.decideOnDepenseCaisse`,
    defaultMessage: 'Cash Expense',
  },
  decideOnLiquidation: {
    id: `${scope}.decideOnLiquidation`,
    defaultMessage: 'Liquidation',
  },

  notFound: {
    id: `${scope}.notFound`,
    defaultMessage: 'Not found',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Log in',
  },
  unauthorized: {
    id: `${scope}.unauthorized`,
    defaultMessage: 'Unauthorized',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Log out',
  },
});
