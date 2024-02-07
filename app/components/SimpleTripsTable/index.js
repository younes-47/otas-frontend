import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Typography } from '@mui/joy';
import { NumericFormat } from 'react-number-format';
import Input from '@mui/joy/Input';
import { FormattedDate } from 'react-intl';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#C6DEA6',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function SimpleTripsTable({ tripsData }) {
  return (
    <TableContainer component={Paper} sx={{ width: '60%' }}>
      <Table sx={{ minWidth: 700 }} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Departure</StyledTableCell>
            <StyledTableCell align="left">Destination</StyledTableCell>
            <StyledTableCell align="left">Departure&nbsp;Date</StyledTableCell>
            <StyledTableCell align="left">Arrival&nbsp;Date</StyledTableCell>
            <StyledTableCell align="left">With</StyledTableCell>
            <StyledTableCell align="left">Unit</StyledTableCell>
            <StyledTableCell align="left">Value</StyledTableCell>
            <StyledTableCell align="left">Highway&nbsp;Fee</StyledTableCell>
            <StyledTableCell align="left">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tripsData?.map((trip) => (
            <StyledTableRow key={trip.id}>
              <StyledTableCell align="left">
                <Typography level="body-md">{trip.departurePlace}</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography level="body-md">{trip.destination}</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography level="body-md">
                  {DateTimeFormater(trip.departureDate)}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography level="body-md">
                  {DateTimeFormater(trip.arrivalDate)}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography level="body-md">
                  {trip.transportationMethod}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography level="body-md">{trip.unit}</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
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
              </StyledTableCell>
              <StyledTableCell align="left">
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
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography level="title-md" color="success">
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
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SimpleTripsTable.propTypes = {
  tripsData: PropTypes.array.isRequired,
};
