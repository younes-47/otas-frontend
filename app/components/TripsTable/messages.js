/*
 * TripsToLiquidateTable Messages
 *
 * This contains all the text for the TripsToLiquidateTable component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.TripsToLiquidateTable';

export default defineMessages({
  tripDeparture: {
    id: `${scope}.tripDeparture`,
    defaultMessage: 'Departure',
  },

  tripDestination: {
    id: `${scope}.tripDestination`,
    defaultMessage: 'Destination',
  },

  tripDepartureDate: {
    id: `${scope}.tripDepartureDate`,
    defaultMessage: 'Departure Date',
  },

  tripArrivalDate: {
    id: `${scope}.tripArrivalDate`,
    defaultMessage: 'Arrival Date',
  },

  tripTransportation: {
    id: `${scope}.tripTransportation`,
    defaultMessage: 'With',
  },

  tripUnit: {
    id: `${scope}.tripUnit`,
    defaultMessage: 'Unit',
  },

  tripMileage: {
    id: `${scope}.tripMileage`,
    defaultMessage: 'Mileage',
  },

  tripFee: {
    id: `${scope}.tripFee`,
    defaultMessage: 'Fee',
  },

  tripHighwayFee: {
    id: `${scope}.tripHighwayFee`,
    defaultMessage: 'Highway',
  },

  tripTotal: {
    id: `${scope}.tripTotal`,
    defaultMessage: 'Amount',
  },
  actualAmountSpent: {
    id: `${scope}.actualAmountSpent`,
    defaultMessage: 'Actual Amount Spent*',
  },
});
