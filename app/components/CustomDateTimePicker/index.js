/**
 *
 * CustomDateTimePicker
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// import styled from 'styled-components';

function CustomDateTimePicker({ value, onChange }) {
  const onChangeDateTime = (e) => {
    // dayjs(e.$d).format();
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker value={value} onChange={(e) => onChangeDateTime(e)} />
    </LocalizationProvider>
  );
}

CustomDateTimePicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomDateTimePicker;
