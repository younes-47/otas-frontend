/**
 *
 * SimpleTripsTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './SimpleTripsTableStyling.css';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@mui/joy';
import { FormatNumber } from 'utils/Custom/stringManipulation';
import { NumericFormat } from 'react-number-format';
import messages from './messages';

function SimpleTripsTable({ tripsData }) {
  return (
    <table className="trips-table">
      <thead>
        <tr>
          <th>Departure</th>
          <th>Destination</th>
          <th>Departure Date</th>
          <th>Arrival Date</th>
          <th>With</th>
          <th>Unit</th>
          <th>Value</th>
          <th>Highway Fee</th>
          <th>Estimated Fee</th>
        </tr>
      </thead>
      <tbody>
        {tripsData.map((trip) => (
          <tr>
            <td>
              <Typography level="body-md">{trip.departurePlace}</Typography>
            </td>
            <td>
              <Typography level="body-md">{trip.destination}</Typography>
            </td>
            <td>
              <Typography level="body-md">{trip.departureDate}</Typography>
            </td>
            <td>
              <Typography level="body-md">{trip.arrivalDate}</Typography>
            </td>
            <td>
              <Typography level="body-md">
                {trip.transportationMethod}
              </Typography>
            </td>
            <td>
              <Typography level="body-md">{trip.unit}</Typography>
            </td>
            <td>
              {trip.unit !== 'KM' ? (
                <Typography level="body-md">
                  <NumericFormat
                    displayType="text"
                    value={trip.value}
                    fixedDecimalScale
                    decimalScale={2}
                    defaultValue="0"
                    allowNegative={false}
                    thousandSeparator={
                      localStorage.getItem('preferredLanguage') === 'en'
                        ? ','
                        : ' '
                    }
                    decimalSeparator={
                      localStorage.getItem('preferredLanguage') === 'en'
                        ? '.'
                        : ','
                    }
                  />
                </Typography>
              ) : (
                <Typography level="body-md">{trip.value}</Typography>
              )}
            </td>
            <td>
              <Typography level="body-md">
                <NumericFormat
                  displayType="text"
                  value={trip.highwayFee}
                  fixedDecimalScale
                  decimalScale={2}
                  defaultValue="0"
                  allowNegative={false}
                  thousandSeparator={
                    localStorage.getItem('preferredLanguage') === 'en'
                      ? ','
                      : ' '
                  }
                  decimalSeparator={
                    localStorage.getItem('preferredLanguage') === 'en'
                      ? '.'
                      : ','
                  }
                />
              </Typography>
            </td>
            <td>
              <Typography level="body-md">
                <NumericFormat
                  displayType="text"
                  value={trip.estimatedFee}
                  fixedDecimalScale
                  decimalScale={2}
                  defaultValue="0"
                  allowNegative={false}
                  thousandSeparator={
                    localStorage.getItem('preferredLanguage') === 'en'
                      ? ','
                      : ' '
                  }
                  decimalSeparator={
                    localStorage.getItem('preferredLanguage') === 'en'
                      ? '.'
                      : ','
                  }
                />
              </Typography>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

SimpleTripsTable.propTypes = {
  tripsData: PropTypes.array.isRequired,
};

export default SimpleTripsTable;
