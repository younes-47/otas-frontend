/**
 *
 * TextInput
 *
 */

import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyleTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
  },
});
function StyledTextField({ label, value, onChange }) {
  return (
    <StyleTextField
      id="outlined-controlled"
      label={label}
      value={value}
      onChange={onChange}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
    />
  );
}

StyledTextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StyledTextField;
