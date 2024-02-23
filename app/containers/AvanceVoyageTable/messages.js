/*
 * AvanceVoyageTable Messages
 *
 * This contains all the text for the AvanceVoyageTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AvanceVoyageTable';

export default defineMessages({
  tableDescription: {
    id: `${scope}.table.tableDescription`,
    defaultMessage: 'Description',
  },

  tableMissionOrderId: {
    id: `${scope}.table.tableMissionOrderId`,
    defaultMessage: '#Mission Order',
  },

  tableEstimatedTotal: {
    id: `${scope}.table.tableEstimatedTotal`,
    defaultMessage: 'Estimated Total',
  },

  tableCurrency: {
    id: `${scope}.table.tableCurrency`,
    defaultMessage: 'Currency',
  },

  tableLatestStatus: {
    id: `${scope}.table.tableLatestStatus`,
    defaultMessage: 'Latest Status',
  },

  tableOnBehalf: {
    id: `${scope}.table.tableOnBehalf`,
    defaultMessage: 'On Behalf',
  },

  tableCreatedOn: {
    id: `${scope}.table.tableCreatedOn`,
    defaultMessage: 'Created On',
  },

  tableActions: {
    id: `${scope}.table.tableActions`,
    defaultMessage: 'Actions',
  },

  missionOrderNavigationTooltipTitle: {
    id: `${scope}.table.missionOrderNavigationTooltipTitle`,
    defaultMessage: 'Navigate to the related Ordre Mission',
  },

  tableViewButton: {
    id: `${scope}.tableViewButton`,
    defaultMessage: 'View',
  },
});
